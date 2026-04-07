import { eq, sql } from 'drizzle-orm';
import db from '../db/index.js';
import { shortShareUrls } from '../db/schema.js';

const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const selectLetter = (): string => letters.charAt(Math.floor(Math.random() * letters.length));

const generateDistinctCode = async (length: number = 10): Promise<string> => {
  let temp = '';
  while (true) {
    for (let i = 0; i < length; i++) {
      temp += selectLetter();
    }
    const res = await db
      .select({ id: shortShareUrls.id })
      .from(shortShareUrls)
      .where(eq(shortShareUrls.id, temp));
    if (res.length === 0) {
      break;
    }
    temp = '';
  }
  return temp;
};

export type AddShareResult = {
  success: boolean;
  code: string | null;
};

export type ShareLookupResult = {
  found: boolean;
  data: string | null;
};

export const addShareLink = async (encodedData: string): Promise<AddShareResult> => {
  try {
    const code = await generateDistinctCode(10);
    const res = await db.insert(shortShareUrls).values({ id: code, data: encodedData }).returning();
    return { success: true, code: res[0].id };
  } catch (e) {
    console.error(e);
    return { success: false, code: null };
  }
};

export const lookupShareLink = async (
  code: string,
  returnData: boolean = false,
): Promise<ShareLookupResult> => {
  try {
    const res = await db
      .select({ id: shortShareUrls.id, data: shortShareUrls.data })
      .from(shortShareUrls)
      .where(eq(shortShareUrls.id, code));
    if (res.length !== 1) {
      return { found: false, data: null };
    }
    return returnData ? { found: true, data: null } : { found: true, data: res[0].data };
  } catch (e) {
    console.error(e);
    return { found: false, data: null };
  }
};

export const removeExpiredLinks = async (): Promise<boolean> => {
  try {
    // converts into unix timestamps and compares
    await db.delete(shortShareUrls).where(sql`strftime('%s', expires_at) <= strftime('%s', 'now')`);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};
