import express from "express";
import { getAllJobs, getJobById, createJob } from "../controllers/jobController";

const jobRouter = express.Router();

jobRouter.get("/", getAllJobs);
jobRouter.get("/:id", getJobById);
jobRouter.post("/", createJob);

export default jobRouter;
