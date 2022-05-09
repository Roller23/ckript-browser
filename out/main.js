(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./interpreter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const interpreter_1 = require("./interpreter");
    globalThis.Interpreter = interpreter_1.Interpreter;
    globalThis.get = new interpreter_1.Interpreter();
});
//# sourceMappingURL=main.js.map