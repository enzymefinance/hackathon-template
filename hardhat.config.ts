// Load the configuration from the .env file.
import 'dotenv/config';
// Load the hardhat plugins.
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-solhint';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'solidity-coverage';

import type { HardhatUserConfig } from 'hardhat/types';

if (!process.env.ETHEREUM_NODE_MAINNET) {
  console.warn('WARNING: Missing "ETHEREUM_NODE_MAINNET" environment parameter. Forking disabled.');
}

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 60000,
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
      },
      forking: {
        blockNumber: 13230834,
        enabled: !!process.env.ETHEREUM_NODE_MAINNET,
        url: process.env.ETHEREUM_NODE_MAINNET ?? '',
      },
    },
  },
  solidity: {
    settings: {
      optimizer: {
        details: {
          yul: false,
        },
        enabled: true,
        runs: 200,
      },
    },
    version: '0.6.12',
  },
};

export default config;
