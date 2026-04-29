'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from 'cn';
import FileUploader from '../files/FileUploader';
import { signOutUser } from '@/lib/actions/user.actions';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { navItems } from '@/constants';
import { LogOut, Menu } from 'lucide-react';

interface Props {
  ownerId: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

export default function MobileNavigation({ ownerId, accountId, fullName, avatar, email }: Props) {
  const pathname = usePathname();
  return (
    <header className="mobile-header">
      <Image src="/logo.png" width={66} height={44} className="h-auto" alt="KSN Drive logo" />
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="ghost">
              <Menu className="size-6" />
            </Button>
          }
        />
        <SheetContent className="shad-sheet h-screen px-3 overflow-y-auto">
          <SheetTitle className="my-4 border-b-2 border-light-300/40">
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={36}
                height={36}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li className={cn('mobile-nav-item', pathname === url && 'shad-active')}>
                    {icon}
                    <p className="text-base">{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>

          <Separator className="my-5 bg-light-200/20" />

          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} className="w-full" />
            <Button
              variant="destructive"
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <LogOut />
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
