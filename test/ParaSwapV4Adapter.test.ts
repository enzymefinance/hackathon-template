import { IntegrationManager } from '@enzymefinance/protocol';
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import hre from 'hardhat';

import type { ParaSwapV4Adapter } from '../typechain';

const addresses = {
  AugustusSwapper: '0x1bD435F3C054b6e901B7b108a0ab7617C808677b',
  EnzymeCouncil: '0xb270fe91e8e4b80452fbf1b4704208792a350f53',
  IntegrationManager: '0x965ca477106476B4600562a2eBe13536581883A6',
  TokenTransferProxy: '0xb70Bc06D2c9Bf03b3373799606dc7d39346c06B3',
};

let enzymeCouncil: SignerWithAddress;
let paraSwapAdapter: ParaSwapV4Adapter;
let integrationManager: IntegrationManager;

before(async () => {
  enzymeCouncil = await hre.ethers.getSigner(addresses.EnzymeCouncil);
  await hre.network.provider.send('hardhat_impersonateAccount', [enzymeCouncil.address]);

  const paraSwapAdapterFactory = await hre.ethers.getContractFactory('ParaSwapV4Adapter');
  paraSwapAdapter = await paraSwapAdapterFactory.deploy(
    addresses.IntegrationManager,
    addresses.AugustusSwapper,
    addresses.TokenTransferProxy,
  );

  integrationManager = new IntegrationManager(addresses.IntegrationManager, enzymeCouncil);
  await integrationManager.registerAdapters([paraSwapAdapter.address]);
});

it('deploys correctly', async () => {
  // Check that the initial values are set in the constructor.
  expect(await paraSwapAdapter.getIntegrationManager()).to.equal(addresses.IntegrationManager);
  expect(await paraSwapAdapter.getParaSwapV4AugustusSwapper()).to.equal(addresses.AugustusSwapper);
  expect(await paraSwapAdapter.getParaSwapV4TokenTransferProxy()).to.equal(addresses.TokenTransferProxy);

  // Check that the adapter is registered on the integration manager.
  expect(await integrationManager.getRegisteredAdapters()).to.include(paraSwapAdapter.address);
});

xit('... test functionality', async () => {
  // TODO: Test functionality.
});
