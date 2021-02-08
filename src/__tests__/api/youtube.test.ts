import { testApiHandler } from "next-test-api-route-handler";
import graphQlHandler from "../../pages/api/graphql";

/**
 * This Tests run against the real backend API to fetch from the Youtube Data API v3
 * @author Jannik Will
 * @version 1.0
 */

const exampleYoutubeVideoId =
  "s3F6R92s6_o";

/**
 * Fetch MetaData (title, thumbnail, url) for an Youtube Video.
 */
test("Fetch Metadata For Example YoutubeVideo", async () => {
  jest.setTimeout(30000);
  await testApiHandler({
    requestPatcher: (req) =>
      (req.url = "/api/graphql"),
    handler: graphQlHandler,
    test: async ({ fetch }) => {
      const query = `{
  videoData: youtubeVideoMeadata(youtubeVideoId: ${exampleYoutubeVideoId}) {
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
      const res = await fetch({
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          query,
        }),
      });
      console.log(await res.json());
    },
  });
});
