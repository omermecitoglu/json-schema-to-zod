import { describe, expect, it } from "vitest";
import { handleZodNumber } from "./number";

describe("handleZodNumber", () => {
  it("should handle number schemas", () => {
    expect(() => handleZodNumber({ type: "string" })).toThrow("Invalid schema type for Zod number handler");
  });

  it("should generate Zod number schema with exclusive minimum", () => {
    const schema = handleZodNumber({
      type: "number",
      exclusiveMinimum: 5,
    });
    expect(schema).toEqual({
      dependencies: [],
      body: "z.number().gt(5)",
    });
  });

  it("should generate Zod number schema with exclusive maximum", () => {
    const schema = handleZodNumber({
      type: "number",
      exclusiveMaximum: 10,
    });
    expect(schema).toEqual({
      dependencies: [],
      body: "z.number().lt(10)",
    });
  });

  it("should generate Zod number schema with both exclusive minimum and maximum", () => {
    const schema = handleZodNumber({
      type: "number",
      exclusiveMinimum: 5,
      exclusiveMaximum: 10,
    });
    expect(schema).toEqual({
      dependencies: [],
      body: "z.number().gt(5).lt(10)",
    });
  });

  it("should generate Zod number schema without exclusive constraints", () => {
    const schema = handleZodNumber({
      type: "number",
    });
    expect(schema).toEqual({
      dependencies: [],
      body: "z.number()",
    });
  });

  it("should generate Zod number schema with minimum", () => {
    const schema = handleZodNumber({
      type: "number",
      minimum: 3,
    });
    expect(schema).toEqual({
      dependencies: [],
      body: "z.number().gte(3)",
    });
  });

  it("should generate Zod number schema with maximum", () => {
    const schema = handleZodNumber({
      type: "number",
      maximum: 7,
    });
    expect(schema).toEqual({
      dependencies: [],
      body: "z.number().lte(7)",
    });
  });

  it("should generate Zod number schema with minimum and maximum", () => {
    const schema = handleZodNumber({
      type: "number",
      minimum: 1,
      maximum: 5,
    });
    expect(schema).toEqual({
      dependencies: [],
      body: "z.number().gte(1).lte(5)",
    });
  });
});
