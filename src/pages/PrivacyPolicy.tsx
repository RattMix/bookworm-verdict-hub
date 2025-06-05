
import Navigation from "@/components/Navigation";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-8 font-serif">
            Privacy Policy
          </h1>
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <p className="text-amber-800">
              <strong>Placeholder:</strong> This page contains placeholder content to be replaced with final legal text.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed">
                [To be completed with GDPR/CCPA compliant language about data collection practices]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed">
                [To be completed with details about data usage and processing]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed">
                [To be completed with user rights under GDPR, CCPA, and other applicable regulations]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                [Contact information for privacy-related inquiries]
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
