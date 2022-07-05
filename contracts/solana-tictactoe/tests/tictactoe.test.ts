import undefinedtest, { TestFn } from "ava";
import * as anchor from "@project-serum/anchor";
import { IDL, Escrow } from "../target/types/escrow";
import { IdlAccounts, SplToken } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";

const test = undefinedtest as TestFn<{}>;

test.todo("should initalize board");
test.todo("should initialize game");
test.todo("player O should be able to join game");
test.todo("player X should be able to join game");
test.todo("player O should win game");
