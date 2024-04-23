import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Select } from ".";

describe("Select component", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];

  const getLabel = (option: any) => option.label;
  const getValue = (option: any) => option.value;
  const id = "test-select";

  it("renders Select component with label", () => {
    render(
      <Select
        options={options}
        getLabel={getLabel}
        getValue={getValue}
        id={id}
        label="Test Label"
      />
    );

    const selectLabel = screen.getByText("Test Label");
    expect(selectLabel).toBeInTheDocument();
  });

  it("calls onChange callback when an option is selected", () => {
    const onChangeMock = jest.fn();
    render(
      <Select
        options={options}
        getLabel={getLabel}
        getValue={getValue}
        id={id}
        onChange={onChangeMock}
      />
    );

    const selectInput = screen.getByRole("combobox");

    fireEvent.change(selectInput, { target: { value: "2" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("displays error message when error prop is provided", () => {
    render(
      <Select
        options={options}
        getLabel={getLabel}
        getValue={getValue}
        id={id}
        error="Error Message"
      />
    );

    const errorMessage = screen.getByText("Error Message");
    expect(errorMessage).toBeInTheDocument();
  });
});
