import type { Definition } from "~/types/definition";
import { generateZodSchema } from "../generateZodSchema";
import type { SchemaObject } from "@omer-x/json-schema-types";

export function handleZodUnion(jsonSchemaItems: SchemaObject[]): Definition {
  const dependencies: string[] = [];
  const items: string[] = [];
  for (const item of jsonSchemaItems) {
    const result = generateZodSchema(item);
    dependencies.push(...result.dependencies);
    items.push(result.body);
  }
  return { dependencies, body: `z.union([${items.join(", ")}])` };
}
