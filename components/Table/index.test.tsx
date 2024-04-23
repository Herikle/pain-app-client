import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Table } from ".";
import { RecoilRoot } from "recoil";

function ProvidersWrapper({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}

function renderWithRecoil(component, options: any = {}) {
  return render(component, { wrapper: ProvidersWrapper, ...options });
}

describe("Table component", () => {
  const columns = [
    { accessor: "id", label: "ID" },
    { accessor: "name", label: "Name" },
    { accessor: "age", label: "Age" },
  ];

  const data = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
  ];

  const mountHref = (item: any) => `/details/${item.id}`;

  const header = {
    title: "Table Header",
    onPlusClick: jest.fn(),
    plusHref: "/add",
    loading: false,
  };

  const CallToAction = <div data-testid="call-to-action">No data found!</div>;

  const isLoading = false;

  const pagination = {
    pages: 3,
    onChangePage: jest.fn(),
  };

  const addButtonProps = {
    "data-cy": "add-button",
  };

  it("renders Table component with data", () => {
    renderWithRecoil(
      <Table
        columns={columns}
        data={data}
        mountHref={mountHref}
        header={header}
        isLoading={isLoading}
        pagination={pagination}
        addButtonProps={addButtonProps}
      />
    );

    const tableHeader = screen.getByText("Table Header");
    const addButton = screen.getByTestId("add-button");
    const callToAction = screen.queryByTestId("call-to-action");

    expect(tableHeader).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
    expect(callToAction).not.toBeInTheDocument();

    const tableRows = screen.getAllByTestId("table-row");
    expect(tableRows.length).toBe(2);
  });

  it("renders Table component with no data and CallToAction", () => {
    renderWithRecoil(
      <Table
        columns={columns}
        data={[]}
        mountHref={mountHref}
        CallToAction={CallToAction}
        isLoading={isLoading}
      />
    );

    const callToAction = screen.getByTestId("call-to-action");
    expect(callToAction).toBeInTheDocument();
  });

  it("invokes onPlusClick callback when AddButton is clicked", () => {
    renderWithRecoil(
      <Table
        columns={columns}
        data={data}
        mountHref={mountHref}
        header={header}
        isLoading={isLoading}
      />
    );

    const addButton = screen.getByTestId("plus-circle");
    fireEvent.click(addButton);
    expect(header.onPlusClick).toHaveBeenCalledTimes(1);
  });
});
