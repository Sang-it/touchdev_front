import { DraftFunction } from "use-immer";
import { BaseStatement } from "./statement_types";

export const serverRunCode = (AST: Record<string, any>, setLogs: (arg: string[] | DraftFunction<string[]>) => void) => {
    fetch('http://localhost:8080/typescript/code-generator', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(AST),
    })
        .then(response => response.json())
        .then(json => {
            setLogs(
                (draft) => {
                    draft.push(json);
                }
            );
        })
}
