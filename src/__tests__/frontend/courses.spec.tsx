import {
  render,
  screen,
  cleanup,
} from "@testing-library/react";
import CourseComponent from "../../components/Course";

jest.mock(
  "../../entities/course.entitiy",
);

describe("src/components/course.tsx", () => {
  afterEach(() => {
    jest.resetAllMocks();
    cleanup();
  });

  test("Prop Testing", async () => {
    const title = "Test Title";
    const mockUrl =
      "https://i.ytimg.com/an_webp/tpZbByjFyoE/mqdefault_6s.webp?du=3000&sqp=CPGFhIEG&rs=AOn4CLATN22CBPE7ez8EVFha_DAujhX72A";

    render(
      <CourseComponent
        title={title}
        videos={[]}
      />,
    );
    const titleSpan = screen.getByText(
      title,
    );

    const thumbnailImage = screen.getByRole(
      "img",
    );

    expect(titleSpan).toBeVisible();
    expect(
      (thumbnailImage as HTMLImageElement)
        .src,
    ).toBe(mockUrl);
  });
});
