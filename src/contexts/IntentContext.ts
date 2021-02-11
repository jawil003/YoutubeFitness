import React from "react";
import Video from "src/entities/video.entity";

const IntentContext = React.createContext<{
  youtubeOpen: boolean;
  data: {
    youtube: {
      title: string;
      videos: Array<
        Video & {
          begin?: number;
          end?: number;
        }
      >;
    };
    [x: string]: Record<
      string,
      unknown | Array<unknown>
    >;
  };
  toggleYoutube: (
    _data?: {} | undefined,
  ) => void;
}>({
  youtubeOpen: false,
  data: {
    youtube: {
      title: "",
      videos: [],
    },
  },
  toggleYoutube: (_data?: {}) => {},
});
export default IntentContext;
