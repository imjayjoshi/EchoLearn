import { Mic } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t bg-secondary/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">SpeakWise</span>
          </div>
          <p className="text-muted-foreground">
            © 2025 SpeakWise. Empowering confident speakers worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
