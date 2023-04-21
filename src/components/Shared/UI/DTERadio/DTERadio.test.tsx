import { axe, toHaveNoViolations } from "jest-axe";
import { Radios } from "nhsuk-react-components";
import { render, screen } from "../../../../Helper/test-utils";
import DTERadio from "./DTERadio";

expect.extend(toHaveNoViolations);

describe("DTERadio", () => {
  it("should be accessible", async () => {
    const { container } = render(
      <DTERadio
        id="test"
        name="test"
        label={<>test label</>}
        onChange={jest.fn()}
      >
        <Radios.Radio value="test">Test</Radios.Radio>
        <Radios.Radio value="test2">Test2</Radios.Radio>
        <Radios.Radio value="test3">Test3</Radios.Radio>
      </DTERadio>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("DTERadio contains the correct elements", () => {
  it("must contain a fieldset element", async () => {
    render(
      <DTERadio
        id="testRadio"
        name="testRadios"
        onChange={jest.fn()}
        label={<>test label</>}
      >
        <Radios.Radio value="yes" defaultChecked>
          Yes
        </Radios.Radio>
        <Radios.Radio value="no">No</Radios.Radio>
      </DTERadio>
    );

    const fieldsetElement = await screen.findByTestId("testRadio-fieldset");
    expect(fieldsetElement).toBeInTheDocument();
  });

  it("must contain a legend element", async () => {
    render(
      <DTERadio
        id="testRadio"
        name="testRadios"
        onChange={jest.fn()}
        label={<>test label</>}
      >
        <Radios.Radio value="yes" defaultChecked>
          Yes
        </Radios.Radio>
        <Radios.Radio value="no">No</Radios.Radio>
      </DTERadio>
    );

    const legendElement = await screen.findByTestId("testRadio-legend");
    expect(legendElement).toBeInTheDocument();
  });

  it("must show the correct aria described by attributes when valid", async () => {
    render(
      <DTERadio
        id="testRadio"
        name="testRadios"
        onChange={jest.fn()}
        label={<>test label</>}
      >
        <Radios.Radio value="yes" defaultChecked>
          Yes
        </Radios.Radio>
        <Radios.Radio value="no">No</Radios.Radio>
      </DTERadio>
    );

    const fieldsetElement = await screen.findByTestId("testRadio-fieldset");
    const fieldsetAriaDescribedByAttribute =
      fieldsetElement.getAttribute("aria-describedby");
    expect(fieldsetElement).toBeInTheDocument();
    expect(fieldsetElement).toHaveAttribute("aria-describedby");
    expect(fieldsetAriaDescribedByAttribute).toEqual("testRadio-legend");
  });

  it("must show the correct aria described by attributes when invalid", async () => {
    render(
      <DTERadio
        id="testRadio"
        name="testRadios"
        error="error message"
        onChange={jest.fn()}
        label={<>test label</>}
      >
        <Radios.Radio value="yes" defaultChecked>
          Yes
        </Radios.Radio>
        <Radios.Radio value="no">No</Radios.Radio>
      </DTERadio>
    );

    const fieldsetElement = await screen.findByTestId("testRadio-fieldset");
    const fieldsetAriaDescribedByAttribute =
      fieldsetElement.getAttribute("aria-describedby");
    expect(fieldsetElement).toBeInTheDocument();
    expect(fieldsetElement).toHaveAttribute("aria-describedby");
    expect(fieldsetAriaDescribedByAttribute).toEqual(
      "testRadio--error-message testRadio-legend"
    );
  });

  it("must render infoText when added", async () => {
    render(
      <DTERadio
        id="testRadio"
        name="testRadios"
        infoText="test text"
        onChange={jest.fn()}
        label={<>test label</>}
      >
        <Radios.Radio value="yes" defaultChecked>
          Yes
        </Radios.Radio>
        <Radios.Radio value="no">No</Radios.Radio>
      </DTERadio>
    );

    const infoText = await screen.findByTestId("testRadio-info");
    expect(infoText).toBeInTheDocument();
    expect(infoText).toHaveTextContent("test text");
  });

  it("must show the correct aria described by attributes when infoText is added", async () => {
    render(
      <DTERadio
        id="testRadio"
        name="testRadios"
        onChange={jest.fn()}
        label={<>test label</>}
        infoText="test text"
      >
        <Radios.Radio value="yes" defaultChecked>
          Yes
        </Radios.Radio>
        <Radios.Radio value="no">No</Radios.Radio>
      </DTERadio>
    );

    const fieldsetElement = await screen.findByTestId("testRadio-fieldset");
    const fieldsetAriaDescribedByAttribute =
      fieldsetElement.getAttribute("aria-describedby");
    expect(fieldsetElement).toBeInTheDocument();
    expect(fieldsetElement).toHaveAttribute("aria-describedby");
    expect(fieldsetAriaDescribedByAttribute).toEqual(
      "testRadio-legend testRadio-info"
    );
  });
});
