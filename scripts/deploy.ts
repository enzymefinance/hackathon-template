import hre from 'hardhat';

const addresses = {
  AugustusSwapper: '0x1bD435F3C054b6e901B7b108a0ab7617C808677b',
  IntegrationManager: '0x965ca477106476B4600562a2eBe13536581883A6',
  TokenTransferProxy: '0xb70Bc06D2c9Bf03b3373799606dc7d39346c06B3',
};

async function main() {
  const factory = await hre.ethers.getContractFactory('ParaSwapV4Adapter');
  factory.deploy(addresses.IntegrationManager, addresses.AugustusSwapper, addresses.TokenTransferProxy);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
