import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";
import { toast } from "sonner";
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
  Flame,
  Play,
  Award,
  TrendingUp,
  Clock,
  Target,
  Coffee,
  Utensils,
  Plane,
  Heart,
  LogOut,
} from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<{ fullName: string; streak: number } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch logged-in user data from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        console.error("User not logged in:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/auth/user/logout", {
        withCredentials: true,
      });
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to logout. Try again.");
    }
  };

  // ✅ Loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-muted-foreground">
        Loading your dashboard...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const categories = [
    {
      id: "greetings",
      title: "Greetings",
      icon: <Heart className="w-6 h-6" />,
      phrases: 12,
      completed: 8,
      color: "text-success",
    },
    {
      id: "restaurant",
      title: "Restaurant",
      icon: <Utensils className="w-6 h-6" />,
      phrases: 15,
      completed: 3,
      color: "text-action",
    },
    {
      id: "travel",
      title: "Travel",
      icon: <Plane className="w-6 h-6" />,
      phrases: 20,
      completed: 0,
      color: "text-primary",
    },
    {
      id: "business",
      title: "Business",
      icon: <Coffee className="w-6 h-6" />,
      phrases: 18,
      completed: 0,
      color: "text-muted-foreground",
    },
  ];

  const todaysPhrases = [
    {
      id: 1,
      text: "Hello, how are you today?",
      difficulty: "Beginner",
      estimated: "2 min",
    },
    {
      id: 2,
      text: "Could you please help me with this?",
      difficulty: "Intermediate",
      estimated: "3 min",
    },
    {
      id: 3,
      text: "I would like to make a reservation",
      difficulty: "Intermediate",
      estimated: "3 min",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Logout */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-foreground">
                Hello, {user.fullName}!
              </h1>
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-action" />
                <span className="text-xl font-semibold text-action">
                  {user.streak || 0} day streak
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-lg">
              Your pronunciation journey continues strong!
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Today's Recommended Practice
                </CardTitle>
                <CardDescription>
                  Personalized phrases to improve your pronunciation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysPhrases.map((phrase) => (
                  <div
                    key={phrase.id}
                    className="p-3 sm:p-4 rounded-lg border bg-secondary/20 hover:bg-secondary/40 transition-colors group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground font-medium mb-2 text-sm sm:text-base">
                          "{phrase.text}"
                        </p>
                        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {phrase.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {phrase.estimated}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="action"
                        size="sm"
                        className="group-hover:scale-105 transition-transform w-full sm:w-auto"
                        asChild
                      >
                        <Link to="/practice">
                          <Play className="w-4 h-4" />
                          Practice
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Practice Categories</CardTitle>
                <CardDescription>
                  Choose a topic that interests you most
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="p-3 sm:p-4 rounded-lg border hover:shadow-soft transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <div className={`${category.color} flex-shrink-0`}>
                            {category.icon}
                          </div>
                          <h3 className="font-semibold text-foreground text-sm sm:text-base truncate">
                            {category.title}
                          </h3>
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-xs flex-shrink-0"
                        >
                          {category.completed}/{category.phrases}
                        </Badge>
                      </div>

                      <Progress
                        value={(category.completed / category.phrases) * 100}
                        className="h-2 mb-3"
                      />

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-xs sm:text-sm"
                        asChild
                      >
                        <Link to="/practice">Continue Learning</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Streak</span>
                  <div className="flex items-center gap-1 text-action font-semibold">
                    <Flame className="w-4 h-4" />
                    {user.streak || 0} days
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Phrases Mastered
                  </span>
                  <span className="font-semibold text-success">11</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Average Score</span>
                  <span className="font-semibold text-primary">85%</span>
                </div>

                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/progress">
                    <TrendingUp className="w-4 h-4" />
                    View Detailed Stats
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-success/10 rounded-lg">
                  <Award className="w-6 h-6 text-success" />
                  <div>
                    <p className="font-medium text-success text-sm">
                      Week Warrior
                    </p>
                    <p className="text-xs text-muted-foreground">
                      7-day streak achieved!
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <Target className="w-6 h-6 text-primary" />
                  <div>
                    <p className="font-medium text-primary text-sm">
                      Pronunciation Pro
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Scored 90%+ five times
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
