import { describe, expect, it } from "vitest";
import { handleZodString } from "./string";

describe("handleZodString", () => {
  it("should handle string schemas", () => {
    expect(() => handleZodString({ type: "number" })).toThrow("Invalid schema type for Zod string handler");
  });

  it("should handle email format", () => {
    expect(handleZodString({ type: "string", format: "email" })).toStrictEqual({
      dependencies: [],
      body: "z.email()",
    });
  });

  it("should handle date-time format", () => {
    expect(handleZodString({ type: "string", format: "date-time" })).toStrictEqual({
      dependencies: [],
      body: "z.iso.datetime()",
    });
  });

  it("should handle date format", () => {
    expect(handleZodString({ type: "string", format: "date" })).toStrictEqual({
      dependencies: [],
      body: "z.iso.date()",
    });
  });

  it("should handle ipv4 format", () => {
    expect(handleZodString({ type: "string", format: "ipv4" })).toStrictEqual({
      dependencies: [],
      body: "z.ipv4()",
    });
  });

  it("should handle ipv6 format", () => {
    expect(handleZodString({ type: "string", format: "ipv6" })).toStrictEqual({
      dependencies: [],
      body: "z.ipv6()",
    });
  });

  it("should handle uuid format", () => {
    expect(handleZodString({ type: "string", format: "uuid" })).toStrictEqual({
      dependencies: [],
      body: "z.uuid()",
    });
  });

  it("should handle uri format", () => {
    expect(handleZodString({ type: "string", format: "uri" })).toStrictEqual({
      dependencies: [],
      body: "z.url()",
    });
  });

  it("should handle default string type", () => {
    expect(handleZodString({ type: "string" })).toStrictEqual({
      dependencies: [],
      body: "z.string()",
    });
  });
});
