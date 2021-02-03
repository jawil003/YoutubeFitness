import { createMuiTheme } from "@material-ui/core";
import designSystem from "./designSystem";
const theme = createMuiTheme({
  palette: {
    primary: { main: designSystem.colors.brand.primary },
    secondary: { main: designSystem.colors.brand.secondary },
  },
  props: {
    MuiButton: { color: "secondary" },
    MuiInput: { color: "secondary" },
    MuiFormLabel: { color: "secondary" },
  },
});
export default theme;
