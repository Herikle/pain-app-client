import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { MenuLink } from ".";
import { HourglassMedium } from "@phosphor-icons/react";

describe("MenuLink component", () => {
  const defaultProps = {
    label: "Home",
    PhosphorIcon: HourglassMedium,
    description: "Link to the home page",
    fullWidth: false,
    href: "/home",
    onClick: jest.fn(),
    disabled: false,
    notAllowed: false,
  };

  it("renders MenuLink component with default props", () => {
    render(<MenuLink {...defaultProps} />);
    const link = screen.getByTestId("menu-link-link");
    const icon = screen.getByTestId("menu-link-phosporicon");
    const description = screen.getByText(/Link to the home page/i);

    expect(link).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it("renders Link when href prop is provided and notAllowed is false", () => {
    render(<MenuLink {...defaultProps} />);
    const link = screen.getByTestId("menu-link-link");

    expect(link).toBeInTheDocument();
  });

  it("calls onClick callback when MenuLink is clicked", () => {
    render(<MenuLink {...defaultProps} />);
    const linkContainer = screen.getByTestId("menu-link-container");

    fireEvent.click(linkContainer);

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("applies disabled styles when disabled prop is true", () => {
    render(<MenuLink {...defaultProps} disabled={true} />);
    const linkContainer = screen.getByTestId("menu-link-container");

    expect(linkContainer).toHaveStyle({ opacity: "0.5" });
  });

  it("applies notAllowed styles when notAllowed prop is true", () => {
    render(<MenuLink {...defaultProps} notAllowed={true} />);
    const linkContainer = screen.getByTestId("menu-link-container");
    expect(linkContainer).toHaveStyle({ cursor: "not-allowed" });
  });
});
