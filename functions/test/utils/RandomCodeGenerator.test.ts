import RandomCodeGenerator from "../../src/utils/RandomCodeGenerator";
import {expect} from 'chai';


describe('RandomCodeGenerator tests', () => {
    describe('generate', () => {
        it('should generate random code on normal operation', () => {
            const generator = new RandomCodeGenerator(6);
            const code = generator.generate();
            expect(code).to.be.a('string');
            expect(code.length).to.be.eq(6);
        });
    });

    describe("isAlphaNumeric", () => {
        const isAlphaNumeric = RandomCodeGenerator["isAlphaNumeric"];
        
        it("should pass alphanumeric with both numbers and letters", () => {
            const result = isAlphaNumeric("HELLO123");
            expect(result).to.be.eq(true);
        });

        it("should fail with just numbers", () => {
            const result = isAlphaNumeric("1234567890");
            expect(result).to.be.eq(false);
        });

        it("should fail with just letters", () => {
            const result = isAlphaNumeric("HELLO");
            expect(result).to.be.eq(false);
        });

        it("should fail with special characters", () => {
            const result = isAlphaNumeric("HELLO123!");
            expect(result).to.be.eq(false);
        });

        it("should fail with empty string", () => {
            const result = isAlphaNumeric("");
            expect(result).to.be.eq(false);
        });
    });
});

