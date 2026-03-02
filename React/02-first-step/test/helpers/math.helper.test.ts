
import { describe, expect, test } from 'vitest'
import { add, multiply, substract } from '../../src/helpers/math.helper'

describe('calculadora', () => {
    test('Prueba suma...', () => {
        //!Arrage
        const a = 1;
        const b = 2;
        //!Act
        const result = add(a, b);
        //!resolve
        expect(result).toBe(3);

    });
    test('Prueba resta...', () => {
        //!Arrage
        const a = 1;
        const b = 2;
        //!Act
        const result = substract(a, b);
        //!resolve
        expect(result).toBe(-1);

    });
    test('Prueba mult...', () => {
        //!Arrage
        const a = 1;
        const b = 3;
        //!Act
        const result = multiply(a, b);
        //!resolve
        expect(result).toBe(3);

    });
})
