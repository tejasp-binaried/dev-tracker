import express, { Application } from "express";
import { getDeveloperCommits } from "./modules/developer/developer.controller";
import { getCommitTrends, getMetrics } from "./modules/metrics/metrics.controller";


const app: Application = express();

app.use(express.json());

app.get("/developers/commits", getDeveloperCommits);
app.get("/metrics/summary", getMetrics);
app.get('/metrics/trends', getCommitTrends);

export default app;
