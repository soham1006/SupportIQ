import { env } from '../../config/env';

export const getHealthStatus = () => {
  return {
    success: true,
    message: 'SupportIQ API is running',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };
};