import { motion } from 'framer-motion';
import { Briefcase, Film, Star, Zap } from 'lucide-react';

const FeatureHighlights = () => {
  const highlights = [
    {
      title: "CAREER FAIR",
      type: "NETWORKING",
      icon: <Briefcase className="w-5 h-5" />,
      description: "Direct access to industry leaders in Pharma and Consulting. Secure your internship premiere with top-tier recruiters.",
      date: "FEB 02"
    },
    {
      title: "MOVIE SCREENING",
      type: "INTERMISSION",
      icon: <Film className="w-5 h-5" />,
      description: "A cinematic break from the hustle. Join the campus community for a curated screening under the stars.",
      date: "FEB 06"
    }
  ];

  return (
    <section className="py-12 relative bg-background font-mono border-y border-primary/10">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Sub-header similar to your Notice Banner in Tickets.tsx */}
        <div className="mb-8 flex items-center gap-2">
           <Star className="w-4 h-4 text-primary fill-primary" />
           <span className="text-xs font-bold tracking-[0.3em] text-primary uppercase">
             Special_Features_v1.0
           </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border border-primary/20 bg-secondary/5 p-6 flex flex-col justify-between hover:bg-primary/10 transition-all border-l-4 border-l-primary/50 hover:border-l-primary"
            >
              <div>
                <div className="flex items-center gap-2 text-[10px] text-primary tracking-widest uppercase mb-3 font-bold">
                  {item.icon} {item.type}
                </div>
                <h3 className="text-2xl font-bold tracking-tighter mb-2 group-hover:text-primary transition-colors uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-[10px] font-bold">
                <span className="flex items-center gap-1 text-primary">
                  <Zap className="w-3 h-3 fill-primary" /> {item.date}
                </span>
                <span className="text-muted-foreground/50">BITS PILANI</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;