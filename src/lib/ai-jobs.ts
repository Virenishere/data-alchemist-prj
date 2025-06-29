import { redis } from './redis'; 

type JobStatus = 'pending' | 'done' | 'error';

interface AIJob {
  status: JobStatus;
  data?: any;
  error?: string;
}

export const aiJobs = {
  async create(jobId: string) {
    await redis.set(`job:${jobId}`, JSON.stringify({ status: 'pending' }), 'EX', 3600);
  },
  async complete(jobId: string, data: any) {
    await redis.set(`job:${jobId}`, JSON.stringify({ status: 'done', data }), 'EX', 3600);
  },
  async fail(jobId: string, error: string) {
    await redis.set(`job:${jobId}`, JSON.stringify({ status: 'error', error }), 'EX', 3600);
  },
  async get(jobId: string): Promise<AIJob | null> {
    const result = await redis.get(`job:${jobId}`);
    return result ? JSON.parse(result) : null;
  },
};
