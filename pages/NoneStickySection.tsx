import React, {useEffect, useRef, useState} from 'react';
import {ContentsWrapper, getWeightByProgress, useScrollProgress} from '../module/src';

export default function NoneStickySection() {
    const ref = useRef();
    const [vertical, setVertical] = useState(-100);
    const [progress] = useScrollProgress(ref, 0);
    useEffect(() => {
        setVertical(getWeightByProgress(20, 40, progress, -100, 100))
        console.log('progress', progress);
    }, [progress])
    return (
        <ContentsWrapper ref={ref} height="30vh" bgColor="gray">
            <div className="sticky top-0 pt-32 w-full flex items-center justify-center">
                <div className="w-1 h-1 bg-green-500 transition-all duration-300"  style={{transform: `matrix(1, 0, 0, 1, ${vertical}, 0)`, willChange: "transform"}}/>
            </div>
        </ContentsWrapper>
        
    )
}
