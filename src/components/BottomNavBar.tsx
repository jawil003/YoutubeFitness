import React, { useState } from "react";
import { css } from "@emotion/react";
import FloatingButton from "./FloatingButton";
import {
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import designSystem from "../styles/designSystem";
import useFabContext from "../hooks/useFabContext";
import { bottom } from "../config/routes.json";
import Link from "next/link";
import getMaterialIcons from "src/functions/getMaterialIcons.func";

const generateItems = (
  items: Array<{
    name: string;
    icon: string;
    url: string;
    external?: boolean;
  }>,
) => {
  return items.map((i) =>
    i.external ? (
      <a href={i.url} target="_blank">
        <BottomNavigationAction
          showLabel
          label={i.name}
          value={i.name
            .toLowerCase()
            .replace(" ", "-")}
          icon={getMaterialIcons(
            i.icon,
          )}
        />
      </a>
    ) : (
      <Link href={i.url}>
        <BottomNavigationAction
          showLabel
          label={i.name}
          value={i.name
            .toLowerCase()
            .replace(" ", "-")}
          icon={getMaterialIcons(
            i.icon,
          )}
        />
      </Link>
    ),
  );
};

interface Props {
  className?: string;
}

/**
 * An BottomNavBar React Component.
 * @author Jannik Will
 * @version 0.1
 */
const BottomNavBar: React.FC<Props> = ({
  className,
}) => {
  const [
    navigationState,
    setNavigationState,
  ] = useState("my-courses");
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
          background-color: ${designSystem
            .colors.brand.primary};
          filter: drop-shadow(
            0px -2px 2px rgba(0, 0, 0, 0.25)
          );
          box-sizing: content-box;
          padding: 5px 0px;
        }
        &
          .MuiBottomNavigationAction-root.Mui-selected.MuiBottomNavigationAction-root.Mui-selected {
          color: ${designSystem.colors
            .brand.secondaryText};
        }
      `}
    >
      {generateItems(bottom.left)}
      <FloatingButton
        onPress={() => toggle()}
      />
      {generateItems(bottom.right)}
    </BottomNavigation>
  );
};

export default BottomNavBar;
