import axios from 'axios';
import { API_KEY, API_URL } from '../utils/constants';

export const generatePDF = async (text: string): Promise<Blob> => {
  const response = await axios.post(
    `${API_URL}?apiKey=${API_KEY}`,
    { text },
    { responseType: 'blob' }
  );
  return response.data;
};
