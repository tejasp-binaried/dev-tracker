import express, { Application } from 'express';
import { getDeveloperCommits } from './modules/developer/developer.controller';

const app: Application = express();

app.use(express.json());

app.get('/developers/commits', getDeveloperCommits);

export default app;