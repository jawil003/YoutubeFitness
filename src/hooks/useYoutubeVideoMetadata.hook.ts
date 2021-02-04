import { useQuery } from "react-query";
import NoEmbedService from "../services/NoEmbedService";

const useYoutubeId = (
  youtubeVideoUrl: string,
) =>
  useQuery(
    youtubeVideoUrl,
    async () => {
      return await (
        await new NoEmbedService().getMetaDataByYoutubeUrl(
          youtubeVideoUrl,
        )
      ).data;
    },
  );
export default useYoutubeId;
