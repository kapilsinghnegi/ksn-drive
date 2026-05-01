'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Spinner } from '../ui/spinner';
import { MoreVertical } from 'lucide-react';

import { renameFile } from '@/lib/actions/file.actions';
import { constructDownloadUrl } from '@/lib/utils';
import { actionsDropdownItems } from '@/constants';

import type { ActionType, FileDocument } from '@/types';

export default function ActionDropdown({ file }: { file: FileDocument }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);

  const path = usePathname();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setName(file.name);
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);
    const success = false;
    const actions = {
      rename: () => renameFile({ fileId: file.$id, name, extension: file.extension, path }),
      share: () => console.log('share'),
      delete: () => console.log('delete'),
    };
    success: await actions[action.value as keyof typeof actions]();
    if (!success) closeAllModals();
    setIsLoading(false);
  };

  const renderDialogContent = () => {
    if (!action) return null;
    const { value, label } = action;
    return (
      <DialogContent className="shad-dialog button">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center text-light-100">{label}</DialogTitle>
          {value === 'rename' && (
            <Input
              type="text"
              value={name.replace(`.${file.extension}`, '')}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </DialogHeader>
        {['rename', 'delete', 'share'].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button
              variant="destructive"
              className="modal-cancel-button cursor-pointer"
              onClick={closeAllModals}
            >
              Cancel
            </Button>
            <Button onClick={handleAction} className="modal-submit-button cursor-pointer">
              <p className="capitalize">{value}</p>
              {isLoading && <Spinner />}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              className="rounded-full px-2 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <MoreVertical />
            </Button>
          }
        />
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="max-w-50 truncate">{file.name}</DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem);
                if (['rename', 'share', 'delete', 'details'].includes(actionItem.value)) {
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === 'download' ? (
                <Link
                  href={constructDownloadUrl(file.bucketField)}
                  download={file.name}
                  className="flex items-center gap-2"
                >
                  {actionItem.icon}
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  {actionItem.icon}
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
}
