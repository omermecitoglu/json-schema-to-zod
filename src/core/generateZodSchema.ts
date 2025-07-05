import type { Definition } from "~/types/definition";
import { handleZodArray } from "./schema/array";
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
  if (jsonSchema.anyOf) return { dependencies: [], body: "" };
  if (jsonSchema.oneOf) return { dependencies: [], body: "" };
  switch (jsonSchema.type) {
    case "boolean":
      return { dependencies: [], body: "z.boolean()" };
    case "null":
      return { dependencies: [], body: "z.null()" };
    case "integer":
      return { dependencies: [], body: "z.int()" };
    case "number":
      return { dependencies: [], body: "z.number()" };
    case "string":
      return { dependencies: [], body: "z.string()" };
    case "object":
      return { dependencies: [], body: "z.object({})" };
    case "array":
      return handleZodArray(jsonSchema);
  }
}
