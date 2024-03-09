import { env } from "../../deps.ts";
import * as jobs from "./jobs.ts";

const { analyze, runnableJobs } = jobs;

export default async function pipeline(src = ".", args: string[] = []) {
  if (args.length > 0) {
    await runSpecificJobs(src, args as jobs.Job[]);
    return;
  }

  await analyze(src, env.get("SONAR_TOKEN")!);
}

async function runSpecificJobs(src: string, args: jobs.Job[]) {
  for (const name of args) {
    const job = runnableJobs[name];
    if (!job) {
      throw new Error(`Job ${name} not found`);
    }
    await job(src, env.get("SONAR_TOKEN")!);
  }
}
