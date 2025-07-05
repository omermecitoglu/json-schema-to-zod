import type { Definition } from "~/types/definition";
import { generateZodType } from "../generateZodType";
import { handleZodUnion } from "./union";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodArray(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "array") {
    throw new Error("Invalid schema type for Zod array handler");
  }
  if (Array.isArray(jsonSchema.items)) {
    const union = handleZodUnion(jsonSchema.items);
    return { dependencies: union.dependencies, body: `z.ZodArray<${union.body}>` };
  }
  const result = generateZodType(jsonSchema.items);
  return { dependencies: result.dependencies, body: `z.ZodArray<${result.body}>` };
}
