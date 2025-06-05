
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
          
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <p className="text-amber-800">
              <strong>Placeholder:</strong> This page contains placeholder content to be replaced with final legal text.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-slate-200 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                [To be completed with terms of service agreement language]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">User Responsibilities</h2>
              <p className="text-gray-700 leading-relaxed">
                [To be completed with user obligations and prohibited activities]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                [To be completed with intellectual property rights and usage permissions]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 font-serif">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                [To be completed with liability limitations and disclaimers]
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
