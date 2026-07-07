import { useMutation } from '@tanstack/react-query';

import {
  register,
  RegisterData,
} from './api';

export function useRegister() {
  return useMutation({
    mutationFn: (
      data: RegisterData,
    ) => register(data),
  });
}