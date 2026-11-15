import { describe, expect, it } from "vitest";
import { CONTEXT_ENGINE_VERSION } from "../src";

describe("public entry point", () => {
  it("exports the package version", () => {
    expect(CONTEXT_ENGINE_VERSION).toBe("0.1.0");
  });
});
