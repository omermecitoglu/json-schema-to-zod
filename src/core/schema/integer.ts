import type { Definition } from "~/types/definition";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodInteger(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "integer") {
    throw new Error("Invalid schema type for Zod integer handler");
  }
  let body = "z.int()";
  if (jsonSchema.exclusiveMinimum) {
    body += `.gt(${jsonSchema.exclusiveMinimum})`;
  }
  if (jsonSchema.exclusiveMaximum) {
    body += `.lt(${jsonSchema.exclusiveMaximum})`;
  }
  return { dependencies: [], body };
}
