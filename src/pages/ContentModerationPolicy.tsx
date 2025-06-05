
import Navigation from "@/components/Navigation";

const ContentModerationPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-8 font-serif">
            Content Moderation Policy
          </h1>
          
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
            <p className="text-purple-800">
              <strong>Quality Standards:</strong> Plot Twist maintains high content standards for both sourced reviews and future user submissions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Our Sources</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Critic reviews on Plot Twist are sourced from established publications and professional reviewers:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Reviews are never edited or altered from their original form</li>
                <li>All critic content is properly attributed to its source publication</li>
                <li>Sources are selected based on editorial standards and industry reputation</li>
                <li>We aggregate but do not create or modify professional review content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Moderation Standards</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When reader reviews become available, they will be moderated according to these standards:
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Quality Requirements</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Reviews must discuss the book's content, writing, or themes</li>
                    <li>• Minimum character count to ensure substantive feedback</li>
                    <li>• Clear writing that contributes to the conversation</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Focus on Books, Not Authors</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Reviews should address the work itself</li>
                    <li>• Personal attacks on authors are not permitted</li>
                    <li>• Biographical speculation is discouraged</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">What We Don't Allow</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The following content will be removed from reader reviews:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Spam or Promotional Content:</strong> Reviews that promote other products, services, or websites</li>
                <li><strong>Duplicate Submissions:</strong> Multiple reviews of the same book by the same user</li>
                <li><strong>Offensive Language:</strong> Hate speech, harassment, or inappropriate language</li>
                <li><strong>Spoilers Without Warning:</strong> Plot revelations that could diminish others' reading experience</li>
                <li><strong>Off-Topic Content:</strong> Reviews that don't address the book being reviewed</li>
                <li><strong>Fake Reviews:</strong> Reviews by users who haven't read the book or are posting on behalf of others</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Review Removal Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Reviews may be removed for the following reasons:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violation of content standards outlined above</li>
                <li>User request for removal of their own content</li>
                <li>Legal requirements or copyright concerns</li>
                <li>Technical issues or data corruption</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                Users will be notified when possible if their review is removed for policy violations. Repeated violations may result in account restrictions.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentModerationPolicy;
