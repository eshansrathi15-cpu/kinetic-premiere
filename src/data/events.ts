export interface EventTimeline {
  label: string;
  datetime: string;
}

export interface PrizeBreakdown {
  position: string;
  amount: string;
}

export interface EventPrizes {
  total: string;
  breakdown: PrizeBreakdown[];
}

export interface RegistrationStep {
  label: string;
  description?: string;
}

export interface EventRegistration {
  type: 'link' | 'form';
  url?: string;
  steps?: RegistrationStep[];
  deadline?: string;
}

export interface EventContact {
  email: string;
  phone?: string;
  socials?: Record<string, string>;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  category: string;
  rating: string;
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  registration: EventRegistration;
  prizes: EventPrizes;
  rules: string[];
  timeline: EventTimeline[];
  contact: EventContact;
  image?: string;
}

export const events: Event[] = [
  {
    id: '1',
    slug: 'dehack',
    title: 'DEHACK',
    category: 'TECH',
    rating: 'PG',
    shortDescription: 'Build. Break. Innovate. 5 Days of intense hacking.',
    fullDescription: 'DeHack is the flagship hackathon of Kinetic Premiere. It brings together the brightest minds to solve real-world problems through technology. Over 5 days, participants will form teams, conceptualize ideas, and build functional prototypes.',
    highlights: [
      '5 Days long hackathon',
      'Mentorship from industry experts',
      'Free food and swags',
      'Networking opportunities'
    ],
    registration: {
      type: 'link',
      url: 'https://forms.gle/example_dehack',
      deadline: '2026-02-15T23:59:00'
    },
    prizes: {
      total: '₹1,00,000+',
      breakdown: [
        { position: '1st Place', amount: '₹50,000' },
        { position: '2nd Place', amount: '₹30,000' },
        { position: '3rd Place', amount: '₹20,000' },
        { position: 'Best UI/UX', amount: '₹10,000' }
      ]
    },
    rules: [
      'Teams must consist of 2-4 members.',
      'All code must be written during the event.',
      'Use of open-source libraries is allowed.',
      'Plagiarism will lead to immediate disqualification.'
    ],
    timeline: [
      { label: 'Registration Closes', datetime: '2026-02-15 23:59' },
      { label: 'Hackathon Starts', datetime: '2026-02-20 09:00' },
      { label: 'Mentoring Round 1', datetime: '2026-02-21 14:00' },
      { label: 'Hackathon Ends', datetime: '2026-02-25 09:00' },
      { label: 'Winner Announcement', datetime: '2026-02-25 16:00' }
    ],
    contact: {
      email: 'dehack@kinetic.com',
      phone: '+91 98765 43210'
    }
  },
  {
    id: '2',
    slug: 'bedrock',
    title: 'BEDROCK',
    category: 'INNOVATION',
    rating: 'G',
    shortDescription: 'The ultimate entrepreneurship challenge. Pitch your startup.',
    fullDescription: 'Bedrock is designed for aspiring entrepreneurs. Pitch your startup idea to a panel of investors and venture capitalists. Validate your business model and secure funding to kickstart your journey.',
    highlights: [
      'Pitch to real investors',
      'Workshop on business modeling',
      'Incubation opportunities',
      'Seed funding for top teams'
    ],
    registration: {
      type: 'form',
      steps: [
        { label: 'Submit Executive Summary', description: 'Upload a 1-page PDF.' },
        { label: 'Pitch Deck Submission', description: 'Max 10 slides.' },
        { label: 'Final Presentation' }
      ],
      deadline: '2026-02-18T23:59:00'
    },
    prizes: {
      total: '₹2,00,000 (Seed Funding)',
      breakdown: [
        { position: 'Winner', amount: '₹1,00,000 Funding' },
        { position: 'Runner Up', amount: '₹50,000 Funding' },
        { position: 'Best Pitch', amount: '₹25,000 Goods' }
      ]
    },
    rules: [
      'Idea must be original.',
      'Solo founders or teams up to 3 allowed.',
      'Prototype is optional but recommended.',
      'Decision of judges is final.'
    ],
    timeline: [
      { label: 'Abstract Submission', datetime: '2026-02-18 23:59' },
      { label: 'Shortlist Announcement', datetime: '2026-02-20 12:00' },
      { label: 'Final Pitch Day', datetime: '2026-02-24 10:00' }
    ],
    contact: {
      email: 'bedrock@kinetic.com',
      phone: '+91 98765 43211'
    }
  },
  {
    id: '3',
    slug: 'workshop',
    title: 'WORKSHOP',
    category: 'TECH',
    rating: 'PG',
    shortDescription: 'Hands-on sessions with industry experts.',
    fullDescription: 'Learn cutting-edge technologies from experts in the field. Topics range from AI/ML to Blockchain and Cloud Computing.',
    highlights: ['Expert Trainers', 'Certificate of Participation'],
    registration: { type: 'link', url: '#' },
    prizes: { total: 'N/A', breakdown: [] },
    rules: ['Bring your own laptop.'],
    timeline: [],
    contact: { email: 'workshop@kinetic.com' }
  },
  {
    id: '4',
    slug: 'ideathon',
    title: 'IDEATHON',
    category: 'INNOVATION',
    rating: 'G',
    shortDescription: 'Rapid ideation competition.',
    fullDescription: 'Solve surprise problem statements in restricted time.',
    highlights: ['Brainstorming', 'Quick Solutions'],
    registration: { type: 'link', url: '#' },
    prizes: { total: '₹20,000', breakdown: [] },
    rules: [],
    timeline: [],
    contact: { email: 'ideathon@kinetic.com' }
  },
  {
    id: '5',
    slug: 'panel-talk',
    title: 'PANEL TALK',
    category: 'INSIGHTS',
    rating: 'PG',
    shortDescription: 'Leaders share their journey.',
    fullDescription: 'Hear from industry veterans about their experiences and trends in the tech world.',
    highlights: ['Q&A Session'],
    registration: { type: 'link', url: '#' },
    prizes: { total: 'N/A', breakdown: [] },
    rules: [],
    timeline: [],
    contact: { email: 'talks@kinetic.com' }
  },
  {
    id: '6',
    slug: 'startup-expo',
    title: 'STARTUP EXPO',
    category: 'BUSINESS',
    rating: 'G',
    shortDescription: 'Showcase your venture.',
    fullDescription: 'A platform for startups to exhibit their products and services to a wider audience.',
    highlights: ['Stalls', 'Networking'],
    registration: { type: 'link', url: '#' },
    prizes: { total: 'N/A', breakdown: [] },
    rules: [],
    timeline: [],
    contact: { email: 'expo@kinetic.com' }
  }
];
