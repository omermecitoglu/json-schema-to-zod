import type { Definition } from "~/types/definition";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function generateZodType(jsonSchema: SchemaObject): Definition {
  if ("$ref" in jsonSchema) {
    return { dependencies: [], body: "" };
  }
  if (jsonSchema.anyOf) return { dependencies: [], body: "" };
  if (jsonSchema.oneOf) return { dependencies: [], body: "" };
  switch (jsonSchema.type) {
    case "boolean":
      return { dependencies: [], body: "z.ZodBoolean" };
    case "null":
      return { dependencies: [], body: "z.ZodNull" };
    case "integer":
      return { dependencies: [], body: "z.ZodInt" };
    case "number":
      return { dependencies: [], body: "z.ZodNumber" };
    case "string":
      return { dependencies: [], body: "z.ZodString" };
    case "object":
      return { dependencies: [], body: "z.ZodObject<{}>" };
    case "array":
      return { dependencies: [], body: "z.ZodArray<unknown>" };
  }
}
