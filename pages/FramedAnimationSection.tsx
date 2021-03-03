import React, { useEffect, useRef, useState } from 'react';
import useNarrow from '../lib/useNarrow';
import { ContentsWrapper, useScrollProgress, getWeightByProgress } from '../module/src';
import { ContentsWrapperRefTypes } from '../module/src/ContentsWrapper';

export default function FramedAnimationSection() {
    const ref = useRef<ContentsWrapperRefTypes>();
    const [pg] = useScrollProgress(ref, 0.5);

    const [frameCount, setFrameCount] = useState(1);
    const [textOpacity, setTextOpacity] = useState(0);
    const [textHorizontal, setTextHorizontal] = useState(100);

    const preload = () => {
        for(let i = 1; i < 37; i++) {
            const img = new Image();
            img.src = `/cat_animated/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`
        }
    }

    useEffect(() => {
        preload();
    }, [])

    const isNarrow = useNarrow();
    
    useEffect(() => {
        if(!isNarrow) {
            setFrameCount(Math.ceil(getWeightByProgress(20, 100, pg, 1, 36)));
            setTextHorizontal(getWeightByProgress(30, 50, pg, -1000, 0) * -1);
            setTextOpacity(getWeightByProgress(30, 40, pg, 0, 1));
        } else {
            setFrameCount(1);
            setTextHorizontal(0);
            setTextOpacity(1);
        }
    }, [pg, isNarrow])


    return (
        <ContentsWrapper
            ref={ref}
            height={isNarrow ? "100%" : "200vh"}
            contentHeight={isNarrow ? "100%" : "100vh"}
        >
            <div className="h-full container mx-auto flex flex-col md:flex-row items-center justify-center w-full text-white py-40">
                <div className="max-w-lg mb-20 md:mr-10 md:mb-0 transition-all duration-500" style={{opacity: textOpacity, transform: `matrix(1,0,0,1,0,${textHorizontal / 10})`}}>
                    <h3 className="text-4xl mb-4">Animated Pictures</h3>
                    <p className="my-4 text-sm">In 20~100 progress of scroll, frame will be change from 1 to 36.</p>
                    <p>Scroll progress (threshold: 0.5): {pg.toFixed(2)}%</p>
                    <p>Frame: {frameCount}</p>
                </div>
                <img
                    className="max-w-lg w-full"
                    src={`/cat_animated/ezgif-frame-${frameCount.toString().padStart(3, "0")}.jpg`}
                    alt=""
                />
            </div>
        </ContentsWrapper>
    )
}