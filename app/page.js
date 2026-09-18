'use client';

import { useState } from 'react';
import QRCode from 'qrcode';
import './style.css';

const initial = {
  id: 'BW-DEMO-001',
  vehicle: '2019 Toyota Camry',
  serviceDate: '2026-09-18',
  complaint: 'Brake noise',
  diagnosis: 'Front brake pads worn',
  labor: 'Replace front brake pads',
  parts: 'Front brake pad set',
  completion: 'Repair completed and road tested'
};

export default function Page() {
  const [r, setR] = useState(initial);
  const [out, setOut] = useState('Ready.');
  const [qr, setQr] = useState('');

  const post = async (url, body) => {
    const x = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    });
    const j = await x.json();
    setOut(JSON.stringify(j, null, 2));
    return j;
  };

  const anchor = async () => {
    const proof = await post('/api/anchor', { id: r.id });
    if (proof?.signature) {
      const verifyUrl = `${window.location.origin}/verify/${encodeURIComponent(r.id)}`;
      setQr(await QRCode.toDataURL(verifyUrl, { width: 240, margin: 1 }));
    }
  };

  return (
    <main>
      <h1>BidWrenx <span>Vehicle Trust</span></h1>
      <p>Tamper-evident automotive service records anchored to Solana Devnet.</p>
      <section>
        {Object.entries(r).map(([k, v]) => (
          <label key={k}>{k}
            <input value={v} onChange={e => setR({ ...r, [k]: e.target.value })} />
          </label>
        ))}
      </section>
      <div className="buttons">
        <button onClick={() => post('/api/records', r)}>1. Finalize record</button>
        <button onClick={anchor}>2. Anchor on Devnet</button>
        <button onClick={() => post('/api/verify', { id: r.id })}>3. Verify</button>
      </div>
      {qr && <div className="qr"><h2>Public verification QR</h2><img src={qr} alt="BidWrenx verification QR code" /><p>/verify/{r.id}</p></div>}
      <p className="hint">Tamper test: anchor the finalized record, change a protected field, finalize again, then verify. The stored proof should no longer match the modified record.</p>
      <pre>{out}</pre>
    </main>
  );
}
