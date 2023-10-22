import Client, { connect } from "../../deps.ts";

export enum Job {
  analyze = "analyze",
}

export const exclude = [];

export const analyze = async (
  src = ".",
  token?: string,
  organization?: string,
  projectKey?: string,
  sources?: string
) => {
  await connect(async (client: Client) => {
    const context = client.host().directory(src);
    const sonarToken = Deno.env.get("SONAR_TOKEN") || token;
    const sonarHostUrl =
      Deno.env.get("SONAR_HOST_URL") || "https://sonarcloud.io";
    const sonarOrganization =
      Deno.env.get("SONAR_ORGANIZATION") || organization;
    const sonarProjectKey = Deno.env.get("SONAR_PROJECT_KEY") || projectKey;
    const sonarSources = Deno.env.get("SONAR_SOURCES") || sources || ".";

    if (!sonarToken) {
      throw new Error("SONAR_TOKEN is not set");
    }

    if (!sonarOrganization) {
      throw new Error("SONAR_ORGANIZATION is not set");
    }

    if (!sonarProjectKey) {
      throw new Error("SONAR_PROJECT_KEY is not set");
    }

    const ctr = client
      .pipeline(Job.analyze)
      .container()
      .from("ghcr.io/fluentci-io/sonar-scanner:latest")
      .withEnvVariable("SONAR_TOKEN", sonarToken)
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

    const result = await ctr.stdout();

    console.log(result);
  });
  return "done";
};

export type JobExec = (src?: string) =>
  | Promise<string>
  | ((
      client: Client,
      src?: string,
      options?: {
        ignore: string[];
      }
    ) => Promise<string>);

export const runnableJobs: Record<Job, JobExec> = {
  [Job.analyze]: analyze,
};

export const jobDescriptions: Record<Job, string> = {
  [Job.analyze]: "Run sonar scanner",
};
