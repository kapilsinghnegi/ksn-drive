import type { NavItem } from '@/types';
import { CircleEllipsis, Files, Images, LayoutDashboard, SquarePlay } from 'lucide-react';

export const navItems: NavItem[] = [
  {
    name: 'Dashboard',
    icon: <LayoutDashboard className="fill-current" />,
    url: '/',
  },
  {
    name: 'Documents',
    icon: <Files />,
    url: '/documents',
  },
  {
    name: 'Images',
    icon: <Images />,
    url: '/images',
  },
  {
    name: 'Media',
    icon: <SquarePlay />,
    url: '/media',
  },
  {
    name: 'Others',
    icon: <CircleEllipsis />,
    url: '/others',
  },
];

export const avatarPlaceholderUrl =
  'https://res.cloudinary.com/ksnproj/image/upload/v1776278233/avatar_inmm7a.jpg';
