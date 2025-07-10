import { describe, expect, it } from "vitest";
import { handleZodObject } from "./object";

describe("handleZodObject", () => {
  it("throws for non-object type and generates strict object with optional properties", () => {
    expect(() => handleZodObject({ type: "string" })).toThrow("Invalid schema type for Zod object handler");
    expect(handleZodObject({
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

  it("generates strict object with required and optional properties", () => {
    expect(handleZodObject({
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
      required: ["name"],
      additionalProperties: false,
    })).toStrictEqual({
      dependencies: [],
      body: "z.strictObject({\n\tname: z.string(),\n\tage: z.int().optional(),\n})",
    });
  });

  it("generates strict object for empty object schema", () => {
    expect(handleZodObject({
      type: "object",
      additionalProperties: false,
    })).toStrictEqual({
      dependencies: [],
      body: "z.strictObject({})",
    });
  });

  it("generates record schema for object with only additionalProperties true", () => {
    expect(handleZodObject({
      additionalProperties: true,
      type: "object",
    })).toStrictEqual({
      dependencies: [],
      body: "z.record(z.string(), z.unknown())",
    });
  });

  it("generates record schema for object with only additionalProperties as a schema", () => {
    expect(handleZodObject({
      additionalProperties: {
        type: "string",
      },
      type: "object",
    })).toStrictEqual({
      dependencies: [],
      body: "z.record(z.string(), z.string())",
    });
  });

  it("generates looseObject for object with properties and additionalProperties true", () => {
    expect(handleZodObject({
      type: "object",
      properties: {
        key1: { type: "string" },
      },
      required: ["key1"],
      additionalProperties: true,
    })).toStrictEqual({
      dependencies: [],
      body: "z.looseObject({\n\tkey1: z.string(),\n})",
    });
  });

  it("generates object with catchall for properties and additionalProperties as a schema", () => {
    expect(handleZodObject({
      type: "object",
      properties: {
        key1: { type: "string" },
      },
      required: ["key1"],
      additionalProperties: {
        type: "string",
      },
    })).toStrictEqual({
      dependencies: [],
      body: "z.object({\n\tkey1: z.string(),\n}).catchall(z.string())",
    });
  });
});
