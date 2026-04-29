'use server';

import { revalidatePath } from 'next/cache';
import { ID } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { constructFileUrl, getFileType, parseStringify } from '../utils';

import type { UploadFileProps } from '@/types';
import { InputFile } from 'node-appwrite/file';

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const uploadFile = async ({ file, ownerId, accountId, path }: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();

  try {
    const inputFile = InputFile.fromBuffer(file, file.name);
    const bucketFile = await storage.createFile({
      bucketId: appwriteConfig.bucketId,
      fileId: ID.unique(),
      file: inputFile,
    });
    const fileDocument = {
      type: getFileType(bucketFile.name).type,
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      extension: getFileType(bucketFile.name).extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId,
      users: [],
      bucketField: bucketFile.$id,
    };

    const newFile = await databases
      .createRow({
        databaseId: appwriteConfig.databaseId,
        tableId: appwriteConfig.filesTableId,
        rowId: ID.unique(),
        data: fileDocument,
      })
      .catch(async (error: unknown) => {
        await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        handleError(error, 'Failed to create file document');
      });

    revalidatePath(path);
    return parseStringify(newFile);
  } catch (error) {
    handleError(error, 'Failed to upload file');
  }
};
