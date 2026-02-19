import { describe, expect, it } from "vitest";
import { handleZodInteger } from "./integer";

describe("handleZodInteger", () => {
  it("should handle integer schemas", () => {
    expect(() => handleZodInteger({ type: "string" })).toThrow("Invalid schema type for Zod integer handler");
  });

  it("should handle integer type", () => {
    expect(handleZodInteger({ type: "integer" })).toStrictEqual({
      dependencies: [],
      body: "z.ZodInt",
    });
  });

  it("should handle const value", () => {
    expect(handleZodInteger({ type: "integer", const: 42 })).toStrictEqual({
      dependencies: [],
      body: "z.ZodLiteral<42>",
    });
  });
});
