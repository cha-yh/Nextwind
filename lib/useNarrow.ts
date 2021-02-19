import { useEffect, useState } from "react";
import useWindowSize from "../module/src/useWindowResize";

export default function useNarrow(breakPoint:number = 768) {
    const size = useWindowSize();
    const [isNarrow, setIsNarrow] = useState(true);
    useEffect(() => {
        if(size.width > breakPoint) {
            setIsNarrow(false);
        } else {
            setIsNarrow(true);
        }
    }, [size.width])

    return isNarrow;
}