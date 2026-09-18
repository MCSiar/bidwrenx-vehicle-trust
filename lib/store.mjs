import fs from 'node:fs'; import path from 'node:path';
const f=path.join(process.cwd(),'data','records.json');
export function all(){try{return JSON.parse(fs.readFileSync(f,'utf8'))}catch{return []}}
export function save(rows){fs.writeFileSync(f,JSON.stringify(rows,null,2))}
export function upsert(r){let rows=all(); const i=rows.findIndex(x=>x.id===r.id); i>=0?rows[i]=r:rows.push(r); save(rows); return r}
export function get(id){return all().find(x=>x.id===id)}
