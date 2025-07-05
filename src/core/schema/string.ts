import type { Definition } from "~/types/definition";
import type { SchemaObject } from "@omer-x/openapi-types/schema";

export function handleZodString(jsonSchema: SchemaObject): Definition {
  if (jsonSchema.type !== "string") {
    throw new Error("Invalid schema type for Zod string handler");
  }
  switch (jsonSchema.format) {
    case "email":
      return { dependencies: [], body: "z.email()" };
    case "date-time":
      return { dependencies: [], body: "z.iso.datetime()" };
    case "date":
      return { dependencies: [], body: "z.iso.date()" };
    // case "time":
      // return { dependencies: [], body: "z.iso.time()" };
    // case "duration":
      // return { dependencies: [], body: "z.iso.duration()" };
    case "ipv4":
      return { dependencies: [], body: "z.ipv4()" };
    case "ipv6":
      return { dependencies: [], body: "z.ipv6()" };
    case "uuid":
      return { dependencies: [], body: "z.uuid()" };
    case "uri":
      return { dependencies: [], body: "z.url()" };
    default:
      return { dependencies: [], body: "z.string()" };
  }
}
