import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { CallToAction } from ".";

describe("CallToAction component", () => {
  const defaultProps = {
    text1: "Hello",
    text2: "World",
    onClick: jest.fn(),
  };

  it("renders CallToAction component with default props", () => {
    render(<CallToAction {...defaultProps} />);
    const text1Element = screen.getByText(/Hello/i);
    const text2Element = screen.getByText(/World/i);
    const plusContainer = screen.getByTestId("call-to-action-plus-container");

    expect(text1Element).toBeInTheDocument();
    expect(text2Element).toBeInTheDocument();
    expect(plusContainer).toBeInTheDocument();
  });

  it("renders Link when href prop is provided", () => {
    const testHref = "/test";
    render(<CallToAction {...defaultProps} href={testHref} />);
    const linkElement = screen.getByTestId("call-to-action-link");

    expect(linkElement).toBeInTheDocument();
  });

  it("calls onClick callback when PlusContainer is clicked", () => {
    render(<CallToAction {...defaultProps} />);
    const plusContainer = screen.getByTestId("call-to-action-plus-container");

    fireEvent.click(plusContainer);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("renders AddButton with loading prop", () => {
    render(<CallToAction {...defaultProps} loading={true} />);
    const addButton = screen.getByTestId("add-button");

    expect(addButton).toBeInTheDocument();
  });
});
