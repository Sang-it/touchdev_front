'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup,
} from "@/components/ui/select"
import { BasePrimitive, ILetStatement } from "@/lib/statement_types"
import { UpdateLetStatement } from "@/lib/prop_types"
import { useImmer } from "use-immer"
import { useEffect } from "react"

export const LetStatement = (props: ILetStatement & UpdateLetStatement) => {
    const [properties, setProperties] = useImmer<Omit<ILetStatement, "id" | "type">>({
        name: props.name,
        value: props.value,
        variableType: props.variableType,
    });

    function updateProperty(property: string, value: string) {
        setProperties(draft => {
            // @ts-expect-error
            draft[property] = value;
        });
    }

    function updateSelect(value: BasePrimitive) {
        setProperties(draft => {
            draft.variableType = value;
        });
    }

    useEffect(() => {
        props.updateLetStatement(props.id, properties);
    }, [properties])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="w-64" variant="outline">Let Statement</Button>
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
                                onChange={(e) => updateProperty("name", e.target.value)}
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth">Value</Label>
                            <Input
                                id="value"
                                onChange={(e) => updateProperty("value", e.target.value)}
                                value={properties.value}
                                className="col-span-2 h-8"
                            />
                        </div>
                        <Select onValueChange={updateSelect} defaultValue={properties.variableType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a variable type." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Variable Type</SelectLabel>
                                    <SelectItem value="NUMBER">Number</SelectItem>
                                    <SelectItem value="STRING">String</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

