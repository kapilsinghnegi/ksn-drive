import { UploadProgress } from 'node-appwrite';
import type { ReactNode } from 'react';

declare interface NavItem {
  name: string;
  icon: ReactNode;
  url: string;
}

declare type FileType = 'document' | 'image' | 'video' | 'audio' | 'other';

declare interface UploadFileProps {
  file: File;
  ownerId: string;
  accountId: string;
  path: string;
}
