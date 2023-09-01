import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen, fireEvent } from "../../../../Helper/test-utils";
import DTESelect from "./DTESelect";

expect.extend(toHaveNoViolations);

describe("DTESelect tests", () => {
  it("should render without crashing", () => {
    render(
      <DTESelect
        id="testid"
        name="testname"
        label="testlabel"
        required={false}
        onValueChange={jest.fn()}
        options={[
          { value: "test", text: "test" },
          { value: "test2", text: "test2", testID: "testID" },
        ]}
      />,
    );
    expect(screen.getByLabelText("testlabel")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByTestId("testID")).toBeInTheDocument();
  });

  it("should have changeable options", () => {
    render(
      <DTESelect
        id="testid"
        name="testname"
        label="testlabel"
        required={false}
        onValueChange={jest.fn()}
        options={[
          { value: "test", text: "test", testID: "testID" },
          { value: "test2", text: "test2", testID: "testID2" },
        ]}
      />,
    );
    fireEvent.change(screen.getByLabelText("testlabel"), {
      target: { value: "test2" },
    });
    const options = screen.getAllByTestId(/testID/) as HTMLOptionElement[];
    expect(options).toHaveLength(2);
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
  });
});

describe("DTESelect accessibility tests", () => {
  it("is accessible", async () => {
    const { container } = render(
      <DTESelect
        id="test"
        name="test"
        label="test"
        required={false}
        onValueChange={jest.fn()}
        options={[{ value: "test", text: "test" }]}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
