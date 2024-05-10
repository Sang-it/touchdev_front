'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { UpdateFunctionCallStatement } from "@/lib/prop_types"
import { IFunctionCallStatement } from "@/lib/statement_types"
import { useEffect } from "react"
import { useImmer } from "use-immer"

export const FunctionCallStatement = (props: IFunctionCallStatement & UpdateFunctionCallStatement) => {
    const [properties, setProperties] = useImmer<Omit<IFunctionCallStatement, "id" | "type">>({
        name: props.name,
        args: props.args,
    });

    function updateName(value: string) {
        setProperties(draft => {
            draft.name = value;
        });
    }

    function updateArgs(value: string) {
        setProperties(draft => {
            draft.args = value.split(",").map(arg => arg.trim());
        });
    }

    useEffect(() => {
        props.updateFunctionCallStatement(props.id, properties);
    }, [properties])

    return (
        <Popover modal={true}>
            <PopoverTrigger asChild>
                <Button className="w-64" variant="outline">Function Call Statement</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Set the values for the Let Statement.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Name</Label>
                            <Input
                                id="name"
                                value={properties.name}
                                onChange={(e) => updateName(e.target.value)}
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth">Arguments</Label>
                            <Input
                                id="value"
                                value={properties.args.join(",")}
                                onChange={(e) => updateArgs(e.target.value)}
                                className="col-span-2 h-8"
                            />
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

