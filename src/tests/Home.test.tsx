import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { generatePDF } from '../services/pdfService';
import Home from '../pages/Home';

const PDF_ID = '1';
const PDF_NAME = 'Test PDF';
const PDF_TEXT = 'Sample text';
const PDF_CREATED_AT = new Date().toISOString();
const BLOB_URL = 'blob:http://localhost/test';

jest.mock('../services/pdfService', () => ({
  generatePDF: jest.fn(),
}));

jest.mock('../hooks/usePdfHistory', () => {
  let mockHistory: Array<any> = [];

  return {
    usePdfHistory: () => ({
      history: mockHistory,
      addPdf: jest.fn().mockImplementation(async (text, blob) => {
        const newItem = {
          id: PDF_ID,
          name: PDF_NAME,
          text: text,
          createdAt: PDF_CREATED_AT,
          blobUrl: BLOB_URL,
          blob: blob,
        };
        mockHistory = [...mockHistory, newItem];
        return newItem;
      }),
      removePdf: jest.fn().mockImplementation((id) => {
        mockHistory = mockHistory.filter((item) => item.id !== id);
      }),
    }),
  };
});

describe('Home Component', () => {
  test('should convert text to PDF and display it', async () => {
    const mockGeneratePDF = generatePDF as jest.Mock;
    mockGeneratePDF.mockResolvedValue(new Blob());

    render(<Home />);

    const textArea = screen.getByRole('textbox');
    fireEvent.change(textArea, { target: { value: PDF_TEXT } });

    const convertButton = screen.getByRole('button', {
      name: /convert to pdf/i,
    });
    fireEvent.click(convertButton);

    await waitFor(() => {
      const pdfViewer = screen.getByTitle('PDF Viewer');
      expect(pdfViewer).toBeInTheDocument();
      expect(pdfViewer).toHaveAttribute('src', BLOB_URL);
    });
  });

  test('should disable the button if no text is provided', () => {
    render(<Home />);

    const convertButton = screen.getByRole('button', {
      name: /convert to pdf/i,
    });

    expect(convertButton).toBeDisabled();

    const textArea = screen.getByRole('textbox');
    fireEvent.change(textArea, { target: { value: 'PDF_TEXT' } });

    expect(convertButton).not.toBeDisabled();

    fireEvent.change(textArea, { target: { value: '' } });

    expect(convertButton).toBeDisabled();
  });
});
