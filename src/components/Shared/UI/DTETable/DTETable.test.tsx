import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTETable from "./DTETable";

expect.extend(toHaveNoViolations);

describe("DTETable accessibility tests", () => {
  it("is accessible", async () => {
    const mockButtonClick = jest.fn();
    const { container } = render(
      <DTETable
        caption="Hello world"
        columns={[
          { name: "One", width: 1 },
          { name: "Two", width: 2 },
        ]}
        rows={[
          { One: "Hello", Two: "World" },
          {
            One: "Hello2",
            Two: <a href="https://example.com">This is a link</a>,
          },
          {
            One: "Hello2",
            Two: (
              <button onClick={mockButtonClick} type="button">
                Click me
              </button>
            ),
          },
        ]}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("DTETable tests", () => {
  it("renders without error", async () => {
    const mockButtonClick = jest.fn();
    render(
      <DTETable
        caption="Hello world"
        columns={[
          { name: "One", width: 1 },
          { name: "Two", width: 2 },
        ]}
        rows={[
          { One: "Hello", Two: "World" },
          {
            One: "Hello2",
            Two: <a href="https://example.com">This is a link</a>,
          },
          {
            One: "Hello2",
            Two: (
              <button onClick={mockButtonClick} type="button">
                Click me
              </button>
            ),
          },
        ]}
      />,
    );
  });
});
