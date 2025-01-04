import React, { useState } from 'react';
import { Button, HistoryPanel, PdfViewer, TextArea } from '../components';
import { generatePDF } from '../services/pdfService';
import { usePdfHistory } from '../hooks/usePdfHistory';
import { PdfHistoryItem } from '../types/app';
import clsx from 'clsx';

const Home: React.FC = () => {
  const { history, addPdf, removePdf } = usePdfHistory();
  const [text, setText] = useState<string>('');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSelect = (item: PdfHistoryItem) => {
    setText(item.text);
    setPdfUrl(item.blobUrl);
  };

  const handleConvert = async () => {
    if (!text.trim()) {
      alert('Enter text to convert.');
      return;
    }
    try {
      setIsLoading(true);
      const pdfBlob = await generatePDF(text);
      const newItem = await addPdf(text, pdfBlob);
      setPdfUrl(newItem.blobUrl);
    } catch (error) {
      console.error('PDF conversion error:', error);
      alert('Failed to create PDF. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative w-full h-screen flex bg-slate-50'>
      <HistoryPanel
        history={history}
        onSelect={handleSelect}
        onRemove={removePdf}
      />
      <div className='relative h-full flex-1 p-6 pb-20 border-r items-center border-slate-200'>
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          disabled={text === '' || isLoading}
          className='absolute bottom-6 left-1/2 -translate-x-1/2'
          onClick={handleConvert}
        >
          <span>Convert to PDF</span>
          <span className={clsx(isLoading && 'animate-spin')}>🔄</span>
        </Button>
      </div>
      <div className='relative flex-1 flex-shrink-0 p-6'>
        <PdfViewer pdfUrl={pdfUrl} />
      </div>
    </div>
  );
};

export default Home;
