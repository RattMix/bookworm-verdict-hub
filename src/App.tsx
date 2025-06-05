
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BrowseBooks from "./pages/BrowseBooks";
import BookDetail from "./pages/BookDetail";
import HowItWorks from "./pages/HowItWorks";
import WriteReview from "./pages/WriteReview";
import Community from "./pages/Community";
import Critics from "./pages/Critics";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import CookiePreferences from "./pages/CookiePreferences";
import ContentModerationPolicy from "./pages/ContentModerationPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/browse" element={<BrowseBooks />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="/community" element={<Community />} />
          <Route path="/critics" element={<Critics />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/cookies" element={<CookiePreferences />} />
          <Route path="/moderation" element={<ContentModerationPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
