# Sonar Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fsonar_pipeline&query=%24.version)](https://pkg.fluentci.io/sonar_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.37)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/sonar-pipeline)](https://codecov.io/gh/fluent-ci-templates/sonar-pipeline)

A ready-to-use CI/CD Pipeline for analyzing your code with [SonarCloud](https://sonarcloud.io/).

## 🚀 Usage

Run the following command in your project:

```bash
fluentci run sonar_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t sonar
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
fluentci run .
```

## Environment variables

| Variable           | Description                                           | Required |
| ------------------ | ----------------------------------------------------- | -------- |
| SONAR_TOKEN        | SonarCloud token                                      | yes     |
| SONAR_ORGANIZATION | SonarCloud organization                               | yes     |
| SONAR_PROJECT_KEY  | SonarCloud project key                                | yes     |
| SONAR_HOST_URL     | SonarCloud host URL. Default: `https://sonarcloud.io` | no    |
| SONAR_SOURCES      | SonarCloud sources. Default: `.`                      | no    |

## Jobs

| Job       | Description                              |
| --------- | ---------------------------------------- |
| analyze   | Run SonarScanner and push to SonarCloud. |

```graphql
analyze(
  organization: String!, 
  projectKey: String!, 
  sources: String!, 
  src: String!, 
  token: String!
): String
```

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { analyze } from "https://pkg.fluentci.io/sonar_pipeline@v0.3.2/mod.ts";

await analyze();
```
