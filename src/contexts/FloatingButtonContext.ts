import React from "react";

const FloatingButtonContext = React.createContext({
  menuOpen: false,
  toggle: () => {},
});
export default FloatingButtonContext;
