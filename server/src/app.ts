import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes";
import healthRoutes from "./modules/health/health.routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import uploadRoutes from "./modules/upload/upload.routes";
import ticketRoutes from "./modules/ticket/ticket.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import { swaggerUi, swaggerDocument } from "./config/swagger";
import documentRoutes from "./modules/documents/document.routes";
import agentRoutes from "./modules/agent/agent.routes";
const app = express();
import analyticsRoutes from "./modules/analytics/analytics.routes";
import notificationRoutes from "./modules/notification/notification.routes";
import chatRoutes from "./modules/chat/chat.routes";
import customerRoutes from './modules/customer/customer.routes';
import profileRoutes from "./modules/profile/profile.routes";
import organizationRoutes from './modules/organization/organization.routes';




const allowedOrigins = [
  'http://localhost:3000',
  process.env.CLIENT_URL,
].filter(
  (origin): origin is string =>
    Boolean(origin),
);

app.use(
  cors({
    origin: (
      origin,
      callback,
    ) => {
      // Allow requests without an Origin header
      // such as Postman and server-to-server requests.
      if (!origin) {
        return callback(
          null,
          true,
        );
      }

      if (
        allowedOrigins.includes(
          origin,
        )
      ) {
        return callback(
          null,
          true,
        );
      }

      return callback(
        new Error(
          'Not allowed by CORS',
        ),
      );
    },

    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/tickets", ticketRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/documents", documentRoutes);
app.use("/api/v1/agents", agentRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use(
  '/api/v1/customers',
  customerRoutes,
);
app.use(
  '/api/v1/profile',
  profileRoutes,
);
app.use(
  '/api/v1/organizations',
  organizationRoutes,
);
app.use(notFoundHandler);

app.use(errorHandler);

export default app;
