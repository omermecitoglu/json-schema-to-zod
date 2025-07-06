import type { Definition } from "~/types/definition";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodInteger(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "integer") {
    throw new Error("Invalid schema type for Zod integer handler");
  }
  let body = "z.int()";
  if (typeof jsonSchema.minimum === "number") {
    body += `.gte(${jsonSchema.minimum})`;
  }
  if (typeof jsonSchema.exclusiveMinimum === "number") {
    body += `.gt(${jsonSchema.exclusiveMinimum})`;
  }
  if (typeof jsonSchema.maximum === "number") {
    body += `.lte(${jsonSchema.maximum})`;
  }
  if (typeof jsonSchema.exclusiveMaximum === "number") {
    body += `.lt(${jsonSchema.exclusiveMaximum})`;
  }
  return { dependencies: [], body };
}
