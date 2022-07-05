import undefinedtest, { TestFn } from "ava";
import * as anchor from "@project-serum/anchor";
import { IDL, Tictactoe } from "../target/types/tictactoe";
import { IdlAccounts, SplToken } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, transferChecked } from "@solana/spl-token";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";

const test = undefinedtest as TestFn<{
  provider: anchor.Provider;
  program: anchor.Program<Tictactoe>;
  board: Keypair;
  game: Keypair;
  playerO: Keypair;
  /** PlayerX is initalizer of game. */
  playerX: Keypair;
}>;

test.before(async (t) => {
  t.context.provider = anchor.AnchorProvider.env();
  t.context.program = new anchor.Program(
    IDL,
    "6hJCcHAQ4mVqgfod8Di26H1w1gTPxdeb6msfeYZgP5Zn"
  );
  t.context.board = Keypair.generate();
  t.context.game = Keypair.generate();
  t.context.playerO = Keypair.generate();
  t.context.playerX = Keypair.generate();
});

test("should initalize board", async (t) => {
  const tx = await t.context.program.methods
    .initializeDashboard()
    .accounts({
      authority: t.context.playerX.publicKey,
      dashboard: t.context.board.publicKey,
    })
    .signers([t.context.board])
    .postInstructions([
        await t.context.program.account.dashboard.createInstruction(t.context.board);
    ])

  console.log(tx);
});
test.todo("should initialize game");
test.todo("player O should be able to join game");
test.todo("player X should be able to join game");
test.todo("player O should win game");
