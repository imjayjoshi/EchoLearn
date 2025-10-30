import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { toast } from "sonner";
import { phraseAPI, Phrase } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Square, ArrowLeft, Volume2, Loader2 } from "lucide-react";

const Practice = () => {
  const { phraseId } = useParams();
  const navigate = useNavigate();
  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchPhrase = async () => {
      try {
        if (phraseId) {
          const response = await phraseAPI.getPhraseById(phraseId);
          setCurrentPhrase(response.data.phrase);
        } else {
          // Fetch a random beginner phrase
          const response = await phraseAPI.getPhrasesByLevel("beginner");
          if (response.data.phrases && response.data.phrases.length > 0) {
            setCurrentPhrase(response.data.phrases[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching phrase:", error);
        toast.error("Failed to load phrase");
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchPhrase();
  }, [phraseId, navigate]);

  // Play native audio or use Text-to-Speech
  const handlePlayback = async () => {
    if (isPlaying) return;

    if (currentPhrase?.audioUrl) {
      // Play actual audio if available
      try {
        setIsPlaying(true);
        const audio = new Audio(currentPhrase.audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          setIsPlaying(false);
          audioRef.current = null;
        };

        audio.onerror = () => {
          setIsPlaying(false);
          audioRef.current = null;
          toast.error("Failed to play audio");
        };

        await audio.play();
      } catch (error) {
        console.error("Audio playback error:", error);
        setIsPlaying(false);
        toast.error("Failed to play audio");
      }
    } else {
      // Use browser Text-to-Speech API
      playTextToSpeech(
        currentPhrase?.text || "",
        currentPhrase?.language || "English"
      );
    }
  };

  // Text-to-Speech function
  const playTextToSpeech = (text: string, language: string) => {
    if ("speechSynthesis" in window) {
      setIsPlaying(true);

      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);

      // Set language
      if (language === "Japanese") {
        utterance.lang = "ja-JP"; // Japanese
      } else {
        utterance.lang = "en-US"; // English
      }

      utterance.rate = 0.9; // Slightly slower for learning
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        setIsPlaying(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        toast.error("Text-to-speech not available");
      };

      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Text-to-speech not supported in your browser");
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        setRecordedAudio(audioBlob);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.success("Recording started!");
    } catch (error) {
      console.error("Error starting recording:", error);
      toast.error(
        "Failed to access microphone. Please allow microphone access."
      );
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setHasRecorded(true);
      toast.success("Recording stopped!");
    }
  };

  // Handle record button click
  const handleRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Submit for analysis
  const handleSubmitRecording = async () => {
    if (!recordedAudio || !currentPhrase) {
      toast.error("Please record your pronunciation first");
      return;
    }

    try {
      setLoading(true);

      // Mark phrase as practiced
      await phraseAPI.markAsPracticed(currentPhrase._id, 85);

      toast.success("Recording submitted for analysis!");

      // Redirect to feedback
      setTimeout(() => {
        navigate(`/feedback/${currentPhrase._id}`);
      }, 1000);
    } catch (error) {
      console.error("Error submitting recording:", error);
      toast.error("Failed to submit recording");
      setLoading(false);
    }
  };

  // Play recorded audio
  const playRecordedAudio = () => {
    if (recordedAudio) {
      const audioUrl = URL.createObjectURL(recordedAudio);
      const audio = new Audio(audioUrl);
      audio.play();

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
      };
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (isPlaying && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!currentPhrase) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg text-muted-foreground mb-4">No phrase found</p>
        <Button asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>

            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {currentPhrase.language === "English" ? "🇬🇧" : "🇯🇵"}{" "}
                {currentPhrase.language}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {currentPhrase.level}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Practice Arena */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center space-y-8 sm:space-y-12">
          {/* Instructions */}
          <div className="space-y-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-muted-foreground">
              {isRecording
                ? "Recording... Click Stop when done"
                : hasRecorded
                ? "Recording complete! Review or submit"
                : "Listen, then record your pronunciation"}
            </h1>
          </div>

          {/* Target Phrase */}
          <Card className="max-w-2xl mx-auto shadow-soft">
            <CardContent className="p-6 sm:p-8 lg:p-12 text-center space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed">
                  "{currentPhrase.text}"
                </p>
                {currentPhrase.meaning && (
                  <p className="text-base sm:text-lg text-muted-foreground italic">
                    {currentPhrase.meaning}
                  </p>
                )}
                {currentPhrase.example && (
                  <p className="text-sm sm:text-base text-muted-foreground/80 mt-4 p-4 bg-secondary/20 rounded-lg">
                    <span className="font-medium">Example:</span> "
                    {currentPhrase.example}"
                  </p>
                )}
              </div>

              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handlePlayback}
                  disabled={isPlaying}
                  className="gap-2"
                >
                  {isPlaying ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Playing...
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5" />
                      <span className="hidden sm:inline">Listen</span>
                    </>
                  )}
                </Button>

                {hasRecorded && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={playRecordedAudio}
                    className="gap-2"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span className="hidden sm:inline">Play Recording</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recording Interface */}
          <div className="space-y-6 sm:space-y-8">
            {/* Waveform Visualization */}
            {isRecording && (
              <div className="flex items-center justify-center gap-1 h-12 sm:h-16">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-hero rounded-full animate-pulse"
                    style={{
                      height: `${Math.random() * 40 + 16}px`,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Recording Status */}
            {isRecording && (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-action">
                  <div className="w-3 h-3 bg-action rounded-full animate-pulse" />
                  <span className="font-semibold text-sm sm:text-base">
                    Recording... Click STOP to finish
                  </span>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Read the phrase clearly into your microphone
                </p>
              </div>
            )}

            {/* Recorded Status */}
            {hasRecorded && !isRecording && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-success">
                  <div className="w-3 h-3 bg-success rounded-full" />
                  <span className="font-semibold text-sm sm:text-base">
                    Recording saved! Review or submit for analysis
                  </span>
                </div>
              </div>
            )}

            {/* Record/Stop Button */}
            <Button
              variant={
                isRecording ? "destructive" : hasRecorded ? "outline" : "action"
              }
              size="xl"
              onClick={handleRecord}
              disabled={loading}
              className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 ${
                isRecording ? "animate-pulse scale-110" : "hover:scale-110"
              }`}
            >
              {isRecording ? (
                <Square className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              ) : (
                <Mic className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
              )}
            </Button>

            <div className="text-center space-y-1">
              <p className="text-base sm:text-lg font-medium text-foreground">
                {isRecording
                  ? "Recording... Click to STOP"
                  : hasRecorded
                  ? "Click to record again"
                  : "Click to start recording"}
              </p>
              <p className="text-muted-foreground text-sm sm:text-base">
                {!isRecording && !hasRecorded && "Read the phrase clearly"}
              </p>
            </div>

            {/* Submit Button */}
            {hasRecorded && (
              <div className="pt-4">
                <Button
                  variant="action"
                  size="lg"
                  onClick={handleSubmitRecording}
                  disabled={loading}
                  className="w-full sm:w-auto min-w-[200px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Submit for Analysis"
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Skip Option */}
          <div className="pt-8">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Skip this phrase</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Practice;
