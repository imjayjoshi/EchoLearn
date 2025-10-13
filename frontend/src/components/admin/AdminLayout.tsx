import { useState, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu,
  X,
  Bell,
  Mic
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: FileText, label: "Phrases", path: "/admin/phrases" },
    { icon: BarChart3, label: "Reports", path: "/admin/reports" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-card border-r transition-all duration-300 z-40 flex-shrink-0 ${
          sidebarOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-20 lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 border-b flex items-center justify-between px-4">
            <Link to="/admin" className={`flex items-center space-x-2 ${!sidebarOpen && "lg:justify-center lg:w-full"}`}>
              <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                <Mic className="w-5 h-5 text-white" />
              </div>
              {sidebarOpen && <span className="text-lg font-bold text-primary">SpeakWise</span>}
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={sidebarOpen ? "lg:hidden" : "hidden"}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.path} to={item.path} onClick={() => setSidebarOpen(false)}>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 ${!sidebarOpen && "lg:justify-center lg:px-2"}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              onClick={handleLogout}
              className={`w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10 ${
                !sidebarOpen && "lg:justify-center lg:px-2"
              }`}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-20">
        {/* Top Navbar */}
        <header className="h-16 border-b bg-card sticky top-0 z-30">
          <div className="h-full px-4 lg:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>

              <h1 className="text-xl font-semibold text-foreground hidden md:block">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">AS</span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">Arjun Sharma</p>
                  <p className="text-xs text-muted-foreground">admin@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
