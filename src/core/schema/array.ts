import type { Definition } from "~/types/definition";
import { generateZodSchema } from "../generateZodSchema";
import { handleZodUnion } from "./union";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodArray(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "array") {
    throw new Error("Invalid schema type for Zod array handler");
  }
  if (Array.isArray(jsonSchema.items)) {
    const union = handleZodUnion(jsonSchema.items);
    return { dependencies: union.dependencies, body: `z.array(${union.body})` };
  }
  const result = generateZodSchema(jsonSchema.items);
  return { dependencies: result.dependencies, body: `z.array(${result.body})` };
}
