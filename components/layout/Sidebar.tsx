'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/constants';
import { cn } from 'cn';

interface Props {
  avatar: string;
  email: string;
  fullName: string;
}

export default function Sidebar({ avatar, email, fullName }: Props) {
  const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="KSN Drive logo"
          width={81}
          height={54}
          className="hidden h-auto lg:block"
          draggable="false"
        />
        <Image
          src="/logo.png"
          alt="KSN Drive logo"
          width={45}
          height={30}
          className="lg:hidden h-auto"
        />
      </Link>
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li className={cn('sidebar-nav-item', pathname === url && 'shad-active')}>
                <div className={cn('nav-icon', pathname === url && 'nav-icon-active')}>{icon}</div>
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <Image src="/assets/files-2.png" alt="files" width={506} height={418} className="w-full" />
      <div className="sidebar-user-info">
        <Image src={avatar} alt="Avatar" width={44} height={44} className="sidebar-user-avatar" />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
}
