import type { Definition } from "~/types/definition";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodNumber(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "number") {
    throw new Error("Invalid schema type for Zod number handler");
  }
  let body = "z.number()";
  if (jsonSchema.exclusiveMinimum) {
    body += `.gt(${jsonSchema.exclusiveMinimum})`;
  }
  if (jsonSchema.exclusiveMaximum) {
    body += `.lt(${jsonSchema.exclusiveMaximum})`;
  }
  return { dependencies: [], body };
}
