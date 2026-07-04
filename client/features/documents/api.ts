import {api} from '@/lib/api';

export async function getDocuments() {
  const { data } =
    await api.get('/documents');

  return data;
}

export async function getDocument(
  id: string,
) {
  const { data } =
    await api.get(
      `/documents/${id}`,
    );

  return data;
}

export async function deleteDocument(
  id: string,
) {
  const { data } =
    await api.delete(
      `/documents/${id}`,
    );

  return data;
}
export async function uploadDocument(
  file: File,
) {
  const formData =
    new FormData();

  formData.append(
    'document',
    file,
);

  const { data } =
    await api.post(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data',
        },
      },
    );

  return data;
}