'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { UpdateFunctionDeclarationStatement } from "@/lib/prop_types"
import { BaseFunctionArgument, BasePrimitive, IFunctionDeclarationStatement } from "@/lib/statement_types"
import { useEffect } from "react"
import { useImmer } from "use-immer"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup,
} from "@/components/ui/select"

export const FunctionDeclarationStatement = (props: IFunctionDeclarationStatement & UpdateFunctionDeclarationStatement) => {
    const [argType, setArgType] = useImmer<BasePrimitive>("NUMBER");
    const [properties, setProperties] = useImmer<Omit<IFunctionDeclarationStatement, "id" | "type">>({
        name: props.name,
        args: props.args,
        returnStatement: props.returnStatement || "",
    });

    function updateArgType(value: string) {
        setArgType(() => value);
    }

    function updateProperty(property: string, value: string) {
        setProperties(draft => {
            // @ts-expect-error
            draft[property] = value;
        });
    }

    function displayArgs() {
        return props.args?.map(param => param.name + ":" + param.type).join(" ").trim();
    }

    useEffect(() => {
        props.updateFunctionDeclarationStatement(props.id, properties);
    }, [properties])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="w-64" variant="outline">Function Declaration Statement</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Set the values for the Function Declaration Statement.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Name</Label>
                            <Input
                                id="name"
                                value={properties.name}
                                onChange={(e) => updateProperty('name', e.target.value)}
                                className="col-span-2 h-8"
                            />

                            <Label>Args</Label>
                            <Input
                                id="args"
                                value={displayArgs()}
                                className="col-span-2 h-8"
                                readOnly
                            />
                            <Label>Return</Label>
                            <Input
                                id="returnStatement"
                                onChange={(e) => updateProperty('returnStatement', e.target.value)}
                                value={properties.returnStatement}
                                className="col-span-2 h-8"
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                                Select the args that you want and hit enter.
                            </p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-2">
                            <Select onValueChange={updateArgType} defaultValue={argType} >
                                <SelectTrigger>
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Type</SelectLabel>
                                        <SelectItem value="NUMBER">Number</SelectItem>
                                        <SelectItem value="STRING">String</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Input
                                id="value"
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        const arg: BaseFunctionArgument = {
                                            name: e.currentTarget.value,
                                            type: argType,
                                        }
                                        setProperties(draft => {
                                            draft.args?.push(arg);
                                        });
                                    }
                                }
                                }
                                className="col-span-2 h-8"
                            />
                        </div >

                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

