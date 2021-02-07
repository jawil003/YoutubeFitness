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
  },
});
export default theme;
