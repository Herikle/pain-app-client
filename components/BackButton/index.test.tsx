import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { BackButton } from ".";
import { theme } from "@styles/theme";

describe("BackButton component", () => {
  it("renders BackButton component", () => {
    render(<BackButton text="Go Back" />);
    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();
  });

  it("calls onClick callback when button is clicked", () => {
    const onClickMock = jest.fn();
    render(<BackButton text="Go Back" onClick={onClickMock} />);

    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders a link when href prop is provided", () => {
    const testHref = "/test";
    render(<BackButton text="Go Back" href={testHref} />);

    const linkElement = screen.getByTestId("back-button-link");
    expect(linkElement).toBeInTheDocument();
  });

  it("renders the BackIcon with the correct background color", () => {
    render(<BackButton text="Go Back" />);
    const backIcon = screen.getByTestId("back-button-icon");

    expect(backIcon).toHaveAttribute("fill", theme.colors.font_color);
  });

  it("renders the Text component with the correct color", () => {
    render(<BackButton text="Go Back" />);
    const textElement = screen.getByText("Go Back");

    expect(textElement).toHaveStyle({ color: theme.colors.text_switched });
  });
});
