import { render } from "../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import RemoteStudy from "./RemoteStudy";

test("placeholder test", async () => {
  const mockOnDataChange = jest.fn();
  render(<RemoteStudy onSubmit={mockOnDataChange} />);
});
