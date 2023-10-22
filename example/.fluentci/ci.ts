import Client, { connect } from "https://sdk.fluentci.io/v0.1.9/mod.ts";
import { analyze } from "https://pkg.fluentci.io/sonar_pipeline@v0.2.1/mod.ts";

function pipeline(src = ".") {
  connect(async (client: Client) => {
    await analyze(client, src);
  });
}

pipeline();
