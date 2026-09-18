import test from 'node:test'; import assert from 'node:assert/strict'; import {hashRecord} from '../lib/proof.mjs';
const r={id:'1',vehicle:'A',serviceDate:'2026',complaint:'x',diagnosis:'y',labor:'z',parts:'p',completion:'c'};
test('same record same hash',()=>assert.equal(hashRecord(r),hashRecord({...r}))); test('tamper changes hash',()=>assert.notEqual(hashRecord(r),hashRecord({...r,diagnosis:'changed'})));
