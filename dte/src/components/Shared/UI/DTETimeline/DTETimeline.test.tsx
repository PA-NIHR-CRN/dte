import { axe, toHaveNoViolations } from "jest-axe";
import { render } from "../../../../Helper/test-utils";
import {
  DTETimeline,
  DTETimelineItem,
  DTETimelineSeparator,
  DTETimelineConnector,
  DTETimelineContent,
  DTETimelineDot,
  DTETimelineNumber,
} from "./DTETimeline";

expect.extend(toHaveNoViolations);

describe("DTETimeline", () => {
  it("DTETimeline is accessible", async () => {
    const { container } = render(<DTETimeline />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("DTETimelineItem", async () => {
    const { container } = render(
      <ul>
        <DTETimelineItem />
      </ul>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("DTETimelineSeparator is accessible", async () => {
    const { container } = render(<DTETimelineSeparator />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("DTETimelineConnector is accessible", async () => {
    const { container } = render(<DTETimelineConnector />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("DTETimelineContent is accessible", async () => {
    const { container } = render(<DTETimelineContent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("DTETimelineDot", async () => {
    const { container } = render(<DTETimelineDot />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("DTETimelineNumber", async () => {
    const { container } = render(<DTETimelineNumber />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
