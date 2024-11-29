import { notNull } from "../../src/utils/AssertHelper";
import { expect } from 'chai';

describe('notNull tests', () => {
    it('notNull(null)', () => {
        expect(() => notNull(null)).to.throw();
    });

    it('notNull(undefined)', () => {
        expect(() => notNull(undefined)).to.not.throw();
    });

    it('notNull(false)', () => {
        expect(() => notNull(false)).to.not.throw();
    });

    it('notNull(0)', () => {
        expect(() => notNull(0)).to.not.throw();
    });
    
    it('notNull("")', () => {
        expect(() => notNull("")).to.not.throw();
    });

    it('notNull([])', () => {     
        expect(() => notNull([])).to.not.throw();
    });

    it('notNull("0")', () => {
        expect(() => notNull("0")).to.not.throw();
    });

    it('notNull(1)', () => {
        expect(() => notNull(1)).to.not.throw();
    });
});