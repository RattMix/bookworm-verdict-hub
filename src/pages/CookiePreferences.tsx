
import Navigation from "@/components/Navigation";

const CookiePreferences = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-800 mb-8 font-serif">
            Cookie Preferences
          </h1>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <p className="text-green-800">
              <strong>Minimal Tracking:</strong> Plot Twist uses only essential cookies and basic analytics.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">What Are Cookies?</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files stored on your device when you visit websites. They help sites remember your preferences and improve your experience.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Plot Twist uses cookies sparingly and only for legitimate purposes that benefit your experience on our site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Why We Use Them</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies for essential site functionality and basic analytics:
              </p>
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Essential Cookies</h4>
                  <p className="text-gray-700 text-sm">Required for basic site functionality, security, and session management. These cannot be disabled.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Analytics Cookies</h4>
                  <p className="text-gray-700 text-sm">Help us understand how visitors use the site to improve performance and content. Data is anonymized.</p>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Preference Cookies</h4>
                  <p className="text-gray-700 text-sm">Remember your settings and preferences for a better experience on future visits.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">How You Can Control Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have several options for managing cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies in their privacy settings</li>
                <li><strong>Selective Blocking:</strong> You can often choose to block third-party cookies while allowing first-party ones</li>
                <li><strong>Plot Twist Settings:</strong> Cookie preference controls will be available in a future site update</li>
                <li><strong>Opt-Out:</strong> You can opt out of analytics tracking through your browser's "Do Not Track" setting</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4 text-sm italic">
                Note: Blocking essential cookies may affect site functionality and your ability to access certain features.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferences;
