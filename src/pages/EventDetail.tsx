import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '@/services/api';
import { Event } from '@/data/events';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaveformBackground from '@/components/WaveformBackground';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Trophy, Clock, User, CheckCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const EventDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!slug) return;
            setLoading(true);
            const data = await api.getEventBySlug(slug);
            setEvent(data || null);
            setLoading(false);
        };
        fetchEvent();
    }, [slug]);

    const handleRegister = async () => {
        if (!slug) return;
        toast.info('Processing registration...');
        const res = await api.registerForEvent(slug, { timestamp: new Date() });
        if (res.success) {
            toast.success(res.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center font-mono">
                LOADING...
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-mono gap-4">
                <h1 className="text-4xl text-primary">EVENT NOT FOUND</h1>
                <Link to="/">
                    <Button variant="outline">RETURN HOME</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden film-grain">
            <WaveformBackground />

            <div className="relative z-10">
                <Navbar />

                <div className="max-w-7xl mx-auto px-6 py-32">
                    {/* Back Button */}
                    <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors font-mono text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        BACK TO LIST
                    </Link>

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 text-xs font-mono tracking-widest">
                                {event.category}
                            </span>
                            <span className="border border-foreground px-2 py-0.5 text-xs font-bold">
                                {event.rating}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-mono font-bold text-foreground mb-6 uppercase">
                            {event.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-sans max-w-3xl">
                            {event.fullDescription}
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">

                            {/* Highlights */}
                            <section>
                                <h2 className="text-2xl font-mono font-bold text-primary mb-6 flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6" /> HIGHLIGHTS
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {event.highlights.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 border border-border bg-card/30">
                                            <div className="w-2 h-2 bg-primary transform rotate-45" />
                                            <span className="font-mono text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Rules */}
                            <section>
                                <h2 className="text-2xl font-mono font-bold text-primary mb-6 flex items-center gap-2">
                                    <FileTextIcon className="w-6 h-6" /> RULES
                                </h2>
                                <ul className="space-y-4">
                                    {event.rules.map((rule, i) => (
                                        <li key={i} className="flex gap-4 text-muted-foreground">
                                            <span className="font-mono text-primary">0{i + 1}.</span>
                                            {rule}
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Timeline */}
                            {event.timeline.length > 0 && (
                                <section>
                                    <h2 className="text-2xl font-mono font-bold text-primary mb-6 flex items-center gap-2">
                                        <Clock className="w-6 h-6" /> SCHEDULE
                                    </h2>
                                    <div className="border-l-2 border-primary/30 ml-3 space-y-8 pl-8 py-2">
                                        {event.timeline.map((item, i) => (
                                            <div key={i} className="relative">
                                                <div className="absolute -left-[39px] top-1 w-4 h-4 bg-background border-2 border-primary rounded-full" />
                                                <div className="font-mono text-sm text-primary mb-1">
                                                    {new Date(item.datetime).toLocaleString()}
                                                </div>
                                                <div className="text-lg font-bold">{item.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">

                            {/* Registration Card */}
                            <div className="p-6 border-2 border-primary bg-primary/5">
                                <h3 className="text-xl font-mono font-bold mb-6 text-center">
                                    REGISTRATION
                                </h3>
                                {event.registration.steps && (
                                    <div className="space-y-4 mb-8">
                                        {event.registration.steps.map((step, i) => (
                                            <div key={i} className="flex gap-3 text-sm">
                                                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs shrink-0">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <div className="font-bold">{step.label}</div>
                                                    {step.description && <div className="text-muted-foreground text-xs">{step.description}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {event.registration.type === 'link' ? (
                                    <Button className="w-full text-lg h-12" asChild>
                                        <a href={event.registration.url} target="_blank" rel="noreferrer">
                                            REGISTER NOW
                                        </a>
                                    </Button>
                                ) : (
                                    <Button className="w-full text-lg h-12" onClick={handleRegister}>
                                        APPLY NOW
                                    </Button>
                                )}
                                {event.registration.deadline && (
                                    <div className="text-center mt-4 text-xs font-mono text-muted-foreground">
                                        DEADLINE: {new Date(event.registration.deadline).toLocaleDateString()}
                                    </div>
                                )}
                            </div>

                            {/* Prizes */}
                            <div className="p-6 border border-border bg-card">
                                <div className="flex items-center gap-2 mb-6">
                                    <Trophy className="w-5 h-5 text-primary" />
                                    <h3 className="font-mono font-bold">PRIZE POOL</h3>
                                </div>
                                <div className="text-3xl font-bold text-primary mb-6 text-center">
                                    {event.prizes.total}
                                </div>
                                <div className="space-y-3">
                                    {event.prizes.breakdown.map((prize, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm border-b border-border/50 pb-2">
                                            <span className="text-muted-foreground">{prize.position}</span>
                                            <span className="font-mono font-bold">{prize.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="p-6 border border-border bg-card">
                                <h3 className="font-mono font-bold mb-4">CONTACT</h3>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        <a href={`mailto:${event.contact.email}`} className="hover:text-primary transition-colors">
                                            {event.contact.email}
                                        </a>
                                    </div>
                                    {event.contact.phone && (
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono">PH:</span>
                                            <span>{event.contact.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

// Helper icon
const FileTextIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
);

export default EventDetail;
