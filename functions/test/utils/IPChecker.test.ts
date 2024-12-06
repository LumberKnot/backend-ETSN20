import {secretManager} from '../../src/services';
import IPChecker from '../../src/utils/IPChecker';
import { expect } from 'chai';
import {anything, spy, when} from 'ts-mockito';
import {Netmask} from 'netmask';

function mockSecretManager(netmasks: String[]) {
    const spiedSecretManager = spy(secretManager);
    when(spiedSecretManager.getConfig(anything())).thenResolve(netmasks);
}

describe('IPChecker init', () => {
    it('should init wildcard', async () => {
        mockSecretManager(['*'])

        const ipchecker = new IPChecker('test');
        await ipchecker.init();

        expect(ipchecker['allowAll']).to.be.true;
    });

    it('should init netmasks', async () => {
        const netmasks = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'];
        mockSecretManager(netmasks);

        const ipchecker = new IPChecker('test');
        await ipchecker.init();

        expect(ipchecker['allowedNetmasks']).to.have.same.deep.members(netmasks.map(e => new Netmask(e)));
    });
});

describe('IPChecker allow wildcard', () => {
    const ipchecker = new IPChecker('test');

    before(() => {
        mockSecretManager(['*']);
    });
    
    it('should allow any', async () => {
        expect(await ipchecker.allow('1.2.3.4')).to.be.true;
    });
});

describe('IPChecker allow netmasks', () => {
    let ipchecker: IPChecker;

    before(() => {
        mockSecretManager(['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16']);
    });

    beforeEach(() => {
        ipchecker = new IPChecker('test');
    });

    it('should allow in valid subnet', async () => {
        expect(await ipchecker.allow('192.168.0.1')).to.be.true;
    });

    it('should not allow outside valid subnet', async () => {
        expect(await ipchecker.allow('8.8.8.8')).to.be.false;
    });
});