import { PDF_NAME_LENGTH } from '../utils/constants';

export const generatePdfName = (text: string): string => {
  if (text.length <= PDF_NAME_LENGTH) {
    return text;
  }
  return `${text.substring(0, PDF_NAME_LENGTH)}...`;
};
