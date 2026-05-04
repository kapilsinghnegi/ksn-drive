import type { FileDocument } from '@/types';
import Link from 'next/link';
import Thumbnail from './Thumbnail';
import { convertFileSize, formatDateTime } from '@/lib/utils';
import ActionDropdown from './ActionDropdown';
import Image from 'next/image';

export default async function FileCard({ file }: { file: FileDocument }) {
  return (
    <Link href={file.url} target="_blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="body-2">{convertFileSize(file.size)}</p>
        </div>
      </div>
      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{file.name}</p>
        <p className="body-2 text-light-200">{formatDateTime(file.$createdAt)}</p>
        <p className="caption font-medium flex items-center gap-1 text-light-200 line-clamp-1">
          <Image height={20} width={20} src={file.owner.avatar} alt="Owner Avatar" />
          {file.owner.fullName}
        </p>
      </div>
    </Link>
  );
}
