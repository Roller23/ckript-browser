(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ErrorHandler = void 0;
    class ErrorHandler {
        static throwError(cause) {
            throw new Error(cause);
        }
    }
    exports.ErrorHandler = ErrorHandler;
});
//# sourceMappingURL=error-handler.js.map