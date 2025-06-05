
import { Award, Users, BarChart3, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-slate-800 mb-4 font-serif">
              How It Works
            </h1>
            <p className="text-xl text-gray-600">
              Understanding our transparent review aggregation system
            </p>
          </div>

          {/* About Plot Twist */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-slate-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 font-serif">About Plot Twist</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Plot Twist is the Rotten Tomatoes of books. We aggregate critic reviews and reader scores 
                (coming soon) to provide a transparent view of how books are received — not what's promoted.
              </p>
              <p>
                No publisher influence. No platform affiliation. Just reviews.
              </p>
            </div>
          </div>

          {/* Critic Score Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 font-serif">Critic Score</h2>
                <p className="text-gray-600">Professional reviews from established publications</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed">
                We aggregate professional reviews from major publications including The New York Times, 
                The Guardian, The Washington Post, Publishers Weekly, Kirkus Reviews, and more. Each review 
                is converted to a numerical score based on the critic's assessment, then averaged to create 
                our 1-100 Critic Score.
              </p>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="font-bold text-lg mb-3">Our Sources</h3>
                <p className="text-gray-700">
                  We source reviews only from established publications with professional editorial standards. 
                  This ensures our scores reflect genuine critical consensus rather than promotional content.
                </p>
              </div>
            </div>
          </div>

          {/* Reader Score Section */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 font-serif">Reader Score</h2>
                <p className="text-gray-600">Community ratings from verified readers</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="font-bold text-lg mb-3">Coming Soon</h3>
                <p className="text-gray-700">
                  Reader reviews will be available soon. You'll be able to rate, review, and explore what others are saying.
                </p>
              </div>
            </div>
          </div>

          {/* Score Ranges */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8 border border-slate-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 font-serif">Score Interpretation</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-emerald-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    90+
                  </div>
                  <span className="font-semibold">Universal Acclaim</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-green-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    80+
                  </div>
                  <span className="font-semibold">Generally Positive</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-lime-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    70+
                  </div>
                  <span className="font-semibold">Mostly Favorable</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-yellow-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    60+
                  </div>
                  <span className="font-semibold">Mixed Reviews</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-orange-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    50+
                  </div>
                  <span className="font-semibold">Generally Negative</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-8 bg-red-500 rounded text-white text-sm font-bold flex items-center justify-center">
                    &lt;50
                  </div>
                  <span className="font-semibold">Widespread Criticism</span>
                </div>
              </div>
            </div>
          </div>

          {/* Independence */}
          <div className="bg-slate-800 text-white rounded-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white p-3 rounded-full">
                <Shield className="h-8 w-8 text-slate-800" />
              </div>
              <h2 className="text-3xl font-bold font-serif">Our Independence</h2>
            </div>
            
            <div className="space-y-4 text-slate-200">
              <p className="leading-relaxed">
                Plot Twist operates independently of publishers, retailers, and platforms. We don't manipulate 
                scores for commercial reasons, and we clearly explain our methodology so you can make 
                informed decisions about what to read next.
              </p>
              
              <div className="bg-slate-700 rounded-xl p-6 mt-6">
                <h3 className="font-bold text-lg mb-3 text-white">What Sets Us Apart</h3>
                <ul className="space-y-2 text-slate-200">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    No algorithmic manipulation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Transparent methodology
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Independent platform
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    No commercial bias
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

export default HowItWorks;
