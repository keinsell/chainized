# Chainized

From multiple separated repositories for learning writing `solidity` and `rust` (`solana`) smart-contracts I've decided to merge everything into one place in monorepo structure, it's kinda more comforable to have every single package in one place and running whole project by single command - espcially when there will be `apps/api` and `apps/web` package to perform interfactions with contracts.

## Packages

- `packages/solana-coinflip`, functional solana contract with coinflip (tests included)

## Getting Started

> I was trying to keep things as simple as it's possible.

### Prerequisites

- `node@18.4.0`
- `pnpm@7.3.0`
- `rustc@1.61.0`
- `cargo@1.61.0`
- `anchor-cli@0.24.2`
- `solana-cli@1.10.26`

### Installation

The installation process is trival, once you have installed `rust`, `anchor` and `solana` on your machine. Due to repository specification you must setup `.env` before project installation `NODE_ENV="development"` is enough because we have development defaults. In case you're willing to use `docker` for development you're suppsed to override default variables which are focused on using testnets.

```
$ pnpm install
```

In case you're preparing code for production you build project using follwoing script.

```
$ pnpm run build
```

### Usage

## Contributing

```js
private youDoNot(contribute: any)
```

[![wakatime](https://wakatime.com/badge/user/13a02f4d-34c9-45f7-95ee-bf9d66b139fb/project/89cd4839-83ec-4cf3-aca1-1fe2d7eb5c0a.svg)](https://wakatime.com/badge/user/13a02f4d-34c9-45f7-95ee-bf9d66b139fb/project/89cd4839-83ec-4cf3-aca1-1fe2d7eb5c0a)
