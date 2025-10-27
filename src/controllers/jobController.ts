import { Request, Response } from "express";
import { z } from "zod";
import { Job, JobInt } from "../models/job.model";
import { scheduleJob } from "../utils/jobScheduler";

const jobSchema = z.object({
  jobName: z.string().min(1, "Job name is required"),
  description: z.string().optional(),
  cronExpression: z.string().min(1, "Cron expression is required"),
  status: z.enum(["Scheduled", "Running", "Completed", "Failed"]).optional(),
  
});

export const createJob = async (req: Request, res: Response) => {
  try {
    const parsed = jobSchema.parse(req.body);
     console.log(parsed);
    const newJob = await Job.create({
      ...parsed,
      lastRun: null,
      nextRun: null,
      
    });

   
    await scheduleJob( String(newJob._id) , newJob.jobName , newJob.cronExpression);
    res.status(201).json(newJob);
  } catch (err: any) {
    console.error("Error creating job:", err);
    res.status(400).json({ error: err.message || "Invalid data" });
  }
};

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs: JobInt[] = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Server error" });
  }
};


export const getJobById = async (req: Request, res: Response) => {
  try {
    const job: JobInt | null = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({ error: "Server error" });
  }
};



