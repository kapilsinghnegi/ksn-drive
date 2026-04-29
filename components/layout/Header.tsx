import React from 'react';
import { signOutUser } from '@/lib/actions/user.actions';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import Search from '../files/Search';
import FileUploader from '../files/FileUploader';

export default function Header({ userId, accountId }: { userId: string; accountId: string }) {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            'use server';
            await signOutUser();
          }}
        >
          <Button variant="destructive" type="submit" className="sign-out-button">
            <LogOut className="size-5" />
          </Button>
        </form>
      </div>
    </header>
  );
}
