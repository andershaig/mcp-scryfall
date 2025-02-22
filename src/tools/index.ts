import type { ToolRegistration } from '../types.js';
import { searchCardsTool } from './searchCards/index.js';

// biome-ignore lint/suspicious/noExplicitAny: Any is fine here because all tools validate their input schemas.
export const createTools = (): ToolRegistration<any>[] => {
  return [
    {
      ...searchCardsTool,
      // biome-ignore lint/suspicious/noExplicitAny: All tools validate their input schemas, so any is fine.
      handler: (args: any) => searchCardsTool.handler(args),
    },
  ];
};
