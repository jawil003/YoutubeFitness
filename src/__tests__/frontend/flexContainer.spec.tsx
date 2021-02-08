import {
  render,
  screen,
} from "@testing-library/react";
import FlexContainer from "../../components/FlexContainer";

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
    render(
      <FlexContainer columnGap="8px">
        <div data-testid="flex-element" />
      </FlexContainer>,
    );
    const flexContainer = screen.getByRole(
      "flex-box",
    );

    const flexItem = screen.getByTestId(
      "flex-element",
    );

    const containerStyle = window.getComputedStyle(
      flexContainer,
    );

    const elementStyle = window.getComputedStyle(
      flexItem,
    );

    expect(containerStyle.margin).toBe(
      "-4px 0px",
    );

    expect(elementStyle.margin).toBe(
      "4px 0px",
    );
  });
});
