/**
 * @module sonar
 * @description This module provides a function for analyzing code with sonar scanner
 */
import { Directory, Secret, dag, env, exit } from "../../deps.ts";
import { getDirectory, getSonarToken } from "./lib.ts";

export enum Job {
  analyze = "analyze",
}

export const exclude = [];

/**
 * Run sonar scanner
 *
 * @function
 * @description Run sonar scanner
 * @param {string | Directory} src
 * @param {string | Secret} token
 * @param {string} organization
 * @returns {number}
 */
export async function analyze(
  src: string | Directory,
  token: string | Secret,
  organization?: string,
  projectKey?: string,
  sources?: string
): Promise<string> {
  const context = await getDirectory(src);
  const sonarToken = env.get("SONAR_TOKEN") || token;
  const sonarHostUrl = env.get("SONAR_HOST_URL") || "https://sonarcloud.io";
  const sonarOrganization = env.get("SONAR_ORGANIZATION") || organization;
  const sonarProjectKey = env.get("SONAR_PROJECT_KEY") || projectKey;
  const sonarSources = env.get("SONAR_SOURCES") || sources || ".";
  const secret = await getSonarToken(sonarToken);

  if (!secret) {
    console.error("SONAR_TOKEN is not set");
    exit(1);
    return "";
  }

  if (!sonarOrganization) {
    console.error("SONAR_ORGANIZATION is not set");
    exit(1);
    return "";
  }

  if (!sonarProjectKey) {
    console.error("SONAR_PROJECT_KEY is not set");
    exit(1);
    return "";
  }

  const ctr = dag
    .pipeline(Job.analyze)
    .container()
    .from("pkgxdev/pkgx:latest")
    .withMountedCache("/root/.pkgx", dag.cacheVolume("pkgx-cache"))
    .withExec(["pkgx", "install", "sonar-scanner"])
    .withSecretVariable("SONAR_TOKEN", secret)
    .withDirectory("/app", context)
    .withWorkdir("/app")
    .withExec([
      "sonar-scanner",
      `-Dsonar.organization=${sonarOrganization}`,
      `-Dsonar.projectKey=${sonarProjectKey}`,
      `-Dsonar.sources=${sonarSources}`,
      `-Dsonar.host.url=${sonarHostUrl}`,
    ]);

  return ctr.stdout();
}

export type JobExec = (
  src: string,
  token: string,
  organization?: string,
  projectKey?: string,
  sources?: string
) => Promise<string>;

export const runnableJobs: Record<Job, JobExec> = {
  [Job.analyze]: analyze,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.analyze]: "Run sonar scanner",
};
