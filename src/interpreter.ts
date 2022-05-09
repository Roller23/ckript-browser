import { Evaluator } from "./evaluator";
import { Lexer } from "./lexer";
import { Parser } from "./parser";
import { TokenType } from "./token";
import { VarType } from "./utils";
import { CVM, Value, Variable } from "./vm";

export class Interpreter {

  private readonly cvm: CVM = new CVM();
  private readonly errorListeners: Function[] = [];

  public processCode(code: string, args: string[] = []): void {
    const tokens = new Lexer().processCode(code);
    const [AST] = new Parser(tokens, TokenType.NONE).parse();
    const evaluator: Evaluator = new Evaluator(AST, this.cvm);
    const val: Value = (evaluator.stack.argv = new Variable()).val;
    val.arrayType = 'str';
    val.type = VarType.ARR;
    for (let i = 0; i < args.length; i++) {
      val.arrayValues.push(new Value(VarType.STR, args[i]));
    }
    evaluator.VM.activeEvaluators.push(evaluator);
    try {
      evaluator.start();
    } catch (e) {
      if (this.errorListeners.length === 0) {
        throw e;
      }
      this.errorListeners.forEach(listener => listener(e));
    }
    evaluator.VM.activeEvaluators.pop();
  }

  public onOutput(cb: Function) {
    this.cvm.onOutput(cb);
  }

  public onError(cb: Function) {
    this.errorListeners.push(cb);
  }
}