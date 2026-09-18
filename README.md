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


## First verified Solana Devnet proof

BidWrenx Vehicle Trust successfully submitted its first demo service-record proof to Solana Devnet.

- Record ID: `BW-DEMO-001`
- SHA-256: `a4078aa47f27e53923f9226d7835ee931aab9969c1ea803065fde53b66f3cf67`
- Payload: `BIDWRENX:v1:BW-DEMO-001:a4078aa47f27e53923f9226d7835ee931aab9969c1ea803065fde53b66f3cf67`
- Transaction signature: `43FmYG3sDSrgzeWqXzA9GGbaea3Tx4mtMka9hPgZ6vjD3smbqjqP2CE2DuVS61oB4H5ytbVY43TGkWdiuXYKwJQ1`
- Explorer: https://explorer.solana.com/tx/43FmYG3sDSrgzeWqXzA9GGbaea3Tx4mtMka9hPgZ6vjD3smbqjqP2CE2DuVS61oB4H5ytbVY43TGkWdiuXYKwJQ1?cluster=devnet
- Result observed in Solana Explorer: **Success**

This proves that the cryptographic fingerprint represented by the payload was submitted to Solana Devnet. It does not independently prove that the underlying repair occurred or that every statement in the service record is true.

### Reproduce locally

Use a dedicated funded Devnet signer. Never commit the signer keypair.

```bash
export SOLANA_SIGNER_PATH="$HOME/.config/solana/bidwrenx-devnet.json"
npm install
npm test
npm run build
npm run anchor:demo -- BW-DEMO-001 a4078aa47f27e53923f9226d7835ee931aab9969c1ea803065fde53b66f3cf67
```

The application also includes a public verification route at `/verify/[id]` and generates a QR code after a successful in-app anchor operation.
