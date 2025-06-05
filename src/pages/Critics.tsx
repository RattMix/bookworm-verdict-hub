
import { Award, ExternalLink, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";

const publications = [
  {
    name: "The New York Times",
    logo: "/placeholder.svg",
    description: "America's newspaper of record, featuring comprehensive book coverage",
    website: "nytimes.com/books",
    reviewCount: 1247
  },
  {
    name: "The Guardian",
    logo: "/placeholder.svg", 
    description: "British daily with international perspective on literature",
    website: "theguardian.com/books",
    reviewCount: 983
  },
  {
    name: "The Washington Post",
    logo: "/placeholder.svg",
    description: "Influential American newspaper with strong literary coverage",
    website: "washingtonpost.com/books",
    reviewCount: 756
  },
  {
    name: "Publishers Weekly",
    logo: "/placeholder.svg",
    description: "Industry trade publication with advance reviews",
    website: "publishersweekly.com",
    reviewCount: 2134
  },
  {
    name: "Kirkus Reviews",
    logo: "/placeholder.svg",
    description: "Independent review service for the book industry",
    website: "kirkusreviews.com",
    reviewCount: 1876
  },
  {
    name: "Library Journal",
    logo: "/placeholder.svg",
    description: "Professional publication for librarians and book buyers",
    website: "libraryjournal.com",
    reviewCount: 1456
  }
];

const featuredCritics = [
  {
    name: "Dwight Garner",
    publication: "The New York Times",
    bio: "Senior book critic known for his wit and literary insight",
    recentReviews: ["Tomorrow, and Tomorrow, and Tomorrow", "The Atlas Six", "Klara and the Sun"],
    expertise: ["Literary Fiction", "Contemporary Literature"]
  },
  {
    name: "Ron Charles", 
    publication: "The Washington Post",
    bio: "Book critic and editor of Book World supplement",
    recentReviews: ["Lessons in Chemistry", "The Midnight Library", "Project Hail Mary"],
    expertise: ["Historical Fiction", "Science Fiction"]
  },
  {
    name: "Alex Preston",
    publication: "The Guardian",
    bio: "Novelist and critic covering contemporary fiction",
    recentReviews: ["Fourth Wing", "Beach Read", "The Seven Husbands of Evelyn Hugo"],
    expertise: ["Contemporary Fiction", "Genre Fiction"]
  }
];

const criticPicks = [
  {
    id: "1",
    title: "The Seven Moons of Maali Almeida",
    author: "Shehan Karunatilaka",
    critic: "Salman Rushdie",
    publication: "The Guardian",
    excerpt: "A rip-roaring epic, full of humor and terror...",
    score: 95
  },
  {
    id: "2",
    title: "Tomorrow, and Tomorrow, and Tomorrow", 
    author: "Gabrielle Zevin",
    critic: "Dwight Garner",
    publication: "The New York Times",
    excerpt: "A dazzling and intricately imagined novel...",
    score: 91
  },
  {
    id: "3",
    title: "Lessons in Chemistry",
    author: "Bonnie Garmus",
    critic: "Ron Charles",
    publication: "The Washington Post", 
    excerpt: "A smart, funny novel about a brilliant scientist...",
    score: 88
  }
];

const Critics = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Critics Corner 🎯
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the professional reviewers whose expertise powers our Critic Scores
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Who Writes the Reviews? 📝</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our Critic Scores are powered by professional book reviewers from major publications 
              who've earned their reputation through years of thoughtful literary analysis. We only 
              aggregate reviews from established publications with editorial standards and experienced 
              book critics.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                <span>Professional Critics Only</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span>Editorial Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Unbiased Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Publications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Publications 📰</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publications.map((pub) => (
              <div key={pub.name} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={pub.logo} 
                    alt={pub.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{pub.name}</h3>
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      {pub.reviewCount} reviews
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 leading-relaxed">{pub.description}</p>
                
                <Button 
                  variant="outline" 
                  className="w-full text-purple-600 border-purple-600 hover:bg-purple-50"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit {pub.website}
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Critics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Critics ✍️</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredCritics.map((critic) => (
              <div key={critic.name} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {critic.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{critic.name}</h3>
                  <p className="text-purple-600 font-medium">{critic.publication}</p>
                </div>
                
                <p className="text-gray-600 mb-4 text-center italic">"{critic.bio}"</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {critic.expertise.map((genre) => (
                        <Badge key={genre} variant="outline" className="text-green-600 border-green-600">
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Recent Reviews:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {critic.recentReviews.slice(0, 3).map((book) => (
                        <li key={book} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                          {book}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Current Critic Picks */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Current Critic Picks 🌟</h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="space-y-6">
              {criticPicks.map((pick) => (
                <div key={pick.id} className="border-l-4 border-blue-500 pl-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{pick.title}</h3>
                      <p className="text-gray-600">by {pick.author}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold border-2 border-emerald-300">
                        {pick.score}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 italic mb-3">"{pick.excerpt}"</p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-semibold">{pick.critic}</span>
                    <span>•</span>
                    <span>{pick.publication}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-3">
                View All Critic Picks →
              </Button>
            </div>
          </div>
        </section>

        {/* How Critics Are Selected */}
        <section>
          <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              How Critics Are Selected 🎖️
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Our Standards:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      Established publication with editorial oversight
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                      Professional literary background
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-pink-600 rounded-full"></span>
                      Consistent review publication history
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
                      Independent from publisher influence
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Why This Matters:</h3>
                  <p className="text-gray-700 leading-relaxed">
                    By carefully curating our critic sources, we ensure that our Critic Scores 
                    reflect informed, professional literary analysis rather than promotional content 
                    or amateur opinion. This gives you confidence that our scores represent genuine 
                    critical consensus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Critics;
