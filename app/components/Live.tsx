import {  useMyPresence, useOthers } from "@/liveblocks.config";
import LiveCursor from "./cursor/Livecursors";
import React, { useCallback, useEffect, useState } from "react";
import { CursorChat } from "./cursor/livechat";
import { CursorMode } from "@/types/type";

export default function Live(){
    const [cursorState,setCursorState] = useState({mode:CursorMode.Hidden})
    const others = useOthers()
    const [ {cursor} , updateMyPresence] = useMyPresence() as any;

    const handlePointerMove = useCallback((event:React.PointerEvent) => {
        event.preventDefault()
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y

        updateMyPresence({cursor:{x,y}})
    } , [])


    const handlePointerLeave = useCallback((event:React.PointerEvent) => {
        event.preventDefault()
        updateMyPresence({cursor:null , message:null})
        setCursorState({mode:CursorMode.Hidden})
    } , [])

    
    const handlePointerDown = useCallback((event:React.PointerEvent) => {

        const x = event.clientX - event.currentTarget.getBoundingClientRect().x
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y

        updateMyPresence({cursor:{x,y}})
    } , [])

    useEffect(()=>{
        const onkeyup = (e:KeyboardEvent) => {
            if(e.key === '/'){
                setCursorState({mode:CursorMode.Chat})
            }else if(e.key === "Escape"){
                updateMyPresence({message:''})
            }
        }

        const onKeyDown = (e:KeyboardEvent) => {
            if(e.key === "/"){
                e.preventDefault()
            }
        }

        window.addEventListener('keyup',onkeyup);
        window.addEventListener('keydown',onKeyDown);
        
        return(()=>{
            window.addEventListener('keyup',onkeyup);
            window.addEventListener('keydown',onKeyDown);
        })

    },[updateMyPresence])

    return(
        <>
        <div
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        className="border-5 border-green h-[100vh] h-full w-full flex items-center justify-center"
        >

        <LiveCursor others={others}/>

        <h1 className="text-5xl text-white">new file</h1>

        {
            cursor && (
                <CursorChat 
                cursor={cursor}
                cursorState = {cursorState}
                setCursorState={setCursorState}
                updateMyPresence={updateMyPresence}
                />
            )
        }

        </div>
        </>
    )
}