"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler {
    static throwError(cause) {
        throw new Error(cause);
    }
}
exports.ErrorHandler = ErrorHandler;
