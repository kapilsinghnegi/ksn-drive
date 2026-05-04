'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SearchIcon } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';

import Thumbnail from './Thumbnail';
import { formatDateTime } from '@/lib/utils';
import type { FileDocument } from '@/types';
import { getFiles } from '@/lib/actions/file.actions';
import { useDebounce } from 'use-debounce';

export default function Search() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState<FileDocument[]>([]);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ''));
      }
      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.rows);
      setOpen(true);
    };
    fetchFiles();
  }, [query]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery('');
    }
  }, [searchQuery]);

  const handleClickItem = (file: FileDocument) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.type === 'video' || file.type === 'audio' ? 'media' : file.type + 's'}?query=${query}`
    );
  };

  return (
    <div className="search">
      <InputGroup className="max-w-md py-1 px-2">
        <InputGroupInput
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">{results?.length} results</InputGroupAddon>
        {open && (
          <ul className="search-result">
            {results?.length > 0 ? (
              results.map((file) => (
                <li
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                  className="flex items-center justify-between"
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100">{file.name}</p>
                  </div>
                  <p className="caption line-clamp-1 text-light-200">
                    {formatDateTime(file.$createdAt)}
                  </p>
                </li>
              ))
            ) : (
              <p className="empty-result">No file found</p>
            )}
          </ul>
        )}
      </InputGroup>
    </div>
  );
}
