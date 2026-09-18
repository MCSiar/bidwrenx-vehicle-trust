# Solana Devnet setup

BidWrenx Vehicle Trust anchors only a non-sensitive record identifier and SHA-256 digest. Private repair data remains off-chain.

## 1. Install dependencies

```bash
npm install
```

Use Node.js 24+ for the current Solana Next.js tooling.

## 2. Create a dedicated development signer

Install the Solana CLI, then create a new keypair **only for Devnet development**:

```bash
solana-keygen new --outfile ~/.config/solana/bidwrenx-devnet.json
solana address -k ~/.config/solana/bidwrenx-devnet.json
```

Never use a personal/mainnet wallet key and never commit this JSON file.

## 3. Fund it with Devnet test SOL

```bash
solana airdrop 1 -k ~/.config/solana/bidwrenx-devnet.json --url devnet
solana balance -k ~/.config/solana/bidwrenx-devnet.json --url devnet
```

Devnet SOL has no monetary value.

## 4. Configure local environment

Create `.env.local`:

```
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_NETWORK=devnet
SOLANA_SIGNER_PATH=/absolute/path/to/bidwrenx-devnet.json
```

`.env.local` and key files are excluded from Git.

## 5. Run

```bash
npm test
npm run dev
```

Finalize the sample record and click Create proof. A successful response contains a Devnet transaction signature and Explorer URL.

## Production note

A local keypair file is appropriate only for the hackathon development environment. A deployed backend should use a managed key service / production signing backend rather than placing a raw private key in application source or GitHub.
