import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddButton } from ".";
import { theme } from "@styles/theme";

describe("AddButton component", () => {
  it("renders AddButton component", () => {
    render(<AddButton />);
    const addButton = screen.getByTestId("add-button");
    expect(addButton).toBeInTheDocument();
  });

  it("calls onClick callback when button is clicked", () => {
    const onClickMock = jest.fn();
    render(<AddButton onClick={onClickMock} />);

    const addButton = screen.getByTestId("plus-circle");
    fireEvent.click(addButton);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("renders a link when href prop is provided", () => {
    const testHref = "/test";
    render(<AddButton href={testHref} />);

    const link = screen.getByRole("link");

    expect(link).toBeInTheDocument();
  });

  it("applies the correct color when loading is true", () => {
    render(<AddButton loading={true} />);
    const plusCircle = screen.getByTestId("plus-circle");

    expect(plusCircle).toHaveAttribute("fill", theme.colors.disabled_color);
  });

  it("applies the correct color when color prop is provided", () => {
    render(<AddButton color="font_color" />);
    const plusCircle = screen.getByTestId("plus-circle");

    expect(plusCircle).toHaveAttribute("fill", theme.colors.font_color);
  });

  it("applies the correct color when loading is false and color prop is not provided", () => {
    render(<AddButton />);
    const plusCircle = screen.getByTestId("plus-circle");

    expect(plusCircle).toHaveAttribute("fill", theme.colors.primary);
  });
});
