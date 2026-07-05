import { analyticsRepository } from './analytics.repository';

export class AnalyticsService {
  async getOverview(
    organizationId: string,
  ) {
    return analyticsRepository.getOverview(
      organizationId,
    );
  }

  async getTicketStatus(
  organizationId: string,
) {
  return analyticsRepository.getTicketStatus(
    organizationId,
  );
}
async getTicketTrend(
  organizationId: string,
) {
  return analyticsRepository.getTicketTrend(
    organizationId,
  );
}

async getTopAgents(
  organizationId: string,
) {
  return analyticsRepository.getTopAgents(
    organizationId,
  );
}

}

export const analyticsService =
  new AnalyticsService();