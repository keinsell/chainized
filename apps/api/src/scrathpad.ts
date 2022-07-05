import env from "@chainized/config";
import { IDL } from "solana-escrow";
import anchor from "@project-serum/anchor";

const wallet = new anchor.Wallet(env.SOLANA_KEYPAIR);
const provider = anchor.AnchorProvider.env();

anchor.setProvider(provider);

const escrowProgram = new anchor.Program(
  IDL,
  "GorKJzSmWPpbrwK8zT1MtdBtPn3e5ctbjJnPExYRcUSB"
);

async function main() {
  console.log("Hello World");
}

main();
