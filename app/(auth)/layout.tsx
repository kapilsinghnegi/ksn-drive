import Image from 'next/image';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-200 max-w-107.5 flex-col justify-center space-y-10">
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={125}
              height={84}
              className="h-auto"
              draggable={false}
            />
            <span className="text-4xl font-bold text-white">KSN Drive</span>
          </div>
          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files the best way</h1>
            <p className="body-1">A place to store and share your files with ease.</p>
          </div>
          <div className="flex item-center justify-center">
            <Image
              src="/assets/files.png"
              alt="Files"
              width={200}
              height={200}
              className="transition-all hover:rotate-2 hover:scale-105"
              draggable={false}
            />
          </div>
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden flex items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={90}
            height={60}
            className="h-auto"
            draggable={false}
          />
          <span className="text-2xl sm:text-3xl font-bold">KSN Drive</span>
        </div>
        {children}
      </section>
    </div>
  );
}
