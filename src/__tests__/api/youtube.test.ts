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
  await testApiHandler({
    requestPatcher: (req) => {
      req.headers = {
        ...req.headers,
        Origin: "localhost:3000",
        Host: "localhost:3000",
      };
    },
    handler: graphQlHandler,
    test: async ({ fetch }) => {
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
      const res = await fetch({
        method: "POST",
        headers: {
          Accept: "	*/*",
          "Accept-Encoding":
            "gzip deflate",
          "Accept-Language":
            "de,en-US;q=0.7,en;q=0.3",
          "Content-Type":
            "application/json",
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:85.0) Gecko/20100101 Firefox/85.0",
        },
        body: JSON.stringify({
          operationName:
            "getYoutubeVideoMetadata",
          query,
          variables: {
            youtubeVideoId: exampleYoutubeVideoId,
          },
        }),
      });
      console.log(await res.json());
    },
  });
});
