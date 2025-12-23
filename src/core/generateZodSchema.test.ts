import { describe, expect, it } from "vitest";
import { generateZodSchema } from "./generateZodSchema";
import type { SchemaObject } from "@omer-x/json-schema-types";

describe("generateZodSchema", () => {
  it("should handle primitive types", () => {
    expect(generateZodSchema({ type: "boolean" })).toStrictEqual({ dependencies: [], body: "z.boolean()" });
    expect(generateZodSchema({ type: "null" })).toStrictEqual({ dependencies: [], body: "z.null()" });
    expect(generateZodSchema({ type: "integer" })).toStrictEqual({ dependencies: [], body: "z.int()" });
    expect(generateZodSchema({ type: "number" })).toStrictEqual({ dependencies: [], body: "z.number()" });
    expect(generateZodSchema({ type: "string" })).toStrictEqual({ dependencies: [], body: "z.string()" });
  });

  it("should handle $ref schemas", () => {
    const schema = { $ref: "#/components/schemas/MyComponent" };
    expect(generateZodSchema(schema)).toStrictEqual({ dependencies: ["MyComponent"], body: "MyComponent" });
  });

  it("should throw an error for invalid $ref schemas", () => {
    const schema = { $ref: "#/components/schemas/" };
    expect(() => generateZodSchema(schema)).toThrow("Invalid $ref in schema");
  });

  it("should handle union schemas", () => {
    const input = { anyOf: [{ type: "string" }, { type: "boolean" }] } as SchemaObject;
    expect(generateZodSchema(input)).toStrictEqual({
      dependencies: [],
      body: "z.union([z.string(), z.boolean()])",
    });
  });

  it("should handle oneOf schemas", () => {
    const input = { oneOf: [{ type: "string" }, { type: "boolean" }] } as SchemaObject;
    expect(generateZodSchema(input)).toStrictEqual({
      dependencies: [],
      body: "z.union([z.string(), z.boolean()])",
    });
  });

  it("should handle array schemas", () => {
    expect(generateZodSchema({
      type: "array",
      items: { type: "string" },
    })).toStrictEqual({
      dependencies: [], body: "z.array(z.string())",
    });
  });

  it("should handle object schemas", () => {
    expect(generateZodSchema({
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
      additionalProperties: false,
    })).toStrictEqual({
      dependencies: [],
      body: "z.strictObject({\n\tname: z.string().optional(),\n\tage: z.int().optional(),\n})",
    });
  });

  it("should handle schemas without type", () => {
    const input = { title: "Whatever" } as unknown as SchemaObject;
    expect(generateZodSchema(input)).toStrictEqual({ dependencies: [], body: "z.unknown()" });
  });
});
