import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Paint, DrawObject } from ".";

describe("Paint component", () => {
  const defaultProps = {
    width: 500,
    height: 500,
    readOnly: false,
    onChange: jest.fn(),
    initialDrawValue: undefined,
  };

  it("renders Paint component with default props", () => {
    render(<Paint {...defaultProps} />);
    const canvas = screen.getByTestId("paint-canvas");
    const clearButton = screen.getByTestId("clear-drawing");

    expect(canvas).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  it("clears the canvas when the clear button is clicked", () => {
    render(<Paint {...defaultProps} />);
    const clearButton = screen.getByTestId("clear-drawing");

    fireEvent.click(clearButton);

    expect(defaultProps.onChange).toHaveBeenCalledWith([]);
  });
});
