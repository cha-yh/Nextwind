import React, { useEffect, useRef, useState } from 'react';
import useNarrow from '../lib/useNarrow';
import { ContentsWrapper, getWeightByProgress, useScrollProgress } from '../module/src';

const Masking = () => {
    const ref = useRef();
    const [progress] = useScrollProgress(ref, 0.5);

    const [insetPercent, setInsetPercent] = useState(0);

    const isNarrow = useNarrow(768);

    useEffect(() => {
        setInsetPercent(getWeightByProgress(40, 90, progress, 0, 100));    
    }, [progress])
    return (
        <div className="text-white">
            

            <ContentsWrapper ref={ref} height={isNarrow ? '100vh' : '200vh'}>
                <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-full">
                    <div className="relative w-11/12 md:w-full h-full m-auto md:m-0" style={{maxWidth:"400px", maxHeight:"500px"}}>
                        <img src="/clippath1.png" alt="" className="w-full h-full absolute top-0 left-0 object-cover"/>
                        <img src="/clippath2.png" alt="" className="w-full h-full absolute top-0 left-0 object-cover" style={{clipPath:`inset(0px 0px 0px ${insetPercent}%)`}}/>
                    </div>
                    <div className="flex flex-col justify-center md:ml-5">
                        <div className="mb-4">
                            <h3 className="text-2xl mb-4">Masking Section</h3>
                            <p className="text-sm">When It's scrolling at 40%~90% progress in the {isNarrow?'100vh':'200vh'} height section, </p>
                            <p className="text-xs">clip-path value will be changed from 0% to 100%</p>
                        </div>
                        <p>Scroll progress in this section(threshold:0.5): {progress.toFixed(2)}%</p>
                        <p>The value of clip-path: {insetPercent.toFixed(2)}</p>
                    </div>
                </div>
            </ContentsWrapper>
            
        </div>
    )
}

export default Masking;