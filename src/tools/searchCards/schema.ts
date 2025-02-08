import { z } from 'zod';

// Common search operators that can be used in queries
const SEARCH_OPERATORS = [
  ':',
  '=',
  '>',
  '<',
  '>=',
  '<=',
  '!=',
  '-',
  '+',
] as const;

// Common search keywords based on Scryfall docs
const SEARCH_KEYWORDS = [
  'c',
  'color',
  'id',
  'identity', // Colors
  't',
  'type', // Card types
  'o',
  'oracle', // Card text
  'm',
  'mana', // Mana costs
  'pow',
  'power', // Power
  'tou',
  'toughness', // Toughness
  'r',
  'rarity', // Rarity
  'f',
  'format', // Format
  'e',
  'set',
  'edition', // Sets
  'usd',
  'eur',
  'tix', // Prices
  'lang',
  'language', // Languages
] as const;

export const searchCardsSchema = z
  .object({
    query: z.string().min(1, 'Search query is required'),
    unique: z.enum(['cards', 'art', 'prints']).optional(),
    order: z
      .enum([
        'name',
        'set',
        'released',
        'rarity',
        'color',
        'usd',
        'tix',
        'eur',
        'power',
        'toughness',
        'edhrec',
        'artist',
      ])
      .optional(),
    dir: z.enum(['asc', 'desc']).optional(),
  })
  .transform((data) => ({
    query: data.query,
    unique: data.unique ?? 'cards',
    order: data.order ?? 'name',
    dir: data.dir ?? 'asc',
  }));

export type SearchCardsSchema = z.input<typeof searchCardsSchema>;
