import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageProvider, useLanguage } from "@/components/LanguageProvider";
import { isLanguage, languages, languageStorageKey, translate } from "@/config/translations";
import { business, reviews, whatsappUrl } from "@/config/business";
import { QuotePopup } from "@/components/QuotePopup";

function Selection() {
  const { language, setLanguage } = useLanguage();
  return <><output aria-label="Selected language">{language}</output>{languages.map(item => <button key={item.code} onClick={() => setLanguage(item.code)}>{item.label}</button>)}</>;
}

describe("Website language selection", () => {
  beforeEach(() => { localStorage.clear(); sessionStorage.clear(); });
  afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });

  it("offers exactly English, Telugu and Hindi", () => {
    expect(languages.map(item => item.code)).toEqual(["en", "te", "hi"]);
    expect(isLanguage("fr")).toBe(false);
  });

  it("remembers the customer's language selection after remounting", () => {
    const view = render(<LanguageProvider><Selection /></LanguageProvider>);
    fireEvent.click(screen.getByRole("button", { name: "తెలుగు" }));
    expect(localStorage.getItem(languageStorageKey)).toBe("te");
    view.unmount();
    render(<LanguageProvider><Selection /></LanguageProvider>);
    expect(screen.getByLabelText("Selected language")).toHaveTextContent("te");
    expect(document.documentElement.lang).toBe("te");
    fireEvent.click(screen.getByRole("button", { name: "हिन्दी" }));
    expect(document.documentElement.lang).toBe("hi");
    fireEvent.click(screen.getByRole("button", { name: "English" }));
    expect(document.documentElement.lang).toBe("en");
  });

  it.each(["te", "hi"] as const)("preserves customer reviews and contact targets in %s", language => {
    for (const review of reviews) expect(translate(language, review)).toBe(review);
    expect(translate(language, business.name)).toBe("NANDA TOURS & TRAVELS");
    expect(business.phoneHref).toBe("tel:6304726918");
    expect(business.phone2Href).toBe("tel:8121164499");
    expect(whatsappUrl("Test")).toBe("https://wa.me/916304726918?text=Test");
  });

  it.each(["te", "hi"] as const)("keeps quote handoff working with %s selected", language => {
    localStorage.setItem(languageStorageKey, language);
    vi.useFakeTimers();
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<LanguageProvider><QuotePopup /></LanguageProvider>);
    vi.advanceTimersByTime(2000);
    // Flush the timed dialog state through an explicit React event cycle.
    fireEvent.click(document.body);
    const form = document.querySelector("form");
    if (!form) throw new Error("Quote form did not open");
    fireEvent.change(screen.getByLabelText(translate(language, "Your name")), { target: { value: "Test customer" } });
    fireEvent.change(screen.getByLabelText(translate(language, "Phone number")), { target: { value: "9000000000" } });
    fireEvent.change(screen.getByLabelText(translate(language, "Vehicle category")), { target: { value: "Innova Crysta" } });
    fireEvent.submit(form);
    expect(decodeURIComponent(String(open.mock.calls[0]?.[0]))).toContain("Name: Test customer\nPhone: 9000000000\nVehicle category: Innova Crysta");
  });
});