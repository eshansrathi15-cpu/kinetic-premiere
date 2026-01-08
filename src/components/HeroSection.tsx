import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [isClapping, setIsClapping] = useState(false);
  const navigate = useNavigate();

  const handleGetTickets = () => {
    setIsClapping(true);
    // 0.8s is the perfect 'Director's Cut' duration for the clap to settle
    setTimeout(() => {
      navigate('/tickets');
    }, 800);
  };

  return (
    /* We add bg-black here to ensure no white 'ghost' frames appear */
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20 spotlight vignette bg-black">
      <AnimatePresence>
        {isClapping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            /* Slower exit duration (0.5s) masks the page-load 'white' gap */
            exit={{ opacity: 0, transition: { duration: 0.5 } }} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black backdrop-blur-xl"
          >
            <div className="relative">
              {/* THE UPPER BAR - Clapping DOWN with spring physics */}
              <motion.div 
                initial={{ rotate: -45, originX: 0, originY: 1 }}
                animate={{ rotate: 0 }} 
                transition={{ 
                  duration: 0.25, 
                  ease: "easeIn",
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                className="absolute -top-12 left-0 w-80 h-12 bg-black border-4 border-white flex overflow-hidden z-20 shadow-2xl"
              >
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-12 h-full bg-white -skew-x-[45deg] ml-4" />
                ))}
              </motion.div>

              {/* THE LOWER BOARD - The static cinematic base */}
              <div className="w-80 h-56 bg-black border-4 border-white p-6 flex flex-col justify-between shadow-[0_0_60px_rgba(147,245,255,0.3)]">
                <div className="flex justify-between font-mono text-white text-[10px] uppercase tracking-widest opacity-80">
                  <span>PROD. E-WEEK</span>
                  <span>SCENE 01</span>
                </div>
                <div className="text-center font-mono">
                  <span className="text-primary font-black text-4xl tracking-tighter block mb-1">TICKETS</span>
                  <span className="text-white/40 text-[8px] uppercase tracking-[0.4em]">Action Sequence</span>
                </div>
                <div className="flex justify-between font-mono text-white text-[10px] uppercase tracking-widest opacity-80">
                  <span>DIR: CEL</span>
                  <span>TAKE 01</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-center max-w-6xl mx-auto">
        <motion.div className="inline-flex items-center gap-2 mb-6 px-4 py-2 border border-primary/50 bg-primary/10">
          <ChevronLeft className="w-4 h-4 text-primary fill-primary" />
          <span className="font-mono text-sm text-primary tracking-widest">CEL Presents</span>
          <ChevronRight className="w-4 h-4 text-primary fill-primary" />
        </motion.div>

        <h1 className="text-[12vw] md:text-[10vw] font-mono font-bold leading-none tracking-tighter text-foreground">
          E-WEEK<br /><span className="text-primary text-shadow-glow">2026</span>
        </h1>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleGetTickets}
            className="text-lg px-8 py-6 bg-primary text-black font-bold tracking-widest uppercase hover:scale-105 transition-transform"
          >
            GET TICKETS
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-6">
            <Play className="w-5 h-5 mr-2" /> WATCH TRAILER
          </Button>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;