import { Event, events } from '@/data/events';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
    getEvents: async (): Promise<Event[]> => {
        await delay(300); // Simulate network latency
        return events;
    },

    getEventBySlug: async (slug: string): Promise<Event | undefined> => {
        await delay(300);
        return events.find(e => e.slug === slug);
    },

    registerForEvent: async (slug: string, data: any): Promise<{ success: boolean; message: string }> => {
        await delay(800);
        console.log(`Registered for ${slug}:`, data);
        return { success: true, message: 'Registration successful!' };
    }
};
