import crypto from 'node:crypto';
export function canonicalize(r){const p={schema:'bidwrenx.vehicle-trust.v1',id:r.id,vehicle:r.vehicle,serviceDate:r.serviceDate,complaint:r.complaint,diagnosis:r.diagnosis,labor:r.labor,parts:r.parts,completion:r.completion};return JSON.stringify(p,Object.keys(p).sort())}
export function hashRecord(r){return crypto.createHash('sha256').update(canonicalize(r)).digest('hex')}
