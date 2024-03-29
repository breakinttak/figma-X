import { COLORS } from "@/constants";
import { LiveCursorProps } from "@/types/type";
import Cursor from "./Cursor";

export default function LiveCursor({others}:LiveCursorProps){
    return(
        <>
        {others.map(({connectionId,presence})=>{
            if(!presence?.cursor){
                return null
            }
            return(
                <>
                    <div key={connectionId}>
                    <Cursor
                        color={COLORS[Number(connectionId) % COLORS.length]}
                        x= {presence.cursor.x}
                        y={presence.cursor.y}
                        message={presence.message}
                        />

                    </div>
                </>
            )
        })}
        </>
    )
}