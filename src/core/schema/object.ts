import type { Definition } from "~/types/definition";
import { generateZodSchema } from "../generateZodSchema";
import type { SchemaObject } from "@omer-x/json-schema-types";

export function handleZodObject(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "object") {
    throw new Error("Invalid schema type for Zod object handler");
  }
  if (!jsonSchema.properties) {
    if (jsonSchema.additionalProperties === true || typeof jsonSchema.additionalProperties === "undefined") {
      return { dependencies: [], body: "z.record(z.string(), z.unknown())" };
    }
    if (jsonSchema.additionalProperties === false) {
      return { dependencies: [], body: "z.strictObject({})" };
    }
    const additionalPropertiesDefinition = generateZodSchema(jsonSchema.additionalProperties);
    return {
      dependencies: additionalPropertiesDefinition.dependencies,
      body: `z.record(z.string(), ${additionalPropertiesDefinition.body})`,
    };
  }
  const dependencies: string[] = [];
  const properties: string[] = [];
  for (const [key, property] of Object.entries(jsonSchema.properties)) {
    const result = generateZodSchema(property);
    dependencies.push(...result.dependencies);
    if (jsonSchema.required?.includes(key)) {
      properties.push(`${key}: ${result.body}`);
    } else {
      properties.push(`${key}: ${result.body}.optional()`);
    }
  }
  if (jsonSchema.additionalProperties === false) {
    return { dependencies, body: `z.strictObject({\n${properties.map(p => `\t${p},\n`).join("")}})` };
  }
  if (jsonSchema.additionalProperties === true || typeof jsonSchema.additionalProperties === "undefined") {
    return { dependencies, body: `z.looseObject({\n${properties.map(p => `\t${p},\n`).join("")}})` };
  }
  const additionalPropertiesDefinition = generateZodSchema(jsonSchema.additionalProperties);
  return {
    dependencies: [
      ...dependencies,
      ...additionalPropertiesDefinition.dependencies,
    ],
    body: `z.object({\n${properties.map(p => `\t${p},\n`).join("")}}).catchall(${additionalPropertiesDefinition.body})`,
  };
}
