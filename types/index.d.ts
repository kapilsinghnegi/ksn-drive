import type { ReactNode } from 'react';
import type { Models } from 'node-appwrite';

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

declare interface SearchParamProps {
  params?: Promise<SegmentParams>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

declare interface FileDocument extends Models.Row {
  accountId: string;
  bucketFileId: string;
  extension: string;
  name: string;
  owner: string;
  size: number;
  type: FileType;
  url: string;
  users: string[];
}
