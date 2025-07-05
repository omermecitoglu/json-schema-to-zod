import type { Definition } from "~/types/definition";
import { generateZodSchema } from "../generateZodSchema";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodArray(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "array") {
    throw new Error("Invalid schema type for Zod array handler");
  }
  if (Array.isArray(jsonSchema.items)) {
    const dependencies: string[] = [];
    const items: string[] = [];
    for (const item of jsonSchema.items) {
      const result = generateZodSchema(item);
      dependencies.push(...result.dependencies);
      items.push(result.body);
    }
    return { dependencies, body: `z.array(z.union([${items.join(", ")}]))` };
  }
  const result = generateZodSchema(jsonSchema.items);
  return { dependencies: result.dependencies, body: `z.array(${result.body})` };
}
