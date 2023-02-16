import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import DTEChip from "./DTEChip";

expect.extend(toHaveNoViolations);

describe("DTECheckList", () => {
  it("should be accessible with default theme", async () => {
    const { container } = render(<DTEChip />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be accessible with blue theme", async () => {
    const { container } = render(<DTEChip $color="blue" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be accessible with light-orange theme", async () => {
    const { container } = render(<DTEChip $color="light-orange" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be accessible with Red theme", async () => {
    const { container } = render(<DTEChip $color="red" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be accessible with grey theme", async () => {
    const { container } = render(<DTEChip $color="grey" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be accessible with bold default theme", async () => {
    const { container } = render(<DTEChip $bold />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be accessible with bold blue theme", async () => {
    const { container } = render(<DTEChip $bold $color="blue" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be accessible with bold light-orange theme", async () => {
    const { container } = render(<DTEChip $bold $color="light-orange" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be accessible with bold Red theme", async () => {
    const { container } = render(<DTEChip $bold $color="red" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should be accessible with bold grey theme", async () => {
    const { container } = render(<DTEChip $bold $color="grey" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
