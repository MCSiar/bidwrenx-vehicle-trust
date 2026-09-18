import { createClient } from '@solana/kit';
import { solanaDevnetRpc } from '@solana/kit-plugin-rpc';
import { signerFromFile } from '@solana/kit-plugin-signer';
import { getAddMemoInstruction } from '@solana-program/memo';

export async function anchorProofOnDevnet(payload) {
  const signerPath = process.env.SOLANA_SIGNER_PATH;
  if (!signerPath) throw new Error('SOLANA_SIGNER_PATH is not set.');

  const client = createClient()
    .use(signerFromFile(signerPath))
    .use(solanaDevnetRpc());

  const instruction = getAddMemoInstruction({ memo: payload });
  const { context } = await client.sendTransaction([instruction]);
  const signature = String(context.signature);

  return {
    signature,
    explorerUrl: `https://explorer.solana.com/tx/${signature}?cluster=devnet`
  };
}
