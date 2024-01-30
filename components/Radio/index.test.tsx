import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Radio } from ".";

describe("Radio component", () => {
  const defaultProps = {
    label: "Test Label",
  };

  it("renders Radio component with default props", () => {
    render(<Radio {...defaultProps} />);
    const radioInput = screen.getByTestId("radio-input");
    const labelText = screen.getByTestId("radio-text");

    expect(radioInput).toBeInTheDocument();
    expect(labelText).toBeInTheDocument();
  });

  it("calls onChange callback when the radio is clicked", () => {
    const onChangeMock = jest.fn();
    render(<Radio {...defaultProps} onChange={onChangeMock} />);

    const radioLabel = screen.getByTestId("radio-label");

    fireEvent.click(radioLabel);

    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("right behavior when the radio is clicked", () => {
    render(<Radio {...defaultProps} />);
    const radioLabel = screen.getByTestId("radio-label");

    fireEvent.click(radioLabel);

    const radioInput = screen.getByTestId("radio-input");

    expect(radioInput).toBeChecked();
  });

  it("right behavior when the radio is clicked twice", () => {
    render(<Radio {...defaultProps} />);
    const radioLabel = screen.getByTestId("radio-label");

    const radioInput = screen.getByTestId("radio-input");

    fireEvent.click(radioLabel);

    expect(radioInput).toBeChecked();

    fireEvent.click(radioLabel);

    expect(radioInput).toBeChecked();
  });

  it("toggles the radio when is multiple radios", () => {
    render(
      <>
        <Radio {...defaultProps} name="test" />
        <Radio {...defaultProps} name="test" />
      </>
    );

    const radioLabel = screen.getAllByTestId("radio-label");

    const radioInput = screen.getAllByTestId("radio-input");

    fireEvent.click(radioLabel[0]);

    expect(radioInput[0]).toBeChecked();

    fireEvent.click(radioLabel[1]);

    expect(radioInput[0]).not.toBeChecked();
    expect(radioInput[1]).toBeChecked();
  });
});
