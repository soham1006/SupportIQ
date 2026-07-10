import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';

import { changePassword } from './api';

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,

    onSuccess() {
      toast.success(
        'Password updated successfully',
      );
    },

    onError(error: any) {
      toast.error(
        error?.response?.data?.message ??
          'Unable to change password',
      );
    },
  });
}