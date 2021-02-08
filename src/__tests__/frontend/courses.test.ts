import { localApiClient } from "../../config/client";
import startServer from "../../mocks/graphql/apolloMockServer";

const query = `query getYoutubeVideoMetadata($youtubeVideoId: String!) {
  videoData: youtubeVideoMeadata(youtubeVideoId: $youtubeVideoId) {
    id
    title
    thumbnails {
      default {
        url
      }
    }
  }
}
`;

beforeAll(
  async () => await startServer(),
);

test("Test Mockup Server Graphql Api", async () => {
  await localApiClient.post(
    "/graphql",
    {
      query,
    },
  );
});
