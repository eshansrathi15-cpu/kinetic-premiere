import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export interface EventConfig {
    minMembers?: number;
    maxMembers?: number;
    extraFields?: {
        key: string;
        label: string;
        type: "text" | "tel" | "number";
        placeholder?: string;
        required?: boolean;
    }[];
}

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    eventName: string;
    isTeamEvent?: boolean;
    title?: string;
    subtitle?: string;
    config?: EventConfig;
}

const RegistrationModal = ({
    isOpen,
    onClose,
    eventName,
    isTeamEvent = false,
    title = "EVENT REGISTRATION",
    subtitle = "SECURE_FORM_v2.1",
    config
}: RegistrationModalProps) => {
    const { user, login } = useAuth();

    // Common State
    const [extraData, setExtraData] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Team Event State
    const [teamName, setTeamName] = useState("");
    const [captainName, setCaptainName] = useState("");
    const [captainId, setCaptainId] = useState("");
    const [captainPhone, setCaptainPhone] = useState("");
    const [numMembers, setNumMembers] = useState("");
    const [teamMembers, setTeamMembers] = useState<{ name: string, id: string }[]>([]);

    useEffect(() => {
        if (user) {
            setCaptainName(user.name);
        }
    }, [user]);

    const handleNumMembersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setNumMembers(val);
        const num = parseInt(val);

        if (!isNaN(num) && num > 0) {
            // Validate Max Members if config exists
            if (config?.maxMembers && num > config.maxMembers) {
                // Don't auto-truncate input, but we will duplicate logic below to only generate valid # of inputs?
                // For now, let's just generate inputs and rely on browser validation or submit check.
            }

            // If number of members (including captain) is X, we need X-1 extra fields
            const additionalMembers = Math.max(0, num - 1);

            setTeamMembers(prev => {
                const newArr = [...prev];
                if (additionalMembers > prev.length) {
                    for (let i = prev.length; i < additionalMembers; i++) {
                        newArr.push({ name: "", id: "" });
                    }
                } else {
                    newArr.splice(additionalMembers);
                }
                return newArr;
            });
        } else {
            setTeamMembers([]);
        }
    };

    const handleMemberChange = (index: number, field: 'name' | 'id', value: string) => {
        const updated = [...teamMembers];
        updated[index] = { ...updated[index], [field]: value };
        setTeamMembers(updated);
    };

    const handleExtraFieldChange = (key: string, value: string) => {
        setExtraData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        if (!user) {
            login();
            return;
        }

        // Basic Validation
        if (isTeamEvent) {
            if (!teamName) return alert("Team Name is required");
            if (!captainPhone) return alert("Captain Phone is required");
            const count = parseInt(numMembers);
            if (config?.minMembers && count < config.minMembers) return alert(`Min team size is ${config.minMembers}`);
            if (config?.maxMembers && count > config.maxMembers) return alert(`Max team size is ${config.maxMembers}`);
        }

        if (config?.extraFields) {
            for (const field of config.extraFields) {
                if (field.required && !extraData[field.key]) {
                    return alert(`${field.label} is required`);
                }
            }
        }

        setIsSubmitting(true);

        const registrationData = isTeamEvent ? {
            teamName,
            captain: { name: captainName, id: captainId, phone: captainPhone, ...extraData }, // Spread extra data into captain/root object
            numMembers,
            members: teamMembers,
            ...extraData
        } : {
            interested: true,
            timestamp: new Date().toISOString(),
            ...extraData // Include extra fields like phone, college, itemDesc
        };

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventName: eventName.replace(/\s+/g, '_').toUpperCase(),
                    user: { name: user.name, email: user.email },
                    registrationData
                })
            });
            if (res.ok) {
                alert('Registration Successful!');
                onClose();
            } else {
                const d = await res.json();
                alert(`Failed: ${d.message}`);
            }
        } catch (e) {
            console.error(e);
            alert('Error submitting registration.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-2 border-primary/30 p-8 film-grain"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-primary hover:text-foreground transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-8">
                            <h2 className="text-3xl font-bold uppercase tracking-tighter text-primary mb-2">
                                {title}
                            </h2>
                            <p className="text-xs text-muted-foreground uppercase tracking-widest">
                                {subtitle}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* EXTRA FIELDS (Rendered at top for Individuals, mixed for teams commonly, but let's put generic extra fields first or last? 
                                User Requirement for WOLF: Phone, College. 
                                For Team events: usually standard fields + maybe validation.
                                Let's render Extra Fields FIRST if it is NOT a team event, or AFTER basic details if it IS a team event?
                                Actually, strict requirement: "Auto-populate user email/name... Include event-specific fields"
                                Simple Approach: Render Extra Fields before the Submit button.
                            */}

                            {isTeamEvent ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-bold uppercase tracking-wider text-primary mb-2">
                                            1. Team Name
                                        </label>
                                        <input
                                            type="text"
                                            value={teamName}
                                            onChange={(e) => setTeamName(e.target.value)}
                                            className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                            placeholder="Enter team name..."
                                        />
                                    </div>

                                    <div className="border-l-2 border-primary/30 pl-6 space-y-4">
                                        <p className="text-xs text-primary uppercase tracking-widest font-bold">CAPTAIN DETAILS</p>
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                                Captain Name
                                            </label>
                                            <input
                                                type="text"
                                                value={captainName}
                                                // Read-only generally if from Auth, but editable if user wants? Requirement says "Auto-populate... read-only fields"
                                                readOnly={!!user}
                                                onChange={(e) => setCaptainName(e.target.value)}
                                                className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground/50 focus:border-primary focus:outline-none transition-colors font-mono cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                                BITS ID (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                value={captainId}
                                                onChange={(e) => setCaptainId(e.target.value)}
                                                className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                                placeholder="Enter ID..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={captainPhone}
                                                onChange={(e) => setCaptainPhone(e.target.value)}
                                                className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                                placeholder="Enter phone..."
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold uppercase tracking-wider text-primary mb-2">
                                            Number of Team Members (Incl. Captain)
                                        </label>
                                        <input
                                            type="number"
                                            min={config?.minMembers || 1}
                                            max={config?.maxMembers}
                                            value={numMembers}
                                            onChange={handleNumMembersChange}
                                            className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                            placeholder={`Between ${config?.minMembers || 1} - ${config?.maxMembers || 'Any'}`}
                                        />
                                    </div>

                                    {teamMembers.map((member, index) => (
                                        <div key={index} className="border-l-2 border-primary/30 pl-6 space-y-4">
                                            <p className="text-xs text-primary uppercase tracking-widest font-bold">
                                                MEMBER {index + 2}
                                            </p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    value={member.name}
                                                    onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                                                    className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono text-sm"
                                                    placeholder="Name"
                                                />
                                                <input
                                                    type="text"
                                                    value={member.id}
                                                    onChange={(e) => handleMemberChange(index, 'id', e.target.value)}
                                                    className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono text-sm"
                                                    placeholder="ID (Optional)"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="space-y-4">
                                    <div className="border-l-2 border-primary/30 pl-6 space-y-4 mb-6">
                                        <p className="text-xs text-primary uppercase tracking-widest font-bold">YOUR DETAILS</p>
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                value={user?.name || ""}
                                                readOnly
                                                className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground/50 font-mono cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                value={user?.email || ""}
                                                readOnly
                                                className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground/50 font-mono cursor-not-allowed"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* DYNAMIC EXTRA FIELDS */}
                            {config?.extraFields?.map((field) => (
                                <div key={field.key}>
                                    <label className="block text-sm font-bold uppercase tracking-wider text-primary mb-2">
                                        {field.label} {field.required && '*'}
                                    </label>
                                    <input
                                        type={field.type}
                                        value={extraData[field.key] || ""}
                                        onChange={(e) => handleExtraFieldChange(field.key, e.target.value)}
                                        className="w-full bg-black/40 border border-primary/30 px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors font-mono"
                                        placeholder={field.placeholder || `Enter ${field.label}...`}
                                    />
                                </div>
                            ))}

                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full bg-primary text-black font-bold uppercase py-6 mt-8 tracking-widest hover:bg-primary/80 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? "PROCESSING..." : "CONFIRM REGISTRATION"}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RegistrationModal;
