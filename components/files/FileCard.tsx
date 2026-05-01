import type { FileDocument } from '@/types';
import Link from 'next/link';
import Thumbnail from './Thumbnail';
import { convertFileSize, formatDateTime } from '@/lib/utils';
import ActionDropdown from './ActionDropdown';
import Image from 'next/image';

export default async function FileCard({ file }: { file: FileDocument }) {
  const { $id: id, extension, type, url, name, $createdAt: createdAt, owner } = file;
  return (
    <Link href={url} target="_blank" className="file-card">
      <div className="flex justify-between">
        <Thumbnail
          type={type}
          extension={extension}
          url={url}
          className="!size-20"
          imageClassName="!size-11"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="body-2">{convertFileSize(file.size)}</p>
        </div>
      </div>
      <div className="file-card-details">
        <p className="subtitle-2 line-clamp-1">{name}</p>
        <p className="body-2 text-light-200">{formatDateTime(createdAt)}</p>
        <p className="caption font-medium flex items-center gap-1 text-light-200 line-clamp-1">
          <Image height={20} width={20} src={owner.avatar} alt="Owner Avatar" />
          {owner.fullName}
        </p>
      </div>
    </Link>
  );
}
