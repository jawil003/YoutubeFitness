import dynamic from "next/dynamic";
const ExploreIcon = dynamic(() => import("@material-ui/icons/Explore"));
const FitnessCenterIcon = dynamic(
  () => import("@material-ui/icons/FitnessCenter")
);
const CheckBoxOutlineBlank = dynamic(
  () => import("@material-ui/icons/CheckBoxOutlineBlank")
);

const getMaterialIcons = (name: string) => {
  switch (name) {
    case "Explore": {
      return <ExploreIcon />;
    }
    case "FitnessCenter": {
      return <FitnessCenterIcon />;
    }
    default: {
      return <CheckBoxOutlineBlank />;
    }
  }
};
export default getMaterialIcons;
