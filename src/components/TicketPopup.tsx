import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import { Loader2, Check } from 'lucide-react';

interface TicketPopupProps {
    isOpen: boolean;
    onClose: () => void;
    event: {
        name: string;
        desc: string;
    } | null;
}

const TicketPopup = ({ isOpen, onClose, event }: TicketPopupProps) => {
    const { user, login: contextLogin } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsRegistered(false); // Reset on open
        } else {
            document.body.style.overflow = 'unset';
            setIsRegistering(false);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    // Google Login flow
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                }).then(res => res.json());

                // Update context/local storage
                const credential = {
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture,
                    // Mocking jwt structure if needed by context or just passing raw user data if context adapted
                    // But context expects a JWT string usually or we trigger login with it.
                    // Actually contextLogin takes a "credential" string (JWT).
                    // We might need to manually set the user in context if we don't get a JWT from this flow.
                    // Looking at GoogleLoginBtn.tsx, it manually sets localStorage and reloads.
                    // We will do the same for consistency.
                };
                
                 localStorage.setItem('user', JSON.stringify(credential));
                 window.location.reload(); // Simple reload to pick up auth state
            } catch (error) {
                console.error("Login Failed", error);
                toast.error("Login failed. Please try again.");
            }
        },
        onError: () => toast.error("Google Login failed."),
    });

    const handleRegister = async () => {
        if (!user) {
            googleLogin();
            return;
        }

        setIsRegistering(true);
        try {
            // Map event name to sheet name format if needed
            // Currently assuming event.name maps closely, but might need normalization
            // Example: "WING TRADE" -> "WING_TRADE"
            const sheetName = event?.name.replace(/ /g, '_').toUpperCase() || 'UNKNOWN_EVENT';

            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sheet_name: sheetName,
                    row_data: [
                        user.name,
                        user.email,
                        new Date().toISOString(), // Timestamp
                        // Add other fields if required by the sheet structure
                    ]
                })
            });

            if (!response.ok) throw new Error('Registration failed');

            setIsRegistered(true);
            toast.success(`Successfully registered for ${event?.name}!`);
        } catch (error) {
            console.error(error);
            toast.error("Registration failed. Please try again.");
        } finally {
            setIsRegistering(false);
        }
    };

    if (!isOpen || !event) return null;

    return (
        <>
            <div id="popup-overlay" onClick={onClose}></div>
            <div id="movie-ticket-popup">
                <div className="ticket-body">
                    <div className="ticket-header">
                        <span className="ticket-admit">ADMIT ONE</span>
                        <button id="ticket-close-btn" onClick={onClose}>×</button>
                    </div>
                    <h2 id="ticket-title">{event.name}</h2>
                    <p id="ticket-desc">{event.desc}</p>
                    <div className="ticket-meta">
                        <span className="meta-tag text-xs font-mono text-cyan-400 border border-cyan-400 px-2 py-0.5 mt-2 inline-block">NOW PLAYING</span>
                    </div>
                </div>
                <div className="ticket-rip-line"></div>
                <div className="ticket-stub">
                    <button 
                        className={`register-btn flex items-center justify-center gap-2 ${isRegistered ? 'bg-transparent text-cyan-400 border-cyan-400' : ''}`}
                        onClick={handleRegister}
                        disabled={isRegistering || isRegistered}
                    >
                        {isRegistering ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : isRegistered ? (
                            <>
                                <span>REGISTERED</span>
                                <Check className="w-4 h-4" />
                            </>
                        ) : (
                            user ? "REGISTER" : "LOGIN TO REGISTER"
                        )}
                    </button>
                    <span className="mobile-swipe-hint text-xs text-gray-500 mt-2">Swipe down to close</span>
                </div>
            </div>
        </>
    );
};

export default TicketPopup;
