
import { useState } from "react";
import { Book, Menu, X, Star, Users, Award, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-slate-800 p-2 rounded-lg shadow-md">
              <Book className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-800 font-serif">
                Plot Twist
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/browse" 
              className="text-gray-700 hover:text-slate-800 transition-colors flex items-center gap-2 font-medium px-3 py-2 rounded-md hover:bg-slate-50"
              title="Explore all titles by genre or score"
            >
              <Star className="h-4 w-4" />
              Browse Books
            </Link>
            <Link 
              to="/critics" 
              className="text-gray-700 hover:text-slate-800 transition-colors flex items-center gap-2 font-medium px-3 py-2 rounded-md hover:bg-slate-50"
              title="View sourced reviews from trusted publications"
            >
              <Award className="h-4 w-4" />
              Critics
            </Link>
            <Link 
              to="/write-review" 
              className="text-gray-700 hover:text-slate-800 transition-colors flex items-center gap-2 font-medium px-3 py-2 rounded-md hover:bg-slate-50"
              title="Submit your perspective"
            >
              Write a Review
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-gray-700 hover:text-slate-800 transition-colors flex items-center gap-2 font-medium px-3 py-2 rounded-md hover:bg-slate-50"
              title="Learn about our scoring system"
            >
              <HelpCircle className="h-4 w-4" />
              How It Works
            </Link>
            <Button 
              variant="outline" 
              className="text-slate-700 border-slate-300 hover:bg-slate-50 rounded-md px-4 py-2 font-medium"
              title="Access your profile and saved books"
            >
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/browse" 
                className="text-gray-700 hover:text-slate-800 transition-colors flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-slate-50 font-medium"
              >
                <Star className="h-5 w-5" />
                Browse Books
              </Link>
              <Link 
                to="/critics" 
                className="text-gray-700 hover:text-slate-800 transition-colors flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-slate-50 font-medium"
              >
                <Award className="h-5 w-5" />
                Critics
              </Link>
              <Link 
                to="/write-review" 
                className="text-gray-700 hover:text-slate-800 transition-colors flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-slate-50 font-medium"
              >
                Write a Review
              </Link>
              <Link 
                to="/how-it-works" 
                className="text-gray-700 hover:text-slate-800 transition-colors flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-slate-50 font-medium"
              >
                <HelpCircle className="h-5 w-5" />
                How It Works
              </Link>
              <div className="pt-3 border-t border-slate-200">
                <Button 
                  variant="outline" 
                  className="text-slate-700 border-slate-300 hover:bg-slate-50 w-full rounded-lg py-3 font-medium"
                >
                  Sign In
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
