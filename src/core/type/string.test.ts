import { describe, expect, it } from "vitest";
import { handleZodString } from "./string";

describe("handleZodString", () => {
  it("should handle string schemas", () => {
    expect(() => handleZodString({ type: "number" })).toThrow("Invalid schema type for Zod string handler");
  });

  it("should handle email format", () => {
    expect(handleZodString({ type: "string", format: "email" })).toStrictEqual({
      dependencies: [],
      body: "z.ZodEmail",
    });
  });

  it("should handle date-time format", () => {
    expect(handleZodString({ type: "string", format: "date-time" })).toStrictEqual({
      dependencies: [],
      body: "z.ZodISODateTime",
    });
  });

  it("should handle date format", () => {
    expect(handleZodString({ type: "string", format: "date" })).toStrictEqual({
      dependencies: [],
      body: "z.ZodISODate",
    });
  });

  it("should handle ipv4 format", () => {
    expect(handleZodString({ type: "string", format: "ipv4" })).toStrictEqual({
      dependencies: [],
      body: "z.ZodIPv4",
    });
  });

  it("should handle ipv6 format", () => {
    expect(handleZodString({ type: "string", format: "ipv6" })).toStrictEqual({
      dependencies: [],
      body: "z.ZodIPv6",
    });
  });

  it("should handle uuid format", () => {
    expect(handleZodString({ type: "string", format: "uuid" })).toStrictEqual({
      dependencies: [],
      body: "z.ZodUUID",
    });
  });

  it("should handle uri format", () => {
    expect(handleZodString({ type: "string", format: "uri" })).toStrictEqual({
      dependencies: [],
      body: "z.ZodURL",
    });
  });

  it("should handle default string type", () => {
    expect(handleZodString({ type: "string" })).toStrictEqual({
      dependencies: [],
      body: "z.ZodString",
    });
  });

  it("should handle string enum", () => {
    expect(handleZodString({ type: "string", enum: ["A", "B", "C"] })).toStrictEqual({
      dependencies: [],
      body: 'z.ZodEnum<{ "A": "A", "B": "B", "C": "C" }>',
    });
  });

  it("should handle empty string enum", () => {
    expect(handleZodString({ type: "string", enum: [] })).toStrictEqual({
      dependencies: [],
      body: "z.ZodEnum<{  }>",
    });
  });

  it("should handle constant string", () => {
    expect(handleZodString({ type: "string", const: "UNKNOWN_ERROR" })).toStrictEqual({
      dependencies: [],
      body: 'z.ZodLiteral<"UNKNOWN_ERROR">',
    });
  });
});
