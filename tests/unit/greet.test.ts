import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { greet } from '../../src/lib/greet';

describe('greet', () => {
    it.each([
        ['Svelte', 'Hello, Svelte!'],
        ['  Ada  ', 'Hello, Ada!'],
        ['', 'Hello, world!'],
        [' \t\n ', 'Hello, world!'],
        ['世界', 'Hello, 世界!'],
    ])('greets %j', (name, expected) => {
        expect(greet(name)).toBe(expected);
    });

    it('ignores surrounding whitespace for any name', () => {
        fc.assert(
            fc.property(fc.string(), (name) => {
                expect(greet(` \t${name}\n `)).toBe(greet(name));
            }),
        );
    });
});
