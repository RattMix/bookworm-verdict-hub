
import { useState } from "react";
import { Book, Menu, X, Star, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b-2 border-purple-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-3 rounded-2xl shadow-lg transform hover:scale-110 transition-transform">
              <Book className="h-7 w-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                PlotTwist
              </span>
              <span className="text-xs text-gray-500 font-medium -mt-1">
                📚 Where stories take unexpected turns ✨
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/browse" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2 font-medium px-4 py-2 rounded-full hover:bg-purple-50">
              <Star className="h-4 w-4" />
              Browse Books 📚
            </Link>
            <Link to="/critics" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2 font-medium px-4 py-2 rounded-full hover:bg-purple-50">
              <Award className="h-4 w-4" />
              Critics Corner 🎯
            </Link>
            <Link to="/community" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2 font-medium px-4 py-2 rounded-full hover:bg-purple-50">
              <Users className="h-4 w-4" />
              Community 💬
            </Link>
            <Link to="/write-review">
              <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50 rounded-full px-6 py-2 font-semibold">
                Write Review ✍️
              </Button>
            </Link>
            <Link to="/how-scores-work" className="text-gray-700 hover:text-purple-600 transition-colors font-medium px-4 py-2 rounded-full hover:bg-purple-50">
              How Scores Work
            </Link>
            <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50 rounded-full px-6 py-2 font-semibold">
              Sign In 👋
            </Button>
            <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full px-6 py-2 font-semibold shadow-lg transform hover:scale-105 transition-all">
              Join the Fun! 🚀
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
          <div className="md:hidden py-6 border-t-2 border-purple-100">
            <div className="flex flex-col space-y-4">
              <Link to="/browse" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-purple-50 font-medium">
                <Star className="h-5 w-5" />
                Browse Books 📚
              </Link>
              <Link to="/critics" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-purple-50 font-medium">
                <Award className="h-5 w-5" />
                Critics Corner 🎯
              </Link>
              <Link to="/community" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-purple-50 font-medium">
                <Users className="h-5 w-5" />
                Community 💬
              </Link>
              <Link to="/write-review" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-purple-50 font-medium">
                Write Review ✍️
              </Link>
              <Link to="/how-scores-work" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-3 py-3 px-4 rounded-xl hover:bg-purple-50 font-medium">
                How Scores Work 📊
              </Link>
              <div className="flex flex-col space-y-3 pt-4 border-t border-purple-100">
                <Button variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50 w-full rounded-full py-3 font-semibold">
                  Sign In 👋
                </Button>
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white w-full rounded-full py-3 font-semibold shadow-lg">
                  Join the Fun! 🚀
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
