import { describe, expect, it } from "vitest";
import { getRouter } from "@/router";
import { business, destinations, fleet, navItems, reviews, services, trustStats, whatsappUrl } from "@/config/business";

describe("Homepage refinement safeguards", () => {
  it("keeps the root homepage and does not restore saved section scroll", () => {
    const router = getRouter();
    expect(router.options.scrollRestoration).toBe(false);
    expect(router.matchRoutes("/").at(-1)?.routeId).toBe("/");
  });
  it("preserves business actions and complete content collections", () => {
    expect(business.phoneDisplay).toBe("+91 63047 26918");
    expect(business.reviewCount).toBe(223);
    expect(trustStats).toHaveLength(4);
    expect(trustStats.some((stat) => stat.label === "Customer Focus")).toBe(false);
    expect(trustStats.some((stat) => stat.value === "28+" && stat.note === "Since 1998")).toBe(true);
    expect(whatsappUrl("Airport enquiry")).toBe("https://wa.me/916304726918?text=Airport%20enquiry");
    expect(services).toHaveLength(8);
    expect(fleet).toEqual(["Sedan", "SUV", "Innova", "Innova Crysta"]);
    expect(destinations).toHaveLength(10);
    expect(reviews).toHaveLength(5);
    expect(navItems).toHaveLength(8);
    expect(navItems).toContainEqual(["About Us", "#about"]);
  });
});