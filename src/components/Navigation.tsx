
import { useState } from "react";
import { Book, Menu, X, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 p-2 rounded-lg">
              <Book className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">BookCritic</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              <Star className="h-4 w-4" />
              Browse Books
            </a>
            <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              <Award className="h-4 w-4" />
              Critics
            </a>
            <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              <Users className="h-4 w-4" />
              Community
            </a>
            <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              Sign In
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Join Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 py-2">
                <Star className="h-4 w-4" />
                Browse Books
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 py-2">
                <Award className="h-4 w-4" />
                Critics
              </a>
              <a href="#" className="text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-2 py-2">
                <Users className="h-4 w-4" />
                Community
              </a>
              <div className="flex flex-col space-y-2 pt-3 border-t border-slate-200">
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50 w-full">
                  Sign In
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full">
                  Join Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
