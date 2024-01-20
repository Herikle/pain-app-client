import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { Badge } from ".";
import { IconsPath } from "@utils/icons";

describe("Badge component", () => {
  const defaultProps = {
    label: "John Doe",
    iconPath: IconsPath.Animal,
  };

  it("renders Badge component with label and icon", () => {
    render(<Badge {...defaultProps} />);
    const badge = screen.getByText(/John Doe/i);
    const icon = screen.getByTestId("badge-icon");

    expect(badge).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    const description = "Description text";
    render(<Badge {...defaultProps} description={description} />);
    const descriptionElement = screen.getByText(description);

    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders edit icon when onClickEdit is provided", () => {
    const onClickEditMock = jest.fn();
    render(<Badge {...defaultProps} onClickEdit={onClickEditMock} />);
    const editIcon = screen.getByTestId("badge-edit-icon");

    expect(editIcon).toBeInTheDocument();
  });

  it("calls onClickEdit callback when edit icon is clicked", () => {
    const onClickEditMock = jest.fn();
    render(<Badge {...defaultProps} onClickEdit={onClickEditMock} />);
    const editIcon = screen.getByTestId("badge-edit-icon");

    fireEvent.click(editIcon);

    expect(onClickEditMock).toHaveBeenCalledTimes(1);
  });

  it("applies hover styles when hovered", () => {
    const onClickEditMock = jest.fn();
    render(<Badge {...defaultProps} onClickEdit={onClickEditMock} />);
    const container = screen.getByTestId("badge-container");

    fireEvent.mouseEnter(container);

    const editIcon = screen.getByTestId("badge-edit-icon");

    expect(editIcon).toHaveStyle({ opacity: "1" });
  });
});
