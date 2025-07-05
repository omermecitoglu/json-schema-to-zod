import type { Definition } from "~/types/definition";
import { generateZodType } from "../generateZodType";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodObject(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "object") {
    throw new Error("Invalid schema type for Zod object handler");
  }
  const dependencies: string[] = [];
  const properties: string[] = [];
  for (const [key, property] of Object.entries(jsonSchema.properties ?? {})) {
    const result = generateZodType(property);
    dependencies.push(...result.dependencies);
    if (jsonSchema.required?.includes(key)) {
      properties.push(`${key}: ${result.body}`);
    } else {
      properties.push(`${key}: z.ZodOptional<${result.body}>`);
    }
  }
  return { dependencies, body: `z.ZodObject<{ ${properties.join(", ")} }>` };
}
