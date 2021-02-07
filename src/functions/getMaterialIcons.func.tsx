import { css } from "@emotion/react";
import dynamic from "next/dynamic";
const ExploreIcon = dynamic(
  () =>
    import(
      "@material-ui/icons/Explore"
    ),
);
const FitnessCenterIcon = dynamic(
  () =>
    import(
      "@material-ui/icons/FitnessCenter"
    ),
);
const CheckBoxOutlineBlank = dynamic(
  () =>
    import(
      "@material-ui/icons/CheckBoxOutlineBlank"
    ),
);

const svgStyle = css`
  &.MuiSvgIcon-root {
    font-size: 20px;
  }
`;

const getMaterialIcons = (
  name: string,
) => {
  switch (name) {
    case "Explore": {
      return (
        <ExploreIcon css={svgStyle} />
      );
    }
    case "FitnessCenter": {
      return (
        <FitnessCenterIcon
          css={svgStyle}
        />
      );
    }
    default: {
      return (
        <CheckBoxOutlineBlank
          css={svgStyle}
        />
      );
    }
  }
};
export default getMaterialIcons;
