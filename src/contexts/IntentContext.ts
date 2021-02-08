import React from "react";

const IntentContext = React.createContext<{}>(
  {
    youtubeOpen: false,
    data: { youtube: {} },
    toggleYoutube: (_data?: {}) => {},
  },
);
export default IntentContext;
