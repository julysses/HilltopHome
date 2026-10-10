import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
const source = ts.transpileModule(fs.readFileSync("src/lib/attribution.ts", "utf8"), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
const lib = {};
new Function("exports", source)(lib);
const storage = () => {const records=new Map(); return {getItem:k=>records.get(k)??null,setItem:(k,v)=>records.set(k,v)};};
test("landing campaign survives navigation, reload and a later campaign URL",()=>{
 const s=storage();
 const first=lib.firstTouch(s,"https://example.com/?utm_source=facebook&utm_medium=paid_social&utm_campaign=october");
 assert.deepEqual(first,{utm_source:"facebook",utm_medium:"paid_social",utm_campaign:"october"});
 assert.deepEqual(lib.firstTouch(s,"https://example.com/contact"),first);
 assert.deepEqual(lib.firstTouch(s,"https://example.com/contact?utm_source=other"),first);
});
test("direct first landing is not reattributed by a later internal link",()=>{
 const s=storage();
 assert.deepEqual(lib.firstTouch(s,"https://example.com/"),{});
 assert.deepEqual(lib.firstTouch(s,"https://example.com/contact?utm_source=later"),{});
});
test("only bounded campaign tags are retained, never arbitrary query data",()=>{
 const s=storage();
 const value=lib.firstTouch(s,"https://example.com/?email=private%40example.com&fbclid=identifier&utm_source=facebook&utm_medium="+ "x".repeat(201));
 assert.deepEqual(value,{utm_source:"facebook"});
 assert.equal(s.getItem(lib.ATTRIBUTION_KEY),'{"utm_source":"facebook"}');
 assert.deepEqual(lib.cleanAttribution({utm_source:["invalid"],utm_campaign:"bad\nvalue",email:"private"}),{});
});
test("unavailable or corrupt storage does not block current attribution",()=>{
 const broken={getItem(){throw Error("blocked");},setItem(){throw Error("blocked");}};
 assert.deepEqual(lib.firstTouch(broken,"https://example.com/?utm_source=facebook"),{utm_source:"facebook"});
 const s=storage();s.setItem(lib.ATTRIBUTION_KEY,"broken");
 assert.deepEqual(lib.firstTouch(s,"https://example.com/?utm_source=facebook"),{utm_source:"facebook"});
 assert.deepEqual(lib.firstTouch(s,"https://example.com/contact"),{utm_source:"facebook"});
});
