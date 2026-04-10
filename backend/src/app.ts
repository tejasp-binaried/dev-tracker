import express, { Application } from "express";
import cors from "cors";
import { getDeveloperCommits, getDevelopers } from "./modules/developer/developer.controller";
import { getCommitTrends, getLeaderboard, getMetrics } from "./modules/metrics/metrics.controller";
import activityRoutes from "./modules/metrics/activity.routes";
import { ROUTES } from "./shared/constants/routes.constants";
import { errorHandler } from "./middleware/error.middleware";
import { logger } from "./middleware/logger.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// Routes
app.get(ROUTES.GITHUB.SYNC, getDeveloperCommits);
app.get(ROUTES.DEVELOPERS.LIST, getDevelopers);
app.get(ROUTES.METRICS.SUMMARY, getMetrics);
app.get(ROUTES.METRICS.TRENDS, getCommitTrends);
app.get(ROUTES.METRICS.LEADERBOARD, getLeaderboard);

// Feature routes
app.use('/commits', activityRoutes);

// Error Handling
app.use(errorHandler);

export default app;
