import type { NavItem } from '@/types';
import {
  CircleEllipsis,
  Download,
  Files,
  FolderPen,
  Images,
  Info,
  LayoutDashboard,
  Share2,
  SquarePlay,
  Trash2,
} from 'lucide-react';

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

export const actionsDropdownItems = [
  {
    label: 'Rename',
    icon: <FolderPen />,
    value: 'rename',
  },
  {
    label: 'Details',
    icon: <Info />,
    value: 'details',
  },
  {
    label: 'Share',
    icon: <Share2 />,
    value: 'share',
  },
  {
    label: 'Download',
    icon: <Download />,
    value: 'download',
  },
  {
    label: 'Delete',
    icon: <Trash2 />,
    value: 'delete',
  },
];

export const sortTypes = [
  { label: 'Date created (newest)', value: '$createdAt-desc' },
  { label: 'Date created (oldest)', value: '$createdAt-asc' },
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Size (Highest)', value: 'size-desc' },
  { label: 'Size (Lowest)', value: 'size-asc' },
];

export const avatarPlaceholderUrl =
  'https://res.cloudinary.com/ksnproj/image/upload/v1776278233/avatar_inmm7a.jpg';

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
