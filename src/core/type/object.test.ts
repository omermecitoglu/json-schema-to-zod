import { describe, expect, it } from "vitest";
import { handleZodObject } from "./object";

describe("handleZodObject", () => {
  it("should handle object schemas", () => {
    expect(() => handleZodObject({ type: "string" })).toThrow("Invalid schema type for Zod object handler");
    expect(handleZodObject({
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
    })).toStrictEqual({
      dependencies: [],
      body: "z.ZodObject<{\n\tname: z.ZodOptional<z.ZodString>,\n\tage: z.ZodOptional<z.ZodInt>,\n}>",
    });
  });

  it("should handle required properties", () => {
    expect(handleZodObject({
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
      required: ["name"],
    })).toStrictEqual({
      dependencies: [],
      body: "z.ZodObject<{\n\tname: z.ZodString,\n\tage: z.ZodOptional<z.ZodInt>,\n}>",
    });
  });

  it("should handle empty object schemas", () => {
    expect(handleZodObject({
      type: "object",
    })).toStrictEqual({
      dependencies: [],
      body: "z.ZodObject<{\n}>",
    });
  });
});
