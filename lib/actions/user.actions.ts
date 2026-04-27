'use server';
import { ID, Query } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { appwriteConfig } from '../appwrite/config';
import { avatarPlaceholderUrl } from '@/constants';
import { parseStringify } from '../utils';

const getUserByEmail = async (email: string) => {
  const { databases } = await createAdminClient();
  const result = await databases.listRows({
    databaseId: appwriteConfig.databaseId,
    tableId: appwriteConfig.usersTableId,
    queries: [Query.equal('email', email)],
  });
  return result.total > 0 ? result.rows[0] : null;
};

const handleError = (err: unknown, message: string) => {
  console.log(err, message);
  throw err;
};

const sendEmailOTP = async ({ email }: { email: string }) => {
  const { account } = await createAdminClient();
  try {
    const session = await account.createEmailToken({ userId: ID.unique(), email });
    return session.userId;
  } catch (err) {
    handleError(err, 'Failed to send email OTP');
  }
};

export const createAccount = async ({ fullName, email }: { fullName: string; email: string }) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP({ email });
  if (!accountId) {
    throw new Error('Failed to send an OTP');
  }
  if (!existingUser) {
    const { databases } = await createAdminClient();
    await databases.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.usersTableId,
      rowId: ID.unique(),
      data: {
        fullName,
        email,
        avatar: avatarPlaceholderUrl,
        accountId,
      },
    });
  }

  return parseStringify({ accountId });
};
