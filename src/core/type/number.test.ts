import { describe, expect, it } from "vitest";
import { handleZodNumber } from "./number";

describe("handleZodNumber", () => {
  it("should handle number schemas", () => {
    expect(() => handleZodNumber({ type: "string" })).toThrow("Invalid schema type for Zod number handler");
  });

  it("should handle number type", () => {
    expect(handleZodNumber({ type: "number" })).toStrictEqual({
      dependencies: [],
      body: "z.ZodNumber",
    });
  });

  it("should handle const value", () => {
    expect(handleZodNumber({ type: "number", const: 42 })).toStrictEqual({
      dependencies: [],
      body: "z.ZodLiteral<42>",
    });
  });
});
