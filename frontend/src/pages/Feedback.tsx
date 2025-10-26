import { useState, useEffect } from "react";
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
} from "lucide-react";
import { Link } from "react-router";

const Feedback = () => {
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const practiceResult = {
    phrase: "Hello, how are you today?",
    score: 85,
    feedback: "Fantastic Job!",
    improvements: [
      { word: "Hello", score: 92, feedback: "Perfect pronunciation!" },
      { word: "how", score: 88, feedback: "Great intonation" },
      {
        word: "are",
        score: 78,
        feedback: "Try to emphasize the 'r' sound more",
      },
      { word: "you", score: 90, feedback: "Excellent" },
      {
        word: "today",
        score: 82,
        feedback: "Good rhythm, work on the 'ay' ending",
      },
    ],
  };

  useEffect(() => {
    // Animate score on component mount
    setTimeout(() => {
      setShowScore(true);
      let currentScore = 0;
      const interval = setInterval(() => {
        currentScore += 2;
        setScore(currentScore);
        if (currentScore >= practiceResult.score) {
          setScore(practiceResult.score);
          clearInterval(interval);
        }
      }, 30);
    }, 500);
  }, [practiceResult.score]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 75) return "text-primary";
    if (score >= 60) return "text-action";
    return "text-destructive";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "Outstanding! You sound like a native speaker!";
    if (score >= 80) return "Fantastic Job! You're doing great!";
    if (score >= 70) return "Great Progress! Keep practicing!";
    if (score >= 60) return "Good effort! You're improving!";
    return "Keep going! Practice makes perfect!";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/practice">
                <ArrowLeft className="w-4 h-4" />
                Back to Practice
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
                    Accuracy Score
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-success">
                {getScoreMessage(score)}
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Your pronunciation of "{practiceResult.phrase}"
              </p>
            </div>
          </div>

          {/* Detailed Breakdown */}
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
              {practiceResult.improvements.map((word, index) => (
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

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full sm:w-auto flex-shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span className="sm:hidden ml-2">Listen</span>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievement Badge */}
          {score >= 80 && (
            <Card className="shadow-card bg-gradient-to-r from-success/5 to-success/10 border-success/20">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-success mx-auto mb-3" />
                <h3 className="text-xl font-semibold text-success mb-2">
                  Achievement Unlocked!
                </h3>
                <p className="text-muted-foreground">
                  You scored over 80% - you're becoming a pronunciation pro!
                </p>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button variant="outline" size="lg" asChild>
              <Link to="/practice">
                <RotateCcw className="w-5 h-5" />
                Try Again
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
                <li>
                  • Practice the 'r' sound by placing your tongue slightly back
                </li>
                <li>
                  • Work on vowel endings - they're crucial for natural
                  pronunciation
                </li>
                <li>• Record yourself daily to track improvement over time</li>
                <li>
                  • Listen to native speakers and mimic their intonation
                  patterns
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Feedback;
