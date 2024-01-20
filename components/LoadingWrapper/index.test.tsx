import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { LoadingWrapper } from ".";

describe("LoadingWrapper component", () => {
  const defaultProps = {
    loading: true,
    children: <div data-testid="content">Content</div>,
  };

  it("renders LoadingWrapper component with loading spinner", () => {
    render(<LoadingWrapper {...defaultProps} />);
    const loadingSpinner = screen.getByTestId("loading-wrapper");
    expect(loadingSpinner).toBeInTheDocument();
  });

  it("renders content when loading is false", () => {
    render(
      <LoadingWrapper loading={false}>{defaultProps.children}</LoadingWrapper>
    );
    const contentElement = screen.getByTestId("content");

    expect(contentElement).toBeInTheDocument();
  });

  it("do not render content when loading is true", () => {
    render(<LoadingWrapper {...defaultProps} />);
    const contentElement = screen.queryByTestId("content");

    expect(contentElement).not.toBeInTheDocument();
  });

  it("renders overlay when overContainer prop is true", () => {
    render(<LoadingWrapper {...defaultProps} overContainer={true} />);
    const overlay = screen.getByTestId("loading-wrapper-overlay");

    expect(overlay).toBeInTheDocument();
  });

  it("applies full screen styles when fullScreen prop is true", () => {
    render(<LoadingWrapper {...defaultProps} fullScreen={true} />);
    const container = screen.getByTestId("loading-wrapper");

    expect(container).toHaveStyle({
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    });
  });
});
