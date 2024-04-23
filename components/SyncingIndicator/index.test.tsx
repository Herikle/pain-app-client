import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SyncingIndicator } from ".";

describe("SyncingIndicator component", () => {
  it("renders SyncingIndicator component with online state", () => {
    render(<SyncingIndicator isSyncing={false} />);
    const image = screen.getByAltText("synced");
    expect(image).toBeInTheDocument();
  });

  it("renders SyncingIndicator component with offline state", async () => {
    render(<SyncingIndicator isSyncing={false} />);
    window.dispatchEvent(new Event("offline"));
    await waitFor(() => screen.getByAltText("unavailable"));
    const image = screen.getByAltText("unavailable");
    expect(image).toBeInTheDocument();
  });

  it("renders SyncingIndicator component with syncing state", () => {
    render(<SyncingIndicator isSyncing={true} />);
    const image = screen.getByAltText("syncing");
    expect(image).toBeInTheDocument();
  });
});
