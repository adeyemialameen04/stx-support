import { z } from "zod";

export function zodToOpenAPI(schema: z.ZodType): any {
  if (schema instanceof z.ZodObject) {
    const properties: Record<string, any> = {};
    const required: string[] = [];

    Object.entries(schema.shape).forEach(([key, value]) => {
      // @ts-ignore
      properties[key] = zodToOpenAPI(value);
      if (!(value instanceof z.ZodOptional)) {
        required.push(key);
      }
    });

    return {
      type: "object",
      properties,
      ...(required.length > 0 ? { required } : {}),
    };
  }

  if (schema instanceof z.ZodArray) {
    return {
      type: "array",
      items: zodToOpenAPI(schema.element),
    };
  }

  if (schema instanceof z.ZodString) {
    const result: any = { type: "string" };
    if (schema.minLength !== null) result.minLength = schema.minLength;
    if (schema.maxLength !== null) result.maxLength = schema.maxLength;
    if (schema._def.checks) {
      schema._def.checks.forEach((check: any) => {
        if (check.kind === "email") result.format = "email";
        if (check.kind === "uuid") result.format = "uuid";
        if (check.kind === "url") result.format = "uri";
        if (check.kind === "regex") result.pattern = check.regex.source;
      });
    }
    return result;
  }

  if (schema instanceof z.ZodNumber) {
    const result: any = { type: "number" };
    if (schema.minValue !== null) result.minimum = schema.minValue;
    if (schema.maxValue !== null) result.maximum = schema.maxValue;
    return result;
  }

  if (schema instanceof z.ZodBoolean) {
    return { type: "boolean" };
  }

  if (schema instanceof z.ZodDate) {
    return { type: "string", format: "date-time" };
  }

  if (schema instanceof z.ZodEnum) {
    return { type: "string", enum: schema._def.values };
  }

  if (schema instanceof z.ZodNullable) {
    return { ...zodToOpenAPI(schema.unwrap()), nullable: true };
  }

  if (schema instanceof z.ZodOptional) {
    return zodToOpenAPI(schema.unwrap());
  }

  if (schema instanceof z.ZodUnion) {
    return { oneOf: schema._def.options.map(zodToOpenAPI) };
  }

  if (schema instanceof z.ZodIntersection) {
    return {
      allOf: [zodToOpenAPI(schema._def.left), zodToOpenAPI(schema._def.right)],
    };
  }

  if (schema instanceof z.ZodRecord) {
    return {
      type: "object",
      additionalProperties: zodToOpenAPI(schema._def.valueType),
    };
  }

  if (schema instanceof z.ZodLiteral) {
    return { type: typeof schema._def.value, enum: [schema._def.value] };
  }

  return { type: "object", description: "Unsupported Zod type" };
}
