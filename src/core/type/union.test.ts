import { describe, expect, it } from "vitest";
import { handleZodUnion } from "./union";

describe("handleZodUnion", () => {
  it("should handle union schemas", () => {
    expect(handleZodUnion([{ type: "string" }, { type: "number" }])).toStrictEqual({
      dependencies: [],
      body: "z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>",
    });
  });

  it("should not return duplicated dependency names", () => {
    const output = handleZodUnion([
      { $ref: "#/components/schemas/Schema1" },
      { $ref: "#/components/schemas/Schema1" },
    ]);
    expect(output.dependencies).not.toStrictEqual([
      "Schema1", "Schema1",
    ]);
    expect(output.dependencies).toStrictEqual([
      "Schema1",
    ]);
  });
});
