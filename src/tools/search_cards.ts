export const search_cards = {
  name: 'search_cards',
  description: 'Search for cards in the database',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description:
          'Search query to filter cards. Can include card name, text, or other attributes',
      },
      unique: {
        type: 'boolean',
        description:
          'If true, returns only unique cards (no duplicates with same name)',
      },
      order: {
        type: 'string',
        description: "Field to sort results by (e.g. 'name', 'date', 'price')",
      },
      dir: {
        type: 'string',
        description:
          "Sort direction - either 'asc' for ascending or 'desc' for descending",
      },
    },
    required: ['query'],
  },
} as const;
