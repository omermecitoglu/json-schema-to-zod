import { describe, expect, it } from "vitest";
import { handleZodUnion } from "./union";

describe("handleZodUnion", () => {
  it("should handle union schemas", () => {
    expect(handleZodUnion([{ type: "string" }, { type: "number" }])).toStrictEqual({
      dependencies: [],
      body: "z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>",
    });
  });
});
