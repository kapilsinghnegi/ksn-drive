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

declare interface User extends Models.User {
  fullName: string;
  avatar: string;
}

declare interface FileDocument extends Models.Row {
  accountId: string;
  bucketField: string;
  extension: string;
  name: string;
  owner: User;
  size: number;
  type: FileType;
  url: string;
  users: string[];
}

declare interface ActionType {
  label: string;
  icon: ReactNode;
  value: string;
}

declare interface RenameFileProps {
  fileId: string;
  name: string;
  extension: string;
  path: string;
}

declare interface UpdateFileUsersProps {
  fileId: string;
  emails: string[];
  path: string;
}

declare interface DeleteFileProps {
  fileId: string;
  bucketFileId: string;
  path: string;
}

declare interface GetFilesProps {
  types: FileType[];
  searchText?: string;
  sort?: string;
  limit?: number;
}
