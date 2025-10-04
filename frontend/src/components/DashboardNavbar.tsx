import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Mic, Play } from "lucide-react";

const DashboardNavbar = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-primary">SpeakWise</h1>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/progress">
              <Button variant="ghost" size="sm">
                Progress
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              Profile
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
