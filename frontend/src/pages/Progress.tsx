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
  Award,
  TrendingUp,
  Target,
  Flame,
  Calendar,
  Trophy,
  Star,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProgressPage = () => {
  const user = {
    name: "Jay",
    currentStreak: 7,
    longestStreak: 12,
    phrasesMastered: 24,
    totalPracticeTime: "18 hours",
    averageScore: 85,
  };

  const progressData = [
    { day: "Mon", score: 76 },
    { day: "Tue", score: 82 },
    { day: "Wed", score: 79 },
    { day: "Thu", score: 87 },
    { day: "Fri", score: 91 },
    { day: "Sat", score: 88 },
    { day: "Sun", score: 85 },
  ];

  const badges = [
    {
      id: 1,
      name: "First Steps",
      description: "Completed your first practice",
      earned: true,
      rarity: "common",
    },
    {
      id: 2,
      name: "Week Warrior",
      description: "7-day practice streak",
      earned: true,
      rarity: "uncommon",
    },
    {
      id: 3,
      name: "Pronunciation Pro",
      description: "Scored 90%+ five times",
      earned: true,
      rarity: "rare",
    },
    {
      id: 4,
      name: "Consistency King",
      description: "15-day practice streak",
      earned: false,
      rarity: "epic",
    },
    {
      id: 5,
      name: "Perfect Score",
      description: "Achieved 100% accuracy",
      earned: false,
      rarity: "legendary",
    },
    {
      id: 6,
      name: "Multi-linguist",
      description: "Practice 3 different languages",
      earned: false,
      rarity: "rare",
    },
  ];

  const categories = [
    { name: "Greetings", mastered: 8, total: 12, percentage: 67 },
    { name: "Restaurant", mastered: 3, total: 15, percentage: 20 },
    { name: "Travel", mastered: 0, total: 20, percentage: 0 },
    { name: "Business", mastered: 0, total: 18, percentage: 0 },
  ];

  const getBadgeStyle = (rarity: string, earned: boolean) => {
    if (!earned) return "grayscale opacity-50";

    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse";
      case "epic":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg";
      case "rare":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md";
      case "uncommon":
        return "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return <Trophy className="w-4 h-4" />;
      case "epic":
        return <Star className="w-4 h-4" />;
      case "rare":
        return <Zap className="w-4 h-4" />;
      case "uncommon":
        return <Target className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Link>
            </Button>

            <h1 className="text-xl font-semibold">Your Progress</h1>

            <div></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <Card className="shadow-card text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-action/10 rounded-lg mx-auto mb-2 sm:mb-3">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-action" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-action">
                {user.currentStreak}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Current Streak
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-success/10 rounded-lg mx-auto mb-2 sm:mb-3">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-success" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-success">
                {user.phrasesMastered}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Phrases Mastered
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg mx-auto mb-2 sm:mb-3">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-primary">
                {user.averageScore}%
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Average Score
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-secondary/50 rounded-lg mx-auto mb-2 sm:mb-3">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">
                {user.longestStreak}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Longest Streak
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Progress Charts */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Score Over Time */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Score Over Time
                </CardTitle>
                <CardDescription>
                  Your pronunciation accuracy this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48 sm:h-56 lg:h-64 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-4">
                  {progressData.map((day, index) => (
                    <div
                      key={index}
                      className="flex-1 flex flex-col items-center"
                    >
                      <div className="text-xs sm:text-sm font-medium text-foreground mb-1 sm:mb-2">
                        {day.score}%
                      </div>
                      <div
                        className="w-full bg-gradient-to-t from-primary to-success rounded-t-lg transition-all duration-500 ease-out"
                        style={{
                          height: `${
                            (day.score / 100) *
                            (window.innerWidth < 640 ? 150 : 200)
                          }px`,
                        }}
                      />
                      <div className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                        {day.day}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Progress */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Category Progress</CardTitle>
                <CardDescription>
                  Your mastery across different topics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {categories.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground text-sm sm:text-base">
                        {category.name}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {category.mastered}/{category.total}
                      </Badge>
                    </div>
                    <Progress
                      value={category.percentage}
                      className="h-2 sm:h-3"
                    />
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {category.percentage}% complete
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-action" />
                  Achievement Gallery
                </CardTitle>
                <CardDescription>Collect badges as you improve</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`
                        p-2 sm:p-3 rounded-lg text-center transition-all duration-300 cursor-pointer
                        ${getBadgeStyle(badge.rarity, badge.earned)}
                        ${badge.earned ? "hover:scale-105" : ""}
                      `}
                    >
                      <div className="flex items-center justify-center mb-1 sm:mb-2">
                        {getRarityIcon(badge.rarity)}
                      </div>
                      <h4 className="font-semibold text-xs sm:text-sm mb-1">
                        {badge.name}
                      </h4>
                      <p className="text-xs opacity-90 leading-tight">
                        {badge.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="action" size="sm" className="w-full" asChild>
                  <Link to="/practice">Continue Practice</Link>
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/dashboard">Back to Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressPage;
