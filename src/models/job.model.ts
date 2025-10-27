import mongoose, {Schema, Document} from "mongoose";


export interface JobInt extends Document{
    jobName : string;
    description?: string;
    cronExpression : string;
    lastRun?: Date | null;
    nextRun?: Date | null;
    status?: "Scheduled" | "Running" | "Completed" | "Failed";
    createdAt: Date;
    customAttributes?: object;
}

const jobSchema = new Schema<JobInt>({
    jobName : {type : String, required : true},
    description : {type: String, required: true},
    cronExpression : {type: String, required: true},
    lastRun: {type: Date, default: null},
    nextRun: {type: Date, default: null},
    status: {type: String, enum : ["Scheduled", "Running", "Completed", "Failed"], default: "Scheduled"},
    createdAt: {type: Date, default: Date.now},
    customAttributes: {type: Object}
})

export const Job= mongoose.model<JobInt>("Job", jobSchema);