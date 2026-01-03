import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/services/api';
import { Event } from '@/data/events';

const EventsGrid = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await api.getEvents();
      setEvents(data);
    };
    loadEvents();
  }, []);

  return (
    <section className="py-24" id="tickets">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Section header with ticket icon */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Ticket className="w-6 h-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-center">
              NOW <span className="text-primary">PLAYING</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-center mb-16 max-w-xl mx-auto font-mono text-sm tracking-wider">
            — SELECT YOUR FEATURE —
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Link to={`/events/${event.slug}`}>
                <div className="border-2 border-foreground p-6 h-56 flex flex-col justify-between transition-all duration-300 cursor-pointer group-hover:bg-primary group-hover:border-primary relative overflow-hidden">
                  {/* Movie rating badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 border border-current flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold group-hover:text-primary-foreground transition-colors">
                      {event.rating}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-primary-foreground/70 transition-colors tracking-widest">
                      {event.category}
                    </span>
                    <h3 className="text-2xl font-mono font-bold mt-2 text-foreground group-hover:text-primary-foreground transition-colors uppercase">
                      {event.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors mb-3 line-clamp-2">
                      {event.shortDescription}
                    </p>
                    {/* Showtime style footer */}
                    <div className="flex items-center gap-2 pt-3 border-t border-border group-hover:border-primary-foreground/30 transition-colors">
                      <span className="text-[10px] font-mono text-muted-foreground group-hover:text-primary-foreground/60 transition-colors">
                        MULTIPLE SHOWTIMES
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsGrid;
