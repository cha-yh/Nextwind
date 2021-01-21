import { useEffect, useRef, useState } from "react";
import ScrollTransformWrapper from "./components/ScrollTransformWrapper";
import useScrollPercent from "./useScrollPercent";
import _ from 'lodash';

export default function SquareSection() {
    const wrapperRef = useRef<any>();

    const bgRef = useRef<any>();
    
    const [percent] = useScrollPercent(wrapperRef);

    const initGridValue = [
        {w:3, h: 3, x:-550, y:-517},
        {w:1.5, h: 1.5, x:533, y:-542},
        {w:2, h: 2, x:-555, y:589},
        {w:2.5, h: 2.5, x:534, y:505},
    ]
    const [gridValue, setGridValue] = useState(initGridValue);

    const getCalculatedValueByPercent = (start, end, percent, min = 0, max = 1) => {
        const diff = end - start;
        const x = (max-min) / diff;
        const calculatedValue = min + x * (percent - start);
        return calculatedValue < min
            ? min
            : calculatedValue > max
                ? max
                : calculatedValue;
        
    }

    const [wholeSize, setWholeSize] = useState(10);
    const [textOpacity, setTextOpacity] = useState(0);
    const [textHorizontal, setTextHorizontal] = useState(0);
    const [textOpacity2, setTextOpacity2] = useState(0);
    const [dimmerOpacity, setDimmerOpacity] = useState(0.4);
    
    const upScaling = (percent: any) => {
        const size = getCalculatedValueByPercent(58, 75, percent, -10, -1) * -1
        bgRef.current.style.transform = `matrix(${size}, 0, 0, ${size}, 0, 0)`
    }
    useEffect(() => {
        let temp = [...gridValue];  
        setTextOpacity(getCalculatedValueByPercent(50, 60, percent, -1, 0) * -1);
        setTextHorizontal(getCalculatedValueByPercent(50, 60, percent, 0, 200) * -1);
        setDimmerOpacity(getCalculatedValueByPercent(50, 60, percent, -0.4, 0) * -1);
        setWholeSize(getCalculatedValueByPercent(58, 75, percent, -10, -1) * -1);

        temp = initGridValue.map(grid => {
            return {
                w: getCalculatedValueByPercent(65, 75, percent, -1 * grid.w, -1) * -1,
                h: getCalculatedValueByPercent(65, 75, percent, -1 * grid.h, -1) * -1,
                x: grid.x < 0 
                    ? getCalculatedValueByPercent(65, 75, percent, grid.x, 0)
                    : getCalculatedValueByPercent(65, 75, percent, -1 * grid.x, 0) * -1,
                y: grid.y < 0
                    ? getCalculatedValueByPercent(65, 75, percent, grid.y, 0)
                    : getCalculatedValueByPercent(65, 75, percent, -1 * grid.y, 0) * -1,
            }
        })
        setGridValue(temp);

        requestAnimationFrame(() => upScaling(percent))
        
        setTextOpacity2(getCalculatedValueByPercent(75, 85, percent));

    }, [percent])
    return (
        <ScrollTransformWrapper
            ref={wrapperRef}
            height='200vh'
            bgColor="black"
        >
            <div className="w-full h-full flex items-center justify-center ">
                <p
                    className="container m-auto mb-52 absolute z-20 text-2xl text-center text-white mt-10"
                    style={{
                        transform: `matrix(1, 0, 0, 1, 0, ${textHorizontal})`,
                        opacity: textOpacity,
                        width: '50vw'
                    }}
                >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, vero, esse consequuntur placeat pariatur nostrum, nemo provident ea officia tenetur hic quo iure? Ratione molestias, nemo ipsam reprehenderit error dolorum?
                </p>
                <div className="absolute z-10 w-screen h-screen bg-black" style={{opacity: dimmerOpacity}}/>
                <div className="absolute flex flex-col items-center justify-cente">
                    <div
                        ref={bgRef}
                        className="relative p-10 border border-gray-300"
                        style={{
                            // transform: `matrix(${wholeSize}, 0, 0, ${wholeSize}, 0, 0)`
                        }}
                    >
                        <figure
                            className="w-full h-full absolute top-0 left-0"
                            style={{
                                backgroundImage: 'url("/pattern.jpeg")',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                            }}
                        >

                        </figure>
                        <div className="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-4">
                            <img src="/square1.jpeg" alt="" className="w-20 object-cover transition-transform duration-200" style={{transform: `matrix(${gridValue[0].w}, 0, 0, ${gridValue[0].h}, ${gridValue[0].x}, ${gridValue[0].y})`}}/>
                            <img src="/square2.jpeg" alt="" className="w-20 object-cover transition-transform duration-200" style={{transform: `matrix(${gridValue[1].w}, 0, 0, ${gridValue[1].h}, ${gridValue[1].x}, ${gridValue[1].y})`}}/>
                            <img src="/square3.jpeg" alt="" className="w-20 object-cover transition-transform duration-200" style={{transform: `matrix(${gridValue[2].w}, 0, 0, ${gridValue[2].h}, ${gridValue[2].x}, ${gridValue[2].y})`}}/>
                            <img src="/square4.jpeg" alt="" className="w-20 object-cover transition-transform duration-200" style={{transform: `matrix(${gridValue[3].w}, 0, 0, ${gridValue[3].h}, ${gridValue[3].x}, ${gridValue[3].y})`}}/>
                        </div>
                    </div>
                    
                    <p
                        className="text-center text-white mt-10 w-96"
                        style={{
                            opacity: textOpacity2,
                        }}
                    >
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, vero, esse consequuntur placeat pariatur nostrum, nemo provident ea officia tenetur hic quo iure? Ratione molestias, nemo ipsam reprehenderit error dolorum?
                    </p>
                </div>
            </div>
        </ScrollTransformWrapper>
    )
}