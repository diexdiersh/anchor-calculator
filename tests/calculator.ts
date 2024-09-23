import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { expect } from "chai";

import { Calculator } from "../target/types/calculator";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Calculator as Program<Calculator>;

  const calculatorPair = anchor.web3.Keypair.generate();

  it("should perform add operation and store result in account", async () => {
    await program.methods
      .add(new anchor.BN(1), new anchor.BN(2))
      .accounts({ calculator: calculatorPair.publicKey })
      .rpc();

    const account = await program.account.calculator.fetch(
      calculatorPair.publicKey
    );
    expect(account.result).to.eql(new anchor.BN(3));
  });

  it("should perform sub operation and store result in account", async () => {
    await program.methods
      .sub(new anchor.BN(3), new anchor.BN(1))
      .accounts({ calculator: calculatorPair.publicKey })
      .rpc();

    const account = await program.account.calculator.fetch(
      calculatorPair.publicKey
    );
    expect(account.result).to.eql(new anchor.BN(2));
  });
});
