import { describe, expect, it } from 'bun:test';
import { searchCardsSchema } from './schema';
import { searchCards } from './index';

describe('searchCards Tool', () => {
  describe('Schema Validation', () => {
    it('should accept valid queries', () => {
      const validInputs = [
        { query: 'c:red t:creature' },
        {
          query: 'f:standard r:mythic',
          unique: 'cards',
          order: 'name',
          dir: 'asc',
        },
        { query: 'o:flying pow>3', unique: 'prints' },
      ];

      validInputs.forEach((input) => {
        const result = searchCardsSchema.safeParse(input);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid queries', () => {
      const invalidInputs = [
        { query: '' }, // Empty query
        { query: 'c:red', unique: 'invalid' }, // Invalid unique value
        { query: 't:creature', order: 'invalid' }, // Invalid order value
        { query: 'o:flying', dir: 'invalid' }, // Invalid direction
      ];

      invalidInputs.forEach((input) => {
        const result = searchCardsSchema.safeParse(input);
        expect(result.success).toBe(false);
      });
    });
  });

  describe('Card Search', () => {
    it('should return formatted results for valid queries', async () => {
      const result = await searchCards({
        query: 'c:red t:dragon r:rare pow>7',
        unique: 'cards',
        order: 'name',
        dir: 'asc',
      });

      console.log('\nSearch Results:\n', result);
      expect(result).toBeTruthy();
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle queries with no results', async () => {
      const result = await searchCards({
        query: 'name:definitelynotarealcard',
      });

      expect(result).toBe('No cards found matching your query.');
    });

    it('should handle invalid queries', async () => {
      const result = await searchCards({
        query: 'cmc>cmc', // Invalid comparison that Scryfall explicitly rejects
      });

      expect(result).toBe('No cards found matching your query.');
    });

    it('should handle invalid Scryfall syntax', async () => {
      const result = await searchCards({
        query: 'is:slick cmc>cmc', // Known invalid Scryfall syntax
      });

      expect(result).toBe('No cards found matching your query.');
    });
  });
});
