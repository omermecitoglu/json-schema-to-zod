import type { Definition } from "~/types/definition";
import type { SchemaObject } from "@omer-x/json-schema-types";

export function handleZodNumber(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "number") {
    throw new Error("Invalid schema type for Zod number handler");
  }
  if (jsonSchema.const) {
    return { dependencies: [], body: `z.ZodLiteral<${jsonSchema.const}>` };
  }
  return { dependencies: [], body: "z.ZodNumber" };
}
