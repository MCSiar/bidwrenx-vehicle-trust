import { anchorProofOnDevnet } from '../lib/solana.mjs';

const id = process.argv[2] || 'BW-DEMO-001';
const hash = process.argv[3];

if (!hash || !/^[a-f0-9]{64}$/i.test(hash)) {
  console.error('Usage: npm run anchor:demo -- <record-id> <64-character-sha256>');
  process.exit(1);
}

const payload = `BIDWRENX:v1:${id}:${hash.toLowerCase()}`;

try {
  const result = await anchorProofOnDevnet(payload);
  console.log(JSON.stringify({ id, hash: hash.toLowerCase(), payload, ...result }, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
