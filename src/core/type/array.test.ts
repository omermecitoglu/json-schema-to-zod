import { describe, expect, it } from "vitest";
import { handleZodArray } from "./array";

describe("handleZodArray", () => {
  it("should handle array schemas", () => {
    expect(() => handleZodArray({ type: "string" })).toThrow("Invalid schema type for Zod array handler");
    expect(handleZodArray({
      type: "array", items: [
        { type: "string" },
        { type: "number" },
      ],
    })).toStrictEqual({
      dependencies: [],
      body: "z.ZodArray<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>>",
    });
    expect(handleZodArray({
      type: "array",
      items: { type: "string" },
    })).toStrictEqual({
      dependencies: [],
      body: "z.ZodArray<z.ZodString>",
    });
  });
});
