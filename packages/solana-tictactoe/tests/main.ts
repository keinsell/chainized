import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import test from "ava";
import ava, { ExecutionContext } from "ava";

const provider = anchor.AnchorProvider.local();
anchor.setProvider(provider);

const program: Program = anchor.workspace.TicTacToe;

async function setupGame(keypairs: {
  game: Keypair;
  P1: anchor.Provider | Keypair;
  P2: Keypair;
}) {
  const x = await program.methods
    .setupGame(keypairs.P2.publicKey)
    .accounts({
      game: keypairs.game.publicKey,
      playerOne: keypairs.P1.publicKey,
    })
    .signers([keypairs.game])
    .rpc();

  let gameState = await program.account.game.fetch(keypairs.game.publicKey);

  return { ...gameState };
}

async function shouldInitializeGame(t: ExecutionContext) {
  const gameKeypair = anchor.web3.Keypair.generate();
  const playerOne = program.provider;
  const playerTwo = anchor.web3.Keypair.generate();

  let gameState = await setupGame({
    game: gameKeypair,
    P1: playerOne,
    P2: playerTwo,
  });

  t.is(gameState.turn, 1);
  t.deepEqual(
    gameState.players.map((player: PublicKey) => player.toString()),
    [playerOne.publicKey?.toString(), playerTwo.publicKey.toString()]
  );
  t.deepEqual(gameState.state, { active: {} });
  t.deepEqual(gameState.board, [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
}

test("Should initialize contract", shouldInitializeGame);

async function shouldMakeMove(
  t: ExecutionContext,
  game: Keypair,
  player: Keypair | anchor.Provider,
  tile: unknown,
  expected: {
    turn: any;
    board: any[];
    state: any;
  }
) {
  const gameState = await makeMove(game, player, tile);

  t.is(gameState.turn, expected.turn);
  t.deepEqual(gameState.board, expected.board);
  t.deepEqual(gameState.state, expected.state);
}

async function shouldWinGame(t: ExecutionContext) {
  const gameKeypair = anchor.web3.Keypair.generate();
  const playerOne = program.provider;
  const playerTwo = anchor.web3.Keypair.generate();

  let gameState = await setupGame({
    game: gameKeypair,
    P1: playerOne,
    P2: playerTwo,
  });
}

test("Player should win a game", shouldWinGame);

async function shouldDrawGame(t: ExecutionContext) {}

async function shouldProtectSubsequentTurns(t: ExecutionContext) {}
