import type { Definition } from "~/types/definition";
import { generateZodType } from "../generateZodType";
import type { SchemaObject } from "@omer-x/json-schema-types";

export function handleZodUnion(jsonSchemaItems: SchemaObject[]): Definition {
  const collectedDependencies: string[] = [];
  const items: string[] = [];
  for (const item of jsonSchemaItems) {
    const result = generateZodType(item);
    collectedDependencies.push(...result.dependencies);
    items.push(result.body);
  }
  return {
    dependencies: Array.from(new Set(collectedDependencies)),
    body: `z.ZodUnion<readonly [${items.join(", ")}]>`,
  };
}
