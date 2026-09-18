import {NextResponse} from 'next/server'; import {get,upsert} from '../../../lib/store.mjs'; import {hashRecord} from '../../../lib/proof.mjs';
export async function POST(req){const {id}=await req.json(); const r=get(id); if(!r)return NextResponse.json({error:'not found'},{status:404}); const hash=hashRecord(r); const payload=`BIDWRENX:v1:${id}:${hash}`;
r.proof={hash,payload,network:'devnet',signature:r.proof?.signature||null,anchoredAt:new Date().toISOString(),mode:r.proof?.signature?'solana':'local-proof'}; upsert(r); return NextResponse.json(r.proof)}
