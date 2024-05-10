'use client'

import { LetStatement } from "@/components/let_statement";
import { FunctionCallStatement } from "@/components/function_call_statement";
import { IfStatement } from "@/components/if_statement";
import { WhileStatement } from "@/components/while_statement";
import { FunctionDeclarationStatement } from "@/components/function_declaration_statement";
import { AddChildren } from "@/components/add_children";
import { BaseStatement, IFunctionCallStatement, IFunctionDeclarationStatement, ILetStatement } from "@/lib/statement_types";
import { Terminal } from "@/components/ui/terminal";
import { Navigation } from "@/components/navigation";
import { useImmer } from "use-immer";
import { Button } from "@/components/ui/button";

export default function Home() {
    const [statements, setStatements] = useImmer<BaseStatement[]>([]);
    const [logs, setLogs] = useImmer<JSON[]>([]);

    function addStatements(statement: BaseStatement) {
        setStatements((draft) => {
            draft.push({ ...statement, id: draft.length });
        });
    }

    function updateLetStatement(id: number, statement: Omit<ILetStatement, "id" | "type">) {
        setStatements(draft => {
            const prevStatement = draft.find(s => s.id === id) as ILetStatement;
            if (!prevStatement) return;
            if (statement.name != undefined) prevStatement.name = statement.name;
            if (statement.value != undefined) prevStatement.value = statement.value;
            if (statement.variableType != undefined) prevStatement.variableType = statement.variableType;
        });
    }


    function updateFunctionCallStatement(id: number, statement: Omit<IFunctionCallStatement, "id" | "type">) {
        setStatements(draft => {
            const prevStatement = draft.find(s => s.id === id) as IFunctionCallStatement;
            if (!prevStatement) return;
            if (statement.name != undefined) prevStatement.name = statement.name;
            if (statement.args != undefined) prevStatement.args = statement.args;
        });
    }

    function updateFunctionDeclarationStatement(id: number, statement: Omit<IFunctionDeclarationStatement, "id" | "type">) {
        setStatements(draft => {
            const prevStatement = draft.find(s => s.id === id) as IFunctionDeclarationStatement;
            if (!prevStatement) return;
            if (statement.name != undefined) prevStatement.name = statement.name;
            if (statement.args != undefined) prevStatement.args = statement.args;
            if (statement.returnStatement != undefined) prevStatement.returnStatement = statement.returnStatement;
        });
    }

    function sanitizeAST(statements: BaseStatement[]) {
        return statements.map(statement => {
            const sanitized: Record<string, any> = {};
            for (const key in statement) {
                if (key !== 'id') {
                    // @ts-expect-error
                    sanitized[key] = statement[key];
                }
                if (statement.type == "FUNCTION_CALL_STATEMENT" && key === 'args') {
                    sanitized[key] = statement[key].map(arg => "ident_" + arg);
                }
            }
            return sanitized;
        });
    }


    function runCode() {
        const AST = sanitizeAST(statements);

        fetch('http://localhost:8080/typescript/run', {
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


    function generateCode() {
        const AST = sanitizeAST(statements);

        console.log(AST);

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


    function clearLogs() {
        setLogs([]);
    }

    return (
        <div className="flex h-screen w-screen flex-col items-center">
            <nav className="self-start">
                <Navigation />
            </nav>
            <div className="h-4/5 w-4/5 flex border-4 border-dotted m-5">
                <section className="flex flex-row w-1/2 items-start justify-start overflow-y-scroll">
                    <div className="flex flex-col m-3 p-2">
                        {
                            statements.map((statement, index) => {
                                switch (statement.type) {
                                    case "LET_STATEMENT":
                                        return <LetStatement key={index} {...statement}
                                            updateLetStatement={updateLetStatement} />
                                    case "FUNCTION_CALL_STATEMENT":
                                        return <FunctionCallStatement key={index} {...statement}
                                            updateFunctionCallStatement={updateFunctionCallStatement} />
                                    case "IF_STATEMENT":
                                        return <IfStatement key={index} />
                                    case "WHILE_STATEMENT":
                                        return <WhileStatement key={index} />
                                    case "FUNCTION_DECLARATION_STATEMENT":
                                        return <FunctionDeclarationStatement key={index} {...statement}
                                            updateFunctionDeclarationStatement={updateFunctionDeclarationStatement} />
                                }
                            })
                        }
                        <AddChildren addStatements={addStatements} />
                    </div>
                </section >
                <section className="w-1/2 m-5 border-l overflow-y-scroll">
                    <Terminal logs={logs} />
                </section >
            </div>
            <div>
                <Button className="mx-1" variant="default" onClick={runCode}> Run Code</Button>
                <Button className="mx-1" variant="outline" onClick={generateCode}> Generate Code</Button>
                <Button className="mx-1" variant="outline" onClick={clearLogs}> Clear Output</Button>
            </div>
        </div>
    );
}
