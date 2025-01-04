import { useEffect, useState, useCallback } from 'react';
import { savePdf, getAllPdfs, deletePdf } from '../services/idbService';
import { PdfHistoryItem } from '../types/app';
import { generatePdfName } from '../helpers/generatePdfName';

const formatAndSortHistory = (pdfs: PdfHistoryItem[]): PdfHistoryItem[] => {
  return pdfs
    .map((item) => ({
      ...item,
      blobUrl: URL.createObjectURL(item.blob),
    }))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

const revokeBlobUrls = (items: PdfHistoryItem[]) => {
  items.forEach((item) => URL.revokeObjectURL(item.blobUrl));
};

export const usePdfHistory = () => {
  const [history, setHistory] = useState<PdfHistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const pdfs = await getAllPdfs();
      const sortedHistory = formatAndSortHistory(pdfs);
      setHistory(sortedHistory);
    };

    fetchHistory();

    return () => {
      revokeBlobUrls(history);
    };
  }, []);

  const addPdf = useCallback(
    async (text: string, blob: Blob): Promise<PdfHistoryItem> => {
      const id = crypto.randomUUID();
      const name = generatePdfName(text);
      const createdAt = new Date().toISOString();

      const newItem: PdfHistoryItem = {
        id,
        name,
        text,
        createdAt,
        blobUrl: URL.createObjectURL(blob),
        blob,
      };

      await savePdf(newItem);

      setHistory((prev) => {
        const updatedHistory = [...prev, newItem];
        return formatAndSortHistory(updatedHistory);
      });

      return newItem;
    },
    []
  );

  const removePdf = useCallback(async (id: string) => {
    await deletePdf(id);

    setHistory((prev) => {
      const updatedHistory = prev.filter((item) => item.id !== id);

      const removedItem = prev.find((item) => item.id === id);
      if (removedItem) {
        URL.revokeObjectURL(removedItem.blobUrl);
      }

      return updatedHistory;
    });
  }, []);

  return { history, addPdf, removePdf };
};
