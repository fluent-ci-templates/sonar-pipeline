import { gql } from "../../deps.ts";

export const analyze = gql`
  query analyze(
    $src: String!
    $token: String!
    $organization: String!
    $projectKey: String!
    $sources: String!
  ) {
    analyze(
      src: $src
      token: $token
      organization: $organization
      projectKey: $projectKey
      sources: $sources
    )
  }
`;
