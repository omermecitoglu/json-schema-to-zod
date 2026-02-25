import type { Definition } from "~/types/definition";
import { generateZodType } from "../generateZodType";
import type { SchemaObject } from "@omer-x/json-schema-types";

export function handleZodObject(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "object") {
    throw new Error("Invalid schema type for Zod object handler");
  }
  if (!jsonSchema.properties) {
    if (jsonSchema.additionalProperties === true || typeof jsonSchema.additionalProperties === "undefined") {
      return { dependencies: [], body: "z.ZodRecord<z.ZodString, z.ZodUnknown>" };
    }
    if (jsonSchema.additionalProperties === false) {
      return { dependencies: [], body: "z.ZodObject<{}>" };
    }
    const additionalPropertiesDefinition = generateZodType(jsonSchema.additionalProperties);
    return {
      dependencies: Array.from(new Set(additionalPropertiesDefinition.dependencies)),
      body: `z.ZodRecord<z.ZodString, ${additionalPropertiesDefinition.body}>`,
    };
  }
  const collectedDependencies: string[] = [];
  const properties: string[] = [];
  for (const [key, property] of Object.entries(jsonSchema.properties)) {
    const result = generateZodType(property);
    collectedDependencies.push(...result.dependencies);
    if (jsonSchema.required?.includes(key)) {
      properties.push(`${key}: ${result.body}`);
    } else {
      properties.push(`${key}: z.ZodOptional<${result.body}>`);
    }
  }
  return {
    dependencies: Array.from(new Set(collectedDependencies)),
    body: `z.ZodObject<{\n${properties.map(p => `\t${p},\n`).join("")}}>`,
  };
}
