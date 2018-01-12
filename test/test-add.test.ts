import 'jasmine';
import { subtract } from '../src/add';

describe('subtract method', () => {
  it('subtracts 2 numbers', () => {
    expect(subtract(2, 4)).toBe(-2);
  });
});
