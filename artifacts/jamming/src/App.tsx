import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { isAuthenticated, handleCallback, redirectToLogin } from "@/lib/spotify";
import { Button } from "@/components/ui/button";
import { SiSpotify } from "react-icons/si";
import { Loader2 } from "lucide-react";
import Home from "@/pages/Home";

const queryClient = new QueryClient();

function AppContent() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    handleCallback();
    setIsAuth(isAuthenticated());
  }, []);

  if (isAuth === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-white">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="z-10 flex flex-col items-center max-w-md text-center p-8 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-8 border border-primary/20">
            <SiSpotify className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-4xl font-black tracking-tight mb-4">Jammming</h1>
          <p className="text-lg text-white/60 mb-10 leading-relaxed">
            Your personal music studio in the browser. Search, curate, and save playlists directly to your Spotify account.
          </p>
          
          <Button 
            onClick={redirectToLogin}
            className="w-full h-14 rounded-full text-base font-bold tracking-wide shadow-[0_0_20px_rgba(32,111,60,0.4)] hover:shadow-[0_0_30px_rgba(32,111,60,0.6)] transition-all bg-primary hover:bg-primary/90"
            size="lg"
          >
            <SiSpotify className="w-5 h-5 mr-3" />
            CONNECT WITH SPOTIFY
          </Button>
        </div>
      </div>
    );
  }

  return <Home />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
