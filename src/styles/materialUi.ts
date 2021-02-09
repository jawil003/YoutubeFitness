import { createMuiTheme } from "@material-ui/core";
import designSystem from "./designSystem";
const theme = createMuiTheme({
  palette: {
    primary: {
      main:
        designSystem.colors.brand
          .primary,
    },
    secondary: {
      main:
        designSystem.colors.brand
          .secondary,
    },
  },
  props: {
    MuiStepIcon: { color: "secondary" },
    MuiButton: { color: "secondary" },

    MuiFab: { color: "secondary" },
    MuiBottomNavigationAction: {
      color: "secondary",
    },
    MuiInputBase: {
      color: "secondary",
    },
    MuiFormLabel: {
      color: "secondary",
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        backgroundColor:
          designSystem.colors.brand
            .primary,
      },
    },
    MuiStepConnector: {
      root: {
        minWidth: "10px",
      },
    },
    MuiStepIcon: {
      root: {
        color:
          designSystem.colors.brand
            .secondary,
        "& > circle": { opacity: 0.54 },
      },
      active: {
        "&&": {
          color:
            designSystem.colors.brand
              .secondary,
        },
        "& > circle": { opacity: 1 },
      },
      text: {
        fill:
          designSystem.colors.brand
            .primary,
      },
    },
    MuiStepLabel: {
      root: {
        "&&": {
          fontWeight: 400,
          color: "#000",
        },
        "& .MuiStepLabel-label": {
          opacity: 0.54,
        },
      },
      active: {
        "&&": {
          fontWeight: 400,
          color: "#000",
          opacity: 1,
        },
      },
    },
  },
});
export default theme;
