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

  it("should not return duplicated dependency names", () => {
    const output = handleZodArray({
      type: "array",
      items: [
        { $ref: "#/components/schemas/Schema1" },
        { $ref: "#/components/schemas/Schema1" },
      ],
    });
    expect(output.dependencies).not.toStrictEqual([
      "Schema1", "Schema1",
    ]);
    expect(output.dependencies).toStrictEqual([
      "Schema1",
    ]);
  });
});
