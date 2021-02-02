const designSystem = {
  font: {
    base: {
      size: "16px",
      family: "Roboto, 'Source Sans Pro', sans-serif",
    },
    fontWeight: {
      lighter: 200,
      light: 300,
      normal: 400,
      semiBold: 600,
      bold: 700,
      bolder: 900,
    },
  },
  colors: {
    palette: {
      white: {
        base: "#f3f3f3",
      },
      blue: {
        base: "#2D69C3",
      },
      black: { base: "#000" },
    },
    brand: {
      primary: "#f3f3f3", // white
      secondary: "#2D69C3", // blue
      secondaryText: "#000", // black
    },
  },
  breakpoints: {
    phoneOnly: "599px",
    tabletPortraitUp: "600px",
    tabletLandscapeUp: "900px",
    desktopUp: "1200px",
    bigDesktopUp: "1800px",
  },
  positioning: {
    behindBehindBehindFirst: 997,
    behindBehindFirst: 998,
    behindFirst: 999,
    first: 1000,
  },
};

export default designSystem;

export const fontSizeToRelativeValue = (fontSizePx: string) => {
  const fontSize = Number(fontSizePx.slice(0, fontSizePx.length - 2));

  return `${
    (1 / Number(designSystem.font.base.size.slice(0, fontSizePx.length - 2))) *
    fontSize
  }rem`;
};
