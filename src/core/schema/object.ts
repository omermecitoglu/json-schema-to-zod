import type { Definition } from "~/types/definition";
import { generateZodSchema } from "../generateZodSchema";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodObject(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "object") {
    throw new Error("Invalid schema type for Zod object handler");
  }
  const dependencies: string[] = [];
  const properties: string[] = [];
  for (const [key, property] of Object.entries(jsonSchema.properties ?? {})) {
    const result = generateZodSchema(property);
    dependencies.push(...result.dependencies);
    if (jsonSchema.required?.includes(key)) {
      properties.push(`${key}: ${result.body}`);
    } else {
      properties.push(`${key}: ${result.body}.optional()`);
    }
  }
  return { dependencies, body: `z.object({ ${properties.join(", ")} })` };
}
