import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, Play, Square, ArrowLeft, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

const Practice = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentPhrase = {
    text: "Hello, how are you today?",
    phonetic: "/həˈloʊ, haʊ ɑr ju təˈdeɪ/",
    difficulty: "Beginner",
    category: "Greetings"
  };

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasRecorded(true);
      // Here you would stop recording and process the audio
      setTimeout(() => {
        // Simulate processing delay, then redirect to feedback
        window.location.href = "/feedback";
      }, 1500);
    } else {
      setIsRecording(true);
      setHasRecorded(false);
    }
  };

  const handlePlayback = () => {
    setIsPlaying(true);
    // Simulate audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

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
              <Badge variant="outline">{currentPhrase.category}</Badge>
              <Badge variant="secondary">{currentPhrase.difficulty}</Badge>
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
              Listen, then speak when ready
            </h1>
          </div>

          {/* Target Phrase */}
          <Card className="max-w-2xl mx-auto shadow-soft">
            <CardContent className="p-6 sm:p-8 lg:p-12 text-center space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground leading-relaxed">
                  "{currentPhrase.text}"
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-mono">
                  {currentPhrase.phonetic}
                </p>
              </div>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={handlePlayback}
                disabled={isPlaying}
                className="gap-2 w-full sm:w-auto"
              >
                {isPlaying ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-5 h-5" />
                    <span className="hidden sm:inline">Listen to Native Speaker</span>
                    <span className="sm:hidden">Listen</span>
                  </>
                )}
              </Button>
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
                      animationDelay: `${i * 0.1}s`
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
                  <span className="font-semibold text-sm sm:text-base">Recording...</span>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Speak clearly into your microphone
                </p>
              </div>
            )}

            {/* Processing Status */}
            {hasRecorded && !isRecording && (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="font-semibold text-sm sm:text-base">Processing your speech...</span>
                </div>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Our AI is analyzing your pronunciation
                </p>
              </div>
            )}

            {/* Record Button */}
            <Button
              variant={isRecording ? "destructive" : "action"}
              size="xl"
              onClick={handleRecord}
              disabled={hasRecorded}
              className={`w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full text-lg sm:text-xl font-bold transition-all duration-300 ${
                isRecording ? 'animate-pulse scale-110' : 'hover:scale-110'
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
                {isRecording ? "Tap to stop recording" : "Tap to start recording"}
              </p>
              <p className="text-muted-foreground text-sm sm:text-base">
                {!isRecording && !hasRecorded && "Press the microphone to record your pronunciation"}
              </p>
            </div>

          </div>
          
          {/* Skip Option */}
          <div className="pt-8">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">
                Skip this phrase
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Practice;