import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/actions/user.actions';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import MobileNavigation from '@/components/layout/MobileNavigation';
import { Toaster } from '@/components/ui/toast';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect('/sign-in');
  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} ownerId={currentUser.$id} />
        <Header {...currentUser} ownerId={currentUser.$id} />
        <div className="main-content">{children}</div>
      </section>
      <Toaster />
    </main>
  );
}
