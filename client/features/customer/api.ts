import { api } from '@/lib/api';

import {
  CreateCustomerInput,
  UpdateCustomerInput,
} from './customer.types';

export async function getCustomers() {
  const response =
    await api.get('/customers');

  return response.data;
}

export async function getCustomer(
  id: string,
) {
  const response =
    await api.get(
      `/customers/${id}`,
    );

  return response.data;
}

export async function createCustomer(
  data: CreateCustomerInput,
) {
  const response =
    await api.post(
      '/customers',
      data,
    );

  return response.data;
}

export async function updateCustomer(
  id: string,
  data: UpdateCustomerInput,
) {
  const response =
    await api.patch(
      `/customers/${id}`,
      data,
    );

  return response.data;
}

export async function deleteCustomer(
  id: string,
) {
  const response =
    await api.delete(
      `/customers/${id}`,
    );

  return response.data;
}