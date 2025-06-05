
import Navigation from "@/components/Navigation";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-8 font-serif">
            Terms of Use
          </h1>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-blue-800">
              <strong>Independent Service:</strong> Plot Twist is an independent book review aggregator with no publisher or retailer affiliations.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Using the Site</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Plot Twist provides book review aggregation services free of charge. By using this site:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You may browse, search, and read aggregated reviews</li>
                <li>You may submit reader reviews when that feature launches</li>
                <li>You agree to use the service lawfully and respectfully</li>
                <li>You understand that critic reviews are third-party content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">User-Generated Content</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                When reader reviews become available:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Reviews must relate to the book content, not personal attacks on authors</li>
                <li>No spam, promotional content, or duplicate submissions</li>
                <li>You retain ownership of your review content</li>
                <li>Plot Twist reserves the right to moderate for quality and compliance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Content attribution and ownership:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Critic reviews are sourced from publications and properly attributed</li>
                <li>Plot Twist's aggregation methodology and site design are proprietary</li>
                <li>Book covers and metadata are used under fair use for review purposes</li>
                <li>User-submitted reviews remain owned by their authors</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Disclaimers</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Plot Twist provides information "as is":
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Reviews reflect the opinions of their respective authors</li>
                <li>Scores are aggregated from available sources and may not be comprehensive</li>
                <li>No guarantee of accuracy or completeness of third-party content</li>
                <li>Not responsible for decisions made based on review information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                Plot Twist reserves the right to suspend access for users who violate these terms or engage in harmful behavior toward the service or other users.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
