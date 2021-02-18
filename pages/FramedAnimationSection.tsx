import React, { useEffect, useRef, useState } from 'react';
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

    useEffect(() => {
        setFrameCount(Math.ceil(getWeightByProgress(20, 100, pg, 1, 36)));
        setTextHorizontal(getWeightByProgress(30, 50, pg, -1000, 0) * -1);
        setTextOpacity(getWeightByProgress(30, 40, pg, 0, 1));
    }, [pg])


    return (
        <ContentsWrapper ref={ref} height= "150vh">
            <div className="h-full container mx-auto flex flex-col md:flex-row items-center justify-center w-full text-white">
                <div className="max-w-lg md:mr-10 transition-all duration-500" style={{opacity: textOpacity, transform: `matrix(1,0,0,1,0,${textHorizontal / 10})`}}>
                    <h3 className="text-4xl mb-4">Animated Pictures</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium aperiam porro exercitationem soluta, possimus sunt at quis repudiandae dolores magnam, non cumque dolorem in quisquam excepturi voluptates numquam quos molestiae voluptas ad. A autem obcaecati architecto voluptatibus rem. Iste, dolorum?</p>
                </div>
                <img
                    className="max-w-lg"
                    src={`/cat_animated/ezgif-frame-${frameCount.toString().padStart(3, "0")}.jpg`}
                    alt=""
                />
            </div>
        </ContentsWrapper>
    )
}