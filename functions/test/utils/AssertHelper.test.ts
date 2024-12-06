import { notNull } from "../../src/utils/AssertHelper";
import { expect } from 'chai';

describe('AssertHelper tests', () => {
    it('should throw when passing null to notNull', () => {
        expect(() => notNull(null)).to.throw();
    });

    it('should not throw when passing 1 to notNull', () => {
        expect(() => notNull(1)).to.not.throw();
    });
});