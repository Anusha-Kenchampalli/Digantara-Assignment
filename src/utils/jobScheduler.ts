import cron from "node-cron";
import type { ScheduledTask } from "node-cron";
import { Job } from "../models/job.model";
import cronParser from "cron-parser";

interface ScheduledJob {
  id: string;
  jobName: string;
  task: ScheduledTask;
}

const scheduledJobs = new Map<string, ScheduledJob>();

export const scheduleJob = async (jobId: string, jobName : string, cronExpression: string) => {
  if (!cronExpression) {
    console.log(`Job ${jobId} has no cron expression. Skipping schedule.`);
    return;
  }

  if (scheduledJobs.has(jobId)) {
    const existingJob = scheduledJobs.get(jobId);
    existingJob?.task.stop();
  }

  const task = cron.schedule(cronExpression, async () => {
    const interval = cronParser.parse(cronExpression);
    const nextRun = interval.next().toDate();
    console.log(`Running job "${jobName}" at ${new Date().toLocaleString()}`);
    // await Job.findByIdAndUpdate(jobId, { lastRun: new Date() });
    // await Job.findByIdAndUpdate(jobId, { nextRun : nextRun });

    function toIST(date = new Date()) {
      return new Date(date.getTime() + (5.5 * 60 * 60 * 1000));
    }

    await Job.findByIdAndUpdate(jobId, { 
      lastRun: toIST()
    });

    await Job.findByIdAndUpdate(jobId, { 
      nextRun: toIST(nextRun)
    });

  });

  task.start();
  scheduledJobs.set(jobId, { id: jobId, jobName, task });

  console.log(`Job "${jobName}" scheduled`);
};

export const loadAllJobs = async () => {
  const allJobs = await Job.find();
  for (const job of allJobs) {
    if (job.cronExpression) {
      await scheduleJob(String(job._id), job.jobName  ,job.cronExpression);
    }
  }
  console.log(`Loaded and scheduled ${allJobs.length} jobs`);
};
