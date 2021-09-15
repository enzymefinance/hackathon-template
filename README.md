[![CI](https://github.com/enzymefinance/hackathon-template/actions/workflows/ci.yaml/badge.svg)](https://github.com/enzymefinance/hackathon-template/actions/workflows/ci.yaml)

# Enzyme Hackathon Starterkit

## Installation

It only takes a few commands to get started.

1. Copy the example .env.example files and adjust them to your needs:

```
cp .env.example .env
```

The only required variable is ETHEREUM_NODE_MAINNET, e.g. an Alchemy endpoint.If you want to use GitHub actions you'll have to set that variable up as a GitHub repository secret. See [this line of code]([https://github.com/enzymefinance/hackathon-template/blob/main/.github/workflows/ci.yaml#L72).

2. Install all dependencies:

```
yarn install
yarn compile
yarn test
```
The `deploys correctly` test should pass!

## References

Enzyme Finance contract addresses: https://contracts.enzyme.finance/
