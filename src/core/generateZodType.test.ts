import { describe, expect, it } from "vitest";
import { generateZodType } from "./generateZodType";

describe("generateZodType", () => {
  it("should handle primitive types", () => {
    expect(generateZodType({ type: "boolean" })).toStrictEqual({ dependencies: [], body: "z.ZodBoolean" });
    expect(generateZodType({ type: "null" })).toStrictEqual({ dependencies: [], body: "z.ZodNull" });
    expect(generateZodType({ type: "integer" })).toStrictEqual({ dependencies: [], body: "z.ZodInt" });
    expect(generateZodType({ type: "number" })).toStrictEqual({ dependencies: [], body: "z.ZodNumber" });
    expect(generateZodType({ type: "string" })).toStrictEqual({ dependencies: [], body: "z.ZodString" });
  });

  it("should handle $ref schemas", () => {
    const schema = { $ref: "#/components/schemas/MyComponent" };
    expect(generateZodType(schema)).toStrictEqual({ dependencies: ["MyComponent"], body: "MyComponent" });
  });

  it("should throw an error for invalid $ref schemas", () => {
    const schema = { $ref: "#/components/schemas/" };
    expect(() => generateZodType(schema)).toThrow("Invalid $ref in schema");
  });

  it("should handle array schemas", () => {
    expect(generateZodType({
      type: "array",
      items: { type: "string" },
    })).toStrictEqual({
      dependencies: [], body: "z.ZodArray<z.ZodString>",
    });
  });

  it("should handle object schemas", () => {
    expect(generateZodType({
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
      required: ["name", "age"],
    })).toStrictEqual({
      dependencies: [],
      body: "z.ZodObject<{ name: z.ZodString, age: z.ZodInt }>",
    });
  });
});
