import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, FileText, TrendingUp, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "34",
      change: "+12%",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Total Phrases",
      value: "20",
      change: "+8%",
      icon: FileText,
      color: "text-success",
    },
    {
      title: "Avg Pronunciation Score",
      value: "82%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-action",
    },
    {
      title: "Active Learners Today",
      value: "10",
      change: "+15%",
      icon: Activity,
      color: "text-primary",
    },
  ];

  const userGrowthData = [
    { month: "Jan", users: 2 },
    { month: "Feb", users: 3 },
    { month: "Mar", users: 4 },
    { month: "Apr", users: 6 },
    { month: "May", users: 7 },
    { month: "Jun", users: 12 },
  ];

  const performanceData = [
    { day: "Mon", score: 40 },
    { day: "Tue", score: 65 },
    { day: "Wed", score: 79 },
    { day: "Thu", score: 85 },
    { day: "Fri", score: 87 },
    { day: "Sat", score: 80 },
    { day: "Sun", score: 90 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with SpeakWise.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className="shadow-card hover:shadow-soft transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-sm font-medium text-success">
                    {stat.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Growth Chart */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>
              Monthly active user growth over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userGrowthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="users"
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Average Pronunciation Score</CardTitle>
            <CardDescription>Weekly performance trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--action))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--action))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest user actions and system events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                user: "jay@gmail.com",
                action: "Completed 'Greetings' category",
                time: "5 minutes ago",
              },
              {
                user: "shruti@example.com",
                action: "Achieved 90% pronunciation score",
                time: "12 minutes ago",
              },
              {
                user: "umang@example.com",
                action: "Started 'Restaurant' practice",
                time: "23 minutes ago",
              },
              {
                user: "yashvi@example.com",
                action: "Reached 7-day streak",
                time: "1 hour ago",
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity.user}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
