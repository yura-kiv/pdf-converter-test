import { generatePDF } from '../services/pdfService';
import axios from 'axios';

var API_KEY = 'mocked-api-key';
var API_URL = 'mocked-api-url';

jest.mock('../utils/constants', () => ({
  API_KEY: 'mocked-api-key',
  API_URL: 'mocked-api-url',
}));

jest.mock('axios');

describe('generatePDF', () => {
  const mockAxiosPost = axios.post as jest.Mock;

  test('should send a POST request to the API and return a Blob', async () => {
    const mockBlob = new Blob(['PDF content'], { type: 'application/pdf' });
    mockAxiosPost.mockResolvedValue({ data: mockBlob });

    const result = await generatePDF('Sample text');

    expect(mockAxiosPost).toHaveBeenCalledWith(
      `${API_URL}?apiKey=${API_KEY}`,
      { text: 'Sample text' },
      { responseType: 'blob' }
    );

    expect(result).toBeInstanceOf(Blob);
    expect(result).toEqual(mockBlob);
  });

  test('should throw an error if the API call fails', async () => {
    mockAxiosPost.mockRejectedValue(new Error('Network Error'));

    await expect(generatePDF('Sample text')).rejects.toThrow('Network Error');

    expect(mockAxiosPost).toHaveBeenCalledWith(
      `${API_URL}?apiKey=${API_KEY}`,
      { text: 'Sample text' },
      { responseType: 'blob' }
    );
  });
});
