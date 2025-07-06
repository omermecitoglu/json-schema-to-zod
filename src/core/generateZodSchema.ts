import type { Definition } from "~/types/definition";
import { handleZodArray } from "./schema/array";
import { handleZodNumber } from "./schema/number";
import { handleZodObject } from "./schema/object";
import { handleZodString } from "./schema/string";
import { handleZodUnion } from "./schema/union";
import type { ReferenceObject } from "@omer-x/openapi-types/reference";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function generateZodSchema(jsonSchema: SchemaObject | ReferenceObject): Definition {
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
      return { dependencies: [], body: "z.boolean()" };
    case "null":
      return { dependencies: [], body: "z.null()" };
    case "integer":
      return { dependencies: [], body: "z.int()" };
    case "number":
      return handleZodNumber(jsonSchema);
    case "string":
      return handleZodString(jsonSchema);
    case "object":
      return handleZodObject(jsonSchema);
    case "array":
      return handleZodArray(jsonSchema);
    default:
      return { dependencies: [], body: "z.unknown()" };
  }
}
