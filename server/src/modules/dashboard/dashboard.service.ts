import { dashboardRepository } from './dashboard.repository';

export class DashboardService {
  async getStats(
    organizationId: string,
  ) {
    return dashboardRepository.getStats(
      organizationId,
    );
  }
  async getAgentWorkload(
  organizationId: string,
) {
  return dashboardRepository.getAgentWorkload(
    organizationId,
  );
}
}

export const dashboardService =
  new DashboardService();