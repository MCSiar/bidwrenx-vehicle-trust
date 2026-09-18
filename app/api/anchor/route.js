import { NextResponse } from 'next/server';
import { get, upsert } from '../../../lib/store.mjs';
import { hashRecord } from '../../../lib/proof.mjs';
import { anchorProofOnDevnet } from '../../../lib/solana.mjs';

export async function POST(req) {
  const { id } = await req.json();
  const r = get(id);
  if (!r) return NextResponse.json({ error: 'not found' }, { status: 404 });

  const hash = hashRecord(r);
  const payload = `BIDWRENX:v1:${id}:${hash}`;

  try {
    const chain = await anchorProofOnDevnet(payload);
    r.proof = {
      hash,
      payload,
      network: 'devnet',
      signature: chain.signature,
      explorerUrl: chain.explorerUrl,
      anchoredAt: new Date().toISOString(),
      mode: 'solana'
    };
    upsert(r);
    return NextResponse.json(r.proof);
  } catch (error) {
    return NextResponse.json({
      error: 'Solana Devnet anchoring is not configured or failed.',
      detail: error instanceof Error ? error.message : String(error),
      hash,
      payload,
      safeNextStep: 'Configure SOLANA_SIGNER_PATH with a dedicated funded Devnet keypair. Never commit that keypair.'
    }, { status: 503 });
  }
}
