# Sonar Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fsonar_pipeline&query=%24.version)](https://pkg.fluentci.io/sonar_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)
[![](https://img.shields.io/codecov/c/gh/fluent-ci-templates/sonar-pipeline)](https://codecov.io/gh/fluent-ci-templates/sonar-pipeline)

A ready-to-use CI/CD Pipeline for analyzing your code with [SonarCloud](https://sonarcloud.io/).

## 🚀 Usage

Run the following command in your project:

```bash
dagger run fluentci sonar_pipeline
```

Or, if you want to use it as a template:

```bash
fluentci init -t sonar
```

This will create a `.fluentci` folder in your project.

Now you can run the pipeline with:

```bash
dagger run fluentci .
```

## Environment variables

| Variable           | Description                                           | Required |
| ------------------ | ----------------------------------------------------- | -------- |
| SONAR_TOKEN        | SonarCloud token                                      | true     |
| SONAR_ORGANIZATION | SonarCloud organization                               | true     |
| SONAR_PROJECT_KEY  | SonarCloud project key                                | true     |
| SONAR_HOST_URL     | SonarCloud host URL. Default: `https://sonarcloud.io` | false    |
| SONAR_SOURCES      | SonarCloud sources. Default: `.`                      | false    |

## Jobs

| Job       | Description                              |
| --------- | ---------------------------------------- |
| analyze   | Run SonarScanner and push to SonarCloud. |

## Programmatic usage

You can also use this pipeline programmatically:

```ts
import { Client, connect } from "https://esm.sh/@dagger.io/dagger@0.8.1";
import { Dagger } from "https://pkg.fluentci.io/sonar_pipeline/mod.ts";

const { analyze } = Dagger;

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await analyze(client, src);
  });
}

pipeline();
```
