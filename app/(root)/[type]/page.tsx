import FileCard from '@/components/files/FileCard';
import { Card } from '@/components/ui/card';
import { getFiles } from '@/lib/actions/file.actions';
import type { FileDocument, SearchParamProps } from '@/types';
import { Models } from 'node-appwrite';

export default async function FileType({ params }: SearchParamProps) {
  const type = ((await params)?.type as string) || '';
  const files = await getFiles();
  console.log(files.rows[0]);
  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">0MB</span>
          </p>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.rows.map((file: FileDocument) => (
            <FileCard key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
}
