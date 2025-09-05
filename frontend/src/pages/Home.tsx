import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { Footer } from '../components/Footer';

export function Home() {
  const { prompt, setPrompt } = useAppContext();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-slate-900 to-black min-h-screen relative flex flex-col">
      {/* Planet/Earth background effect */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-[300%] h-[300%] bg-gradient-to-t from-blue-900/20 via-blue-800/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 w-[200%] h-[200%] bg-gradient-to-t from-blue-600/30 via-blue-500/15 to-transparent rounded-full blur-2xl pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4 w-[150%] h-[150%] bg-gradient-to-t from-blue-400/25 via-blue-300/10 to-transparent rounded-full blur-xl pointer-events-none"></div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/6 w-full h-full bg-gradient-to-t from-blue-500/15 via-transparent to-transparent rounded-full pointer-events-none"></div>

      <Navbar scrollY={scrollY} />
      <main className="flex-1 relative z-10">
        <HeroSection prompt={prompt} setPrompt={setPrompt} />
      </main>
      <Footer />
    </div>
  );
}
