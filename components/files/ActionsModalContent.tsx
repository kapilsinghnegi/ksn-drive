import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { CircleX } from 'lucide-react';

import Thumbnail from './Thumbnail';
import { convertFileSize, formatDateTime } from '@/lib/utils';

import type { FileDocument } from '@/types';

const ImageThumbnail = ({ file }: { file: FileDocument }) => {
  return (
    <div className="file-details-thumbnail">
      <Thumbnail type={file.type} extension={file.extension} url={file.url} />
      <div className="flex flex-col">
        <p className="subtitle-2 mb-1">{file.name}</p>
        <p className="caption text-light-200">{formatDateTime(file.$createdAt)}</p>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex">
      <p className="file-details-label">{label}</p>
      <p className="file-details-value">{value}</p>
    </div>
  );
};

export const FileDetails = ({ file }: { file: FileDocument }) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-3 px-2 pt-2">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={file.owner.fullName} />
        <DetailRow label="Last edited on:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

interface ShareInputProps {
  file: FileDocument;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: ShareInputProps) => {
  return (
    <>
      <ImageThumbnail file={file} />
      <div className="share-wrapper">
        <p className="subtitle-2 pl-1 text-light-100">Share file with other users</p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(','))}
          className="share-input-field"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="subtitle-2 text-light-100">Shared with</p>
            <p className="subtitle-2 text-light-200">{file.users.length} users</p>
          </div>
          <ul className="pt-2">
            {file.users.map((email) => (
              <li key={email} className="flex items-center justify-between gap-2">
                <p className="subtitle-2">{email}</p>
                <Button
                  variant="destructive"
                  className="share-remove-user p-1 h-auto"
                  onClick={() => onRemove(email)}
                >
                  <CircleX />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
