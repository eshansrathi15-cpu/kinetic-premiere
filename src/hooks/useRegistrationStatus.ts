import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useRegistrationStatus = () => {
    const { user, isAuthenticated } = useAuth();
    const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const checkStatus = async () => {
        if (!isAuthenticated || !user?.email) {
            setRegisteredEvents([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/check-registration?email=${encodeURIComponent(user.email)}`);
            const data = await response.json();

            if (data.success) {
                setRegisteredEvents(data.registeredEvents);
            } else {
                console.error('Failed to check registration status:', data.error);
            }
        } catch (error) {
            console.error('Error checking registration status:', error);
            // Don't show toast on error to avoid spamming the user on every page load
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkStatus();
    }, [isAuthenticated, user?.email]);

    // Function to manually add an event to the local state (optimistic update)
    const addRegisteredEvent = (sheetName: string) => {
        setRegisteredEvents(prev => [...prev, sheetName]);
    };

    return {
        registeredEvents,
        isLoading,
        checkStatus,
        addRegisteredEvent
    };
};
