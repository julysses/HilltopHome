import assert from 'node:assert/strict';
import fs from 'node:fs';
import pathModule from 'node:path';
import ts from 'typescript';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
function load(path) {
 const source=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 const exports={};
 const localRequire=id=>id.startsWith('.') ? load(pathModule.resolve(pathModule.dirname(path),id)+'.ts') : require(id);
 new Function('exports','require',source)(exports,localRequire);return exports;
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

let requests=[];
process.env.NEXT_PUBLIC_META_PIXEL_ID='test';
process.env.META_CONVERSIONS_API_TOKEN='test';
globalThis.fetch=async(url,options)=>{requests.push({url,options});return new Response(JSON.stringify({success:true}),{status:200});};
for (const choice of [true,false,'true']) {
 requests=[];
 const body=toSubmitPayload(state);
 body.answers.sms_opt_in=choice;
 body.landing_page_url='https://hilltophome.co/?utm_source=test';
 assert.equal((await POST(request(body))).status,200);
 const answers=JSON.parse(requests[0].options.body).answers;
 assert.equal(answers.sms_opt_in,choice===true);
 assert.match(answers.sms_consent_text,/DBA of The Jays Dallas/);
 assert.notEqual(answers.sms_consent_text,'forged');
 assert.equal(answers.sms_consent_version,'2026-10-06');
 assert.equal(answers.sms_consent_source,'https://hilltophome.co/');
 assert.ok(!Number.isNaN(Date.parse(answers.sms_consent_recorded_at)));
 assert.equal(requests.length,1,'contact data must only be sent to CRM, even with Meta credentials');
}
globalThis.fetch=originalFetch;
console.log('PASS: server disclosure evidence, strict boolean consent, no advertising transmission.');

const stale=toSubmitPayload({...state,sms_opt_in:true});
stale.answers.sms_consent_text='old disclosure';
assert.equal((await POST(request(stale))).status,409);
const staleVersion=toSubmitPayload({...state,sms_opt_in:true});
staleVersion.answers.sms_consent_version='old';
assert.equal((await POST(request(staleVersion))).status,409);
console.log('PASS: stale rendered disclosure cannot be recorded as current consent.');
