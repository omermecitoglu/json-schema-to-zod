import type { Definition } from "~/types/definition";
import { handleZodArray } from "./type/array";
import { handleZodObject } from "./type/object";
import { handleZodString } from "./type/string";
import { handleZodUnion } from "./type/union";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function generateZodType(jsonSchema: SchemaObject): Definition {
  if ("$ref" in jsonSchema) {
    const [_, __, _category, componentName] = jsonSchema.$ref.split("/");
    if (!componentName) throw new Error("Invalid $ref in schema");
    return {
      dependencies: [componentName],
      body: componentName,
    };
  }
  if (jsonSchema.anyOf) return handleZodUnion(jsonSchema.anyOf);
  if (jsonSchema.oneOf) return handleZodUnion(jsonSchema.oneOf);
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
      return handleZodString(jsonSchema);
    case "object":
      return handleZodObject(jsonSchema);
    case "array":
      return handleZodArray(jsonSchema);
    default:
      return { dependencies: [], body: "z.ZodUnknown" };
  }
}
