import RandomCodeGenerator from "../../src/utils/RandomCodeGenerator";
import {expect} from 'chai';


describe('is alpha numeric', () => {

    const isAlphaNumeric = RandomCodeGenerator['isAlphaNumeric'];

    it('just numeric should fail', () => {
        const result = isAlphaNumeric("1234567890");
        expect(result).to.be.eq(false);
    });

    it('just alpha should fail', () => {
        const result = isAlphaNumeric("HELLO");
        expect(result).to.be.eq(false);
    });

    it ('should pass alphanumeric', () => {
        const result = isAlphaNumeric("HELLO123");
        expect(result).to.be.eq(true);
    });

    it ('should fail on special characters', () => {
        const result = isAlphaNumeric("HELLO123!");
        expect(result).to.be.eq(false);
    });

    it ('schould fail on empty string', () => {
        const result = isAlphaNumeric("");
        expect(result).to.be.eq(false);
    });

});

describe('RandomCodeGenerator tests', function() {

    it('should generate random code on normal operation', () => {
        const generator = new RandomCodeGenerator(6);
        const code = generator.generate();
        expect(code).to.be.a('string');
        expect(code.length).to.be.eq(6);
    });

});

