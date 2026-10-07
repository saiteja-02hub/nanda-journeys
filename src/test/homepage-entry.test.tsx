import { describe, expect, it } from "vitest";
import { getRouter } from "@/router";
import { business, destinations, fleet, navItems, reviews, services, whatsappUrl } from "@/config/business";

describe("Homepage refinement safeguards", () => {
  it("keeps the root homepage and does not restore saved section scroll", () => {
    const router = getRouter();
    expect(router.options.scrollRestoration).toBe(false);
    expect(router.matchRoutes("/").at(-1)?.routeId).toBe("/");
  });
  it("preserves business actions and complete content collections", () => {
    expect(business.phoneDisplay).toBe("+91 63047 26918");
    expect(whatsappUrl("Airport enquiry")).toBe("https://wa.me/916304726918?text=Airport%20enquiry");
    expect(services).toHaveLength(8);
    expect(fleet).toEqual(["Sedan", "SUV", "Innova", "Innova Crysta"]);
    expect(destinations).toHaveLength(10);
    expect(reviews).toHaveLength(3);
    expect(navItems).toHaveLength(8);
    expect(navItems).toContainEqual(["About Us", "#about"]);
  });
});