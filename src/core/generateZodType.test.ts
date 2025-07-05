import { describe, expect, it } from "vitest";
import { generateZodType } from "./generateZodType";

describe("generateZodType", () => {
  it("should return a Zod type definition", () => {
    expect(generateZodType({ type: "boolean" })).toStrictEqual({ dependencies: [], body: "z.ZodBoolean" });
    expect(generateZodType({ type: "null" })).toStrictEqual({ dependencies: [], body: "z.ZodNull" });
    expect(generateZodType({ type: "integer" })).toStrictEqual({ dependencies: [], body: "z.ZodInt" });
    expect(generateZodType({ type: "number" })).toStrictEqual({ dependencies: [], body: "z.ZodNumber" });
    expect(generateZodType({ type: "string" })).toStrictEqual({ dependencies: [], body: "z.ZodString" });
    expect(generateZodType({ type: "object", properties: {} })).toStrictEqual({ dependencies: [], body: "z.ZodObject<{}>" });
    expect(generateZodType({ type: "array", items: [] })).toStrictEqual({ dependencies: [], body: "z.ZodArray<unknown>" });
  });
});
