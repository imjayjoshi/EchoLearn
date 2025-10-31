import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { phraseAPI, Phrase } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Volume2,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";

const Feedback = () => {
  const { phraseId } = useParams();
  const [phrase, setPhrase] = useState<Phrase | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [practiceResult, setPracticeResult] = useState<any>(null);

  useEffect(() => {
    const fetchPhrase = async () => {
      try {
        if (phraseId) {
          const response = await phraseAPI.getPhraseById(phraseId);
          setPhrase(response.data.phrase);
        }

        // Get practice result from sessionStorage
        const resultStr = sessionStorage.getItem("practiceResult");
        if (resultStr) {
          const result = JSON.parse(resultStr);
          setPracticeResult(result);
          sessionStorage.removeItem("practiceResult"); // Clear after reading
        }
      } catch (error) {
        console.error("Error fetching phrase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhrase();
  }, [phraseId]);

  useEffect(() => {
    if (practiceResult) {
      // Animate score on component mount
      setTimeout(() => {
        setShowScore(true);
        let currentScore = 0;
        const targetScore = practiceResult.overallScore;
        const interval = setInterval(() => {
          currentScore += 2;
          setScore(currentScore);
          if (currentScore >= targetScore) {
            setScore(targetScore);
            clearInterval(interval);
          }
        }, 30);
      }, 500);
    }
  }, [practiceResult]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-primary";
    if (score >= 60) return "text-action";
    return "text-destructive";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 95) return "Outstanding! Perfect pronunciation!";
    if (score >= 90) return "Excellent! You sound like a native speaker!";
    if (score >= 85) return "Very Good! Minor improvements needed.";
    if (score >= 80) return "Good Job! Keep practicing!";
    if (score >= 70) return "Fair! You're making progress!";
    if (score >= 60) return "Needs Work! Practice more for better results.";
    return "Keep Trying! Regular practice will help!";
  };

  const getComponentIcon = (component: string) => {
    switch (component) {
      case "accuracy":
        return <Target className="w-5 h-5" />;
      case "fluency":
        return <Zap className="w-5 h-5" />;
      case "pronunciation":
        return <Volume2 className="w-5 h-5" />;
      default:
        return <TrendingUp className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-muted-foreground">
        Loading feedback...
      </div>
    );
  }

  if (!practiceResult) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg text-muted-foreground mb-4">
          No practice data found
        </p>
        <Button asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const phraseText = phrase?.text || "Your phrase";

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

            <Badge variant="secondary">Pronunciation Analysis</Badge>
          </div>
        </div>
      </header>

      {/* Feedback Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-6 sm:space-y-8">
          {/* Score Display */}
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto">
              {/* Animated Radial Progress */}
              <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(var(--success))"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>

              {/* Score Number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${getScoreColor(
                      score
                    )}`}
                  >
                    {showScore ? score : 0}%
                  </div>
                  <div className="text-muted-foreground text-xs sm:text-sm">
                    Overall Score
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-success">
                {getScoreMessage(score)}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Your pronunciation of "{phraseText}"
              </p>
            </div>
          </div>

          {/* Component Scores */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Performance Breakdown
              </CardTitle>
              <CardDescription>
                Detailed analysis of your pronunciation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Accuracy",
                  value: practiceResult.accuracy,
                  key: "accuracy",
                },
                {
                  name: "Fluency",
                  value: practiceResult.fluency,
                  key: "fluency",
                },
                {
                  name: "Pronunciation",
                  value: practiceResult.pronunciation,
                  key: "pronunciation",
                },
              ].map((component) => (
                <div key={component.key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getComponentIcon(component.key)}
                      <span className="font-medium">{component.name}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={`${getScoreColor(
                        component.value
                      )} border-current`}
                    >
                      {component.value}%
                    </Badge>
                  </div>
                  <Progress value={component.value} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Word-by-Word Analysis */}
          {practiceResult.wordAnalysis &&
            practiceResult.wordAnalysis.length > 0 && (
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Word-by-Word Analysis
                  </CardTitle>
                  <CardDescription>
                    See how you performed on each word
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {practiceResult.wordAnalysis.map((word, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-secondary/20 gap-3 sm:gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                          <span className="font-semibold text-base sm:text-lg truncate">
                            "{word.word}"
                          </span>
                          <Badge
                            variant="outline"
                            className={`${getScoreColor(
                              word.score
                            )} border-current text-xs flex-shrink-0`}
                          >
                            {word.score}%
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-xs sm:text-sm mb-2">
                          {word.feedback}
                        </p>
                        <Progress
                          value={word.score}
                          className="h-2 max-w-full sm:max-w-xs"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

          {/* Achievement Badge */}
          {score >= 90 && (
            <Card className="shadow-card bg-gradient-to-r from-success/5 to-success/10 border-success/20">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-success mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-success mb-2">
                  Excellent Performance!
                </h3>
                <p className="text-muted-foreground">
                  You scored over 90% - you're becoming a pronunciation master!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button variant="outline" size="lg" asChild>
              <Link to={`/practice/${phraseId}`}>
                <RotateCcw className="w-5 h-5" />
                Practice Again
              </Link>
            </Button>

            <Button variant="action" size="lg" asChild>
              <Link to="/dashboard">
                <ArrowRight className="w-5 h-5" />
                Next Phrase
              </Link>
            </Button>
          </div>

          {/* Tips for Improvement */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg">Tips for Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                {score < 80 && (
                  <>
                    <li>• Listen to the native pronunciation multiple times</li>
                    <li>
                      • Practice slowly at first, then gradually increase speed
                    </li>
                  </>
                )}
                {practiceResult.accuracy < 85 && (
                  <li>
                    • Focus on pronouncing each word clearly and correctly
                  </li>
                )}
                {practiceResult.fluency < 85 && (
                  <li>• Work on speaking smoothly without long pauses</li>
                )}
                {practiceResult.pronunciation < 85 && (
                  <li>• Pay attention to stress patterns and intonation</li>
                )}
                <li>• Record yourself daily to track improvement over time</li>
                <li>• Mimic native speakers' rhythm and intonation patterns</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
