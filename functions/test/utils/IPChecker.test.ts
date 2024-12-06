import {secretManager} from "../../src/services";
import IPChecker from "../../src/utils/IPChecker";
import { expect } from 'chai';
import {anything, spy, when} from "ts-mockito";
import {Netmask} from "netmask";

describe('IPChecker init', () => {
    it('init wildcard', async () => {
        const
            netmasks = ["*"],
            spiedSecretManager = spy(secretManager);

        when(spiedSecretManager.getConfig(anything())).thenResolve(netmasks);

        const ipchecker = new IPChecker("test");
        await ipchecker.init();

        expect(ipchecker["allowAll"]).to.be.true;
    });

    it('init netmasks', async () => {
        const
            netmasks = ["10/8", "172.16/12", "192.168/16"],
            spiedSecretManager = spy(secretManager);

        when(spiedSecretManager.getConfig(anything())).thenResolve(netmasks);

        const ipchecker = new IPChecker("test");
        await ipchecker.init();

        expect(ipchecker["allowedNetmasks"]).to.have.same.deep.members(netmasks.map(e => new Netmask(e)));
    });
});