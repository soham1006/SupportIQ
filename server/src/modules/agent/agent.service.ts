import { agentRepository } from './agent.repository';

import { hashPassword } from '../auth/auth.utils';

export class AgentService {
  async getAll(
    organizationId: string,
  ) {
    return agentRepository.findAll(
      organizationId,
    );
  }

  async getById(
    id: string,
    organizationId: string,
  ) {
    return agentRepository.findById(
      id,
      organizationId,
    );
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    skills: string[];
    organizationId: string;
  }) {
    const password =
      await hashPassword(
        data.password,
      );

    return agentRepository.create({
      ...data,
      password,
    });
  }

  async update(
    id: string,
    organizationId: string,
    data: {
      name?: string;
      skills?: string[];
      isActive?: boolean;
    },
  ) {
    return agentRepository.update(
      id,
      organizationId,
      data,
    );
  }

  async delete(
    id: string,
    organizationId: string,
  ) {
    return agentRepository.delete(
      id,
      organizationId,
    );
  }
}

export const agentService =
  new AgentService();