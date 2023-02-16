import { render } from "../../../../../Helper/test-utils";
import "@testing-library/jest-dom";
import Questionnaire from "./Questionnaire";

test("placeholder test", async () => {
  const mockOnDataChange = jest.fn();
  render(<Questionnaire onSubmit={mockOnDataChange} />);
});
