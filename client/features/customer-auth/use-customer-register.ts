'use client';

import {
  useMutation,
} from '@tanstack/react-query';

import {
  registerCustomer,
} from './api';

export function useCustomerRegister() {
  return useMutation({
    mutationFn:
      registerCustomer,
  });
}