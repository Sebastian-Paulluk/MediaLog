import { useEffect, useState } from "react";

export const useMountingEffect =(delayTime=0.05)=>{
    const [isMounted, seIsMounted] = useState(false);

    useEffect (()=>{
        const timerId = setTimeout(()=>{
            seIsMounted(true)
        }, delayTime * 1000)
        return () => {
            seIsMounted(false)
            clearTimeout(timerId)
        }
    }, [delayTime]);
    
    return isMounted;
}