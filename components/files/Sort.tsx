'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { sortTypes } from '@/constants';

export default function Sort() {
  const router = useRouter();
  const path = usePathname();

  const handleSort = (value: string | null) => {
    router.push(`${path}?sort=${value}`);
  };

  return (
    <Select items={sortTypes} defaultValue={sortTypes[0].value} onValueChange={handleSort}>
      <SelectTrigger className="sort-select bg-white w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="sort-select-content">
        <SelectGroup>
          <SelectLabel>Sort by:</SelectLabel>
          {sortTypes.map((sort) => (
            <SelectItem key={sort.label} className="shad-select-item" value={sort.value}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
