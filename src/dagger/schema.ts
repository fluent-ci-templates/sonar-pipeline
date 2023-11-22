import {
  queryType,
  makeSchema,
  dirname,
  join,
  resolve,
  stringArg,
  nonNull,
} from "../../deps.ts";

import { analyze } from "./jobs.ts";

const Query = queryType({
  definition(t) {
    t.string("analyze", {
      args: {
        src: nonNull(stringArg()),
        token: nonNull(stringArg()),
        organization: nonNull(stringArg()),
        projectKey: nonNull(stringArg()),
        sources: nonNull(stringArg()),
      },
      resolve: async (_root, args, _ctx) =>
        await analyze(
          args.src,
          args.token,
          args.organization,
          args.projectKey,
          args.sources
        ),
    });
  },
});

const schema = makeSchema({
  types: [Query],
  outputs: {
    schema: resolve(join(dirname(".."), dirname(".."), "schema.graphql")),
    typegen: resolve(join(dirname(".."), dirname(".."), "gen", "nexus.ts")),
  },
});

schema.description = JSON.stringify({
  "analyze.src": "directory",
  "analyze.token": "secret",
});

export { schema };
