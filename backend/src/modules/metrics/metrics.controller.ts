import { Request, Response } from 'express';
import { getMetricsSummary } from './metrics.service';

export const getMetrics = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const summary = await getMetricsSummary();

    response.status(200).json(summary);
  } catch (error: any) {
    console.error(`Error in getMetrics: ${error.message}`);

    response.status(500).json({
      message: 'Failed to fetch metrics',
      error: error.message,
    });
  }
};
