'use client';

import { useEffect, useState } from 'react';

export default function VerifyPage({ params }) {
  const [result, setResult] = useState({ loading: true });

  useEffect(() => {
    (async () => {
      const resolved = await params;
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: resolved.id })
      });
      const json = await response.json();
      setResult(json);
    })();
  }, [params]);

  if (result.loading) return <main><h1>BidWrenx Vehicle Trust</h1><p>Verifying record…</p></main>;

  const verified = result.status === 'VERIFIED' || result.verified === true;
  return <main>
    <h1>BidWrenx <span>Vehicle Trust</span></h1>
    <h2>{verified ? 'Record integrity verified' : 'Record verification failed'}</h2>
    <p>This check compares the current protected service-record fields with the cryptographic proof created when the record was anchored.</p>
    {result.explorerUrl && <p><a href={result.explorerUrl} target="_blank" rel="noreferrer">View Solana Devnet transaction</a></p>}
    <pre>{JSON.stringify(result, null, 2)}</pre>
  </main>;
}
