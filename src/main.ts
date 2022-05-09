import {Interpreter as _Interpreter} from './interpreter'


declare global {
  var Interpreter: typeof _Interpreter;
  var get: any;
}

globalThis.Interpreter = _Interpreter;
globalThis.get = new _Interpreter();