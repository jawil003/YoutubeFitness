import {
  render,
  screen,
} from "@testing-library/react";
import FlexContainer from "../../components/FlexContainer";
import { matchers } from "@emotion/jest";

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers);

describe("src/components/flexContainer.tsx", () => {
  test("Test AlignItems Prop", () => {
    render(
      <FlexContainer alignItems="center" />,
    );
    const flexContainer = screen.getByRole(
      "flex-box",
    );

    const style = window.getComputedStyle(
      flexContainer,
    );

    expect(style.alignItems).toBe(
      "center",
    );
  });
  test("Test JustifyContent Prop", () => {
    render(
      <FlexContainer justifyContent="center" />,
    );
    const flexContainer = screen.getByRole(
      "flex-box",
    );

    const style = window.getComputedStyle(
      flexContainer,
    );

    expect(style.justifyContent).toBe(
      "center",
    );
  });
  test("Test ColumnGap Prop", () => {
    const { getByRole } = render(
      <FlexContainer columnGap="8px">
        <div data-testid="flex-element" />
      </FlexContainer>,
    );
    const flexContainer = getByRole(
      "flex-box",
    );

    /*const flexItem = getByTestId(
      "flex-element",
    );*/

    expect(
      flexContainer,
    ).toHaveStyleRule(
      "margin",
      "calc(0px / -2) calc(8px / -2)",
    );

    expect(
      flexContainer,
    ).toHaveStyleRule(
      "margin",
      "calc(0px / 2) calc(8px / 2)",
      { target: "& > *" },
    );
  });
});
