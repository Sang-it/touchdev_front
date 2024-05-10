export type BasePrimitive = "NUMBER" | "STRING";
export type BaseFunctionArgument = { name: string; type: BasePrimitive };

export type BaseStatement =
    | IIfStatement
    | ILetStatement
    | IWhileStatement
    | IFunctionCallStatement
    | IFunctionDeclarationStatement;

export interface IIfStatement {
    id: number;
    type: "IF_STATEMENT";
    condition: string;
    children: BaseStatement[];
}

export interface ILetStatement {
    id: number;
    type: "LET_STATEMENT";
    name: string;
    value: string;
    variableType: BasePrimitive;
}

export interface IWhileStatement {
    id: number;
    type: "WHILE_STATEMENT";
    condition: string;
    children: BaseStatement[];
}

export interface IFunctionCallStatement {
    id: number;
    type: "FUNCTION_CALL_STATEMENT";
    name: string;
    args: unknown[];
}

export interface IFunctionDeclarationStatement {
    id: number;
    type: "FUNCTION_DECLARATION_STATEMENT";
    name: string;
    args?: BaseFunctionArgument[];
    children?: BaseStatement[];
    returnType?: BasePrimitive;
    returnStatement?: string;
}
