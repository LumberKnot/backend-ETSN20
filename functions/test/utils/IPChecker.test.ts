import {secretManager} from '../../src/services';
import IPChecker from '../../src/utils/IPChecker';
import { expect } from 'chai';
import {anything, reset, spy, when} from 'ts-mockito';
import SecretManager from '../../src/utils/SecretManager';


describe('IPChecker tests', () => {
    let ipchecker: IPChecker;
    let spiedSecretManager: SecretManager;

    function mockSecretManager(netmasks: String[]) {
        spiedSecretManager = spy(secretManager);
        when(spiedSecretManager.getConfig(anything())).thenResolve(netmasks);
    }

    beforeEach(() => {
        ipchecker = new IPChecker('test');
    });

    afterEach(() => {
        reset(spiedSecretManager);
    });

    describe('init', () => {
        it('should init wildcard', async () => {
            mockSecretManager(['*'])

            await ipchecker.init();

            expect(ipchecker['allowAll']).to.be.true;
        });

        it('should init netmasks', async () => {
            const netmasks = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'];
            mockSecretManager(netmasks);

            await ipchecker.init();

            expect(ipchecker['allowedNetmasks']).to.be.not.empty;
        });
    });

    describe('allow', () => {

        it('should allow any', async () => {
            mockSecretManager(['*']);

            const allowed = await ipchecker.allow('1.2.3.4');

            expect(allowed).to.be.true;
        });

        it('should allow in valid subnet', async () => {
            mockSecretManager(['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16']);

            const allowed = await ipchecker.allow('192.168.0.1');

            expect(allowed).to.be.true;
        });

        it('should not allow outside valid subnet', async () => {
            mockSecretManager(['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16']);

            const allowed = await ipchecker.allow('8.8.8.8');

            expect(allowed).to.be.false;
        });
    });
});