import YoutubeService from "src/services/frontend/youtube.service";

const youtubeService = new YoutubeService();

const useYoutube = async () =>
  await youtubeService.getMetadataForVideo;
export default useYoutube;
