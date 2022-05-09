(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./evaluator", "./lexer", "./parser", "./token", "./utils", "./vm"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Interpreter = void 0;
    const evaluator_1 = require("./evaluator");
    const lexer_1 = require("./lexer");
    const parser_1 = require("./parser");
    const token_1 = require("./token");
    const utils_1 = require("./utils");
    const vm_1 = require("./vm");
    class Interpreter {
        constructor() {
            this.cvm = new vm_1.CVM();
            this.errorListeners = [];
        }
        processCode(code, args = []) {
            const tokens = new lexer_1.Lexer().processCode(code);
            const [AST] = new parser_1.Parser(tokens, token_1.TokenType.NONE).parse();
            const evaluator = new evaluator_1.Evaluator(AST, this.cvm);
            const val = (evaluator.stack.argv = new vm_1.Variable()).val;
            val.arrayType = 'str';
            val.type = utils_1.VarType.ARR;
            for (let i = 0; i < args.length; i++) {
                val.arrayValues.push(new vm_1.Value(utils_1.VarType.STR, args[i]));
            }
            evaluator.VM.activeEvaluators.push(evaluator);
            const clearEvaluators = () => {
                evaluator.VM.activeEvaluators.splice(0, evaluator.VM.activeEvaluators.length);
            };
            try {
                evaluator.start();
            }
            catch (e) {
                if (e instanceof vm_1.Exit) {
                    console.log(e.message);
                }
                else if (this.errorListeners.length === 0) {
                    throw e;
                }
                else {
                    this.errorListeners.forEach(listener => listener(e));
                }
                clearEvaluators();
            }
            clearEvaluators();
        }
        onOutput(cb) {
            this.cvm.onOutput(cb);
        }
        onError(cb) {
            this.errorListeners.push(cb);
        }
    }
    exports.Interpreter = Interpreter;
});
//# sourceMappingURL=interpreter.js.map