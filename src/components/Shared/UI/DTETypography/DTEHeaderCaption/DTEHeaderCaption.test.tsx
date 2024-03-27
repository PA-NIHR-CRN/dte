import { axe, toHaveNoViolations } from "jest-axe";
import { ContentContext } from "../../../../../context/ContentContext";
import { render } from "../../../../../Helper/test-utils";
import DTEHeaderCaption from "./DTEHeaderCaption";

expect.extend(toHaveNoViolations);

const mockContent = {
  testKey: "Test Content",
};

const renderComponent = (contentKey: string, size?: "xl" | "l" | "md") =>
  render(
    <ContentContext.Provider
      value={{
        content: mockContent,
        contentLoading: false,
        language: "en-GB",
        setLanguage: jest.fn(),
      }}
    >
      <DTEHeaderCaption contentKey={contentKey} size={size} />
    </ContentContext.Provider>
  );

describe("DTEHeaderCaption", () => {
  test("is accessible", async () => {
    const { container } = renderComponent("testKey");
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("renders correctly with existing content", () => {
    const { getByText } = renderComponent("testKey");
    expect(getByText("Test Content")).toBeInTheDocument();
    expect(getByText("Test Content")).toHaveClass("govuk-caption-xl");
  });

  test("does not render when content does not exist", () => {
    const { queryByText } = renderComponent("nonExistentKey");
    expect(queryByText("Test Content")).not.toBeInTheDocument();
  });

  test.each([
    ["xl", "govuk-caption-xl"],
    ["l", "govuk-caption-l"],
    ["md", "govuk-caption-md"],
  ])("applies the correct size class based on the size prop (%s)", async (size, expectedClass) => {
    const { getByText } = renderComponent("testKey", size as "xl" | "l" | "md");
    expect(getByText("Test Content")).toHaveClass(expectedClass);
  });
});
