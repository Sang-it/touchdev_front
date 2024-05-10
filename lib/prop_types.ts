import { BaseStatement, ILetStatement, IFunctionCallStatement, IFunctionDeclarationStatement } from "./statement_types";

export interface AddStatements {
    addStatements: (value: BaseStatement) => void;
}

export interface UpdateLetStatement {
    updateLetStatement: (id: number, value: Omit<ILetStatement, "id" | "type">) => void;
}

export interface UpdateFunctionCallStatement {
    updateFunctionCallStatement: (id: number, value: Omit<IFunctionCallStatement, "id" | "type">) => void;
}

export interface UpdateFunctionDeclarationStatement {
    updateFunctionDeclarationStatement: (id: number, value: Omit<IFunctionDeclarationStatement, "id" | "type">) => void;
}

export interface Logs {
    logs?: JSON[];
}
