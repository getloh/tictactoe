import React, { useState } from "react"

export interface InputProps{
    onChange?: Function
    className?: string;
    value?: string;
}

export default function Input(props:any){
    const [entry, setEntry] = useState("");


    return (

        <input 
        className={`p-2 bg-zinc-600 rounded focus:outline-none focus:bg-zinc-700 transition text-white text-lg ${props.className && props.className}`}
        onChange={(data)=> props.onChange(data.target.value)}
        value={props.value}/>
    )
}