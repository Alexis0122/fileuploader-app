import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('https://mdtx-donut-img-txt-extractor.hf.space/api/mdtx-img-txt-extractor/nationalId/extract', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const useUploadFile = () => {
  return useMutation({ mutationFn: uploadFile });
};