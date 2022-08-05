#!/usr/bin/env zx

import "zx/globals";
import { $ } from "zx";
import config from "../config/configuration";

$.verbose = true;

void (async function () {
  await $`solana config set --url ${config.network} -k ${config.idLocation}`;

  // Generate solana wallet
  try {
    await $`solana-keygen new -o ${config.idLocation} -s --no-bip39-passphrase`;
    echo(
      `Generated new wallet: ${await $`solana-keygen pubkey ${config.idLocation}`}`
    );
  } catch (error) {
    echo(
      `Using existing wallet: ${await $`solana-keygen pubkey ${config.idLocation}`}`
    );
  }

  // Add local copies of wallet and configuration
  await $`cp ${config.idLocation} ./config/id.json`;
  await $`cp ${config.configLocation} ./config/config.yml`;

  // Airdrop

  // const airdropCycles = [1, 2];

  // for await (const cycle of airdropCycles) {
  //   let airdropRawMessage =
  //     await $`solana airdrop 2 --skip-seed-phrase-validation -C ${config.configLocation} --output json`;

  //   let signatureProcessing: any;

  //   airdropRawMessage
  //     .toString()
  //     .split(`\n`)
  //     .slice(1, 4)
  //     .map((line) => {
  //       signatureProcessing = signatureProcessing + line;
  //       return line;
  //     });

  //   const airdropSignature = JSON.parse(signatureProcessing.slice(9)).signature;

  //   await $`solana confirm -v ${airdropSignature} -C ${config.configLocation}`;

  //   echo(
  //     `Balance: ${await $`solana balance ${config.idLocation} -C ${config.configLocation}`}`
  //   );
  // }
})();
