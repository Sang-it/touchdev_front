import { IFunctionCallStatement, IFunctionDeclarationStatement, ILetStatement } from "./statement_types";

export type StatementSelectEnum = "let_statement" | "function_call_statement" | "if_statement" | "while_statement" | "function_declaration_statement";

export const DefaultLetStatement: ILetStatement = {
    id: 0,
    type: "LET_STATEMENT",
    name: "",
    value: "",
    variableType: "NUMBER",
}

export const DefaultFunctionCallStatement: IFunctionCallStatement = {
    id: 0,
    type: "FUNCTION_CALL_STATEMENT",
    name: "",
    args: [],
}

export const DefaultFunctionDeclarationStatement: IFunctionDeclarationStatement = {
    id: 0,
    type: "FUNCTION_DECLARATION_STATEMENT",
    name: "",
    args: [],
}
