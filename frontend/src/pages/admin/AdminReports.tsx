import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, TrendingUp, Users, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const AdminReports = () => {
  const [dateFilter, setDateFilter] = useState("last30days");

  const reports = [
    {
      title: "User Activity Report",
      description: "Daily active users and engagement metrics",
      date: "Last 30 days",
      status: "Ready",
      icon: Users,
    },
    {
      title: "Performance Analytics",
      description: "Average pronunciation scores and improvement trends",
      date: "Last 30 days",
      status: "Ready",
      icon: TrendingUp,
    },
    {
      title: "Learning Progress",
      description: "Completion rates by category and difficulty",
      date: "Last 30 days",
      status: "Ready",
      icon: Target,
    },
  ];

  const insights = [
    { label: "Most Active Day", value: "Wednesday", trend: "+8%" },
    { label: "Peak Usage Time", value: "6-8 PM", trend: "+12%" },
    { label: "Avg Session Length", value: "15 min", trend: "+5%" },
    { label: "Completion Rate", value: "78%", trend: "+3%" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">
            Reports & Analytics
          </h2>
          <p className="text-muted-foreground">
            Track performance and user insights
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4" />
            Filter Date
          </Button>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {insights.map((insight, idx) => (
          <Card key={idx} className="shadow-card">
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{insight.label}</p>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-foreground">
                    {insight.value}
                  </p>
                  <Badge variant="secondary" className="text-success">
                    {insight.trend}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Available Reports */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Download detailed analytics and performance reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report, idx) => {
              const Icon = report.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-lg border hover:shadow-soft transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {report.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {report.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {report.date}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Custom Reports */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Custom Report Generator</CardTitle>
          <CardDescription>
            Create custom reports with specific metrics and date ranges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="action" className="flex-1">
              Create Custom Report
            </Button>
            <Button variant="outline" className="flex-1">
              Schedule Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminReports;
