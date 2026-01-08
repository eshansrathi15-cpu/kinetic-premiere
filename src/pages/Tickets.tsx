import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Ticket, Star, Zap, Trophy } from "lucide-react";
import WaveformBackground from "@/components/WaveformBackground";
import { Button } from "@/components/ui/button";

const Tickets = () => {
  const events = [
    { id: 1, name: "DEHACK", type: "Hackathon", date: "Feb 11-16", prize: "₹1L+" },
    { id: 2, name: "BEDROCK", type: "Market War", date: "Feb 09-15", prize: "₹50K+" },
    { id: 3, name: "THE AUCTION", type: "Auction Pit", date: "Feb 09", prize: "N/A" },
    { id: 4, name: "PITCH PERFECT", type: "B-Plan", date: "Feb 12", prize: "₹30K+" },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain font-mono">
      <WaveformBackground />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:gap-4 transition-all duration-300 text-sm uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Premiere
          </Link>
        </motion.div>

        <div className="flex items-center gap-4 mb-12">
          <Ticket className="text-primary w-8 h-8" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">EVENT_TICKETS</h1>
        </div>

        <div className="space-y-4">
          {events.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group border border-primary/20 bg-secondary/5 p-8 hover:bg-primary/5 transition-all flex flex-col md:flex-row justify-between items-center gap-6"
            >
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] text-primary tracking-[0.3em] uppercase mb-2">
                  <Star className="w-3 h-3" /> {event.type}
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-2">{event.name}</h3>
                <div className="flex gap-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 uppercase"><Zap className="w-3 h-3" /> {event.date}</span>
                  <span className="flex items-center gap-2 uppercase"><Trophy className="w-3 h-3 text-yellow-500" /> {event.prize}</span>
                </div>
              </div>
              <Button className="w-full md:w-auto bg-primary text-black font-bold uppercase py-8 px-12 tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(147,245,255,0.2)]">
                REGISTER_NOW
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tickets;