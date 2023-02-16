import { axe, toHaveNoViolations } from "jest-axe";
import { createServer, Server } from "miragejs";
import { render, screen, fireEvent } from "../../../Helper/test-utils";
import "@testing-library/jest-dom";

import AddMemberForm from "./AddMemberForm";

expect.extend(toHaveNoViolations);

let server: Server;
beforeEach(() => {
  server = createServer({
    routes() {
      this.get(
        `${process.env.REACT_APP_BASE_API}/researchers/:email`,
        (_schema, request) => {
          return {
            content: {
              id: "1bc36eb8-0042-4c67-bd55-892db4b44158",
              email: request.params.email,
              firstname: "Researcher",
              lastname: "Two",
            },
            isSuccess: true,
            errors: [],
            conversationId: null,
            version: 1,
          };
        }
      );

      this.post(`${process.env.REACT_APP_BASE_API}/researcherstudies`, () => {
        return {
          content: null,
          isSuccess: true,
          errors: [],
          conversationId: null,
          version: 1,
        };
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

describe("AddMemberForm accessibility tests", () => {
  const mockRefresh = jest.fn();
  it("is accessible", async () => {
    const { container } = render(
      <AddMemberForm refreshParticipants={mockRefresh} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("AddMemberForm tests", () => {
  it("should render without error", async () => {
    const mockRefresh = jest.fn();

    render(<AddMemberForm refreshParticipants={mockRefresh} />);
    const addNewMemberButton = await screen.findByText(
      "Add a new member to this study +"
    );
    expect(addNewMemberButton).toBeInTheDocument();
  });

  it("should show the form then the button is clicked", async () => {
    const mockRefresh = jest.fn();

    render(<AddMemberForm refreshParticipants={mockRefresh} />);
    const addNewMemberButton = await screen.findByText(
      "Add a new member to this study +"
    );
    expect(addNewMemberButton).toBeInTheDocument();
    fireEvent.click(addNewMemberButton);

    const button = screen.queryByText("Add a new member to this study +");
    expect(button).not.toBeInTheDocument();
    expect(
      await screen.findByText("Invite a team member to join the study")
    ).toBeInTheDocument();
  });

  it("should add a researcher to a study", async () => {
    const mockRefresh = jest.fn();
    render(<AddMemberForm refreshParticipants={mockRefresh} />);
    const addNewMemberButton = await screen.findByText(
      "Add a new member to this study +"
    );
    fireEvent.click(addNewMemberButton);
    const emailAddressInput = await screen.findByLabelText(
      "Enter email address"
    );
    const addMemberButton = await screen.findByText("Add member +");

    expect(emailAddressInput).toBeInTheDocument();
    expect(addMemberButton).toBeInTheDocument();

    fireEvent.change(emailAddressInput, {
      target: { value: "researcher2@yopmail.com" },
    });
    fireEvent.click(addMemberButton);

    const successMessage = await screen.findByText(
      "You've successfully added a team member to this study."
    );
    expect(successMessage).toBeInTheDocument();
  });
});
