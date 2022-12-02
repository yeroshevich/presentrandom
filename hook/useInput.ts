import React, {useState} from "react";

export const useInput = function (init:string){
    const [value,setValue] = useState<string>();
    const handleChange = function(e:React.SyntheticEvent)
    {
        setValue((e.target as HTMLInputElement).value)
    }
    return {value,onChange:handleChange}
}