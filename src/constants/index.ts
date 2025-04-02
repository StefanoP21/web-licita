import { Home, Rss } from 'lucide-react';

export const routes = [
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
