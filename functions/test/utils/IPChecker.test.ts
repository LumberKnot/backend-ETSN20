import {secretManager} from '../../src/services';
import IPChecker from '../../src/utils/IPChecker';
import { expect } from 'chai';
import {anything, spy, when} from 'ts-mockito';
import {Netmask} from 'netmask';

describe('IPChecker init', () => {
    it('init wildcard', async () => {
        const
            netmasks = ['*'],
            spiedSecretManager = spy(secretManager);

        when(spiedSecretManager.getConfig(anything())).thenResolve(netmasks);

        const ipchecker = new IPChecker('test');
        await ipchecker.init();

        expect(ipchecker['allowAll']).to.be.true;
    });

    it('init netmasks', async () => {
        const
            netmasks = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'],
            spiedSecretManager = spy(secretManager);

        when(spiedSecretManager.getConfig(anything())).thenResolve(netmasks);

        const ipchecker = new IPChecker('test');
        await ipchecker.init();

        expect(ipchecker['allowedNetmasks']).to.have.same.deep.members(netmasks.map(e => new Netmask(e)));
    });
});

describe('IPChecker allow wildcard', () => {
    const ipchecker = new IPChecker('test');

    before(() => {
        const
            netmasks = ['*'],
            spiedSecretManager = spy(secretManager);

        when(spiedSecretManager.getConfig(anything())).thenResolve(netmasks);
    });
    
    it('allow any', async () => {
        expect(await ipchecker.allow('1.2.3.4')).to.be.true;
    });
});

describe('IPChecker allow netmasks', () => {
    const ipchecker = new IPChecker('test');

    before(() => {
        const
            netmasks = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16'],
            spiedSecretManager = spy(secretManager);

        when(spiedSecretManager.getConfig(anything())).thenResolve(netmasks);
    });

    it('allow in valid subnet', async () => {
        expect(await ipchecker.allow('192.168.0.1')).to.be.true;
    });

    it('don\'t allow outside valid subnet', async () => {
        expect(await ipchecker.allow('8.8.8.8')).to.be.false;
    })
})