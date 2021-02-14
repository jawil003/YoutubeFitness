import React from "react";
import Video from "src/entities/video.entity";

const FloatingButtonContext = React.createContext<{
  data: {
    title: string;
    videos: Video &
      { begin: number; end: number }[];
  };
  menuOpen: boolean;
  toggle: () => void;
  setData: (data: {
    title: string;
    videos: Video &
      {
        begin: number;
        end: number;
      }[];
  }) => void;
}>({
  data: { title: "", videos: [] },
  menuOpen: false,
  toggle: () => {},
  setData: (() => {}) as any,
});
export default FloatingButtonContext;
