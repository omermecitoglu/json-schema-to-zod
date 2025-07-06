import { describe, expect, it } from "vitest";
import { handleZodInteger } from "./integer";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

describe("handleZodInteger", () => {
  it("should handle integer schemas", () => {
    expect(() => handleZodInteger({ type: "string" })).toThrow("Invalid schema type for Zod integer handler");
  });

  it("should generate Zod integer schema with exclusive minimum", () => {
    const schema = handleZodInteger({
      type: "integer",
      exclusiveMinimum: 5,
    } as unknown as SchemaObject);
    expect(schema).toEqual({
      dependencies: [],
      body: "z.int().gt(5)",
    });
  });

  it("should generate Zod integer schema with exclusive maximum", () => {
    const schema = handleZodInteger({
      type: "integer",
      exclusiveMaximum: 10,
    } as unknown as SchemaObject);
    expect(schema).toEqual({
      dependencies: [],
      body: "z.int().lt(10)",
    });
  });

  it("should generate Zod integer schema with both exclusive minimum and maximum", () => {
    const schema = handleZodInteger({
      type: "integer",
      exclusiveMinimum: 5,
      exclusiveMaximum: 10,
    } as unknown as SchemaObject);
    expect(schema).toEqual({
      dependencies: [],
      body: "z.int().gt(5).lt(10)",
    });
  });

  it("should generate Zod integer schema without exclusive constraints", () => {
    const schema = handleZodInteger({
      type: "integer",
    });
    expect(schema).toEqual({
      dependencies: [],
      body: "z.int()",
    });
  });

  it("should generate Zod integer schema with minimum", () => {
    const schema = handleZodInteger({
      type: "integer",
      minimum: 1,
    } as unknown as SchemaObject);
    expect(schema).toEqual({
      dependencies: [],
      body: "z.int().gte(1)",
    });
  });

  it("should generate Zod integer schema with maximum", () => {
    const schema = handleZodInteger({
      type: "integer",
      maximum: 100,
    } as unknown as SchemaObject);
    expect(schema).toEqual({
      dependencies: [],
      body: "z.int().lte(100)",
    });
  });
});
