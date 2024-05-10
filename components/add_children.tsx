'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { AddStatements } from "@/lib/prop_types"
import { StatementSelectEnum, DefaultLetStatement, DefaultFunctionCallStatement, DefaultFunctionDeclarationStatement } from "@/lib/constants"
import { useImmer } from "use-immer"

export const AddChildren = (props: AddStatements) => {
    const [selectedStatement, setStatement] = useImmer<StatementSelectEnum>("let_statement");

    function updateSelectedStatement(statement: string) {
        setStatement(() => statement);
    }

    function buttonClick() {
        switch (selectedStatement) {
            case "let_statement":
                props.addStatements(DefaultLetStatement);
                break;
            case "if_statement":
                break;
            case "while_statement":
                break;
            case "function_declaration_statement":
                props.addStatements(DefaultFunctionDeclarationStatement);
                break;
            case "function_call_statement":
                props.addStatements(DefaultFunctionCallStatement);
                break;
        }
    }

    return (
        <Popover modal={true}>
            <PopoverTrigger asChild>
                <Button className="w-64" variant="outline">Add Children</Button>
            </PopoverTrigger>
            <PopoverContent >
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Select the type of statement you want to add.
                        </p>
                    </div>
                    <Select onValueChange={updateSelectedStatement} defaultValue={selectedStatement} >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a Statement" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Statements</SelectLabel>
                                <SelectItem value="let_statement">Let Statement</SelectItem>
                                {/* <SelectItem value="if_statement">If Statement</SelectItem> */}
                                {/* <SelectItem value="while_statement">While Statement</SelectItem> */}
                                <SelectItem value="function_declaration_statement">Function Declaration Statement</SelectItem>
                                <SelectItem value="function_call_statement">Function Call Statement</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                        <Button variant="outline" onClick={buttonClick} >Add Statement</Button>
                    </Select>
                </div>
            </PopoverContent>
        </Popover >
    )
}

