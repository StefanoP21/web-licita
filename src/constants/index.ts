import { Home, Rss } from 'lucide-react';

export const items = [
  {
    title: 'Oportunidades',
    url: '/',
    icon: Home,
  },
  {
    title: 'Seguimiento',
    url: '/followed',
    icon: Rss,
  },
] as const;
