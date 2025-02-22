import type { ToolInput } from '../types.js';
import { z } from 'zod';
import { zodToJsonSchema as _zodToJsonSchema } from 'zod-to-json-schema';

// biome-ignore lint/suspicious/noExplicitAny: It is what zodToJsonSchema does. No reason to change it.
export function makeJsonSchema(schema: z.ZodType): ToolInput {
  return _zodToJsonSchema(schema) as ToolInput;
}
