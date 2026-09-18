# BidWrenx Vehicle Trust MVP

Working Next.js MVP for creating, fingerprinting, and verifying automotive service records. The UI and API work locally; the proof engine detects record tampering. The repository is safe-by-default: it does **not** contain a private key.

## Run
```bash
npm install
npm test
npm run dev
```
Open `http://localhost:3000`.

## Demo
1. Finalize the sample record.
2. Create proof.
3. Verify => VERIFIED.
4. Change Diagnosis, finalize again, then Verify => MODIFIED.

## Solana Devnet
Use `SOLANA_RPC_URL=https://api.devnet.solana.com`. Fund only a dedicated Devnet development signer with test SOL. Never commit a seed phrase/private key.

## Hackathon disclosure
BidWrenx / Project 33 existed as a concept before the 2026 Crypto World's Fair. Disclose that accurately. The repository should clearly distinguish pre-existing concept work from development completed during the hackathon.
