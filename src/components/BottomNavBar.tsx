import React from "react";
import { css } from "@emotion/react";
import FloatingButton from "./FloatingButton";
import {
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import designSystem from "../styles/designSystem";
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
      <BottomNavigationAction
        key={`${i.name}-navigationAction`}
        component="a"
        disableRipple
        disableTouchRipple
        focusRipple={false}
        href={i.url}
        target="_blank"
        label={i.name}
        value={i.name
          .toLowerCase()
          .replace(" ", "-")}
        icon={getMaterialIcons(i.icon)}
      />
    ) : (
      <Link
        href={i.url}
        key={`${i.name}-navigationAction`}
      >
        <BottomNavigationAction
          component="a"
          disableRipple
          disableTouchRipple
          focusRipple={false}
          label={i.name}
          showLabel
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
  return (
    <BottomNavigation
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
      <FloatingButton key="floating-button" />
      {generateItems(bottom.right)}
    </BottomNavigation>
  );
};

export default BottomNavBar;
