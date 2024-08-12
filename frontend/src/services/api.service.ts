import axios from '../utils/axios';
import type { IPersonalInfo } from '@/interfaces';

class ApiService {
  async uploadLogo(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('logo', file);
    try {
      const response = await axios.post<{ url: string }>(
        '/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.url;
    } catch (error) {
      console.error('Error uploading logo:', error);
      throw error;
    }
  }

  async generateSignature(
    personalInfo: IPersonalInfo,
    templateName: string
  ): Promise<string> {
    try {
      const response = await axios.post<{ signature: string }>(
        '/api/signatures/generate',
        {
          personalInfo,
          templateName,
        }
      );
      return response.data.signature;
    } catch (error) {
      console.error('Error generating signature:', error);
      throw error;
    }
  }

  async getTemplates(): Promise<string[]> {
    try {
      const response = await axios.get<string[]>('/api/signatures/templates');
      return response.data;
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
