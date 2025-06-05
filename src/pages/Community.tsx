
import { Star, TrendingUp, Award, MessageCircle, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import ReviewCard from "@/components/ReviewCard";

const featuredReviews = [
  {
    id: "1",
    bookTitle: "Klara and the Sun",
    reviewer: "BookishSarah",
    rating: 9,
    excerpt: "Ishiguro has crafted a haunting meditation on love, sacrifice, and what it means to be human. Klara's perspective is both innocent and profound, making us question our own assumptions about consciousness and care.",
    type: "user" as const,
    publication: null,
    helpfulVotes: 127,
    isReviewOfWeek: true
  },
  {
    id: "2",
    bookTitle: "The Atlas Six",
    reviewer: "FantasyFanatic",
    rating: 8,
    excerpt: "Dark academia meets magical realism in this ambitious debut. While the pacing can be uneven, Blake's world-building is spectacular and the character dynamics are deliciously complex.",
    type: "user" as const,
    publication: null,
    helpfulVotes: 89
  }
];

const trendingDiscussions = [
  {
    id: "1",
    bookTitle: "Tomorrow, and Tomorrow, and Tomorrow",
    topic: "Video games as art form",
    replies: 47,
    lastActivity: "2 hours ago"
  },
  {
    id: "2", 
    bookTitle: "Lessons in Chemistry",
    topic: "Historical accuracy vs. feminist themes",
    replies: 32,
    lastActivity: "4 hours ago"
  },
  {
    id: "3",
    bookTitle: "Fourth Wing",
    topic: "Dragon bonding mechanics discussion",
    replies: 156,
    lastActivity: "1 hour ago"
  }
];

const topReviewers = [
  {
    username: "BookwormBeth",
    reviewCount: 247,
    helpfulVotes: 1589,
    badge: "Top Contributor"
  },
  {
    username: "LiteraryLiam", 
    reviewCount: 189,
    helpfulVotes: 1203,
    badge: "Rising Star"
  },
  {
    username: "NovelNina",
    reviewCount: 156,
    helpfulVotes: 987,
    badge: "Genre Expert"
  }
];

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Community Hub 💬
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with fellow book lovers, discover hidden gems, and share your reading journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Review of the Week */}
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-7 w-7 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-800">Review of the Week ⭐</h2>
              </div>
              
              {featuredReviews
                .filter(review => review.isReviewOfWeek)
                .map(review => (
                  <div key={review.id} className="border-l-4 border-yellow-500 pl-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{review.bookTitle}</h3>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating / 2 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold text-gray-800">{review.reviewer}</span>
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          Featured Review
                        </Badge>
                      </div>
                      <p className="text-gray-700 italic text-lg leading-relaxed mb-3">
                        "{review.excerpt}"
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {review.helpfulVotes} found helpful
                        </span>
                        <Button variant="ghost" size="sm" className="text-purple-600">
                          Read Full Review →
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </section>

            {/* Most Helpful Reviews */}
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <ThumbsUp className="h-7 w-7 text-green-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Most Helpful Reviews 👍</h2>
                </div>
                <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                  View All
                </Button>
              </div>
              
              <div className="space-y-6">
                {featuredReviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>

            {/* Trending Discussions */}
            <section className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="h-7 w-7 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Trending Discussions 🔥</h2>
              </div>
              
              <div className="space-y-4">
                {trendingDiscussions.map(discussion => (
                  <div key={discussion.id} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{discussion.topic}</h3>
                        <p className="text-sm text-gray-600 mb-2">in "{discussion.bookTitle}"</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{discussion.replies} replies</span>
                          <span>Last activity {discussion.lastActivity}</span>
                        </div>
                      </div>
                      <TrendingUp className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-6">
                <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                  Join Discussions →
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Top Contributors */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Award className="h-6 w-6 text-purple-600" />
                Top Contributors
              </h3>
              
              <div className="space-y-4">
                {topReviewers.map((reviewer, index) => (
                  <div key={reviewer.username} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{reviewer.username}</div>
                      <div className="text-sm text-gray-600">
                        {reviewer.reviewCount} reviews • {reviewer.helpfulVotes} helpful votes
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {reviewer.badge}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Community Stats 📈</h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">25,847</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-600">89,234</div>
                  <div className="text-sm text-gray-600">Reviews Written</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">342</div>
                  <div className="text-sm text-gray-600">Books Added This Week</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Join the Conversation! 🎉</h3>
              <p className="text-gray-600 mb-4">
                Share your thoughts and connect with fellow book lovers
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Write a Review ✍️
                </Button>
                <Button variant="outline" className="w-full text-purple-600 border-purple-600 hover:bg-purple-50">
                  Browse Discussions 💬
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
