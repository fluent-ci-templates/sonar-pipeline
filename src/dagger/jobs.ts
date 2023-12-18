import Client, { Directory, Secret } from "../../deps.ts";
import { connect } from "../../sdk/connect.ts";
import { getDirectory, getSonarToken } from "./lib.ts";

export enum Job {
  analyze = "analyze",
}

export const exclude = [];

/**
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
  let result = "";
  await connect(async (client: Client) => {
    const context = getDirectory(client, src);
    const sonarToken = Deno.env.get("SONAR_TOKEN") || token;
    const sonarHostUrl =
      Deno.env.get("SONAR_HOST_URL") || "https://sonarcloud.io";
    const sonarOrganization =
      Deno.env.get("SONAR_ORGANIZATION") || organization;
    const sonarProjectKey = Deno.env.get("SONAR_PROJECT_KEY") || projectKey;
    const sonarSources = Deno.env.get("SONAR_SOURCES") || sources || ".";
    const secret = getSonarToken(client, sonarToken);

    if (!secret) {
      console.log("SONAR_TOKEN is not set");
      Deno.exit(1);
    }

    if (!sonarOrganization) {
      console.log("SONAR_ORGANIZATION is not set");
      Deno.exit(1);
    }

    if (!sonarProjectKey) {
      console.log("SONAR_PROJECT_KEY is not set");
      Deno.exit(1);
    }

    const ctr = client
      .pipeline(Job.analyze)
      .container()
      .from("ghcr.io/fluentci-io/sonar-scanner:latest")
      .withSecretVariable("SONAR_TOKEN", secret)
      .withDirectory("/app", context)
      .withWorkdir("/app")
      .withExec([
        "sh",
        "-c",
        `eval "$(devbox global shellenv)" && \
      sonar-scanner -Dsonar.organization=${sonarOrganization} \
      -Dsonar.projectKey=${sonarProjectKey} \
      -Dsonar.sources=${sonarSources} \
      -Dsonar.host.url=${sonarHostUrl}`,
      ]);

    result = await ctr.stdout();
  });
  return result;
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
