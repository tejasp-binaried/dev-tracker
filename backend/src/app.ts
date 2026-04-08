import express, { Application } from "express";
import { getDeveloperCommits } from "./modules/developer/developer.controller";
import { getMetrics } from "./modules/metrics/metrics.controller";

const app: Application = express();

app.use(express.json());

app.get("/developers/commits", getDeveloperCommits);
app.get("/metrics/summary", getMetrics);

export default app;
