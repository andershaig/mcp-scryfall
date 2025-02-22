import type { ToolRegistration } from '../../types.js';
import { makeJsonSchema } from '../../utils/makeJsonSchema.js';
import { type SearchCardsSchema, searchCardsSchema } from './schema.js';
import * as Scry from 'scryfall-sdk';

// Set up Scryfall agent
Scry.setAgent('mcp-scryfall', '0.1.0');

interface CardResult {
  name: string;
  set_name: string;
  rarity: string;
  mana_cost: string | undefined;
  type_line: string;
  oracle_text: string | undefined;
}

export const searchCards = async (args: SearchCardsSchema): Promise<string> => {
  try {
    const cards: CardResult[] = [];
    let hasError = false;

    await new Promise((resolve, reject) => {
      Scry.Cards.search(args.query, {
        unique: args.unique,
        order: args.order,
        dir: args.dir,
      })
        .on('data', (card) => {
          cards.push({
            name: card.name,
            set_name: card.set_name,
            rarity: card.rarity,
            mana_cost: card.mana_cost ?? undefined,
            type_line: card.type_line,
            oracle_text: card.oracle_text ?? undefined,
          });
        })
        .on('end', () => resolve(undefined))
        .on('error', (error) => {
          hasError = true;
          reject(new Error(`Scryfall API error: ${error.message}`));
        });
    });

    if (hasError) {
      throw new Error('Failed to complete search');
    }

    if (cards.length === 0) {
      return 'No cards found matching your query.';
    }

    // Format results
    return cards
      .map((card) => {
        const parts = [
          `${card.name} (${card.set_name}, ${card.rarity})`,
          card.type_line,
        ];

        if (card.mana_cost) {
          parts.splice(1, 0, card.mana_cost);
        }

        if (card.oracle_text) {
          parts.push(card.oracle_text);
        }

        return parts.join('\n');
      })
      .join('\n\n');
  } catch (error) {
    console.error('Error in searchCards:', error);
    throw new Error(`Failed to search cards: ${(error as Error).message}`);
  }
};

export const searchCardsTool: ToolRegistration<SearchCardsSchema> = {
  name: 'search_cards',
  description:
    'Search for Magic: The Gathering cards using Scryfall syntax. Supports advanced search queries for colors, card types, mana costs, formats, and more.',
  inputSchema: makeJsonSchema(searchCardsSchema),
  handler: async (args: SearchCardsSchema) => {
    try {
      const parsedArgs = searchCardsSchema.parse(args);
      const result = await searchCards(parsedArgs);
      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      };
    } catch (error) {
      console.error('Error in searchCardsTool handler:', error);
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    }
  },
};
