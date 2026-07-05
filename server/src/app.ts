import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './modules/auth/auth.routes';
import healthRoutes from './modules/health/health.routes';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middleware/error.middleware';
import { notFoundHandler } from './middleware/notFound.middleware';
import uploadRoutes from './modules/upload/upload.routes';
import aiRoutes from './modules/ai/ai.routes';
import ticketRoutes from './modules/ticket/ticket.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import {
  swaggerUi,
  swaggerDocument,
} from './config/swagger';
import documentRoutes from './modules/documents/document.routes';
import agentRoutes from './modules/agent/agent.routes';
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/tickets',ticketRoutes);
app.use('/api/v1/dashboard',dashboardRoutes);
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);
app.use(
  '/api/v1/documents',
  documentRoutes,
);
app.use(
  '/api/v1/agents',
  agentRoutes,
);
app.use(notFoundHandler);

app.use(errorHandler);

export default app;