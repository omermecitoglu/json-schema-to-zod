import type { Definition } from "~/types/definition";
import { handleZodArray } from "./type/array";
import { handleZodInteger } from "./type/integer";
import { handleZodNumber } from "./type/number";
import { handleZodObject } from "./type/object";
import { handleZodString } from "./type/string";
import { handleZodUnion } from "./type/union";
import type { SchemaObject } from "@omer-x/json-schema-types";

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
      return handleZodInteger(jsonSchema);
    case "number":
      return handleZodNumber(jsonSchema);
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
