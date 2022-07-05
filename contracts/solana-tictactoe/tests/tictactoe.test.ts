import undefinedtest, { TestFn } from "ava";
import * as anchor from "@project-serum/anchor";
import { IDL, Tictactoe } from "../target/types/tictactoe";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import env from "@chainized/config";

const test = undefinedtest as TestFn<{
  provider: anchor.Provider;
  program: anchor.Program<Tictactoe>;
  workspace: any;
  authority: anchor.Wallet;
  board: Keypair;
  game: Keypair;
  playerO: Keypair;
  /** PlayerX is initalizer of game. */
  playerX: Keypair;
}>;

test.before(async (t) => {
  t.context.provider = anchor.AnchorProvider.env();

  anchor.setProvider(t.context.provider);

  const workspace: anchor.Program & any = anchor.workspace;

  t.context.program = new anchor.Program(IDL, workspace.Tictactoe.programId);

  t.context.workspace = anchor.workspace.Tictactoe;
  t.context.authority = t.context.workspace.provider.wallet;

  t.context.board = Keypair.generate();
  t.context.game = Keypair.generate();
  t.context.playerO = Keypair.generate();
  t.context.playerX = Keypair.generate();

  // await t.context.provider.connection.confirmTransaction(
  //   await t.context.provider.connection.requestAirdrop(
  //     t.context.playerO.publicKey,
  //     LAMPORTS_PER_SOL
  //   ),
  //   "max"
  // );
});

test.serial("should initalize board", async (t) => {
  // Initalize new board to later initalize game on it
  const tx = await t.context.program.rpc.initializeDashboard({
    accounts: {
      dashboard: t.context.board.publicKey,
      authority: t.context.authority.publicKey,
    },
    signers: [t.context.board],
    instructions: [
      await t.context.program.account.dashboard.createInstruction(
        t.context.board
      ),
    ],
  });

  console.info(`Transaction: ${tx}`);
});

test.serial("should initialize game", async (t) => {
  // Initialize new game
  const tx = await t.context.program.rpc.initialize({
    accounts: {
      playerX: t.context.authority.publicKey,
      dashboard: t.context.board.publicKey,
      game: t.context.game.publicKey,
    },
    signers: [t.context.game],
    instructions: [
      await t.context.program.account.game.createInstruction(t.context.game),
    ],
  });

  console.info(`Transaction: ${tx}`);
});

test.serial("player O should be able to join game", async (t) => {
  const tx = await t.context.program.rpc.playerJoin({
    accounts: {
      playerO: t.context.playerO.publicKey,
      game: t.context.game.publicKey,
    },
    signers: [t.context.playerO],
  });

  console.info(`Transaction: ${tx}`);
});

test.todo("player X should be able to join game");
test.todo("player O should win game");
