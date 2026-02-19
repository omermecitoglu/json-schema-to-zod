import type { Definition } from "~/types/definition";
import type { SchemaObject } from "@omer-x/json-schema-types";

export function handleZodNumber(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "number") {
    throw new Error("Invalid schema type for Zod number handler");
  }
  if (jsonSchema.const !== undefined) {
    return { dependencies: [], body: `z.literal(${jsonSchema.const})` };
  }
  let body = "z.number()";
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
