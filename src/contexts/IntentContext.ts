import React from "react";

const IntentContext = React.createContext<{
  youtubeOpen: false;
  data: {
    [x: string]: Record<
      string,
      unknown
    >;
  };
  toggleYoutube: (
    _data?: {} | undefined,
  ) => void;
}>({
  youtubeOpen: false,
  data: { youtube: {} },
  toggleYoutube: (_data?: {}) => {},
});
export default IntentContext;
