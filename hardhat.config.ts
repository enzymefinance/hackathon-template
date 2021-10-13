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

function node(networkName: string) {
  const fallback = 'http://localhost:8545';
  const uppercase = networkName.toUpperCase();
  const uri = process.env[`ETHEREUM_NODE_${uppercase}`] || process.env.ETHEREUM_NODE || fallback;
  return uri.replace('{{NETWORK}}', networkName);
}

function accounts(networkName: string) {
  const uppercase = networkName.toUpperCase();
  const accounts = process.env[`ETHEREUM_ACCOUNTS_${uppercase}`] || process.env.ETHEREUM_ACCOUNTS || '';
  return accounts
    .split(',')
    .map((account) => account.trim())
    .filter(Boolean);
}

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
    kovan: {
      accounts: accounts('kovan'),
      url: node('kovan'),
    },
    mainnet: {
      accounts: accounts('mainnet'),
      url: node('mainnet'),
    },
    rinkeby: {
      accounts: accounts('rinkeby'),
      url: node('rinkeby'),
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
