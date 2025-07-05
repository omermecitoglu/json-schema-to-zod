import { describe, expect, it } from "vitest";
import { generateZodSchema } from "./generateZodSchema";

describe("generateZodSchema", () => {
  it("should return a Zod schema", () => {
    expect(generateZodSchema({ type: "boolean" })).toStrictEqual({ dependencies: [], body: "z.boolean()" });
    expect(generateZodSchema({ type: "null" })).toStrictEqual({ dependencies: [], body: "z.null()" });
    expect(generateZodSchema({ type: "integer" })).toStrictEqual({ dependencies: [], body: "z.int()" });
    expect(generateZodSchema({ type: "number" })).toStrictEqual({ dependencies: [], body: "z.number()" });
    expect(generateZodSchema({ type: "string" })).toStrictEqual({ dependencies: [], body: "z.string()" });
    expect(generateZodSchema({ type: "object", properties: {} })).toStrictEqual({ dependencies: [], body: "z.object({})" });
    expect(generateZodSchema({ type: "array", items: [] })).toStrictEqual({ dependencies: [], body: "z.array()" });
  });
});
