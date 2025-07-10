import { describe, expect, it } from "vitest";
import { handleZodObject } from "./object";

describe("handleZodObject", () => {
  it("throws on non-object schema type", () => {
    expect(() => handleZodObject({ type: "string" })).toThrow("Invalid schema type for Zod object handler");
  });

  it("creates ZodObject with all optional properties when 'required' is not specified", () => {
    expect(handleZodObject({
      type: "object",
      properties: {
        name: { type: "string" },
        age: { type: "integer" },
      },
      additionalProperties: false,
    })).toStrictEqual({
      dependencies: [],
      body: "z.ZodObject<{\n\tname: z.ZodOptional<z.ZodString>,\n\tage: z.ZodOptional<z.ZodInt>,\n}>",
    });
  });

  it("creates ZodObject with required and optional properties based on 'required' array", () => {
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
      body: "z.ZodObject<{\n\tname: z.ZodString,\n\tage: z.ZodOptional<z.ZodInt>,\n}>",
    });
  });

  it("returns ZodObject with empty shape for object schemas without properties", () => {
    expect(handleZodObject({
      type: "object",
      additionalProperties: false,
    })).toStrictEqual({
      dependencies: [],
      body: "z.ZodObject<{}>",
    });
  });

  it("returns ZodRecord<z.ZodString, z.ZodUnknown> for object schemas with additionalProperties: true", () => {
    expect(handleZodObject({
      additionalProperties: true,
      type: "object",
    })).toStrictEqual({
      dependencies: [],
      body: "z.ZodRecord<z.ZodString, z.ZodUnknown>",
    });
  });

  it("returns ZodRecord with value type for object schemas with additionalProperties as a schema", () => {
    expect(handleZodObject({
      additionalProperties: {
        type: "string",
      },
      type: "object",
    })).toStrictEqual({
      dependencies: [],
      body: "z.ZodRecord<z.ZodString, z.ZodString>",
    });
  });
});
