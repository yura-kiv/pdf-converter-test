import { openDB } from 'idb';
import { PdfHistoryItem } from '../types/app';
import { DB_NAME, STORE_NAME } from '../utils/constants';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const savePdf = async (item: PdfHistoryItem) => {
  const db = await initDB();
  await db.put(STORE_NAME, item);
};

export const getAllPdfs = async (): Promise<PdfHistoryItem[]> => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deletePdf = async (id: string) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
