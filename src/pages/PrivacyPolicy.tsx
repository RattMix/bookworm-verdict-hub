
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
              <strong>Notice:</strong> This privacy policy is compliant with GDPR and CCPA regulations.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">What We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Plot Twist collects minimal data necessary to provide our book review aggregation service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Analytics data (page views, device type, general location)</li>
                <li>Cookies for session management and preferences</li>
                <li>Email addresses if you choose to register for updates</li>
                <li>Review content if you submit reader reviews (coming soon)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">How We Use It</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your data is used solely to improve our service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Analytics help us understand which content is most valuable</li>
                <li>Email addresses are used only for service updates you request</li>
                <li>Session data improves site performance and personalization</li>
                <li>We never sell or share personal data with third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Cookies and Analytics</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use essential cookies and basic analytics:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Essential cookies for site functionality</li>
                <li>Analytics cookies to understand site usage (anonymized)</li>
                <li>No advertising or tracking cookies</li>
                <li>You can control cookie preferences in your browser</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under GDPR and CCPA, you have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access any personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of email communications at any time</li>
                <li>Data portability where technically feasible</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Contact</h2>
              <p className="text-gray-700 leading-relaxed">
                For privacy-related questions or to exercise your rights, contact us at privacy@plottwist.reviews
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
