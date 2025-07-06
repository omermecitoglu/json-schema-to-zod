import type { Definition } from "~/types/definition";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodString(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "string") {
    throw new Error("Invalid schema type for Zod string handler");
  }
  switch (jsonSchema.format) {
    case "email":
      return { dependencies: [], body: "z.ZodEmail" };
    case "date-time":
      return { dependencies: [], body: "z.ZodISODateTime" };
    case "date":
      return { dependencies: [], body: "z.ZodISODate" };
    // case "time":
      // return { dependencies: [], body: "z.ZodISOTime" };
    // case "duration":
      // return { dependencies: [], body: "z.ZodISODuration" };
    case "ipv4":
      return { dependencies: [], body: "z.ZodIPv4" };
    case "ipv6":
      return { dependencies: [], body: "z.ZodIPv6" };
    case "uuid":
      return { dependencies: [], body: "z.ZodUUID" };
    case "uri":
      return { dependencies: [], body: "z.ZodURL" };
    default: {
      if (jsonSchema.enum) {
        return {
          dependencies: [],
          body: `z.ZodEnum<{ ${jsonSchema.enum.map(item => `${item}: "${item}"`).join(", ")} }>`,
        };
      }
      return { dependencies: [], body: "z.ZodString" };
    }
  }
}
