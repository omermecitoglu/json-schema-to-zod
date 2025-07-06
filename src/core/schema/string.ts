import type { Definition } from "~/types/definition";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodString(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "string") {
    throw new Error("Invalid schema type for Zod string handler");
  }
  const validations: string[] = [];
  if (typeof jsonSchema.minLength === "number" && jsonSchema.minLength === jsonSchema.maxLength) {
    validations.push(`.length(${jsonSchema.minLength})`);
  }
  if (typeof jsonSchema.minLength === "number" && jsonSchema.minLength !== jsonSchema.maxLength) {
    validations.push(`.min(${jsonSchema.minLength})`);
  }
  if (typeof jsonSchema.maxLength === "number" && jsonSchema.minLength !== jsonSchema.maxLength) {
    validations.push(`.max(${jsonSchema.maxLength})`);
  }
  switch (jsonSchema.format) {
    case "email":
      return { dependencies: [], body: "z.email()" + validations.join("") };
    case "date-time":
      return { dependencies: [], body: "z.iso.datetime()" + validations.join("") };
    case "date":
      return { dependencies: [], body: "z.iso.date()" + validations.join("") };
    // case "time":
      // return { dependencies: [], body: "z.iso.time()" + validations.join("") };
    // case "duration":
      // return { dependencies: [], body: "z.iso.duration()" + validations.join("") };
    case "ipv4":
      return { dependencies: [], body: "z.ipv4()" + validations.join("") };
    case "ipv6":
      return { dependencies: [], body: "z.ipv6()" + validations.join("") };
    case "uuid":
      return { dependencies: [], body: "z.uuid()" + validations.join("") };
    case "uri":
      return { dependencies: [], body: "z.url()" + validations.join("") };
    default: {
      if (jsonSchema.enum) {
        return {
          dependencies: [],
          body: `z.enum([${jsonSchema.enum.map(item => `"${item}"`).join(", ")}])`,
        };
      }
      return { dependencies: [], body: "z.string()" + validations.join("") };
    }
  }
}
