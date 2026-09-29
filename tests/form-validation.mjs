import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
function load(path) {
 const source=ts.transpileModule(fs.readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 const exports={};new Function('exports',source)(exports);return exports;
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
