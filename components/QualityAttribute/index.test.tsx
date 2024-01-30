import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { QualityAttribute } from ".";
import { IconsPath } from "@utils/icons";
import { theme } from "@styles/theme";

describe("QualityAttribute component", () => {
  const defaultProps = {
    iconPath: IconsPath.Animal,
    label: "Test Label",
    description: "Test Description",
    value: "test-value",
    onClick: jest.fn(),
    isSelected: false,
    isNotSelected: false,
    iconSize: 32,
  };

  it("renders QualityAttribute component with default props", () => {
    render(<QualityAttribute {...defaultProps} />);
    const container = screen.getByTestId("quality-attribute-container");
    const image = screen.getByTestId("quality-attribute-icon");
    const label = screen.getByTestId("quality-attribute-label");
    const description = screen.getByTestId("quality-attribute-description");

    expect(container).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("calls onClick callback when QualityAttribute is clicked", () => {
    render(<QualityAttribute {...defaultProps} />);
    const container = screen.getByTestId("quality-attribute-container");

    fireEvent.click(container);

    expect(defaultProps.onClick).toHaveBeenCalledWith("test-value");
  });

  it("applies selected styles when isSelected prop is true", () => {
    render(<QualityAttribute {...defaultProps} isSelected={true} />);
    const container = screen.getByTestId("quality-attribute-container");

    expect(container).toHaveStyle({
      backgroundColor: theme.colors.hover_state,
    });
  });

  // it("applies hover styles when the component is hovered", () => {
  //   render(<QualityAttribute {...defaultProps} />);
  //   const container = screen.getByTestId("quality-attribute-container");

  //   fireEvent.mouseEnter(container);

  //   expect(container).toHaveStyle({
  //     opacity: 1,
  //   });
  // });
});
