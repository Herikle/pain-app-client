import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Button } from ".";
import { theme } from "@styles/theme";

describe("Button component", () => {
  const defaultProps = {
    children: "Click me",
    onClick: jest.fn(),
  };

  it("renders Button component with default styles", () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByTestId("button-container");

    expect(button).toBeInTheDocument();
  });

  it("renders Button component with outlined variant", () => {
    render(<Button {...defaultProps} variant="outlined" />);
    const button = screen.getByTestId("button-container");

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ "border-color": theme.colors.pure_white });
  });

  it("calls onClick callback when button is clicked", () => {
    render(<Button {...defaultProps} />);
    const button = screen.getByTestId("button-container");

    fireEvent.click(button);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("applies loading styles when loading prop is true", async () => {
    render(<Button {...defaultProps} loading={true} />);
    const button = screen.getByTestId("button-container");
    const loadingWrapper = screen.getByTestId("button-container-loading");

    const ovalSvgLoading = screen.getByTestId("oval-svg");

    expect(ovalSvgLoading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(loadingWrapper).toBeInTheDocument();
  });

  it("applies custom width styles when width prop is provided", () => {
    render(<Button {...defaultProps} width="200px" />);
    const button = screen.getByTestId("button-container");

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({ width: "200px" });
  });
});
