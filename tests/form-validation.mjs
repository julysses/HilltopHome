import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
function load(path) {
 const source=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 const exports={};new Function('exports','require',source)(exports,require);return exports;
}
const {validateAll}=load('src/components/forms/GetOfferForm/validation.ts');
const {toSubmitPayload}=load('src/components/forms/GetOfferForm/types.ts');
const state={property_address:'Launch test',first_name:'Julio',phone:'(214) 701-0100',motivation:'other',timeline:'flexible',condition:'good',occupancy:'owner',sms_opt_in:false};
assert.deepEqual(validateAll(state),{});
assert.equal(toSubmitPayload(state).answers.sms_opt_in,false);
assert.equal(toSubmitPayload({...state,sms_opt_in:true}).answers.sms_opt_in,true);
assert.ok(validateAll({...state,phone:'1234567'}).phone);
assert.deepEqual(validateAll({...state,phone:'+12147010100'}),{});
assert.ok(validateAll({...state,first_name:''}).first_name);
console.log('PASS: optional consent preserved, valid US numbers accepted, incomplete inquiries rejected.');

const {POST}=load('src/app/api/get-offer/route.ts');
delete process.env.WHOLESALE_API_BASE;
delete process.env.META_CONVERSIONS_API_TOKEN;
const request=body=>new Request('https://hilltophome.co/api/get-offer',{method:'POST',body:JSON.stringify(body)});
assert.equal((await POST(request(null))).status,400);
const originalFetch=globalThis.fetch;
let called;
globalThis.fetch=async (url,options)=>{called={url,options};return new Response(JSON.stringify({success:true,message:'Saved'}),{status:200});};
const accepted=await POST(request(toSubmitPayload(state)));
assert.equal(accepted.status,200);
assert.equal(called.url,'https://wholesale-automation.vercel.app/api/forms/hilltop-home-co/submit');
assert.equal(JSON.parse(called.options.body).answers.sms_opt_in,false);
assert.ok(called.options.signal);
globalThis.fetch=async()=>new Response(JSON.stringify({success:false}),{status:200});
assert.equal((await POST(request(toSubmitPayload(state)))).status,502);
globalThis.fetch=originalFetch;
console.log('PASS: missing deployment override uses verified CRM; invalid body and unconfirmed receipt cannot report success.');
