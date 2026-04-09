import express, { Application } from "express";
import { getDeveloperCommits } from "./modules/developer/developer.controller";
import { getCommitTrends, getLeaderboard, getMetrics } from "./modules/metrics/metrics.controller";
import { getRecentActivities } from "./modules/github/github.controller";
import { ROUTES } from "./shared/constants/routes.constants";

const app: Application = express();

app.use(express.json());

app.get(ROUTES.GITHUB.SYNC, getDeveloperCommits);
app.get(ROUTES.GITHUB.RECENT, getRecentActivities);
app.get(ROUTES.METRICS.SUMMARY, getMetrics);
app.get(ROUTES.METRICS.TRENDS, getCommitTrends);
app.get(ROUTES.METRICS.LEADERBOARD, getLeaderboard);

export default app;
