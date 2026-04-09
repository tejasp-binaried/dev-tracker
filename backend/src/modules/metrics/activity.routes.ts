import { Router } from 'express';
import { fetchRecentCommits } from './activity.controller';

const router = Router();

router.get('/recent', fetchRecentCommits);

export default router;
