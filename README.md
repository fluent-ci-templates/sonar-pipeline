# Sonar Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fsonar_pipeline&query=%24.version)](https://pkg.fluentci.io/sonar_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF&labelColor=000000)](https://dagger.io)
[![](https://jsr.io/badges/@fluentci/sonar)](https://jsr.io/@fluentci/sonar)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/sonar-pipeline)](https://codecov.io/gh/fluent-ci-templates/sonar-pipeline)
[![ci](https://github.com/fluent-ci-templates/sonar-pipeline/actions/workflows/ci.yml/badge.svg)](https://github.com/fluent-ci-templates/sonar-pipeline/actions/workflows/ci.yml)

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

## 🧩 Dagger Module

Use as a [Dagger](https://dagger.io) Module:

```bash
dagger install github.com/fluent-ci-templates/sonar-pipeline@main
```

## 🛠️ Environment variables

| Variable           | Description                                           | Required |
| ------------------ | ----------------------------------------------------- | -------- |
| SONAR_TOKEN        | SonarCloud token                                      | yes     |
| SONAR_ORGANIZATION | SonarCloud organization                               | yes     |
| SONAR_PROJECT_KEY  | SonarCloud project key                                | yes     |
| SONAR_HOST_URL     | SonarCloud host URL. Default: `https://sonarcloud.io` | no    |
| SONAR_SOURCES      | SonarCloud sources. Default: `.`                      | no    |

## ✨ Jobs

| Job       | Description                              |
| --------- | ---------------------------------------- |
| analyze   | Run SonarScanner and push to SonarCloud. |

```typescript
analyze(
  src: string | Directory,
  token: string | Secret,
  organization?: string,
  projectKey?: string,
  sources?: string
): Promise<string>
```

## 👨‍💻 Programmatic usage

You can also use this pipeline programmatically:

```ts
import { analyze } from "jsr:@fluentci/sonar";

await analyze();
```
