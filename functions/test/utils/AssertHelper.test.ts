import { notNull } from "../../src/utils/AssertHelper";
import { expect } from 'chai';

describe('AssertHelper tests', () => {
    it('should throw when passing null to notNull', () => {
        expect(notNull(null)).to.throw();
    });

    it('should not throw when passing undefined to notNull', () => {
        expect(notNull(undefined)).to.not.throw();
    });

    it('should not throw when passing false to notNull', () => {
        expect(notNull(false)).to.not.throw();
    });

    it('should not throw when passing 0 to notNull', () => {
        expect(notNull(0)).to.not.throw();
    });
    
    it('should not throw when passing an empty string to notNull', () => {
        expect(notNull("")).to.not.throw();
    });

    it('should not throw when passing an empty array to notNull', () => {     
        expect(notNull([])).to.not.throw();
    });

    it('should not throw when passing the string "0" to notNull', () => {
        expect(notNull("0")).to.not.throw();
    });

    it('should not throw when passing 1 to notNull', () => {
        expect(notNull(1)).to.not.throw();
    });
});