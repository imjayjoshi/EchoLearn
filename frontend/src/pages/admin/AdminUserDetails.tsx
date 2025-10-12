import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Mail,
  Calendar,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";

const AdminUserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock user data - replace with actual API call
  const users = [
    {
      id: 1,
      name: "Jay Joshi",
      email: "jay@example.com",
      role: "Learner",
      joinDate: "2025-01-15",
      progress: 65,
      lastActive: "2025-03-20",
      totalSessions: 48,
      averageScore: 78,
      completedPhrases: 125,
      languages: ["English", "Spanish"],
    },
    {
      id: 2,
      name: "Shruti Bhatti",
      email: "Shruti@example.com",
      role: "Learner",
      joinDate: "2025-02-20",
      progress: 82,
      lastActive: "2025-03-22",
      totalSessions: 62,
      averageScore: 85,
      completedPhrases: 180,
      languages: ["French", "German"],
    },
    {
      id: 3,
      name: "Umang Trivedi",
      email: "umang@example.com",
      role: "Learner",
      joinDate: "2025-03-10",
      progress: 45,
      lastActive: "2025-03-21",
      totalSessions: 28,
      averageScore: 72,
      completedPhrases: 89,
      languages: ["Mandarin"],
    },
    {
      id: 4,
      name: "Yashvi Pandya",
      email: "yashvi@example.com",
      role: "Learner",
      joinDate: "2025-01-05",
      progress: 91,
      lastActive: "2025-03-23",
      totalSessions: 95,
      averageScore: 92,
      completedPhrases: 245,
      languages: ["Japanese", "Korean", "English"],
    },
    {
      id: 5,
      name: "Rushabh Patel",
      email: "rushabh@example.com",
      role: "Learner",
      joinDate: "2025-02-28",
      progress: 73,
      lastActive: "2025-03-19",
      totalSessions: 51,
      averageScore: 80,
      completedPhrases: 156,
      languages: ["Italian", "Portuguese"],
    },
  ];

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate("/admin/users")}>
          <ArrowLeft className="w-4 h-4" />
          Back to Users
        </Button>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">User not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/admin/users")}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-foreground">{user.name}</h2>
          <p className="text-muted-foreground">User Details</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{user.totalSessions}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{user.averageScore}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Phrases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">
                {user.completedPhrases}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={user.progress} className="h-2" />
              <span className="text-2xl font-bold">{user.progress}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Basic details about the user</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Join Date</p>
                <p className="font-medium">{user.joinDate}</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Last Active</p>
                <p className="font-medium">{user.lastActive}</p>
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-2">Role</p>
              <Badge variant="secondary">{user.role}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Learning Activity</CardTitle>
            <CardDescription>Languages and progress overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Learning Languages
              </p>
              <div className="flex flex-wrap gap-2">
                {user.languages.map((lang) => (
                  <Badge key={lang} variant="outline">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <p className="text-sm text-muted-foreground mb-2">Performance</p>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Pronunciation Accuracy</span>
                    <span className="font-medium">{user.averageScore}%</span>
                  </div>
                  <Progress value={user.averageScore} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Course Completion</span>
                    <span className="font-medium">{user.progress}%</span>
                  </div>
                  <Progress value={user.progress} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>Manage this user account</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Button variant="outline">Send Message</Button>
          <Button variant="outline">Reset Progress</Button>
          <Button variant="destructive">Deactivate Account</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUserDetails;
