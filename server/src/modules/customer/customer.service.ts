import { hashPassword } from '../auth/auth.utils';
import { ApiError } from '../../utils/ApiError';

import { customerRepository } from './customer.repository';

export class CustomerService {
  async getAll(
    organizationId: string,
  ) {
    return customerRepository.findAll(
      organizationId,
    );
  }

  async getById(
    id: string,
    organizationId: string,
  ) {
    return customerRepository.findById(
      id,
      organizationId,
    );
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    organizationId: string;
  }) {
    const existing =
      await customerRepository.findByEmail(
        data.email,
      );

    if (existing) {
      throw new ApiError(
        409,
        'Customer already exists',
      );
    }

    const password =
      await hashPassword(
        data.password,
      );

    return customerRepository.create({
      ...data,
      password,
    });
  }

  async update(
    id: string,
    organizationId: string,
    data: {
      name?: string;
      isActive?: boolean;
    },
  ) {
    const customer =
      await customerRepository.findById(
        id,
        organizationId,
      );

    if (!customer) {
      throw new ApiError(
        404,
        'Customer not found',
      );
    }

    return customerRepository.update(
      id,
      organizationId,
      data,
    );
  }

  async delete(
    id: string,
    organizationId: string,
  ) {
    const customer =
      await customerRepository.findById(
        id,
        organizationId,
      );

    if (!customer) {
      throw new ApiError(
        404,
        'Customer not found',
      );
    }

    return customerRepository.delete(
      id,
      organizationId,
    );
  }
}

export const customerService =
  new CustomerService();