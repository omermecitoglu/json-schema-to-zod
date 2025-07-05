import { describe, expect, it } from "vitest";
import { generateZodSchema, generateZodType } from "./index";

describe("generateZodSchema", () => {
  it("should be a function", () => {
    expect(typeof generateZodSchema).toBe("function");
  });
});

describe("generateZodType", () => {
  it("should be a function", () => {
    expect(typeof generateZodType).toBe("function");
  });
});
