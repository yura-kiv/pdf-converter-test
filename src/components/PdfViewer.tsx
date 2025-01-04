import React from 'react';

interface PdfViewerProps {
  pdfUrl: string | null;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  if (!pdfUrl) {
    return (
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-gray-500'>
        Select PDF to view 🤖
      </div>
    );
  }

  return (
    <div className='w-full h-full border border-gray-300 rounded shadow'>
      <iframe
        src={pdfUrl}
        title='PDF Viewer'
        className='w-full h-full'
      />
    </div>
  );
};

export default PdfViewer;
