import Navbar from "@/components/Navbar";
import EventsGrid from "@/components/EventsGrid";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import WaveformBackground from "@/components/WaveformBackground";

const Tickets = () => {
  // Optional: auto-scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain font-mono">
      <WaveformBackground />
      <Navbar />

      <div className="pt-24 min-h-screen">
        <EventsGrid />
      </div>
    </div>
  );
};

export default Tickets;
