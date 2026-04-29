'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from 'cn';
import { convertFileToUrl, getFileType } from '@/lib/utils';
import { uploadFile } from '@/lib/actions/file.actions';
import { MAX_FILE_SIZE } from '@/constants';
import { Button } from '../ui/button';
import { toast } from '../ui/toast';
import Thumbnail from './Thumbnail';
import { Trash, Upload } from 'lucide-react';
import { Spinner } from '../ui/spinner';
import Image from 'next/image';
import { BarLoader } from 'react-spinners';

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

export default function FileUploader({ ownerId, accountId, className }: Props) {
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          toast.add({
            type: 'error',
            description: `${file.name} is too large. Max file is ${MAX_FILE_SIZE}MB`,
          });
          return false;
        }
        return true;
      });

      setFiles(validFiles);

      await Promise.all(
        validFiles.map(async (file) => {
          const uploadedFile = await uploadFile({
            file,
            ownerId,
            accountId,
            path,
          });
          if (uploadedFile) {
            setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
          }
        })
      );
    },
    [ownerId, accountId, path]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn('uploader-button', className)}>
        <Upload />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="uploader-preview-list">
          <h4 className="h4 text-light-100">Uploading</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file?.name);
            return (
              <li className="uploader-preview-item" key={`${file?.name}-${index}`}>
                <div className="flex w-full items-center gap-3">
                  <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)} />
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex gap-2 justify-between items-center">
                      <span className="preview-item-name truncate">{file.name}</span>
                      <BarLoader color="#1677FF" className="w-1/2" />
                    </div>
                  </div>
                </div>

                <Button
                  variant="destructive"
                  className="cursor-pointer rounded-lg"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                >
                  <Trash />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
