import React, { useState } from "react";
import { css } from "@emotion/react";
import FloatingButton from "./FloatingButton";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import ExploreIcon from "@material-ui/icons/Explore";
import designSystem from "../styles/designSystem";
import useFabContext from "../hooks/useFabContext";

interface Props {
  className?: string;
}

/**
 * An BottomNavBar React Component.
 * @author Jannik Will
 * @version 0.1
 */
const BottomNavBar: React.FC<Props> = ({ className }) => {
  const [navigationState, setNavigationState] = useState("courses");
  const { toggle } = useFabContext();
  return (
    <BottomNavigation
      value={navigationState}
      onChange={(_event, newValue) => {
        setNavigationState(newValue);
      }}
      showLabels
      className={className}
      css={css`
        &.MuiBottomNavigation-root.MuiBottomNavigation-root {
          justify-content: space-around;
        }
        &
          .MuiBottomNavigationAction-root.Mui-selected.MuiBottomNavigationAction-root.Mui-selected {
          color: ${designSystem.colors.brand.secondaryText};
        }
      `}
    >
      <BottomNavigationAction
        label="My Courses"
        value="courses"
        icon={<FitnessCenterIcon />}
      />
      <FloatingButton
        onPress={() => toggle()}
        css={css`
          position: relative;
          bottom: 40%;
        `}
      />
      <a href="https://youtube.com" target="_blank">
        <BottomNavigationAction
          showLabel
          label="Explore"
          value="explore"
          icon={<ExploreIcon />}
        />
      </a>
    </BottomNavigation>
  );
};

export default BottomNavBar;
