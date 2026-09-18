import {NextResponse} from 'next/server'; import {all,upsert} from '../../../lib/store.mjs';
export async function GET(){return NextResponse.json(all())}
export async function POST(req){const r=await req.json(); if(!r.id)return NextResponse.json({error:'id required'},{status:400}); r.status=r.status||'FINALIZED'; upsert(r); return NextResponse.json(r)}
