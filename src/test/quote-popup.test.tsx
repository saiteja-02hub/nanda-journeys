import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuotePopup } from "@/components/QuotePopup";

describe("Timed quote popup", () => {
  beforeEach(() => { sessionStorage.clear(); vi.useFakeTimers(); });
  afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });

  it("opens after two seconds and stays dismissed during the visit", () => {
    const view = render(<QuotePopup />);
    act(() => { vi.advanceTimersByTime(1999); });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1); });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Close quote popup" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    view.unmount();
    render(<QuotePopup />);
    act(() => { vi.advanceTimersByTime(3000); });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("hands entered details and the confirmed vehicle category to WhatsApp", () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<QuotePopup />);
    act(() => { vi.advanceTimersByTime(2000); });
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Test customer" } });
    fireEvent.change(screen.getByLabelText("Phone number"), { target: { value: "9000000000" } });
    fireEvent.change(screen.getByLabelText("Vehicle category"), { target: { value: "Innova" } });
    fireEvent.click(screen.getByRole("button", { name: "Get a quote" }));
    const url = String(open.mock.calls[0]?.[0]);
    expect(url).toContain("https://wa.me/916304726918?text=");
    expect(decodeURIComponent(url)).toContain("Name: Test customer\nPhone: 9000000000\nVehicle category: Innova");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});