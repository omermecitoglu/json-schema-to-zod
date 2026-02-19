import type { Definition } from "~/types/definition";
import type { SchemaObject } from "@omer-x/json-schema-types";

export function handleZodInteger(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "integer") {
    throw new Error("Invalid schema type for Zod integer handler");
  }
  if (jsonSchema.const) {
    return { dependencies: [], body: `z.ZodLiteral<${jsonSchema.const}>` };
  }
  return { dependencies: [], body: "z.ZodInt" };
}
