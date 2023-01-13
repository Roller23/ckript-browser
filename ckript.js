(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./token"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Node = exports.Declaration = exports.Statement = exports.ClassStatement = exports.FuncParam = exports.FuncExpression = exports.Expression = exports.ExprType = exports.StmtType = exports.DeclType = exports.NodeType = void 0;
    const token_1 = require("./token");
    var NodeType;
    (function (NodeType) {
        NodeType[NodeType["EXPR"] = 0] = "EXPR";
        NodeType[NodeType["STMT"] = 1] = "STMT";
        NodeType[NodeType["DECL"] = 2] = "DECL";
        NodeType[NodeType["UNKNOWN"] = 3] = "UNKNOWN";
    })(NodeType = exports.NodeType || (exports.NodeType = {}));
    var DeclType;
    (function (DeclType) {
        DeclType[DeclType["VAR_DECL"] = 0] = "VAR_DECL";
        DeclType[DeclType["NONE"] = 1] = "NONE";
    })(DeclType = exports.DeclType || (exports.DeclType = {}));
    var StmtType;
    (function (StmtType) {
        StmtType[StmtType["IF"] = 0] = "IF";
        StmtType[StmtType["RETURN"] = 1] = "RETURN";
        StmtType[StmtType["WHILE"] = 2] = "WHILE";
        StmtType[StmtType["FOR"] = 3] = "FOR";
        StmtType[StmtType["COMPOUND"] = 4] = "COMPOUND";
        StmtType[StmtType["EXPR"] = 5] = "EXPR";
        StmtType[StmtType["UNKNOWN"] = 6] = "UNKNOWN";
        StmtType[StmtType["NOP"] = 7] = "NOP";
        StmtType[StmtType["DECL"] = 8] = "DECL";
        StmtType[StmtType["CLASS"] = 9] = "CLASS";
        StmtType[StmtType["BREAK"] = 10] = "BREAK";
        StmtType[StmtType["CONTINUE"] = 11] = "CONTINUE";
        StmtType[StmtType["SET"] = 12] = "SET";
        StmtType[StmtType["SET_IDX"] = 13] = "SET_IDX";
        StmtType[StmtType["NONE"] = 14] = "NONE";
    })(StmtType = exports.StmtType || (exports.StmtType = {}));
    var ExprType;
    (function (ExprType) {
        ExprType[ExprType["BINARY_OP"] = 0] = "BINARY_OP";
        ExprType[ExprType["UNARY_OP"] = 1] = "UNARY_OP";
        ExprType[ExprType["FUNC_CALL"] = 2] = "FUNC_CALL";
        ExprType[ExprType["FUNC_EXPR"] = 3] = "FUNC_EXPR";
        ExprType[ExprType["NUM_EXPR"] = 4] = "NUM_EXPR";
        ExprType[ExprType["STR_EXPR"] = 5] = "STR_EXPR";
        ExprType[ExprType["IDENTIFIER_EXPR"] = 6] = "IDENTIFIER_EXPR";
        ExprType[ExprType["BOOL_EXPR"] = 7] = "BOOL_EXPR";
        ExprType[ExprType["NOP"] = 8] = "NOP";
        ExprType[ExprType["RPN"] = 9] = "RPN";
        ExprType[ExprType["LPAREN"] = 10] = "LPAREN";
        ExprType[ExprType["RPAREN"] = 11] = "RPAREN";
        ExprType[ExprType["INDEX"] = 12] = "INDEX";
        ExprType[ExprType["ARRAY"] = 13] = "ARRAY";
        ExprType[ExprType["NONE"] = 14] = "NONE";
    })(ExprType = exports.ExprType || (exports.ExprType = {}));
    class Expression {
        constructor(type, arg) {
            this.nodeType = NodeType.EXPR;
            this.type = ExprType.NONE;
            this.literal = undefined;
            this.funcExpr = null;
            this.arrayType = '';
            this.arrayHoldsRefs = false;
            this.nodeExpressions = [];
            this.argsList = [];
            this.arraySize = [];
            this.op = token_1.TokenType.NONE;
            this.type = type;
            if (this.type === ExprType.UNARY_OP || this.type === ExprType.BINARY_OP) {
                this.op = arg;
            }
            else if (this.type === ExprType.RPN) {
                this.nodeExpressions = arg;
            }
            else if (this.type === ExprType.INDEX) {
                this.op = token_1.TokenType.LEFT_BRACKET;
                this.nodeExpressions = arg;
            }
            else if (this.type === ExprType.BOOL_EXPR) {
                this.literal = arg;
            }
            else if (this.type === ExprType.FUNC_EXPR) {
                this.funcExpr = arg;
            }
            else if (this.type === ExprType.FUNC_CALL) {
                this.argsList = arg;
            }
            else if (this.type === ExprType.STR_EXPR) {
                this.literal = arg;
            }
            else if (this.type === ExprType.IDENTIFIER_EXPR) {
                this.literal = arg;
            }
            else if (this.type === ExprType.NUM_EXPR) {
                this.literal = arg;
            }
        }
        isOperand() {
            return this.type === ExprType.BINARY_OP || this.type === ExprType.UNARY_OP ||
                this.type === ExprType.FUNC_CALL || this.type === ExprType.INDEX;
        }
        isParen() {
            return this.type === ExprType.LPAREN || this.type === ExprType.RPAREN;
        }
        isEvaluable() {
            return !this.isOperand() && !this.isParen();
        }
    }
    exports.Expression = Expression;
    class FuncExpression {
        constructor() {
            this.params = [];
            this.retType = 'void';
            this.retRef = false;
            this.capturess = false;
            this.instructions = [];
        }
    }
    exports.FuncExpression = FuncExpression;
    class FuncParam {
        constructor(type, name) {
            this.typeName = 'num';
            this.paramName = '';
            this.isRef = false;
            this.typeName = type;
            this.paramName = name;
        }
    }
    exports.FuncParam = FuncParam;
    class ClassStatement {
        constructor() {
            this.className = '';
            this.members = [];
        }
    }
    exports.ClassStatement = ClassStatement;
    class Statement {
        constructor(arg) {
            this.nodeType = NodeType.STMT;
            this.type = StmtType.NONE;
            this.expressions = [];
            this.statements = [];
            this.indexes = [];
            this.objMembers = [];
            this.line = 0;
            if (arg instanceof ClassStatement) {
                this.type = StmtType.CLASS;
                this.classStmt = arg;
            }
            else {
                this.type = arg;
                this.classStmt = null;
            }
        }
    }
    exports.Statement = Statement;
    class Declaration {
        constructor(type) {
            this.nodeType = NodeType.DECL;
            this.type = DeclType.NONE;
            this.varType = '';
            this.id = '';
            this.isConstant = false;
            this.isAllocated = false;
            this.isReference = false;
            this.varExpression = [];
            this.type = type;
        }
    }
    exports.Declaration = Declaration;
    class Node {
        constructor(obj) {
            this.type = NodeType.UNKNOWN;
            this.children = [];
            this.obj = obj;
            if (this.obj !== null) {
                this.type = this.obj.nodeType;
            }
        }
        addChildren(children) {
            this.children.push(...children);
        }
        toStmt() {
            return this.obj;
        }
        toExpr() {
            return this.obj;
        }
        toDecl() {
            return this.obj;
        }
    }
    exports.Node = Node;
});

},{"./token":8}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ast", "./error-handler", "./token", "./utils", "./vm"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Evaluator = void 0;
    const ast_1 = require("./ast");
    const error_handler_1 = require("./error-handler");
    const token_1 = require("./token");
    const utils_1 = require("./utils");
    const vm_1 = require("./vm");
    var OperatorType;
    (function (OperatorType) {
        OperatorType[OperatorType["BASIC"] = 0] = "BASIC";
        OperatorType[OperatorType["FUNC"] = 1] = "FUNC";
        OperatorType[OperatorType["INDEX"] = 2] = "INDEX";
        OperatorType[OperatorType["UNKNOWN"] = 3] = "UNKNOWN";
    })(OperatorType || (OperatorType = {}));
    ;
    class Operator {
        constructor(opType, arg) {
            this.opType = OperatorType.UNKNOWN;
            this.funcCall = [];
            this.indexRpn = [];
            this.type = token_1.TokenType.UNKNOWN;
            this.opType = opType;
            if (this.opType === OperatorType.BASIC) {
                this.type = arg;
            }
            else if (this.opType === OperatorType.FUNC) {
                this.funcCall = arg;
            }
            else if (this.opType === OperatorType.INDEX) {
                this.indexRpn = arg;
            }
        }
    }
    var ElementType;
    (function (ElementType) {
        ElementType[ElementType["OPERATOR"] = 0] = "OPERATOR";
        ElementType[ElementType["VALUE"] = 1] = "VALUE";
        ElementType[ElementType["UNKNOWN"] = 2] = "UNKNOWN";
    })(ElementType || (ElementType = {}));
    class RpnElement {
        constructor(type, arg) {
            this.type = ElementType.UNKNOWN;
            this.op = new Operator(OperatorType.UNKNOWN);
            this.value = new vm_1.Value(utils_1.VarType.UNKNOWN);
            this.type = type;
            if (this.type === ElementType.OPERATOR) {
                this.op = arg;
            }
            else if (this.type === ElementType.VALUE) {
                this.value = arg;
            }
        }
    }
    class Evaluator {
        constructor(AST, VM) {
            this.stack = {};
            this.insideFunc = false;
            this.returnsRef = false;
            this.nestedLoops = 0;
            this.currentLine = 0;
            this.returnValue = null;
            this.VM = VM;
            this.AST = AST;
        }
        throwError(cause) {
            error_handler_1.ErrorHandler.throwError(`Runtime error: ${cause} (line ${this.currentLine})`);
        }
        getHeapVal(ref) {
            if (ref < 0 || ref >= this.VM.heap.chunks.length) {
                this.throwError('Dereferencing a value that is not on the heap');
            }
            const ptr = this.VM.heap.chunks[ref].data;
            if (ptr === null) {
                this.throwError('Dereferencing a null pointer');
            }
            return ptr;
        }
        getReferenceByName(name) {
            if (name in this.VM.globals) {
                this.throwError('Trying to access a native function');
            }
            if (!(name in this.stack))
                return null;
            return this.stack[name];
        }
        getValue(el) {
            if (el.value.isLvalue()) {
                if (el.value.memberName.length !== 0) {
                    return el.value;
                }
                let _var = this.getReferenceByName(el.value.referenceName);
                if (_var === null) {
                    this.throwError(`'${el.value.referenceName}' is not defined`);
                }
                if (_var.val.heapRef !== -1) {
                    return this.getHeapVal(_var.val.heapRef);
                }
                return _var.val;
            }
            else if (el.value.heapRef !== -1) {
                return this.getHeapVal(el.value.heapRef);
            }
            else {
                return el.value;
            }
        }
        stringify(val) {
            if (val.heapRef !== -1) {
                return `reference to ${this.stringify(this.getHeapVal(val.heapRef))}`;
            }
            else if (val.type === utils_1.VarType.STR) {
                return val.value;
            }
            else if (val.type === utils_1.VarType.BOOL) {
                return val.value ? 'true' : 'false';
            }
            else if (val.type === utils_1.VarType.NUM) {
                return val.value.toString();
            }
            else if (val.type === utils_1.VarType.FUNC) {
                return 'function';
            }
            else if (val.type === utils_1.VarType.CLASS) {
                return 'class';
            }
            else if (val.type === utils_1.VarType.OBJ) {
                return 'object';
            }
            else if (val.type === utils_1.VarType.ARR) {
                return 'array';
            }
            else if (val.type === utils_1.VarType.VOID) {
                return 'void';
            }
            else if (val.type === utils_1.VarType.UNKNOWN) {
                return 'null';
            }
            else if (val.type === utils_1.VarType.ID) {
                return `variable (${val.referenceName})`;
            }
            return '';
        }
        static makeCopy(val) {
            if (Evaluator.primitiveTypes.includes(val.type)) {
                return new vm_1.Value(val.type, val.value);
            }
            else if (val.type === utils_1.VarType.ID) {
                let newVal = new vm_1.Value(utils_1.VarType.ID);
                newVal.referenceName = val.referenceName;
                return newVal;
            }
            else if (val.type === utils_1.VarType.REF) {
                let newVal = new vm_1.Value(utils_1.VarType.REF);
                newVal.heapRef = val.heapRef;
                return newVal;
            }
            else if (val.type === utils_1.VarType.ARR) {
                let newVal = new vm_1.Value(utils_1.VarType.ARR);
                newVal.arrayType = val.arrayType;
                for (const arrayVal of val.arrayValues) {
                    newVal.arrayValues.push(Evaluator.makeCopy(arrayVal));
                }
                return newVal;
            }
            else if (val.type === utils_1.VarType.OBJ) {
                let newVal = new vm_1.Value(utils_1.VarType.OBJ);
                newVal.memberName = val.memberName;
                newVal.className = val.className;
                Object.keys(val.memberValues).forEach((key) => {
                    newVal.memberValues[key] = Evaluator.makeCopy(val.memberValues[key]);
                });
                return newVal;
            }
            else if (val.type === utils_1.VarType.FUNC) {
                // TODO: functions might not need copying since they're immutable anyway
                let newVal = new vm_1.Value(utils_1.VarType.FUNC);
                newVal.thisRef = val.thisRef;
                newVal.func = new ast_1.FuncExpression();
                newVal.func.capturess = val.func.capturess;
                newVal.func.retRef = val.func.retRef;
                newVal.func.retType = val.func.retType;
                newVal.func.instructions = val.func.instructions; // no copy
                newVal.func.params = val.func.params; // no copy
                return newVal;
            }
            return val; // Unknown, void, or class
        }
        setMember(members, expression) {
            const base = members[0];
            let _var = this.getReferenceByName(base);
            if (_var === null) {
                this.throwError(`'${base}' is not defined`);
            }
            let val = _var.val.heapRef !== -1 ? this.getHeapVal(_var.val.heapRef) : _var?.val;
            let references = [val];
            let i = 0;
            let prev = members[0];
            for (const member of members) {
                if (i++ === 0)
                    continue;
                let temp = references[references.length - 1];
                temp = temp.heapRef !== -1 ? this.getHeapVal(temp.heapRef) : temp;
                if (temp.type !== utils_1.VarType.OBJ) {
                    this.throwError(`${this.stringify(temp)} is not an object`);
                }
                if (!(member in temp.memberValues)) {
                    this.throwError(`${prev} has no member '${member}'`);
                }
                references.push(temp.memberValues[member]);
                prev = member;
            }
            const rvalue = this.evaluateExpression(expression);
            let fin = references[references.length - 1];
            fin = fin.heapRef !== -1 ? this.getHeapVal(fin.heapRef) : fin;
            if (fin.type !== rvalue.type) {
                this.throwError(`Cannot assign ${this.stringify(rvalue)}, incorrect type`);
            }
            Object.assign(fin, rvalue);
        }
        setIndex(stmt) {
            let arr = this.getReferenceByName(stmt.objMembers[0]);
            if (arr === null) {
                this.throwError(`'${stmt.objMembers[0]}' is not defined`);
            }
            let val = arr.val.heapRef !== -1 ? this.getHeapVal(arr.val.heapRef) : arr.val;
            let references = [val];
            for (const index of stmt.indexes) {
                let temp = references[references.length - 1];
                temp = temp.heapRef !== -1 ? this.getHeapVal(temp.heapRef) : temp;
                if (temp.type !== utils_1.VarType.ARR) {
                    this.throwError(`${this.stringify(temp)} is not an array`);
                }
                const indexVal = this.evaluateExpression(index.toExpr().nodeExpressions); // not sure
                if (indexVal.type !== utils_1.VarType.NUM || !Number.isInteger(indexVal.type)) {
                    this.throwError(`Cannot access array with ${this.stringify(indexVal)}`);
                }
                if (indexVal.value < 0 || indexVal.value >= temp.arrayValues.length) {
                    this.throwError(`Index [${indexVal.value}] out of range`);
                }
                references.push(temp.arrayValues[indexVal.value]);
            }
            const rvalue = this.evaluateExpression(stmt.expressions[0]);
            let fin = references[references.length - 1];
            fin = fin.heapRef !== -1 ? this.getHeapVal(fin.heapRef) : fin;
            if (fin.type !== rvalue.type) {
                this.throwError(`Cannot assign ${this.stringify(rvalue)}, incorrect type`);
            }
            Object.assign(fin, rvalue);
        }
        logicalNot(x) {
            const xVal = this.getValue(x);
            if (xVal.type === utils_1.VarType.BOOL) {
                return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.BOOL, !xVal.value));
            }
            this.throwError(`Cannot perform logical not on ${this.stringify(xVal)}`);
            return new RpnElement(ElementType.UNKNOWN);
        }
        bitwiseNot(x) {
            const xVal = this.getValue(x);
            if (xVal.type === utils_1.VarType.NUM) {
                return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.NUM, ~xVal.value));
            }
            this.throwError(`Cannot perform bitwise not on ${this.stringify(xVal)}`);
            return new RpnElement(ElementType.UNKNOWN);
        }
        performAddition(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.ARR) {
                if (yVal.type === utils_1.Utils.varLUT[xVal.arrayType]) {
                    // TODO: fix arrays with refs
                    let xValCpy = Evaluator.makeCopy(xVal);
                    xValCpy.arrayValues.push(Evaluator.makeCopy(yVal));
                    return Evaluator.RpnVal(xValCpy);
                }
                else {
                    this.throwError(`Cannot append ${this.stringify(yVal)} to an array of ${xVal.arrayType}s`);
                }
            }
            else if (yVal.type === utils_1.VarType.ARR) {
                if (xVal.type === utils_1.Utils.varLUT[yVal.arrayType]) {
                    let yValCpy = Evaluator.makeCopy(yVal);
                    yValCpy.arrayValues.unshift(Evaluator.makeCopy(xVal));
                    return Evaluator.RpnVal(yValCpy);
                }
                else {
                    this.throwError(`Cannot prepend ${this.stringify(xVal)} to an array of ${yVal.arrayType}s`);
                }
            }
            else if (xVal.type === utils_1.VarType.STR || yVal.type === utils_1.VarType.STR) {
                let val = new vm_1.Value(utils_1.VarType.STR);
                val.value = this.stringify(xVal) + this.stringify(yVal);
                return Evaluator.RpnVal(val);
            }
            else if (xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) {
                let val = new vm_1.Value(utils_1.VarType.NUM);
                val.value = xVal.value + yVal.value;
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot perform addition on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        performSubtraction(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) {
                let val = new vm_1.Value(utils_1.VarType.NUM, xVal.value - yVal.value);
                return Evaluator.RpnVal(val);
            }
            else if (xVal.type === utils_1.VarType.ARR && yVal.isInteger()) {
                let xValCpy = Evaluator.makeCopy(xVal);
                if (yVal.value < 0 || yVal.value >= xValCpy.arrayValues.length) {
                    this.throwError(`Cannot remove index [${yVal.value}] (out of range)`);
                }
                xValCpy.arrayValues.splice(yVal.value, 1);
                return Evaluator.RpnVal(xValCpy);
            }
            this.throwError(`Cannot perform subtraction on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        performMultiplication(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) {
                let val = new vm_1.Value(utils_1.VarType.NUM, xVal.value * yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot perform multiplication on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        performDivision(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) {
                if (yVal.value === 0) {
                    this.throwError('Cannot divide by zero');
                }
                let val = new vm_1.Value(utils_1.VarType.NUM, xVal.value / yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot perform division on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        performModulo(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) {
                if (yVal.value === 0) {
                    this.throwError('Cannot divide by zero');
                }
                let val = new vm_1.Value(utils_1.VarType.NUM, xVal.value % yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot perform modulo on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        bitwiseAnd(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) {
                let val = new vm_1.Value(utils_1.VarType.NUM, xVal.value & yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot perform bitwise and on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        bitwiseOr(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) {
                let val = new vm_1.Value(utils_1.VarType.NUM, xVal.value | yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot perform bitwise or on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        shiftLeft(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) {
                let val = new vm_1.Value(utils_1.VarType.NUM, xVal.value << yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot perform shift left and on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        shiftRight(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) {
                let val = new vm_1.Value(utils_1.VarType.NUM, xVal.value >> yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot perform bitwise shift right on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        bitwiseXor(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.ARR && yVal.type === utils_1.VarType.ARR) {
                if (xVal.arrayType === yVal.arrayType) {
                    let xValCpy = Evaluator.makeCopy(xVal);
                    xValCpy.arrayValues.push(...Evaluator.makeCopy(yVal).arrayValues);
                    return Evaluator.RpnVal(xValCpy);
                }
                else {
                    this.throwError(`Cannot concatenate arrays of type ${xVal.arrayType} and ${yVal.arrayType}`);
                }
            }
            if (xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) {
                let val = new vm_1.Value(utils_1.VarType.NUM, xVal.value ^ yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot perform bitwise xor on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        logicalAnd(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.BOOL && yVal.type === utils_1.VarType.BOOL) {
                let val = new vm_1.Value(utils_1.VarType.BOOL, xVal.value && yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot perform logical and on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        logicalOr(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.BOOL && yVal.type === utils_1.VarType.BOOL) {
                let val = new vm_1.Value(utils_1.VarType.BOOL, xVal.value || yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot perform logical or on ${this.stringify(xVal)} and ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        assign(x, y) {
            if (!x.value.isLvalue()) {
                this.throwError('Cannot assign to an rvalue');
            }
            let _var = this.getReferenceByName(x.value.referenceName);
            if (_var === null) {
                this.throwError(`${x.value.referenceName} is not defined`);
            }
            if (_var.constant) {
                this.throwError(`Cannot reassign a constant variable (${x.value.referenceName})`);
            }
            let xValue = this.getValue(x);
            const yValue = this.getValue(y);
            if (xValue.type === utils_1.VarType.UNKNOWN) {
                this.throwError(`${xValue.referenceName} doesn't point to anything on the heap`);
            }
            if (xValue.type !== yValue.type) {
                this.throwError(`Cannot assign ${this.stringify(yValue)} to ${x.value.referenceName}`);
            }
            return Evaluator.RpnVal(Object.assign(xValue, Evaluator.makeCopy(yValue)));
        }
        plusAssign(x, y) {
            return this.assign(x, this.performAddition(x, y));
        }
        minusAssign(x, y) {
            return this.assign(x, this.performSubtraction(x, y));
        }
        mulAssign(x, y) {
            return this.assign(x, this.performMultiplication(x, y));
        }
        divAssign(x, y) {
            return this.assign(x, this.performDivision(x, y));
        }
        modAssign(x, y) {
            return this.assign(x, this.performModulo(x, y));
        }
        lshiftAssign(x, y) {
            return this.assign(x, this.shiftLeft(x, y));
        }
        rshiftAssign(x, y) {
            return this.assign(x, this.shiftRight(x, y));
        }
        andAssign(x, y) {
            return this.assign(x, this.bitwiseAnd(x, y));
        }
        orAssign(x, y) {
            return this.assign(x, this.bitwiseOr(x, y));
        }
        xorAssign(x, y) {
            return this.assign(x, this.bitwiseXor(x, y));
        }
        accessMember(x, y) {
            if (!y.value.isLvalue()) {
                this.throwError('Object members can only be accessed with lvalues');
            }
            let obj = this.getValue(x);
            if (obj.type !== utils_1.VarType.OBJ) {
                this.throwError(`${this.stringify(obj)} is not an object`);
            }
            if (!(y.value.referenceName in obj.memberValues)) {
                const objectName = x.value.isLvalue() ? ` ${x.value.referenceName} ` : ' ';
                this.throwError(`Object${objectName}has no member named ${y.value.referenceName}`);
            }
            const val = obj.memberValues[y.value.referenceName];
            if (val.type === utils_1.VarType.FUNC) {
                val.funcName = y.value.referenceName;
            }
            return Evaluator.RpnVal(val);
        }
        accessIndex(arr, idx) {
            let array = this.getValue(arr);
            if (array.type !== utils_1.VarType.ARR) {
                this.throwError(`${this.stringify(array)} is not an array`);
            }
            const index = this.evaluateExpression(idx.op.indexRpn);
            if (!index.isInteger()) {
                this.throwError(`Index expected to be an integer, but ${this.stringify(index)} found`);
            }
            if (index.value < 0 || index.value >= array.arrayValues.length) {
                this.throwError(`index [${index.value}] out of range`);
            }
            let res = array.arrayValues[index.value];
            return Evaluator.RpnVal(res);
        }
        compareEq(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if ((xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) ||
                (xVal.type === utils_1.VarType.STR && yVal.type === utils_1.VarType.STR) ||
                (xVal.type === utils_1.VarType.BOOL && yVal.type === utils_1.VarType.BOOL)) {
                let val = new vm_1.Value(utils_1.VarType.BOOL, xVal.value === yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot compare ${this.stringify(xVal)} to ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        compareNeq(x, y) {
            const el = this.compareEq(x, y);
            el.value.value = !el.value.value;
            return el;
        }
        compareGt(x, y) {
            const xVal = this.getValue(x);
            const yVal = this.getValue(y);
            if (xVal.type === utils_1.VarType.NUM && yVal.type === utils_1.VarType.NUM) {
                let val = new vm_1.Value(utils_1.VarType.BOOL, xVal.value > yVal.value);
                return Evaluator.RpnVal(val);
            }
            this.throwError(`Cannot compare ${this.stringify(xVal)} to ${this.stringify(yVal)}`);
            return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
        }
        compareLt(x, y) {
            return this.compareGt(y, x);
        }
        compareGtEq(x, y) {
            const gt = this.compareGt(x, y);
            const eq = this.compareEq(x, y);
            const val = new vm_1.Value(utils_1.VarType.BOOL, gt.value.value || eq.value.value);
            return Evaluator.RpnVal(val);
        }
        compareLtEq(x, y) {
            return this.compareGtEq(y, x);
        }
        registerClass(_class) {
            const v = this.getReferenceByName(_class.className);
            if (v !== null) {
                delete this.stack[_class.className];
            }
            let _var = (this.stack[_class.className] = new vm_1.Variable());
            _var.type = 'class';
            _var.val.type = utils_1.VarType.CLASS;
            _var.val.members = _class.members;
            _var.val.className = _class.className;
        }
        declareVariable(declaration) {
            const decl = declaration.obj;
            const varVal = this.evaluateExpression(decl.varExpression, decl.isReference);
            const varType = utils_1.Utils.varLUT[decl.varType];
            let exprType = varVal.type;
            if (decl.isReference) {
                exprType = this.getHeapVal(varVal.heapRef).type;
            }
            if (varType !== exprType) {
                this.throwError(`Cannot assign ${this.stringify(varVal)} to a variable of type ${decl.varType}`);
            }
            const v = this.getReferenceByName(decl.id);
            if (v === null) {
                delete this.stack[decl.id];
            }
            if (decl.isAllocated) {
                const chunkRef = this.VM.allocate(varVal).heapRef;
                let _var = (this.stack[decl.id] = new vm_1.Variable());
                _var.val.heapRef = chunkRef;
                _var.type = decl.varType;
                _var.constant = decl.isConstant;
                if (varVal.type === utils_1.VarType.OBJ) {
                    this.VM.globals.bind.execute([_var.val], this);
                }
                this.VM.checkChunks();
                return;
            }
            let _var = (this.stack[decl.id] = new vm_1.Variable());
            _var.type = decl.varType;
            _var.val = varVal;
            _var.constant = decl.isConstant;
        }
        constructObject(call, _class) {
            let val = new vm_1.Value(utils_1.VarType.OBJ);
            const classVal = this.getValue(_class);
            let argsCounter = 0;
            for (const arg of call.op.funcCall) {
                if (arg.length !== 0) {
                    argsCounter++;
                }
                else {
                    this.throwError('Illegal class invocation, missing members');
                }
            }
            const membersCount = classVal.members.length;
            if (argsCounter !== membersCount) {
                this.throwError(`${_class.value.referenceName} has ${membersCount} members, ${argsCounter} given`);
            }
            val.className = _class.value.referenceName;
            let i = 0;
            for (const nodeList of call.op.funcCall) {
                const member = classVal.members[i];
                const argVal = this.evaluateExpression(nodeList, member.isRef);
                let realVal = argVal;
                let argType = argVal.type;
                if (argVal.heapRef !== -1) {
                    realVal = this.getHeapVal(argVal.heapRef);
                    argType = realVal.type;
                }
                if (member.isRef && argVal.heapRef === -1) {
                    this.throwError(`Object argument ${i + 1} expected to be a reference, but value given`);
                }
                if (argType !== utils_1.Utils.varLUT[member.typeName]) {
                    this.throwError(`Argument ${i + 1} expected to be ${member.typeName}, but ${this.stringify(realVal)} given`);
                }
                argVal.memberName = member.paramName;
                val.memberValues[member.paramName] = argVal;
                i++;
            }
            return Evaluator.RpnVal(val);
        }
        executeFunction(fn, call) {
            const isGlobal = fn.value.referenceName in this.VM.globals;
            if (fn.value.isLvalue() && isGlobal) {
                let callArgs = [];
                const needsRef = ['bind', 'same_ref'].includes(fn.value.referenceName);
                for (const nodeList of call.op.funcCall) {
                    if (nodeList.length === 0)
                        break;
                    callArgs.push(this.evaluateExpression(nodeList, needsRef));
                }
                this.VM.trace.push(fn.value.referenceName, this.currentLine);
                const returnVal = this.VM.globals[fn.value.referenceName].execute(callArgs, this);
                this.VM.trace.pop();
                return Evaluator.RpnVal(returnVal);
            }
            let fnValue = this.getValue(fn);
            if (fnValue.type === utils_1.VarType.CLASS) {
                return this.constructObject(call, fn);
            }
            if (fnValue.type === utils_1.VarType.STR) {
                let args = 0;
                for (const arg of call.op.funcCall) {
                    if (arg.length !== 0) {
                        args++;
                    }
                    else if (args !== 0) {
                        this.throwError('Illegal string interpolation, missing arguments');
                    }
                }
                let str = Evaluator.makeCopy(fnValue);
                if (args == 0)
                    return Evaluator.RpnVal(str);
                let argn = 1;
                for (const arg of call.op.funcCall) {
                    const argVal = this.evaluateExpression(arg);
                    const find = '@' + argn;
                    str.value = str.value.replace(new RegExp(find, 'g'), this.VM.stringify(argVal));
                    argn++;
                }
                return Evaluator.RpnVal(str);
            }
            if (fnValue.type !== utils_1.VarType.FUNC) {
                this.throwError(`${this.stringify(fnValue)} is not a function or a string`);
            }
            if (fnValue.func.instructions.length === 0) {
                return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
            }
            let argsCounter = 0;
            for (const arg of call.op.funcCall) {
                if (arg.length !== 0) {
                    argsCounter++;
                }
                else if (argsCounter !== 0) {
                    this.throwError('Illegal function invocation, missing arguments');
                }
            }
            if (argsCounter !== fnValue.func.params.length) {
                this.throwError(`${this.stringify(fnValue)} expects ${fnValue.func.params.length}, but ${argsCounter} given`);
            }
            let funcEvaluator = new Evaluator(fnValue.func.instructions[0], this.VM);
            funcEvaluator.insideFunc = true;
            funcEvaluator.returnsRef = fnValue.func.retRef;
            if (fnValue.func.params.length !== 0) {
                let i = 0;
                for (const nodeList of call.op.funcCall) {
                    const fnParam = fnValue.func.params[i];
                    const argVal = this.evaluateExpression(nodeList, fnParam.isRef);
                    if (fnParam.isRef && argVal.heapRef === -1) {
                        this.throwError(`Argument ${i + 1} expected to be a reference, but value given`);
                    }
                    let argType = argVal.type;
                    const expectedType = utils_1.Utils.varLUT[fnParam.typeName];
                    if (argType !== expectedType) {
                        let realVal = Evaluator.makeCopy(argVal);
                        if (argVal.heapRef !== -1) {
                            realVal = this.getHeapVal(argVal.heapRef);
                            argType = realVal.type;
                        }
                        if (argType !== expectedType) {
                            this.throwError(`Argument ${i + 1} expected to be ${fnParam.typeName}, but ${this.stringify(realVal)} given`);
                        }
                    }
                    let _var = (funcEvaluator.stack[fnParam.paramName] = new vm_1.Variable());
                    _var.type = fnParam.typeName;
                    _var.val = argVal;
                    i++;
                }
            }
            if (fn.value.isLvalue()) {
                funcEvaluator.stack[fn.value.referenceName] = this.stack[fn.value.referenceName];
            }
            if (fnValue.thisRef !== -1) {
                let _var = (funcEvaluator.stack['this'] = new vm_1.Variable());
                _var.type = 'obj';
                _var.val.heapRef = fnValue.thisRef;
            }
            if (fnValue.func.capturess) {
                Object.keys(this.stack).forEach((key) => {
                    if (key === 'this')
                        return;
                    if (fn.value.isLvalue() && key === fn.value.referenceName)
                        return;
                    let contains = false;
                    for (const p of fnValue.func.params) {
                        if (p.paramName === key) {
                            contains = true;
                            break;
                        }
                    }
                    if (contains)
                        return;
                    funcEvaluator.stack[key] = this.stack[key];
                });
            }
            const fnName = fn.value.isLvalue() ? fn.value.referenceName : fnValue.funcName;
            this.VM.trace.push(fnName, this.currentLine);
            this.VM.activeEvaluators.push(funcEvaluator);
            funcEvaluator.start();
            this.VM.activeEvaluators.pop();
            if (fnValue.func.retRef) {
                if (funcEvaluator.returnValue.heapRef === -1) {
                    this.throwError(`function returns a reference, but ${this.stringify(funcEvaluator.returnValue)} was returned`);
                    return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
                }
                const heapVal = this.getHeapVal(funcEvaluator.returnValue.heapRef);
                if (heapVal.type !== utils_1.Utils.varLUT[fnValue.func.retType]) {
                    this.throwError(`function return type is ref ${fnValue.func.retType}, but ${this.stringify(funcEvaluator.returnValue)} was returned`);
                    return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
                }
                this.VM.trace.pop();
                return Evaluator.RpnVal(funcEvaluator.returnValue);
            }
            if (funcEvaluator.returnValue.type !== utils_1.Utils.varLUT[fnValue.func.retType]) {
                this.throwError(`function return type is ${fnValue.func.retType}, but ${this.stringify(funcEvaluator.returnValue)} was returned`);
                return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.UNKNOWN));
            }
            this.VM.trace.pop();
            return Evaluator.RpnVal(funcEvaluator.returnValue);
        }
        start() {
            for (const statement of this.AST.children) {
                const flag = this.executeStatement(statement);
                if (flag === Evaluator.FLAG_RETURN)
                    break;
            }
            if (this.returnValue === null) {
                this.returnValue = new vm_1.Value(utils_1.VarType.VOID);
            }
        }
        executeStatement(statement) {
            const stmt = statement.obj;
            this.currentLine = stmt.line;
            if (stmt.type === ast_1.StmtType.NONE) {
                return Evaluator.FLAG_OK;
            }
            else if (stmt.type === ast_1.StmtType.EXPR) {
                if (stmt.expressions.length !== 1)
                    return Evaluator.FLAG_OK;
                this.evaluateExpression(stmt.expressions[0]);
                return Evaluator.FLAG_OK;
            }
            else if (stmt.type === ast_1.StmtType.CLASS) {
                this.registerClass(stmt.classStmt);
                return Evaluator.FLAG_OK;
            }
            else if (stmt.type === ast_1.StmtType.SET) {
                if (stmt.expressions.length === 0)
                    return Evaluator.FLAG_OK;
                this.setMember(stmt.objMembers, stmt.expressions[0]);
                return Evaluator.FLAG_OK;
            }
            else if (stmt.type === ast_1.StmtType.SET_IDX) {
                this.setIndex(stmt);
                return Evaluator.FLAG_OK;
            }
            else if (stmt.type === ast_1.StmtType.DECL) {
                if (stmt.statements.length !== 1)
                    return Evaluator.FLAG_OK;
                this.declareVariable(stmt.statements[0]);
                return Evaluator.FLAG_OK;
            }
            else if (stmt.type === ast_1.StmtType.COMPOUND) {
                if (stmt.statements.length === 0)
                    return Evaluator.FLAG_OK;
                for (const s of stmt.statements[0].children) {
                    const flag = this.executeStatement(s);
                    if (flag)
                        return flag;
                }
                return Evaluator.FLAG_OK;
            }
            else if (stmt.type === ast_1.StmtType.BREAK) {
                if (!this.nestedLoops) {
                    this.throwError('Break statement outside of loops is illegal');
                }
                return Evaluator.FLAG_BREAK;
            }
            else if (stmt.type === ast_1.StmtType.CONTINUE) {
                if (!this.nestedLoops) {
                    this.throwError('Continue statement outside of loops is illegal');
                }
                return Evaluator.FLAG_CONTINUE;
            }
            else if (stmt.type === ast_1.StmtType.RETURN) {
                if (!this.insideFunc) {
                    this.throwError('Return statement outside of functions is illegal');
                }
                const returnExpr = stmt.expressions[0];
                if (stmt.expressions.length !== 0 && returnExpr.length !== 0) {
                    this.returnValue = this.evaluateExpression(returnExpr, this.returnsRef);
                }
                return Evaluator.FLAG_RETURN;
            }
            else if (stmt.type === ast_1.StmtType.WHILE) {
                if (stmt.statements.length === 0)
                    return Evaluator.FLAG_OK;
                if (stmt.expressions[0].length === 0) {
                    this.throwError('While expects an expression');
                }
                this.nestedLoops++;
                while (true) {
                    const result = this.evaluateExpression(stmt.expressions[0]);
                    if (result.type !== utils_1.VarType.BOOL) {
                        this.throwError(`Expected a boolean value in while statement, found ${this.stringify(result)}`);
                    }
                    if (!result.value)
                        break;
                    const flag = this.executeStatement(stmt.statements[0]);
                    if (flag === Evaluator.FLAG_BREAK)
                        break;
                    if (flag === Evaluator.FLAG_RETURN)
                        return flag;
                }
                this.nestedLoops--;
                return Evaluator.FLAG_OK;
            }
            else if (stmt.type === ast_1.StmtType.FOR) {
                if (stmt.expressions.length !== 3) {
                    this.throwError(`For statement expects 3 expressions, ${stmt.expressions.length} given`);
                }
                if (stmt.statements.length === 0)
                    return Evaluator.FLAG_OK;
                if (stmt.expressions[0].length !== 0) {
                    this.evaluateExpression(stmt.expressions[0]);
                }
                this.nestedLoops++;
                const cond = stmt.expressions[1];
                const autoTrue = cond.length === 0;
                while (true) {
                    if (!autoTrue) {
                        // console.log('for evaluates', cond)
                        const result = this.evaluateExpression(cond);
                        if (result.type !== utils_1.VarType.BOOL) {
                            this.throwError(`Expected a boolean value in while statement, found ${this.stringify(result)}`);
                        }
                        if (!result.value)
                            break;
                    }
                    const flag = this.executeStatement(stmt.statements[0]);
                    if (flag === Evaluator.FLAG_BREAK)
                        break;
                    if (flag === Evaluator.FLAG_RETURN)
                        return flag;
                    const incrementExpr = stmt.expressions[2];
                    if (incrementExpr.length !== 0) {
                        this.evaluateExpression(incrementExpr);
                    }
                }
                this.nestedLoops--;
                return Evaluator.FLAG_OK;
            }
            else if (stmt.type === ast_1.StmtType.IF) {
                if (stmt.statements.length === 0)
                    return Evaluator.FLAG_OK;
                if (stmt.expressions[0].length === 0) {
                    this.throwError('If statement expects an expression');
                }
                const result = this.evaluateExpression(stmt.expressions[0]);
                if (result.type !== utils_1.VarType.BOOL) {
                    this.throwError(`Expected a boolean value in if statement, found ${this.stringify(result)}`);
                }
                if (result.value) {
                    const flag = this.executeStatement(stmt.statements[0]);
                    if (flag)
                        return flag;
                }
                else {
                    if (stmt.statements.length === 2) {
                        const flag = this.executeStatement(stmt.statements[1]);
                        if (flag)
                            return flag;
                    }
                }
                return Evaluator.FLAG_OK;
            }
            this.throwError(`Unknown statement! (${stmt.type})`);
            return Evaluator.FLAG_ERROR;
        }
        static RpnOp(type, arg) {
            return new RpnElement(ElementType.OPERATOR, new Operator(type, arg));
        }
        static RpnVal(val) {
            return new RpnElement(ElementType.VALUE, val);
        }
        nodeToElement(node) {
            const expr = node.obj;
            if (expr.isOperand()) {
                if (expr.type === ast_1.ExprType.FUNC_CALL) {
                    return Evaluator.RpnOp(OperatorType.FUNC, expr.argsList);
                }
                else if (expr.type === ast_1.ExprType.INDEX) {
                    return Evaluator.RpnOp(OperatorType.INDEX, expr.nodeExpressions);
                }
                else {
                    return Evaluator.RpnOp(OperatorType.BASIC, expr.op);
                }
            }
            else if (expr.type === ast_1.ExprType.BOOL_EXPR) {
                return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.BOOL, expr.literal));
            }
            else if (expr.type === ast_1.ExprType.STR_EXPR) {
                return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.STR, expr.literal));
            }
            else if (expr.type === ast_1.ExprType.NUM_EXPR) {
                return Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.NUM, expr.literal));
            }
            else if (expr.type === ast_1.ExprType.IDENTIFIER_EXPR) {
                let res = Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.ID));
                res.value.referenceName = expr.literal;
                return res;
            }
            else if (expr.type === ast_1.ExprType.FUNC_EXPR) {
                // TODO: Check if this is correct
                let res = Evaluator.RpnVal(new vm_1.Value(utils_1.VarType.FUNC));
                res.value.func = expr.funcExpr;
                return res;
            }
            else if (expr.type === ast_1.ExprType.ARRAY) {
                let val = new vm_1.Value(utils_1.VarType.ARR);
                let initialSize = new vm_1.Value(utils_1.VarType.NUM);
                let elementsCount = 0;
                if (expr.argsList.length !== 0 && expr.argsList[0].length !== 0) {
                    elementsCount = expr.argsList.length;
                }
                initialSize.value = elementsCount;
                if (expr.arraySize.length > 0) {
                    if (['func', 'obj', 'arr'].includes(expr.arrayType)) {
                        this.throwError(`Array of type ${expr.arrayType} cannot have initial size`);
                    }
                    initialSize = this.evaluateExpression(expr.arraySize);
                    if (!initialSize.isInteger()) {
                        this.throwError(`Integer expected, but ${this.stringify(initialSize)} found`);
                    }
                    if (initialSize.value < 0) {
                        this.throwError('Array size cannot be negative');
                    }
                    if (initialSize.value < elementsCount) {
                        initialSize.value = elementsCount;
                    }
                }
                val.arrayType = expr.arrayType;
                if (initialSize.value !== 0) {
                    val.arrayValues.length = initialSize.value;
                    for (let i = 0; i < initialSize.value; i++) {
                        val.arrayValues[i] = new vm_1.Value(utils_1.VarType.UNKNOWN);
                    }
                }
                const arrType = utils_1.Utils.varLUT[expr.arrayType];
                for (let v of val.arrayValues)
                    v.type = arrType;
                let i = 0;
                for (const nodeList of expr.argsList) {
                    if (nodeList.length === 0) {
                        if (i === 0) {
                            break;
                        }
                        else {
                            this.throwError('Empty array element');
                        }
                    }
                    val.arrayValues[i] = this.evaluateExpression(nodeList, expr.arrayHoldsRefs);
                    let currEl = val.arrayValues[i];
                    if (expr.arrayHoldsRefs && currEl.heapRef === -1) {
                        this.throwError('Array holds references, but null or value given');
                    }
                    if (expr.arrayHoldsRefs) {
                        if (arrType !== this.getHeapVal(currEl.heapRef).type) {
                            this.throwError(`Cannot add ${this.stringify(currEl)} to an array of ref ${expr.arrayType}s`);
                        }
                    }
                    else if (currEl.type !== arrType) {
                        this.throwError(`Cannot add ${this.stringify(currEl)} to an array of ${expr.arrayType}s`);
                    }
                    i++;
                }
                return Evaluator.RpnVal(val);
            }
            else {
                this.throwError('Unidentified expression type!');
            }
            return new RpnElement(ElementType.UNKNOWN);
        }
        flattenTree(res, expressionTree) {
            for (const node of expressionTree) {
                const expr = node.obj;
                const isRpn = expr.type === ast_1.ExprType.RPN;
                if (expr.nodeExpressions.length !== 0 && isRpn) {
                    // TODO: this if might be wrong
                    this.flattenTree(res, expr.nodeExpressions);
                }
                if (!isRpn) {
                    res.push(this.nodeToElement(node));
                }
            }
            return res;
        }
        evaluateExpression(expressionTree, getRef = false) {
            let rpnStack = this.flattenTree([], expressionTree);
            let resStack = [];
            for (const token of rpnStack) {
                if (token.type === ElementType.OPERATOR) {
                    if (token.op.opType === OperatorType.BASIC) {
                        if (utils_1.Utils.opBinary(token.op.type)) {
                            if (resStack.length < 2) {
                                this.throwError(`Operator ${token_1.Token.getName(token.op.type)} expects two operands`);
                            }
                            const y = resStack.pop();
                            const x = resStack.pop();
                            if (token.op.type === token_1.TokenType.DOT) {
                                resStack.push(this.accessMember(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_PLUS) {
                                resStack.push(this.performAddition(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_MINUS) {
                                resStack.push(this.performSubtraction(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_MUL) {
                                resStack.push(this.performMultiplication(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_DIV) {
                                resStack.push(this.performDivision(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_MOD) {
                                resStack.push(this.performModulo(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_ASSIGN) {
                                resStack.push(this.assign(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_EQ) {
                                resStack.push(this.compareEq(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_NOT_EQ) {
                                resStack.push(this.compareNeq(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_GT) {
                                resStack.push(this.compareGt(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_LT) {
                                resStack.push(this.compareLt(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_GT_EQ) {
                                resStack.push(this.compareGtEq(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_LT_EQ) {
                                resStack.push(this.compareLtEq(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.PLUS_ASSIGN) {
                                resStack.push(this.plusAssign(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.MINUS_ASSIGN) {
                                resStack.push(this.minusAssign(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.MUL_ASSIGN) {
                                resStack.push(this.mulAssign(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.DIV_ASSIGN) {
                                resStack.push(this.divAssign(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_OR) {
                                resStack.push(this.logicalOr(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_AND) {
                                resStack.push(this.logicalAnd(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.LSHIFT) {
                                resStack.push(this.shiftLeft(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.RSHIFT) {
                                resStack.push(this.shiftRight(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_XOR) {
                                resStack.push(this.bitwiseXor(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_AND_BIT) {
                                resStack.push(this.bitwiseAnd(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OP_OR_BIT) {
                                resStack.push(this.bitwiseOr(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.RSHIFT_ASSIGN) {
                                resStack.push(this.rshiftAssign(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.LSHIFT_ASSIGN) {
                                resStack.push(this.lshiftAssign(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.AND_ASSIGN) {
                                resStack.push(this.andAssign(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.OR_ASSIGN) {
                                resStack.push(this.orAssign(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.XOR_ASSIGN) {
                                resStack.push(this.xorAssign(x, y));
                            }
                            else if (token.op.type === token_1.TokenType.MOD_ASSIGN) {
                                resStack.push(this.modAssign(x, y));
                            }
                            else {
                                this.throwError(`Unknown binary operator ${token_1.Token.getName(token.op.type)}`);
                            }
                        }
                        else if (utils_1.Utils.opUnary(token.op.type)) {
                            if (resStack.length < 1) {
                                this.throwError(`Operator ${token_1.Token.getName(token.op.type)} expects one operand`);
                            }
                            const x = resStack.pop();
                            if (token.op.type === token_1.TokenType.OP_NOT) {
                                resStack.push(this.logicalNot(x));
                            }
                            else if (token.op.type === token_1.TokenType.OP_NEG) {
                                resStack.push(this.bitwiseNot(x));
                            }
                            else {
                                this.throwError(`Uknkown unary operator ${token_1.Token.getName(token.op.type)}`);
                            }
                        }
                    }
                    else if (token.op.opType === OperatorType.FUNC) {
                        const fn = resStack.pop();
                        resStack.push(this.executeFunction(fn, token));
                    }
                    else if (token.op.opType === OperatorType.INDEX) {
                        const arr = resStack.pop();
                        resStack.push(this.accessIndex(arr, token));
                    }
                }
                else {
                    resStack.push(token);
                }
            }
            let resVal = resStack[0].value;
            if (getRef) {
                if (resVal.isLvalue()) {
                    let _var = this.getReferenceByName(resVal.referenceName);
                    if (_var === null) {
                        this.throwError(`'${resVal.referenceName}' is not defined`);
                    }
                    if (_var.val.heapRef !== -1) {
                        return _var.val;
                    }
                    else {
                        this.throwError('Expression expected to be a reference');
                    }
                }
                else if (resVal.heapRef !== -1) {
                    return resVal;
                }
                else {
                    this.throwError('Expression expected to be a reference');
                }
            }
            if (resVal.isLvalue() || resVal.heapRef > -1) {
                return this.getValue(Evaluator.RpnVal(resVal));
            }
            return resVal;
        }
    }
    exports.Evaluator = Evaluator;
    Evaluator.FLAG_OK = 0;
    Evaluator.FLAG_BREAK = 1;
    Evaluator.FLAG_CONTINUE = 2;
    Evaluator.FLAG_RETURN = 3;
    Evaluator.FLAG_ERROR = 4;
    Evaluator.primitiveTypes = [
        utils_1.VarType.BOOL, utils_1.VarType.NUM, utils_1.VarType.STR
    ];
});

},{"./ast":1,"./error-handler":2,"./token":8,"./utils":9,"./vm":10}],4:[function(require,module,exports){
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
            const AST = (() => {
                try {
                    const tokens = new lexer_1.Lexer().processCode(code);
                    const [AST] = new parser_1.Parser(tokens, token_1.TokenType.NONE).parse();
                    return AST;
                }
                catch (e) {
                    if (this.errorListeners.length === 0)
                        throw e;
                    this.errorListeners.forEach(listener => listener(e));
                    return null;
                }
            })();
            if (AST === null)
                return;
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

},{"./evaluator":3,"./lexer":5,"./parser":7,"./token":8,"./utils":9,"./vm":10}],5:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./token", "./error-handler"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Lexer = void 0;
    const token_1 = require("./token");
    const error_handler_1 = require("./error-handler");
    class Lexer {
        constructor() {
            this.tokens = [];
            this.deletedSpaces = 0;
            this.prevDeletedSpaces = 0;
            this.currentLine = 1;
            this.ptr = 0;
            this.end = 0;
            this.code = '';
        }
        static isWhitespace(char) {
            return /\s/.test(char);
        }
        static isAlpha(char) {
            return /^[A-Z]$/i.test(char);
        }
        static isAlnum(str) {
            return /^[a-z0-9]+$/i.test(str);
        }
        static isDigit(char) {
            return /\d/.test(char);
        }
        throwError(cause) {
            error_handler_1.ErrorHandler.throwError(`Token error: ${cause} (line ${this.currentLine})`);
        }
        consumeWhitespace() {
            while (this.ptr !== this.end && Lexer.isWhitespace(this.code[this.ptr])) {
                this.deletedSpaces++;
                if (this.code[this.ptr++] == '\n')
                    this.currentLine++;
            }
        }
        addToken(type, value) {
            this.tokens.push(new token_1.Token(type, value, this.currentLine));
        }
        tokenize(code) {
            this.ptr = 0;
            this.end = code.length;
            this.code = code;
            while (this.ptr !== this.end) {
                this.deletedSpaces = 0;
                this.consumeWhitespace();
                if (this.ptr == this.end)
                    break;
                let c = this.code[this.ptr];
                if (Lexer.chars.includes(c)) {
                    this.addToken(c.charCodeAt(0), '');
                }
                else {
                    c = this.code[this.ptr];
                    if (Lexer.isAlpha(c) || c === '_') {
                        let tokenString = c;
                        while (++this.ptr !== this.end && (Lexer.isAlnum(this.code[this.ptr]) || this.code[this.ptr] === '_')) {
                            tokenString += this.code[this.ptr];
                        }
                        this.ptr--;
                        if (Lexer.allowedTokenKeys.includes(tokenString)) {
                            const strTokenType = token_1.TokenType[tokenString.toUpperCase()];
                            this.addToken(strTokenType, '');
                        }
                        else {
                            if (!Lexer.builtinTypes.includes(tokenString)) {
                                this.addToken(token_1.TokenType.IDENTIFIER, tokenString);
                            }
                            else {
                                this.addToken(token_1.TokenType.TYPE, tokenString);
                            }
                        }
                    }
                    else if (c === '"' || c === '\'' || c === '`') {
                        let str = '';
                        this.ptr++;
                        let mightNeedUnescape = false;
                        while (this.code[this.ptr] !== c && this.ptr !== this.end) {
                            const chr = this.code[this.ptr];
                            str += chr;
                            if (!mightNeedUnescape && chr === '\\') {
                                mightNeedUnescape = true;
                            }
                            this.ptr++;
                        }
                        if (mightNeedUnescape) {
                            for (let i = 0; i < Lexer.regexes.length; i++) {
                                str = str.replace(Lexer.regexes[i], Lexer.regexActual[i]);
                            }
                        }
                        this.addToken(token_1.TokenType.STRING_LITERAL, str);
                    }
                    else if (Lexer.isDigit(this.code[this.ptr])) {
                        let numberStr = '';
                        while (Lexer.isDigit(this.code[this.ptr]) ||
                            this.code[this.ptr] === '.' ||
                            this.code[this.ptr] === 'x' ||
                            this.code[this.ptr] === 'b') {
                            numberStr += this.code[this.ptr++];
                        }
                        this.ptr--;
                        let negation = this.tokens.length !== 0 && this.tokens[this.tokens.length - 1].type === token_1.TokenType.OP_MINUS && !this.deletedSpaces;
                        if (negation && !this.prevDeletedSpaces) {
                            if (this.tokens.length !== 0) {
                                const t = this.tokens[this.tokens.length - 1].type;
                                if (t === token_1.TokenType.IDENTIFIER || t === token_1.TokenType.NUMBER || t === token_1.TokenType.LEFT_PAREN) {
                                    negation = false;
                                }
                            }
                        }
                        if (negation) {
                            numberStr = '-' + numberStr;
                            this.tokens.pop();
                        }
                        const convertedNum = Number(numberStr);
                        if (isNaN(convertedNum)) {
                            this.throwError(`${numberStr} is not a number`);
                        }
                        this.addToken(token_1.TokenType.NUMBER, numberStr);
                    }
                    else if (Lexer.chars2.includes(c)) {
                        let op = '';
                        while (Lexer.chars2.includes(this.code[this.ptr])) {
                            op += this.code[this.ptr++];
                        }
                        this.ptr--;
                        if (op.length === 1) {
                            this.addToken(c.charCodeAt(0), '');
                        }
                        else if (op.length > 1 && op.length < 4) {
                            if (op === '//') {
                                while (true) {
                                    if (this.code[this.ptr] === '\n') {
                                        this.currentLine++;
                                        break;
                                    }
                                    if (this.ptr === this.end)
                                        break;
                                    this.ptr++;
                                }
                                if (this.ptr === this.end)
                                    break;
                            }
                            else if (op === '==') {
                                this.addToken(token_1.TokenType.OP_EQ, '');
                            }
                            else if (op === '!=') {
                                this.addToken(token_1.TokenType.OP_NOT_EQ, '');
                            }
                            else if (op === '&&') {
                                this.addToken(token_1.TokenType.OP_AND, '');
                            }
                            else if (op === '||') {
                                this.addToken(token_1.TokenType.OP_OR, '');
                            }
                            else if (op === '>>') {
                                this.addToken(token_1.TokenType.RSHIFT, '');
                            }
                            else if (op === '<<') {
                                this.addToken(token_1.TokenType.LSHIFT, '');
                            }
                            else if (op === '>>=') {
                                this.addToken(token_1.TokenType.RSHIFT_ASSIGN, '');
                            }
                            else if (op === '<<=') {
                                this.addToken(token_1.TokenType.LSHIFT_ASSIGN, '');
                            }
                            else if (op === '+=') {
                                this.addToken(token_1.TokenType.PLUS_ASSIGN, '');
                            }
                            else if (op === '-=') {
                                this.addToken(token_1.TokenType.MINUS_ASSIGN, '');
                            }
                            else if (op === '*=') {
                                this.addToken(token_1.TokenType.MUL_ASSIGN, '');
                            }
                            else if (op === '/=') {
                                this.addToken(token_1.TokenType.DIV_ASSIGN, '');
                            }
                            else if (op === '|=') {
                                this.addToken(token_1.TokenType.OR_ASSIGN, '');
                            }
                            else if (op === '&=') {
                                this.addToken(token_1.TokenType.AND_ASSIGN, '');
                            }
                            else if (op === '^=') {
                                this.addToken(token_1.TokenType.XOR_ASSIGN, '');
                            }
                            else if (op === '%=') {
                                this.addToken(token_1.TokenType.MOD_ASSIGN, '');
                            }
                            else if (op === '>=') {
                                this.addToken(token_1.TokenType.OP_GT_EQ, '');
                            }
                            else if (op === '<=') {
                                this.addToken(token_1.TokenType.OP_LT_EQ, '');
                            }
                            else {
                                this.throwError(`Unknown token ${op}`);
                            }
                        }
                        else {
                            this.throwError(`Unknown token ${op}`);
                        }
                    }
                    else {
                        this.throwError(`Unknown token ${c}`);
                    }
                }
                this.prevDeletedSpaces = this.deletedSpaces;
                this.ptr++;
            }
            return this.tokens;
        }
        /**
         * @param filename input file
         * @returns a tuple with tokens and boolean indicating an error
         */
        processCode(code) {
            return this.tokenize(code);
        }
    }
    exports.Lexer = Lexer;
    Lexer.chars = ".,:;{}[]()~$#";
    Lexer.chars2 = "=+-*&|/<>!%^";
    Lexer.allowedTokenKeys = [
        'function', 'class', 'array', 'return', 'if', 'else', 'for', 'while',
        'break', 'continue', 'alloc', 'ref', 'true', 'false', 'const'
    ];
    Lexer.regexes = [
        new RegExp(String.raw `\\n`),
        new RegExp(String.raw `\\t`),
        new RegExp(String.raw `\\a`),
        new RegExp(String.raw `\\r`),
        new RegExp(String.raw `\\b`),
        new RegExp(String.raw `\\v`)
    ];
    Lexer.regexActual = [
        "\n", "\t", "\a", "\r", "\b", "\v"
    ];
    Lexer.builtinTypes = [
        "num", "func", "str", "void",
        "obj", "arr", "bool"
    ];
});

},{"./error-handler":2,"./token":8}],6:[function(require,module,exports){
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

},{"./interpreter":4}],7:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./error-handler", "./token", "./ast", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parser = void 0;
    const error_handler_1 = require("./error-handler");
    const token_1 = require("./token");
    const ast_1 = require("./ast");
    const utils_1 = require("./utils");
    class Parser {
        constructor(tokens, terminal) {
            this.tokens = [];
            this.prev = token_1.Token.getDefault();
            this.pos = 0;
            this.tokens = tokens;
            this.terminal = terminal;
            this.tokensCount = this.tokens.length;
            this.currToken = this.tokensCount ? this.tokens[0] : token_1.Token.getDefault();
        }
        throwError(cause, token) {
            error_handler_1.ErrorHandler.throwError(`Syntax error: ${cause} (line ${token.line})`);
        }
        failIfEOF(expected) {
            if (this.currToken.type === token_1.TokenType.NONE) {
                this.throwError(`Reached end of file but ${token_1.Token.getName(expected)} expected`, this.currToken);
            }
        }
        advance() {
            this.pos++;
            this.prev = this.tokens[this.pos - 1];
            if (this.pos < this.tokensCount) {
                this.currToken = this.tokens[this.pos];
            }
            else {
                this.currToken = token_1.Token.getDefault();
                this.pos--;
            }
        }
        lookahead(offset) {
            if (this.pos + offset < 0)
                return token_1.Token.getDefault();
            if (this.pos + offset >= this.tokens.length)
                return token_1.Token.getDefault();
            return this.tokens[this.pos + offset];
        }
        findEnclosingBrace(startPos, braces = 0) {
            let i = 0;
            const size = this.tokens.length;
            while (true) {
                if (size === i + startPos) {
                    this.throwError('Invalid function declaration, no enclosing brace found', this.tokens[startPos + i - 1]);
                }
                if (this.tokens[startPos + i].type === token_1.TokenType.LEFT_BRACE) {
                    braces++;
                }
                if (this.tokens[startPos + i].type === token_1.TokenType.RIGHT_BRACE) {
                    braces--;
                    if (braces === 0) {
                        return i;
                    }
                }
                i++;
            }
        }
        findBlockEnd() {
            return this.findEnclosingBrace(this.pos);
        }
        getManyStatements(node) {
            let res = [];
            while (true) {
                let statement = this.getStatement(node, this.terminal);
                if (statement.type === ast_1.NodeType.UNKNOWN)
                    break;
                res.push(statement);
            }
            return res;
        }
        parseClassStmt() {
            let classExpr = new ast_1.Node(new ast_1.Statement(new ast_1.ClassStatement()));
            let stmt = classExpr.toStmt();
            stmt.line = this.currToken.line;
            this.advance(); // skip the class
            if (this.currToken.type !== token_1.TokenType.IDENTIFIER) {
                this.throwError(`invalid class declaration, expected an identifier, but ${this.currToken.getName()} found`, this.currToken);
            }
            stmt.classStmt.className = this.currToken.value;
            this.advance(); // skip the identifier
            if (this.currToken.type !== token_1.TokenType.LEFT_PAREN) {
                this.throwError(`invalid class declaration, expected '(', but ${this.currToken.getName()} found`, this.currToken);
            }
            this.advance(); // skip the (
            stmt.classStmt.members = this.parseFuncParams(true);
            this.advance(); // skip the )
            if (this.currToken.type !== token_1.TokenType.SEMI_COLON) {
                this.throwError(`invalid class declaration, expected ';', but ${this.currToken.getName()} found`, this.currToken);
            }
            this.advance(); // skip the ;
            return classExpr;
        }
        getStatement(prev, stop) {
            if (this.currToken.type === stop) {
                return prev;
            }
            else if (this.currToken.type === token_1.TokenType.CLASS) {
                return this.parseClassStmt();
            }
            else if (this.currToken.type === token_1.TokenType.SET) {
                let set = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.SET));
                let stmt = set.toStmt();
                stmt.line = this.currToken.line;
                this.advance(); // skip the $
                if (this.currToken.type != token_1.TokenType.IDENTIFIER) {
                    this.throwError(`invalid set statement. Expected an identifier, but ${this.currToken.getName()} found`, this.currToken);
                }
                stmt.objMembers.push(this.currToken.value);
                this.advance(); // skip the id
                while (true) {
                    if (this.currToken.type !== token_1.TokenType.DOT) {
                        this.throwError(`invalid set statement. Expected '.', but ${this.currToken.getName()} found`, this.currToken);
                    }
                    this.advance(); // skip the dot
                    if (this.currToken.type !== token_1.TokenType.IDENTIFIER) {
                        this.throwError(`invalid set statement. Expected an identifier, but ${this.currToken.getName()} found`, this.currToken);
                    }
                    stmt.objMembers.push(this.currToken.value);
                    this.advance(); // skip the id
                    if (this.currToken.type === token_1.TokenType.OP_ASSIGN)
                        break;
                }
                this.advance(); // skip the =
                stmt.expressions.push(this.getExpression(token_1.TokenType.SEMI_COLON));
                this.advance(); // skip the ;
                return set;
            }
            else if (this.currToken.type === token_1.TokenType.SET_IDX) {
                let setIdx = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.SET_IDX));
                let stmt = setIdx.toStmt();
                stmt.line = this.currToken.line;
                this.advance(); // skip the #
                if (this.currToken.type !== token_1.TokenType.IDENTIFIER) {
                    this.throwError(`invalid set index statement. Expected an identifier, but ${this.currToken.getName()} found`, this.currToken);
                }
                stmt.objMembers.push(this.currToken.value);
                this.advance(); // skip the id
                while (true) {
                    let idxExpr = this.getExprNode();
                    if (idxExpr.toExpr().type !== ast_1.ExprType.INDEX) {
                        this.throwError(`invalid set index statement, expected an index expression`, this.currToken);
                    }
                    stmt.indexes.push(idxExpr);
                    if (this.currToken.type === token_1.TokenType.OP_ASSIGN)
                        break;
                }
                this.advance(); // skip the =
                stmt.expressions.push(this.getExpression(token_1.TokenType.SEMI_COLON));
                this.advance(); // skip the ;
                return setIdx;
            }
            else if (this.currToken.type === token_1.TokenType.LEFT_BRACE) {
                let comp = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.COMPOUND));
                let stmt = comp.toStmt();
                stmt.line = this.currToken.line;
                this.advance(); // skip the {
                const blockEnd = this.findEnclosingBrace(this.pos, 1);
                let blockStart = this.tokens.slice(this.pos, this.pos + blockEnd + 1);
                let blockParser = new Parser(blockStart, token_1.TokenType.RIGHT_BRACE);
                let [newAST, endPos] = blockParser.parse();
                this.pos += endPos;
                stmt.statements.push(newAST);
                this.advance(); // skip the }
                return comp;
            }
            else if (this.currToken.type === token_1.TokenType.IF) {
                const line = this.currToken.line;
                this.advance(); // skip the if
                if (this.currToken.type !== token_1.TokenType.LEFT_PAREN) {
                    this.throwError(`invalid if statement. Expected '(' but ${this.currToken.getName()} found`, this.currToken);
                }
                let ifStmt = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.IF));
                let stmt = ifStmt.toStmt();
                stmt.line = line;
                this.advance(); // skip the (
                stmt.expressions.push(this.getExpression(token_1.TokenType.RIGHT_PAREN));
                this.advance(); // skip the )
                stmt.statements.push(this.getStatement(prev, stop));
                if (this.currToken.type === token_1.TokenType.ELSE) {
                    this.advance(); // skip else
                    stmt.statements.push(this.getStatement(prev, stop));
                }
                return ifStmt;
            }
            else if (this.currToken.type === token_1.TokenType.WHILE) {
                const line = this.currToken.line;
                this.advance(); // skip the while
                if (this.currToken.type !== token_1.TokenType.LEFT_PAREN) {
                    this.throwError(`invalid while statement. Expected '(' but ${this.currToken.getName()} found`, this.currToken);
                }
                let whileStmt = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.WHILE));
                let stmt = whileStmt.toStmt();
                stmt.line = line;
                this.advance(); // skip the (
                stmt.expressions.push(this.getExpression(token_1.TokenType.RIGHT_PAREN));
                this.advance(); // skip the )
                stmt.statements.push(this.getStatement(prev, stop));
                return whileStmt;
            }
            else if (this.currToken.type === token_1.TokenType.FOR) {
                const line = this.currToken.line;
                this.advance(); // skip the for
                if (this.currToken.type !== token_1.TokenType.LEFT_PAREN) {
                    this.throwError(`invalid for statement. Expected '(' but ${this.currToken.getName()} found`, this.currToken);
                }
                let forStmt = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.FOR));
                let stmt = forStmt.toStmt();
                stmt.line = line;
                this.advance(); // skip the (
                stmt.expressions = this.getManyExpressions(token_1.TokenType.SEMI_COLON, token_1.TokenType.RIGHT_PAREN);
                this.advance(); // skip the )
                stmt.statements.push(this.getStatement(prev, stop));
                return forStmt;
            }
            else if (this.currToken.type === token_1.TokenType.RETURN) {
                let returnStmt = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.RETURN));
                let stmt = returnStmt.toStmt();
                stmt.line = this.currToken.line;
                this.advance(); // skip the return
                stmt.expressions.push(this.getExpression(token_1.TokenType.SEMI_COLON));
                this.advance(); // skip the semicolon
                return returnStmt;
            }
            else if (this.currToken.type === token_1.TokenType.BREAK) {
                const line = this.currToken.line;
                this.advance(); // skip the break
                if (this.currToken.type !== token_1.TokenType.SEMI_COLON) {
                    this.throwError(`invalid break statement. Expected ';' but ${this.currToken.getName()} found`, this.currToken);
                }
                this.advance(); // skip the ;
                let continueStmt = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.BREAK));
                let stmt = continueStmt.toStmt();
                stmt.line = line;
                return continueStmt;
            }
            else if (this.currToken.type === token_1.TokenType.CONTINUE) {
                const line = this.currToken.line;
                this.advance(); // skip the continue
                if (this.currToken.type !== token_1.TokenType.SEMI_COLON) {
                    this.throwError(`invalid continue statement. Expected ';' but ${this.currToken.getName()} found`, this.currToken);
                }
                this.advance(); // skip the ;
                let continueStmt = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.CONTINUE));
                let stmt = continueStmt.toStmt();
                stmt.line = line;
                return continueStmt;
            }
            else if (this.currToken.type === token_1.TokenType.TYPE) {
                if (this.currToken.value === 'void') {
                    this.throwError(`invalid variable declaration. Cannot declare a void variable`, this.currToken);
                }
                const line = this.currToken.line;
                const allocated = this.prev.type === token_1.TokenType.ALLOC;
                let constant = this.prev.type === token_1.TokenType.CONST;
                const reference = this.prev.type === token_1.TokenType.REF;
                if (allocated && this.lookahead(-2).type === token_1.TokenType.CONST) {
                    constant = true;
                }
                let varDecl = new ast_1.Node(new ast_1.Declaration(ast_1.DeclType.VAR_DECL));
                let decl = varDecl.obj;
                decl.varType = this.currToken.value;
                this.advance(); // skip the variable type
                if (this.currToken.type !== token_1.TokenType.IDENTIFIER) {
                    this.throwError(`invalid variable declaration. Expected an identifier, but ${this.currToken.getName()} found`, this.currToken);
                }
                decl.id = this.currToken.value;
                this.advance(); // skip the identifier
                if (this.currToken.type !== token_1.TokenType.OP_ASSIGN) {
                    this.throwError(`invalid variable declaration. Expected '=', but ${this.currToken.getName()} found`, this.currToken);
                }
                this.advance(); // skip the =
                decl.varExpression = this.getExpression(token_1.TokenType.SEMI_COLON);
                decl.isAllocated = allocated;
                decl.isConstant = constant;
                decl.isReference = reference;
                let declStmt = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.DECL));
                let stmt = declStmt.toStmt();
                stmt.statements.push(varDecl);
                stmt.line = line;
                this.advance(); // skip the semicolon
                return declStmt;
            }
            else if (this.currToken.type === token_1.TokenType.ALLOC) {
                this.advance(); // skip the alloc
                if (this.currToken.type !== token_1.TokenType.TYPE) {
                    this.throwError(`invalid variable allocation. Expected a type, but ${this.currToken.getName()} found`, this.currToken);
                }
                return this.getStatement(prev, stop);
            }
            else if (this.currToken.type === token_1.TokenType.REF) {
                this.advance(); // skip the alloc
                if (this.currToken.type !== token_1.TokenType.TYPE) {
                    this.throwError(`invalid variable reference. Expected a type, but ${this.currToken.getName()} found`, this.currToken);
                }
                return this.getStatement(prev, stop);
            }
            else if (this.currToken.type === token_1.TokenType.CONST) {
                this.advance(); // skip the const
                if (this.currToken.type !== token_1.TokenType.TYPE && this.currToken.type !== token_1.TokenType.ALLOC && this.currToken.type !== token_1.TokenType.REF) {
                    this.throwError(`invalid constant variable declaration. Expected a type, alloc or ref, but ${this.currToken.getName()} found`, this.currToken);
                }
                return this.getStatement(prev, stop);
            }
            else if (this.currToken.type === token_1.TokenType.SEMI_COLON && prev.type === ast_1.NodeType.UNKNOWN) {
                let nopStmt = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.NOP));
                let stmt = nopStmt.toStmt();
                stmt.line = this.currToken.line;
                this.advance(); // skip the ;
                return nopStmt;
            }
            else if (this.currToken.type === this.terminal) {
                return prev;
            }
            else {
                const line = this.currToken.line;
                let expr = this.getExpression(token_1.TokenType.SEMI_COLON);
                let exprStmt = new ast_1.Node(new ast_1.Statement(ast_1.StmtType.EXPR));
                let stmt = exprStmt.toStmt();
                stmt.expressions.push(expr);
                stmt.line = line;
                this.advance(); // skip the ;
                return exprStmt;
            }
        }
        getManyExpressions(sep, stop) {
            let res = [];
            while (true) {
                this.failIfEOF(stop);
                res.push(this.getExpression(sep, stop));
                if (this.currToken.type === stop)
                    break;
                this.advance();
                this.failIfEOF(stop);
            }
            return res;
        }
        peek(stack) {
            return stack.length === 0 ? new ast_1.Node(null) : stack[stack.length - 1];
        }
        getExpression(stop1, stop2 = token_1.TokenType.NONE) {
            let queue = [];
            let stack = [];
            while (this.currToken.type !== stop1 && this.currToken.type !== stop2) {
                let tok = this.getExprNode();
                if (tok.toExpr().isEvaluable()) {
                    queue.push(tok);
                }
                else if (tok.toExpr().isOperand()) {
                    let top = this.peek(stack);
                    while (top.type !== ast_1.NodeType.UNKNOWN && top.toExpr().isOperand()
                        &&
                            (utils_1.Utils.getPrecedence(top.toExpr()) > utils_1.Utils.getPrecedence(tok.toExpr())
                                ||
                                    (utils_1.Utils.getPrecedence(top.toExpr()) === utils_1.Utils.getPrecedence(tok.toExpr())
                                        && !utils_1.Utils.isRightAssoc(tok)))
                        &&
                            (top.toExpr().type !== ast_1.ExprType.LPAREN)) {
                        queue.push(stack.pop());
                        top = this.peek(stack);
                    }
                    stack.push(tok);
                }
                else if (tok.toExpr().type === ast_1.ExprType.LPAREN) {
                    stack.push(tok);
                }
            }
            while (this.peek(stack).type !== ast_1.NodeType.UNKNOWN) {
                queue.push(stack.pop());
            }
            return queue;
        }
        parseFuncParams(isClass = false) {
            let res = [];
            const stop = token_1.TokenType.RIGHT_PAREN;
            let paramNames = new Set();
            while (true) {
                this.failIfEOF(token_1.TokenType.TYPE);
                let isRef = false;
                if (this.currToken.type === token_1.TokenType.REF) {
                    isRef = true;
                    this.advance(); // skip the ref
                    this.failIfEOF(token_1.TokenType.TYPE);
                }
                if (this.currToken.type !== token_1.TokenType.TYPE) {
                    const msg = `invalid ${isClass ? 'class' : 'function'} declaration, expected a type, but ${this.currToken.getName()} found`;
                    this.throwError(msg, this.currToken);
                }
                const type = this.currToken.value;
                this.advance(); // skip the type
                if (type === 'void') {
                    if (isClass) {
                        this.throwError('invalid class declaration, cannot have void members', this.currToken);
                    }
                    if (res.length !== 0) {
                        this.throwError('invalid function expression, illegal void placement', this.currToken);
                    }
                    if (this.currToken.type !== token_1.TokenType.RIGHT_PAREN) {
                        this.throwError(`invalid function expression, expected ')', but ${this.currToken.getName()} found`, this.currToken);
                    }
                    return res;
                }
                this.failIfEOF(token_1.TokenType.IDENTIFIER);
                if (this.currToken.type !== token_1.TokenType.IDENTIFIER) {
                    this.throwError(`invalid function declaration, expected an identifier, but ${this.currToken.getName()} found`, this.currToken);
                }
                if (paramNames.has(this.currToken.value)) {
                    this.throwError(`invalid ${isClass ? 'class' : 'function'} declaration, duplicate parameter name '${this.currToken.value}'`, this.currToken);
                }
                paramNames.add(this.currToken.value);
                let param = new ast_1.FuncParam(type, this.currToken.value);
                param.isRef = isRef;
                res.push(param);
                this.advance();
                this.failIfEOF(stop);
                if (this.currToken.type === stop)
                    break;
                this.advance(); // skip the sep
            }
            return res;
        }
        parseFuncExpression() {
            let func = new ast_1.Node(new ast_1.Expression(ast_1.ExprType.FUNC_EXPR));
            let expr = func.toExpr();
            expr.funcExpr = new ast_1.FuncExpression();
            this.advance(); // skip the function
            if (this.currToken.type === token_1.TokenType.OP_GT) {
                expr.funcExpr.capturess = true;
                this.advance(); // skip the >
            }
            if (this.currToken.type !== token_1.TokenType.LEFT_PAREN) {
                this.throwError(`invalid function declaration, expected '(', but ${this.currToken.getName()} found`, this.currToken);
            }
            this.advance(); // skip the (
            expr.funcExpr.params = this.parseFuncParams();
            this.advance();
            const returnsRef = this.currToken.type === token_1.TokenType.REF;
            if (returnsRef) {
                this.advance(); // skip the ref
            }
            if (this.currToken.type !== token_1.TokenType.TYPE) {
                this.throwError(`invalid function declaration, expected a type, but ${this.currToken.getName()} found`, this.currToken);
            }
            if (returnsRef && this.currToken.value === 'void') {
                this.throwError(`invalid function declaration, cannot return a reference to void`, this.currToken);
            }
            expr.funcExpr.retType = this.currToken.value;
            expr.funcExpr.retRef = returnsRef;
            this.advance(); // skip the type
            if (this.currToken.type !== token_1.TokenType.LEFT_BRACE) {
                this.throwError(`invalid function declaration, expected '{', but ${this.currToken.getName()} found`, this.currToken);
            }
            const funcEnd = this.findBlockEnd();
            let funcStart = this.tokens.slice(this.pos, this.pos + funcEnd + 1);
            let funcParser = new Parser(funcStart, token_1.TokenType.NONE);
            let [newAST, endPos] = funcParser.parse();
            this.pos += endPos;
            expr.funcExpr.instructions.push(newAST);
            this.advance();
            return func;
        }
        parseArrayExpression() {
            this.advance(); // skip the array
            let array = new ast_1.Node(new ast_1.Expression(ast_1.ExprType.ARRAY));
            if (this.currToken.type !== token_1.TokenType.LEFT_PAREN) {
                this.throwError(`invalid array expression, expected '(', but ${this.currToken.getName()} found`, this.currToken);
            }
            this.advance(); // skip the (
            let expr = array.toExpr();
            expr.argsList = this.getManyExpressions(token_1.TokenType.COMMA, token_1.TokenType.RIGHT_PAREN);
            this.advance(); // skip the )
            const hasSize = this.currToken.type === token_1.TokenType.LEFT_BRACKET;
            if (hasSize) {
                this.advance(); // skip the [
                expr.arraySize = this.getExpression(token_1.TokenType.RIGHT_BRACKET);
                this.advance(); // skip the ]
            }
            if (this.currToken.type === token_1.TokenType.REF) {
                expr.arrayHoldsRefs = true;
                this.advance(); // skip the ref
            }
            if (this.currToken.type !== token_1.TokenType.TYPE) {
                this.throwError(`invalid array expression, expected a type, but ${this.currToken.getName()} found`, this.currToken);
            }
            if (this.currToken.value === 'void') {
                this.throwError('invalid array expression, cannot hold void values', this.currToken);
            }
            if (hasSize && ['obj', 'arr', 'func'].includes(this.currToken.value)) {
                this.throwError(`invalid array expression, cannot define initial size for an array of ${this.currToken.value}`, this.currToken);
            }
            expr.arrayType = this.currToken.value;
            this.advance(); // skip the type
            return array;
        }
        getExprNode() {
            this.failIfEOF(token_1.TokenType.GENERAL_EXPRESSION);
            if (this.currToken.type === token_1.TokenType.FUNCTION) {
                return this.parseFuncExpression();
            }
            else if (this.currToken.type === token_1.TokenType.ARRAY) {
                return this.parseArrayExpression();
            }
            else if (this.currToken.type === token_1.TokenType.IDENTIFIER) {
                let id = new ast_1.Node(new ast_1.Expression(ast_1.ExprType.IDENTIFIER_EXPR, this.currToken.value));
                this.advance();
                return id;
            }
            else if (this.currToken.type === token_1.TokenType.LEFT_PAREN) {
                if (this.prev.type === token_1.TokenType.RIGHT_PAREN || this.prev.type === token_1.TokenType.IDENTIFIER ||
                    this.prev.type === token_1.TokenType.RIGHT_BRACKET || this.prev.type === token_1.TokenType.STRING_LITERAL) {
                    let fc = [];
                    let call = new ast_1.Node(new ast_1.Expression(ast_1.ExprType.FUNC_CALL, fc));
                    this.advance(); // skip the (
                    let expr = call.toExpr();
                    expr.argsList = this.getManyExpressions(token_1.TokenType.COMMA, token_1.TokenType.RIGHT_PAREN);
                    this.advance(); // skip the )
                    return call;
                }
                else {
                    this.advance(); // skip the (
                    const rpn = this.getExpression(token_1.TokenType.RIGHT_PAREN);
                    this.advance(); // skip the )
                    return new ast_1.Node(new ast_1.Expression(ast_1.ExprType.RPN, rpn));
                }
            }
            else if (this.currToken.type === token_1.TokenType.LEFT_BRACKET) {
                this.advance(); // skip the [
                let rpn = this.getExpression(token_1.TokenType.RIGHT_BRACKET);
                this.advance(); // skip the ]
                let index = new ast_1.Node(new ast_1.Expression(ast_1.ExprType.INDEX, rpn));
                return index;
            }
            else if (this.currToken.type === token_1.TokenType.STRING_LITERAL) {
                let strLiteral = new ast_1.Node(new ast_1.Expression(ast_1.ExprType.STR_EXPR, this.currToken.value));
                this.advance();
                return strLiteral;
            }
            else if (utils_1.Utils.opUnary(this.currToken.type)) {
                const tokenType = this.currToken.type;
                this.advance(); // skip the op
                this.failIfEOF(token_1.TokenType.GENERAL_EXPRESSION);
                return new ast_1.Node(new ast_1.Expression(ast_1.ExprType.UNARY_OP, tokenType));
            }
            else if (utils_1.Utils.opBinary(this.currToken.type)) {
                const tokenType = this.currToken.type;
                this.advance(); // skip the op
                this.failIfEOF(token_1.TokenType.GENERAL_EXPRESSION);
                return new ast_1.Node(new ast_1.Expression(ast_1.ExprType.BINARY_OP, tokenType));
            }
            else if (this.currToken.type === token_1.TokenType.NUMBER) {
                const isNegative = this.currToken.value[0] === '-';
                let arg = Number(this.currToken.value.substr(isNegative ? 1 : 0));
                if (isNegative) {
                    arg = -arg;
                }
                const numLiteral = new ast_1.Node(new ast_1.Expression(ast_1.ExprType.NUM_EXPR, arg));
                this.advance(); // skip the number
                return numLiteral;
            }
            else if (this.currToken.type === token_1.TokenType.TRUE || this.currToken.type === token_1.TokenType.FALSE) {
                const boolean = new ast_1.Node(new ast_1.Expression(ast_1.ExprType.BOOL_EXPR, this.currToken.type === token_1.TokenType.TRUE));
                this.advance(); // skip the boolean
                return boolean;
            }
            console.log(this.currToken);
            this.throwError(`expected an expression, but ${this.currToken.getName()} found`, this.currToken);
            return new ast_1.Node(null);
        }
        parse() {
            let block = new ast_1.Node(null);
            let instructions = this.getManyStatements(block);
            block.addChildren(instructions);
            return [block, this.pos];
        }
    }
    exports.Parser = Parser;
});

},{"./ast":1,"./error-handler":2,"./token":8,"./utils":9}],8:[function(require,module,exports){
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
    exports.Token = exports.TokenType = void 0;
    var TokenType;
    (function (TokenType) {
        TokenType[TokenType["OP_PLUS"] = '+'.charCodeAt(0)] = "OP_PLUS";
        TokenType[TokenType["OP_MINUS"] = '-'.charCodeAt(0)] = "OP_MINUS";
        TokenType[TokenType["OP_DIV"] = '/'.charCodeAt(0)] = "OP_DIV";
        TokenType[TokenType["OP_MUL"] = '*'.charCodeAt(0)] = "OP_MUL";
        TokenType[TokenType["OP_MOD"] = '%'.charCodeAt(0)] = "OP_MOD";
        TokenType[TokenType["OP_LT"] = '<'.charCodeAt(0)] = "OP_LT";
        TokenType[TokenType["OP_GT"] = '>'.charCodeAt(0)] = "OP_GT";
        TokenType[TokenType["OP_NOT"] = '!'.charCodeAt(0)] = "OP_NOT";
        TokenType[TokenType["OP_NEG"] = '~'.charCodeAt(0)] = "OP_NEG";
        TokenType[TokenType["OP_OR_BIT"] = '|'.charCodeAt(0)] = "OP_OR_BIT";
        TokenType[TokenType["OP_AND_BIT"] = '&'.charCodeAt(0)] = "OP_AND_BIT";
        TokenType[TokenType["OP_ASSIGN"] = '='.charCodeAt(0)] = "OP_ASSIGN";
        TokenType[TokenType["OP_XOR"] = '^'.charCodeAt(0)] = "OP_XOR";
        TokenType[TokenType["DOT"] = '.'.charCodeAt(0)] = "DOT";
        TokenType[TokenType["COMMA"] = ','.charCodeAt(0)] = "COMMA";
        TokenType[TokenType["COLON"] = ':'.charCodeAt(0)] = "COLON";
        TokenType[TokenType["SEMI_COLON"] = ';'.charCodeAt(0)] = "SEMI_COLON";
        TokenType[TokenType["LEFT_BRACE"] = '{'.charCodeAt(0)] = "LEFT_BRACE";
        TokenType[TokenType["LEFT_BRACKET"] = '['.charCodeAt(0)] = "LEFT_BRACKET";
        TokenType[TokenType["LEFT_PAREN"] = '('.charCodeAt(0)] = "LEFT_PAREN";
        TokenType[TokenType["RIGHT_BRACE"] = '}'.charCodeAt(0)] = "RIGHT_BRACE";
        TokenType[TokenType["RIGHT_BRACKET"] = ']'.charCodeAt(0)] = "RIGHT_BRACKET";
        TokenType[TokenType["RIGHT_PAREN"] = ')'.charCodeAt(0)] = "RIGHT_PAREN";
        TokenType[TokenType["SET"] = '$'.charCodeAt(0)] = "SET";
        TokenType[TokenType["SET_IDX"] = '#'.charCodeAt(0)] = "SET_IDX";
        TokenType[TokenType["FUNCTION"] = 130] = "FUNCTION";
        TokenType[TokenType["RETURN"] = 131] = "RETURN";
        TokenType[TokenType["IF"] = 132] = "IF";
        TokenType[TokenType["ELSE"] = 133] = "ELSE";
        TokenType[TokenType["BREAK"] = 134] = "BREAK";
        TokenType[TokenType["CONTINUE"] = 135] = "CONTINUE";
        TokenType[TokenType["FOR"] = 136] = "FOR";
        TokenType[TokenType["WHILE"] = 137] = "WHILE";
        TokenType[TokenType["ALLOC"] = 138] = "ALLOC";
        TokenType[TokenType["TYPE"] = 139] = "TYPE";
        TokenType[TokenType["REF"] = 140] = "REF";
        TokenType[TokenType["CONST"] = 141] = "CONST";
        TokenType[TokenType["STRING_LITERAL"] = 142] = "STRING_LITERAL";
        TokenType[TokenType["NUMBER"] = 143] = "NUMBER";
        TokenType[TokenType["ARRAY"] = 144] = "ARRAY";
        TokenType[TokenType["CLASS"] = 145] = "CLASS";
        TokenType[TokenType["PLUS_ASSIGN"] = 146] = "PLUS_ASSIGN";
        TokenType[TokenType["MINUS_ASSIGN"] = 147] = "MINUS_ASSIGN";
        TokenType[TokenType["MUL_ASSIGN"] = 148] = "MUL_ASSIGN";
        TokenType[TokenType["DIV_ASSIGN"] = 149] = "DIV_ASSIGN";
        TokenType[TokenType["MOD_ASSIGN"] = 150] = "MOD_ASSIGN";
        TokenType[TokenType["LSHIFT_ASSIGN"] = 151] = "LSHIFT_ASSIGN";
        TokenType[TokenType["RSHIFT_ASSIGN"] = 152] = "RSHIFT_ASSIGN";
        TokenType[TokenType["AND_ASSIGN"] = 153] = "AND_ASSIGN";
        TokenType[TokenType["OR_ASSIGN"] = 154] = "OR_ASSIGN";
        TokenType[TokenType["XOR_ASSIGN"] = 155] = "XOR_ASSIGN";
        TokenType[TokenType["LSHIFT"] = 156] = "LSHIFT";
        TokenType[TokenType["RSHIFT"] = 157] = "RSHIFT";
        TokenType[TokenType["OP_AND"] = 158] = "OP_AND";
        TokenType[TokenType["OP_OR"] = 159] = "OP_OR";
        TokenType[TokenType["OP_EQ"] = 160] = "OP_EQ";
        TokenType[TokenType["OP_NOT_EQ"] = 161] = "OP_NOT_EQ";
        TokenType[TokenType["OP_GT_EQ"] = 162] = "OP_GT_EQ";
        TokenType[TokenType["OP_LT_EQ"] = 163] = "OP_LT_EQ";
        TokenType[TokenType["IDENTIFIER"] = 164] = "IDENTIFIER";
        TokenType[TokenType["FALSE"] = 165] = "FALSE";
        TokenType[TokenType["TRUE"] = 166] = "TRUE";
        TokenType[TokenType["UNKNOWN"] = 167] = "UNKNOWN";
        TokenType[TokenType["NONE"] = 168] = "NONE";
        TokenType[TokenType["GENERAL_EXPRESSION"] = 169] = "GENERAL_EXPRESSION";
        TokenType[TokenType["GENERAL_STATEMENT"] = 170] = "GENERAL_STATEMENT";
    })(TokenType = exports.TokenType || (exports.TokenType = {}));
    ;
    class Token {
        constructor(_type, _value, _line) {
            this.type = TokenType.NONE;
            this.value = '';
            this.line = 0;
            this.type = _type;
            this.value = _value;
            this.line = _line;
        }
        getKeyName() {
            return Token.getKeyName(this.type);
        }
        static getKeyName(type) {
            // use for debugging purposes only!
            for (const key of Object.keys(TokenType)) {
                if (TokenType[key] === type) {
                    return key;
                }
            }
            return 'TOKEN NAME ERROR!';
        }
        getName() {
            return Token.getName(this.type);
        }
        static getName(type) {
            return Token.nameLUT[type];
        }
        static getDefault() {
            return new Token(TokenType.NONE, '', 0);
        }
    }
    exports.Token = Token;
    Token.nameLUT = {
        [TokenType.FUNCTION]: 'function',
        [TokenType.RETURN]: 'return',
        [TokenType.IF]: 'if',
        [TokenType.ELSE]: 'else',
        [TokenType.FOR]: 'for',
        [TokenType.WHILE]: 'while',
        [TokenType.BREAK]: 'break',
        [TokenType.CONTINUE]: 'continue',
        [TokenType.ALLOC]: 'alloc',
        [TokenType.TYPE]: 'type',
        [TokenType.REF]: 'ref',
        [TokenType.CONST]: 'const',
        [TokenType.STRING_LITERAL]: 'string',
        [TokenType.NUMBER]: 'number',
        [TokenType.ARRAY]: 'array',
        [TokenType.CLASS]: 'class',
        [TokenType.OP_EQ]: '==',
        [TokenType.OP_NOT_EQ]: '!=',
        [TokenType.OP_GT_EQ]: '>=',
        [TokenType.OP_LT_EQ]: '<=',
        [TokenType.OP_AND]: '&&',
        [TokenType.OP_OR]: '||',
        [TokenType.LSHIFT]: '<<',
        [TokenType.RSHIFT]: '>>',
        [TokenType.LSHIFT_ASSIGN]: '<<=',
        [TokenType.RSHIFT_ASSIGN]: '>>=',
        [TokenType.PLUS_ASSIGN]: '+=',
        [TokenType.MINUS_ASSIGN]: '-=',
        [TokenType.MUL_ASSIGN]: '*=',
        [TokenType.DIV_ASSIGN]: '/=',
        [TokenType.OR_ASSIGN]: '|=',
        [TokenType.AND_ASSIGN]: '&=',
        [TokenType.XOR_ASSIGN]: '^=',
        [TokenType.MOD_ASSIGN]: '%=',
        [TokenType.IDENTIFIER]: 'identifier',
        [TokenType.FALSE]: 'false',
        [TokenType.TRUE]: 'true',
        [TokenType.UNKNOWN]: 'unknown token',
        [TokenType.NONE]: 'empty token',
        [TokenType.GENERAL_EXPRESSION]: 'expression',
        [TokenType.GENERAL_STATEMENT]: 'statement',
        [TokenType.OP_PLUS]: '+',
        [TokenType.OP_MINUS]: '-',
        [TokenType.OP_DIV]: '/',
        [TokenType.OP_MUL]: '*',
        [TokenType.OP_MOD]: '%',
        [TokenType.OP_LT]: '<',
        [TokenType.OP_GT]: '>',
        [TokenType.OP_NOT]: '!',
        [TokenType.OP_NEG]: '~',
        [TokenType.OP_OR_BIT]: '|',
        [TokenType.OP_AND_BIT]: '&',
        [TokenType.OP_XOR]: '^',
        [TokenType.OP_ASSIGN]: '=',
        [TokenType.DOT]: '.',
        [TokenType.COMMA]: ',',
        [TokenType.COLON]: ':',
        [TokenType.SEMI_COLON]: ';',
        [TokenType.LEFT_BRACE]: '{',
        [TokenType.LEFT_BRACKET]: '[',
        [TokenType.LEFT_PAREN]: '(',
        [TokenType.RIGHT_BRACE]: '}',
        [TokenType.RIGHT_BRACKET]: ']',
        [TokenType.RIGHT_PAREN]: ')',
        [TokenType.SET]: '$',
        [TokenType.SET_IDX]: '#'
    };
});

},{}],9:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./ast", "./token"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Utils = exports.VarType = void 0;
    const ast_1 = require("./ast");
    const token_1 = require("./token");
    var VarType;
    (function (VarType) {
        VarType[VarType["NUM"] = 0] = "NUM";
        VarType[VarType["STR"] = 1] = "STR";
        VarType[VarType["ARR"] = 2] = "ARR";
        VarType[VarType["OBJ"] = 3] = "OBJ";
        VarType[VarType["BOOL"] = 4] = "BOOL";
        VarType[VarType["FUNC"] = 5] = "FUNC";
        VarType[VarType["REF"] = 6] = "REF";
        VarType[VarType["ID"] = 7] = "ID";
        VarType[VarType["VOID"] = 8] = "VOID";
        VarType[VarType["CLASS"] = 9] = "CLASS";
        VarType[VarType["UNKNOWN"] = 10] = "UNKNOWN";
    })(VarType = exports.VarType || (exports.VarType = {}));
    class Utils {
        static hasKey(key) {
            return key in Utils.opPrecedence;
        }
        static opUnary(token) {
            return token === token_1.TokenType.OP_NOT || token === token_1.TokenType.OP_NEG;
        }
        static opBinary(token) {
            return Utils.hasKey(token) && !Utils.opUnary(token);
        }
        static getPrecedence(e) {
            if (e.type === ast_1.ExprType.FUNC_CALL || e.type === ast_1.ExprType.INDEX) {
                return 13;
            }
            if (Utils.opUnary(e.op))
                return 12;
            return Utils.opPrecedence[e.op];
        }
        static isRightAssoc(n) {
            let precedence = Utils.getPrecedence(n.toExpr());
            return precedence === 12 || precedence === 1;
        }
    }
    exports.Utils = Utils;
    Utils.varLUT = {
        num: VarType.NUM,
        str: VarType.STR,
        arr: VarType.ARR,
        obj: VarType.OBJ,
        bool: VarType.BOOL,
        func: VarType.FUNC,
        class: VarType.CLASS,
        void: VarType.VOID
    };
    Utils.opPrecedence = {
        [token_1.TokenType.AND_ASSIGN]: 1,
        [token_1.TokenType.OR_ASSIGN]: 1,
        [token_1.TokenType.XOR_ASSIGN]: 1,
        [token_1.TokenType.OP_ASSIGN]: 1,
        [token_1.TokenType.PLUS_ASSIGN]: 1,
        [token_1.TokenType.MINUS_ASSIGN]: 1,
        [token_1.TokenType.MUL_ASSIGN]: 1,
        [token_1.TokenType.DIV_ASSIGN]: 1,
        [token_1.TokenType.MOD_ASSIGN]: 1,
        [token_1.TokenType.LSHIFT_ASSIGN]: 1,
        [token_1.TokenType.RSHIFT_ASSIGN]: 1,
        [token_1.TokenType.OP_OR]: 2,
        [token_1.TokenType.OP_AND]: 3,
        [token_1.TokenType.OP_OR_BIT]: 4,
        [token_1.TokenType.OP_XOR]: 5,
        [token_1.TokenType.OP_AND_BIT]: 6,
        [token_1.TokenType.OP_NOT_EQ]: 7,
        [token_1.TokenType.OP_EQ]: 7,
        [token_1.TokenType.OP_GT]: 8,
        [token_1.TokenType.OP_LT]: 8,
        [token_1.TokenType.OP_GT_EQ]: 8,
        [token_1.TokenType.OP_LT_EQ]: 8,
        [token_1.TokenType.LSHIFT]: 9,
        [token_1.TokenType.RSHIFT]: 9,
        [token_1.TokenType.OP_PLUS]: 10,
        [token_1.TokenType.OP_MINUS]: 10,
        [token_1.TokenType.OP_MUL]: 11,
        [token_1.TokenType.OP_DIV]: 11,
        [token_1.TokenType.OP_MOD]: 11,
        [token_1.TokenType.DOT]: 13,
        [token_1.TokenType.LEFT_BRACKET]: 13 // []
    };
});

},{"./ast":1,"./token":8}],10:[function(require,module,exports){
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CVM = exports.StackTrace = exports.Call = exports.Heap = exports.Cache = exports.Chunk = exports.Variable = exports.Value = exports.Exit = void 0;
    const utils_1 = require("./utils");
    class Exit extends Error {
        constructor(message) {
            super(message);
            this.name = 'Exit';
        }
    }
    exports.Exit = Exit;
    class Value {
        constructor(type, value) {
            this.type = utils_1.VarType.UNKNOWN;
            this.value = undefined;
            this.heapRef = -1;
            this.thisRef = -1;
            this.func = null;
            this.funcName = '';
            this.members = [];
            this.memberValues = {};
            this.arrayValues = [];
            this.arrayType = 'num';
            this.className = '';
            this.memberName = '';
            this.referenceName = '';
            this.type = type;
            if (value !== undefined) {
                this.value = value;
            }
        }
        isLvalue() {
            return this.referenceName.length !== 0;
        }
        isInteger() {
            return this.type === utils_1.VarType.NUM && Number.isInteger(this.value);
        }
    }
    exports.Value = Value;
    class Variable {
        constructor() {
            this.type = '';
            this.val = new Value(utils_1.VarType.UNKNOWN);
            this.constant = false;
        }
        isAllocated() {
            return this.val.heapRef !== -1;
        }
    }
    exports.Variable = Variable;
    class Chunk {
        constructor(value) {
            this.heapRef = -1;
            this.used = false;
            this.marked = false;
            this.data = value;
        }
    }
    exports.Chunk = Chunk;
    class Cache {
        constructor() {
            // might need some optimizations
            this.refs = [];
        }
        push(ref) {
            this.refs.push(ref);
        }
        pop() {
            const ret = this.refs.pop();
            return ret === undefined ? -1 : ret;
        }
    }
    exports.Cache = Cache;
    class Heap {
        constructor() {
            this.chunks = [];
            this.cache = new Cache();
        }
        allocate(value) {
            const index = this.cache.pop();
            if (index !== -1) {
                let chunk = this.chunks[index];
                chunk.data = value;
                chunk.used = true;
                return chunk;
            }
            let newChunk = new Chunk(value);
            this.chunks.push(newChunk);
            newChunk.used = true;
            newChunk.heapRef = this.chunks.length - 1;
            return newChunk;
        }
        free(ref) {
            let chunk = this.chunks[ref];
            chunk.used = false;
            this.cache.push(ref);
        }
    }
    exports.Heap = Heap;
    class Call {
        constructor(line, name) {
            this.line = line;
            this.name = name;
        }
    }
    exports.Call = Call;
    class StackTrace {
        constructor() {
            this.stack = [];
        }
        push(name, line) {
            this.stack.push(new Call(line, name));
        }
        pop() {
            this.stack.pop();
        }
    }
    exports.StackTrace = StackTrace;
    class CVM {
        constructor() {
            this.heap = new Heap();
            this.trace = new StackTrace();
            this.activeEvaluators = [];
            this.globals = {
                println: new NativePrintln(),
                input: new NativeInput(),
                sizeof: new NativeSizeof(),
                to_str: new NativeTostr(),
                to_num: new NativeTonum(),
                exit: new NativeExit(),
                timestamp: new NativeTimestamp(),
                pow: new NativePow(),
                abs: new NativeAbs(),
                rand: new NativeRand(),
                contains: new NativeContains(),
                split: new NativeSplit(),
                substr: new NativeSubstr(),
                replace: new NativeReplace(),
                replace_all: new NativeReplaceall(),
                to_bytes: new NativeTobytes(),
                from_bytes: new NativeFrombytes(),
                bind: new NativeBind(),
                class_name: new NativeClassname(),
                array_type: new NativeArraytype(),
                stack_trace: new NativeStacktrace(),
                sleep: new NativeSleep(),
                sin: new NativeSin(),
                sinh: new NativeSinh(),
                cos: new NativeCos(),
                cosh: new NativeCosh(),
                tan: new NativeTan(),
                tanh: new NativeTanh(),
                sqrt: new NativeSqrt(),
                log: new NativeLog(),
                log10: new NativeLog10(),
                exp: new NativeExp(),
                floor: new NativeFloor(),
                ceil: new NativeCeil(),
                round: new NativeRound(),
                same_ref: new NativeSameref()
            };
            this.allocatedChunks = 0;
            this.chunksLimit = 5;
            this.outputListeners = [];
        }
        onOutput(cb) {
            this.outputListeners.push(cb);
        }
        allocate(value) {
            const chunk = this.heap.allocate(value);
            this.allocatedChunks++;
            return chunk;
        }
        markChunk(chunk) {
            if (chunk.marked)
                return;
            chunk.marked = true;
            if (chunk.data.type === utils_1.VarType.ARR) {
                chunk.data.arrayValues.forEach((arrVal) => {
                    if (arrVal.heapRef !== -1) {
                        this.markChunk(this.heap.chunks[arrVal.heapRef]);
                    }
                });
            }
            else if (chunk.data.type === utils_1.VarType.OBJ) {
                Object.values(chunk.data.memberValues).forEach((objVal) => {
                    if (objVal.heapRef !== -1) {
                        this.markChunk(this.heap.chunks[objVal.heapRef]);
                    }
                });
            }
        }
        markAll() {
            for (const ev of this.activeEvaluators) {
                for (const _var of Object.values(ev.stack)) {
                    if (_var.isAllocated()) {
                        this.markChunk(this.heap.chunks[_var.val.heapRef]);
                    }
                    else if (_var.val.type === utils_1.VarType.ARR) {
                        _var.val.arrayValues.forEach((arrVal) => {
                            if (arrVal.heapRef !== -1) {
                                this.markChunk(this.heap.chunks[arrVal.heapRef]);
                            }
                        });
                    }
                    else if (_var.val.type === utils_1.VarType.OBJ) {
                        Object.values(_var.val.memberValues).forEach((objVal) => {
                            if (objVal.heapRef !== -1) {
                                this.markChunk(this.heap.chunks[objVal.heapRef]);
                            }
                        });
                    }
                }
            }
        }
        sweep() {
            let swept = 0;
            for (const chunk of this.heap.chunks) {
                if (!chunk.used)
                    continue;
                if (!chunk.marked) {
                    swept++;
                    this.heap.free(chunk.heapRef);
                }
                else {
                    chunk.marked = false;
                }
            }
            return swept;
        }
        runGC() {
            this.markAll();
            return this.sweep();
        }
        checkChunks() {
            if (this.allocatedChunks >= this.chunksLimit) {
                const freedChunks = this.runGC();
                this.allocatedChunks -= freedChunks;
                this.chunksLimit = this.allocatedChunks * 2;
            }
        }
        stringify(val) {
            if (val.heapRef !== -1) {
                if (val.heapRef >= this.heap.chunks.length)
                    return 'null';
                let ptr = this.heap.chunks[val.heapRef].data;
                return `ref to ${this.stringify(ptr)}`;
            }
            if (val.type === utils_1.VarType.STR) {
                return val.value;
            }
            else if (val.type === utils_1.VarType.NUM) {
                return val.value.toString();
            }
            else if (val.type === utils_1.VarType.FUNC) {
                let str = 'function(';
                val.func.params.forEach((param, i) => {
                    str += param.typeName;
                    if (i !== val.func.params.length - 1) {
                        str += ', ';
                    }
                });
                if (val.func.params.length === 0) {
                    str += 'void';
                }
                str += ') ';
                if (val.func.retRef) {
                    str += 'ref ';
                }
                str += val.func.retType;
                return str;
            }
            else if (val.type === utils_1.VarType.BOOL) {
                return val.value ? 'true' : 'false';
            }
            else if (val.type === utils_1.VarType.CLASS) {
                return `class ${val.className}`;
            }
            else if (val.type === utils_1.VarType.VOID) {
                return 'void';
            }
            else if (val.type === utils_1.VarType.UNKNOWN) {
                return 'null';
            }
            else if (val.type === utils_1.VarType.ARR) {
                let str = `array<${val.arrayType}>(`;
                let i = 0;
                val.arrayValues.forEach((el) => {
                    if (el.type === utils_1.VarType.STR)
                        str += '"';
                    str += this.stringify(el);
                    if (el.type === utils_1.VarType.STR)
                        str += '"';
                    if (i !== val.arrayValues.length - 1) {
                        str += ', ';
                    }
                    i++;
                });
                str += ')';
                return str;
            }
            else if (val.type === utils_1.VarType.OBJ) {
                let str = `object<${val.className}>(`;
                let i = 0;
                const keys = Object.keys(val.memberValues);
                keys.forEach((key) => {
                    str += `${key}: `;
                    if (val.memberValues[key].type === utils_1.VarType.STR)
                        str += '"';
                    str += this.stringify(val.memberValues[key]);
                    if (val.memberValues[key].type === utils_1.VarType.STR)
                        str += '"';
                    if (i !== keys.length - 1) {
                        str += ', ';
                    }
                    i++;
                });
                str += ')';
                return str;
            }
            return '';
        }
    }
    exports.CVM = CVM;
    class NativePrintln {
        execute(args, ev) {
            if (args.length === 0) {
                ev.throwError('println expects at least one argument (any, any...)');
            }
            let i = 0;
            const endIndex = args.length - 1;
            let output = '';
            for (const arg of args) {
                output += `${ev.VM.stringify(arg)}${i !== endIndex ? ' ' : ''}`;
            }
            ev.VM.outputListeners.forEach(listener => listener(output));
            console.log(output);
            return new Value(utils_1.VarType.VOID);
        }
    }
    class NativeInput {
        execute(args, ev) {
            if (args.length > 1) {
                ev.throwError(`input takes one optional argument (str)`);
            }
            if (args.length === 1 && args[0].type !== utils_1.VarType.STR) {
                ev.throwError(`input optional argument must be a string`);
            }
            const question = args.length === 1 && args[0].type === utils_1.VarType.STR ? args[0].value : '';
            let answer = prompt(question, '');
            if (answer === null) {
                answer = '';
            }
            return new Value(utils_1.VarType.STR, answer);
        }
    }
    class NativeSizeof {
        execute(args, ev) {
            if (args.length !== 1) {
                ev.throwError(`sizeof expects one argument (arr|str)`);
            }
            const arg = args[0];
            if (arg.type === utils_1.VarType.ARR) {
                return new Value(utils_1.VarType.NUM, arg.arrayValues.length);
            }
            else if (arg.type === utils_1.VarType.STR) {
                return new Value(utils_1.VarType.NUM, arg.value.length);
            }
            else {
                ev.throwError(`Cannot get the size of ${ev.VM.stringify(arg)}`);
            }
            return new Value(utils_1.VarType.NUM, 0);
        }
    }
    class NativeTostr {
        execute(args, ev) {
            if (args.length !== 1) {
                ev.throwError(`to_str expects one argument (any)`);
            }
            return new Value(utils_1.VarType.STR, ev.VM.stringify(args[0]));
        }
    }
    class NativeTonum {
        execute(args, ev) {
            if (args.length !== 1) {
                ev.throwError(`to_int expects one argument (num|str|bool)`);
            }
            const arg = args[0];
            if (arg.type === utils_1.VarType.NUM) {
                return arg;
            }
            else if (arg.type === utils_1.VarType.STR) {
                const converted = Number(arg.value);
                if (!Number.isInteger(converted)) {
                    ev.throwError(`'${arg.value}' cannot be converted to num`);
                }
                return new Value(utils_1.VarType.NUM, converted);
            }
            else if (arg.type === utils_1.VarType.BOOL) {
                return new Value(utils_1.VarType.NUM, Number(arg.value));
            }
            ev.throwError(`${ev.VM.stringify(arg)} cannot be converted to num`);
            return new Value(utils_1.VarType.NUM, 0);
        }
    }
    class NativeExit {
        execute(args, ev) {
            if (args.length !== 1 || !args[0].isInteger()) {
                ev.throwError(`exit expects one argument (integer)`);
            }
            throw new Exit(`Exited with status code ${args[0].value}`);
        }
    }
    class NativeTimestamp {
        execute(args, ev) {
            if (args.length !== 0) {
                ev.throwError(`timestamp expects no arguments`);
            }
            return new Value(utils_1.VarType.NUM, Date.now());
        }
    }
    class NativePow {
        execute(args, ev) {
            if (args.length !== 2 || args[0].type !== utils_1.VarType.NUM || args[1].type !== utils_1.VarType.NUM) {
                ev.throwError(`pow expects two arguments (num, num)`);
            }
            const arg1 = args[0].value;
            const arg2 = args[1].value;
            return new Value(utils_1.VarType.NUM, Math.pow(arg1, arg2));
        }
    }
    class NativeAbs {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError(`abs expects one argument (num)`);
            }
            return new Value(utils_1.VarType.NUM, Math.abs(args[0].value));
        }
    }
    class NativeRand {
        execute(args, ev) {
            if (args.length !== 2 || args[0].type !== utils_1.VarType.NUM || args[1].type !== utils_1.VarType.NUM) {
                ev.throwError(`rand expects two arguments (num, num)`);
            }
            const min = args[0].value;
            const max = args[1].value;
            const rnd = Math.random() * (min - max) + max;
            return new Value(utils_1.VarType.NUM, rnd);
        }
    }
    class NativeContains {
        execute(args, ev) {
            if (args.length !== 2 || args[0].type !== utils_1.VarType.STR || args[1].type !== utils_1.VarType.STR) {
                ev.throwError(`contains expects two arguments (str, str)`);
            }
            const res = args[0].value.includes(args[1].value);
            return new Value(utils_1.VarType.BOOL, res);
        }
    }
    class NativeSubstr {
        execute(args, ev) {
            if (args.length !== 3 || args[0].type !== utils_1.VarType.STR || !args[1].isInteger() || !args[2].isInteger()) {
                ev.throwError(`substr expects two arguments (str, integer, integer)`);
            }
            const str = args[0].value.substr(args[1].value, args[2].value);
            return new Value(utils_1.VarType.STR, str);
        }
    }
    class NativeSplit {
        execute(args, ev) {
            if (args.length !== 2 || args[0].type !== utils_1.VarType.STR || args[1].type !== utils_1.VarType.STR) {
                ev.throwError(`split expects two arguments (str, str)`);
            }
            const strings = args[0].value.split(args[1].value);
            let res = new Value(utils_1.VarType.ARR);
            res.arrayType = 'str';
            for (const str of strings) {
                res.arrayValues.push(new Value(utils_1.VarType.STR, str));
            }
            return res;
        }
    }
    class NativeReplace {
        execute(args, ev) {
            if (args.length !== 3 || args[0].type !== utils_1.VarType.STR || args[1].type !== utils_1.VarType.STR || args[2].type !== utils_1.VarType.STR) {
                ev.throwError(`replace expects three arguments (str, str, str)`);
            }
            const str = args[0].value;
            const searchVal = args[1].value;
            const replaceVal = args[2].value;
            return new Value(utils_1.VarType.STR, str.replace(searchVal, replaceVal));
        }
    }
    class NativeReplaceall {
        execute(args, ev) {
            if (args.length !== 3 || args[0].type !== utils_1.VarType.STR || args[1].type !== utils_1.VarType.STR || args[2].type !== utils_1.VarType.STR) {
                ev.throwError(`replace_all expects three arguments (str, str, str)`);
            }
            const str = args[0].value;
            const searchVal = args[1].value;
            const replaceVal = args[2].value;
            return new Value(utils_1.VarType.STR, str.replaceAll(searchVal, replaceVal));
        }
    }
    class NativeTobytes {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.STR) {
                ev.throwError(`to_bytes expects one argument (str)`);
            }
            let res = new Value(utils_1.VarType.ARR);
            res.arrayType = 'num';
            const buffer = Array.from(new TextEncoder().encode(args[0].value));
            for (const byte of buffer) {
                res.arrayValues.push(new Value(utils_1.VarType.NUM, byte));
            }
            return res;
        }
    }
    class NativeFrombytes {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.ARR || args[0].arrayType !== 'num') {
                ev.throwError(`from_bytes expects one argument (arr<num>)`);
            }
            let bytes = [];
            for (const el of args[0].arrayValues) {
                if (!el.isInteger()) {
                    ev.throwError(`from_bytes expects an array of integers`);
                }
                bytes.push(el.value);
            }
            return new Value(utils_1.VarType.STR, String.fromCharCode(...bytes));
        }
    }
    class NativeBind {
        execute(args, ev) {
            if (args.length !== 1 || args[0].heapRef === -1) {
                ev.throwError(`bind expects one argument (ref obj)`);
            }
            const ref = args[0].heapRef;
            if (ref < 0 || ref >= ev.VM.heap.chunks.length) {
                ev.throwError('Dereferencing a value that is not on the heap');
            }
            const val = ev.VM.heap.chunks[ref].data;
            if (val.type !== utils_1.VarType.OBJ) {
                ev.throwError(`Only a reference to object can be bound`);
            }
            Object.keys(val.memberValues).forEach((key) => {
                let v = val.memberValues[key];
                if (v.heapRef !== -1) {
                    v = ev.VM.heap.chunks[v.heapRef].data;
                }
                if (v === null) {
                    ev.throwError(`Dereferencing a null pointer`);
                }
                if (v.type === utils_1.VarType.FUNC) {
                    v.thisRef = ref;
                }
            });
            return new Value(utils_1.VarType.VOID);
        }
    }
    class NativeClassname {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.OBJ) {
                ev.throwError('class_name expects one argument (obj)');
            }
            return new Value(utils_1.VarType.STR, args[0].className);
        }
    }
    class NativeArraytype {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.ARR) {
                ev.throwError('array_type expects one argument (arr)');
            }
            return new Value(utils_1.VarType.STR, args[0].arrayType);
        }
    }
    class NativeStacktrace {
        execute(args, ev) {
            if (args.length !== 0) {
                ev.throwError('stack_trace expects no arguments');
            }
            const limit = 100;
            let printed = 0;
            for (const crumb of ev.VM.trace.stack.reverse()) {
                let output = '';
                if (printed > limit) {
                    output += `    and ${ev.VM.trace.stack.length - printed} more\n`;
                }
                const name = !crumb.name ? '<anonymous function>' : `function '${crumb.name}'`;
                output += `  in ${name} called on line ${crumb.line}`;
                console.log(output);
                printed++;
            }
            ev.VM.trace.stack.reverse();
            return new Value(utils_1.VarType.VOID);
        }
    }
    class NativeSleep {
        execute(args, ev) {
            if (args.length !== 1 || !args[0].isInteger()) {
                ev.throwError('sleep expects one argument (integer)');
            }
            if (args[0].value < 0) {
                ev.throwError(`Sleep time must be greater than -1`);
            }
            // there's no other way to synchronously sleep without async/await
            Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, args[0].value);
            return new Value(utils_1.VarType.VOID);
        }
    }
    class NativeSin {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('sin expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.sin(args[0].value));
        }
    }
    class NativeSinh {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('sinh expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.sinh(args[0].value));
        }
    }
    class NativeCos {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('cos expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.cos(args[0].value));
        }
    }
    class NativeCosh {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('cosh expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.cosh(args[0].value));
        }
    }
    class NativeTan {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('tan expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.tan(args[0].value));
        }
    }
    class NativeTanh {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('tanh expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.tanh(args[0].value));
        }
    }
    class NativeSqrt {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('sqrt expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.sqrt(args[0].value));
        }
    }
    class NativeLog {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('log expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.log(args[0].value));
        }
    }
    class NativeLog10 {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('log10 expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.log10(args[0].value));
        }
    }
    class NativeExp {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('exp expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.exp(args[0].value));
        }
    }
    class NativeFloor {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('floor expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.floor(args[0].value));
        }
    }
    class NativeCeil {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('ceil expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.ceil(args[0].value));
        }
    }
    class NativeRound {
        execute(args, ev) {
            if (args.length !== 1 || args[0].type !== utils_1.VarType.NUM) {
                ev.throwError('round expects one argument (num)');
            }
            return new Value(utils_1.VarType.NUM, Math.round(args[0].value));
        }
    }
    class NativeSameref {
        execute(args, ev) {
            if (args.length !== 2) {
                ev.throwError('same_ref expects two arguments (ref, ref)');
            }
            if (args[0].heapRef === -1) {
                ev.throwError('same_ref: first argument is not a reference');
            }
            if (args[1].heapRef === -1) {
                ev.throwError('same_ref: second argument is not a reference');
            }
            return new Value(utils_1.VarType.BOOL, args[0].heapRef === args[1].heapRef);
        }
    }
});

},{"./utils":9}]},{},[6]);
