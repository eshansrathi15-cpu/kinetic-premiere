import { motion } from 'framer-motion';
import { ArrowLeft, Users, Calendar } from 'lucide-react';
import celLogo from '@/assets/cel-logo.png';

const AboutEWeek = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced Rocket & Space Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Star Field */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              opacity: 0 
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Floating Rocket Silhouettes */}
        {[
          { top: '10%', right: '10%', rotate: 0, size: 'w-32 h-32', delay: 0 },
          { bottom: '20%', left: '15%', rotate: 45, size: 'w-24 h-24', delay: 2 },
          { top: '40%', left: '5%', rotate: -12, size: 'w-20 h-20', delay: 4 },
          { bottom: '15%', right: '20%', rotate: 90, size: 'w-28 h-28', delay: 1 }
        ].map((rocket, index) => (
          <motion.svg
            key={index}
            className={`absolute ${rocket.size} text-primary/5 ${rocket.rotate !== 0 ? `rotate-${rocket.rotate}` : ''}`}
            viewBox="0 0 40 60"
            fill="currentColor"
            initial={{ y: 0 }}
            animate={{ 
              y: [-20, 20, -20],
              rotate: [rocket.rotate - 5, rocket.rotate + 5, rocket.rotate - 5]
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: rocket.delay
            }}
            style={{ 
              top: rocket.top, 
              right: rocket.right, 
              left: rocket.left, 
              bottom: rocket.bottom 
            }}
          >
            <path d="M20 5 L30 25 L30 45 L25 50 L25 40 L20 45 L15 40 L15 50 L10 45 L10 25 Z" />
          </motion.svg>
        ))}
      </div>

      {/* Navigation Bar */}
      <nav className="border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a 
            href="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm">BACK TO HOME</span>
          </a>
          
          <div className="flex items-center gap-3">
            <img src={celLogo} alt="CEL Logo" className="w-6 h-6" />
            <span className="font-mono text-lg font-bold">E-WEEK 2026</span>
          </div>
          
          <div className="w-32"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xs font-mono text-muted-foreground tracking-widest mb-4">
              — PRODUCTION NOTES —
            </p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              About E-Week
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A CEL Production • February 9-15, 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              A legacy initiative to cultivate an Entrepreneurial spirit through fun events across the campus, and help students learn skills including pitching, negotiating, and generally, just having a lot of fun.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {/* Attendees */}
            <div className="text-center p-8 border border-border rounded-lg bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="text-5xl font-bold mb-2 font-mono">5000+</div>
              <p className="text-muted-foreground font-mono text-sm tracking-wider">ATTENDEES</p>
            </div>

            {/* Days */}
            <div className="text-center p-8 border border-border rounded-lg bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-primary" />
              <div className="text-5xl font-bold mb-2 font-mono">7</div>
              <p className="text-muted-foreground font-mono text-sm tracking-wider">DAYS</p>
            </div>

            {/* Events */}
            <div className="text-center p-8 border border-border rounded-lg bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
              <svg className="w-12 h-12 mx-auto mb-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <div className="text-5xl font-bold mb-2 font-mono">10+</div>
              <p className="text-muted-foreground font-mono text-sm tracking-wider">EVENTS</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="py-20 border-t border-border relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xs font-mono text-muted-foreground tracking-widest mb-4">
              — JOIN US —
            </p>
            <p className="text-muted-foreground mb-8">
              Be part of the premier entrepreneurship festival
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer Credits */}
      <footer className="py-8 border-t border-border/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-mono text-muted-foreground/50 tracking-widest">
            DIRECTED & PRODUCED BY CEL • SCREENPLAY BY THE E-WEEK TEAM
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutEWeek;