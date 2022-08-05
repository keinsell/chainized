# Anchor Boilerplate

### Idea behind boilerplate?

There are serval problems with solana programs such as weird configuration where you're supposed to set ids after deployment, setup wallets for deployment and more reapeating tasks that take time. My idea for boilerplate is to parse `Anchor.toml` and prepare full designed configuration object in `typescript` which will automate all of the updates over `Anchor.toml`.

Whole process should be managed by `config` directory.

### Guide

> Use of `.devcontainer` is recommended since it have all of the tools for solana.

```
$ pnpm install
$ pnpm run setup
$ pnpm run build
$ pnpm run test
$ pnpm run deploy
```
