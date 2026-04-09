import express, { Application } from "express";
import { getDeveloperCommits, getDevelopers } from "./modules/developer/developer.controller";
import { getCommitTrends, getLeaderboard, getMetrics } from "./modules/metrics/metrics.controller";
import activityRoutes from "./modules/metrics/activity.routes";
import { ROUTES } from "./shared/constants/routes.constants";

const app: Application = express();

app.use(express.json());

// Routes
app.get(ROUTES.GITHUB.SYNC, getDeveloperCommits);
app.get(ROUTES.DEVELOPERS.LIST, getDevelopers);
app.get(ROUTES.METRICS.SUMMARY, getMetrics);
app.get(ROUTES.METRICS.TRENDS, getCommitTrends);
app.get(ROUTES.METRICS.LEADERBOARD, getLeaderboard);

// Feature routes
app.use('/commits', activityRoutes);

export default app;
