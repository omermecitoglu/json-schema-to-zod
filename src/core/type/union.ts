import type { Definition } from "~/types/definition";
import { generateZodType } from "../generateZodType";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodUnion(jsonSchemaItems: SchemaObject[]): Definition {
  const dependencies: string[] = [];
  const items: string[] = [];
  for (const item of jsonSchemaItems) {
    const result = generateZodType(item);
    dependencies.push(...result.dependencies);
    items.push(result.body);
  }
  return { dependencies, body: `z.ZodUnion<readonly [${items.join(", ")}]>` };
}
