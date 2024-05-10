'use client'

import { Logs } from "@/lib/prop_types";

export const Terminal = (props: Logs) => {
    const curr_dir = "root@touch_dev:";
    const prompt = "~$ ";

    return (
        <div className="text-black font-mono p-4" >
            {props.logs?.map((line, index) => (
                <>
                    <p><span className="text-green-400">{curr_dir}</span><span className="text-blue-400">{prompt} ./run</span></p>
                    {/* @ts-expect-error */}
                    {line?.code || line?.error ? <pre key={index}>{line.code || line.error}</pre> : <pre key={index}>{JSON.stringify(line, null, 2)}</pre>}
                </>
            ))}
            <p><span className="text-green-400">{curr_dir}</span><span className="text-blue-400">{prompt}</span></p>
        </div >
    )
}
