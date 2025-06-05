
import { Award, Users, BarChart3, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";

const ScoreExplained = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              How Our Scores Work 📊
            </h1>
            <p className="text-xl text-gray-600">
              Understanding our transparent, unbiased rating system
            </p>
          </div>

          {/* Critic Score Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Critic Score (1-100)</h2>
                <p className="text-gray-600">Professional reviews aggregated from major publications</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                We aggregate professional reviews from major publications including The New York Times, 
                The Guardian, The Washington Post, Publishers Weekly, Kirkus Reviews, and more. Each review 
                is converted to a numerical score based on the critic's assessment, then averaged to create 
                our 1-100 Critic Score.
              </p>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Why 1-100?</h3>
                <p className="text-gray-700">
                  This scale provides more nuance than star ratings and matches what readers expect 
                  from film and game review aggregators. It allows for subtle distinctions between 
                  "good" and "great" books.
                </p>
              </div>
            </div>
          </div>

          {/* Reader Score Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Reader Score (1-10)</h2>
                <p className="text-gray-600">Verified community ratings and reviews</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                Verified community members rate books on a 1-10 scale. We require account verification 
                to prevent manipulation, and weight scores based on review quality and user history.
              </p>
              
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-3">Quality Control</h3>
                <p className="text-gray-700">
                  All ratings are moderated for authenticity. We track patterns to identify and 
                  remove fake reviews, ensuring our Reader Scores reflect genuine community opinion.
                </p>
              </div>
            </div>
          </div>

          {/* Score Ranges */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Score Ranges</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-emerald-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    90+
                  </div>
                  <span className="font-semibold">Universally Acclaimed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-green-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    80+
                  </div>
                  <span className="font-semibold">Widespread Critical Praise</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-lime-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    70+
                  </div>
                  <span className="font-semibold">Generally Positive Reviews</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-yellow-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    60+
                  </div>
                  <span className="font-semibold">Mixed or Average Reviews</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-orange-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    50+
                  </div>
                  <span className="font-semibold">Divisive Reception</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-red-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    &lt;50
                  </div>
                  <span className="font-semibold">Generally Negative Reviews</span>
                </div>
              </div>
            </div>
          </div>

          {/* Why Our Method Works */}
          <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Why Our Method Works</h2>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                Unlike star-based systems that can be gamed, our aggregated approach provides reliable 
                guidance while preserving the nuance of individual opinions. We show both professional 
                and reader perspectives because great books often appeal differently to different audiences.
              </p>
              
              <p className="leading-relaxed">
                Our system is designed to be transparent, unbiased, and helpful. We don't manipulate 
                scores for commercial reasons, and we clearly explain our methodology so you can make 
                informed decisions about what to read next.
              </p>
              
              <div className="bg-white/80 rounded-xl p-6 mt-6">
                <h3 className="font-bold text-lg mb-3 text-gray-800">The Plot Twist Difference</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    No algorithmic manipulation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Transparent methodology
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Independent platform
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    Both professional and reader perspectives
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreExplained;
