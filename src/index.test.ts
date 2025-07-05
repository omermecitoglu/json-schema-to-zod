import { describe, expect, it } from "vitest";
import { generateZodSchema } from "./index";

describe("generateZodSchema", () => {
  it("should be a function", () => {
    expect(typeof generateZodSchema).toBe("function");
  });
});
