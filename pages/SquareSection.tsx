import { useEffect, useRef, useState } from "react";
import ScrollTransformWrapper from "./components/ScrollTransformWrapper";
import useScrollPercent from "./useScrollPercent";

export default function SquareSection() {
    const wrapperRef = useRef<any>();
    
    const [percent] = useScrollPercent(wrapperRef);

    const initGridValue = [
        {w:3, h: 3, x:-250, y:-317},
        {w:1.5, h: 1.5, x:133, y:-142},
        {w:2, h: 2, x:-105, y:89},
        {w:2.5, h: 2.5, x:234, y:205},
    ]
    const [gridValue, setGridValue] = useState(initGridValue);

    useEffect(() => {
        console.log(`currentY: ${percent}%`);
        let temp = [...gridValue];
        const point = 30;
        const weight = percent > point ? (point*2 - percent) : percent;

        if( percent % 10 === 0 && percent <= point ) {
            temp = initGridValue.map(grid => {
                return {
                    w: grid.w - weight * (grid.w - 1)/point,
                    h: grid.h - weight * (grid.h - 1)/point,
                    x: grid.x < 0 
                        ? grid.x + weight * Math.abs(grid.x/point)
                        : grid.x - weight * Math.abs(grid.x/point),
                    y: grid.y < 0
                        ? grid.y + weight * Math.abs(grid.y/point)
                        : grid.y - weight * Math.abs(grid.y/point),
                }
            })
            console.log('temp', temp);
            setGridValue(temp);
        } else if(percent > point) {
            setGridValue([
                {w:1, h: 1, x:0, y:0},
                {w:1, h: 1, x:0, y:0},
                {w:1, h: 1, x:0, y:0},
                {w:1, h: 1, x:0, y:0},
            ])
        }
    }, [percent])
    return (
        <ScrollTransformWrapper
            ref={wrapperRef}
            height='100vh'
            bgColor="black"
        >
            <div className="w-full h-full flex items-center justify-center ">
                <div className="absolute flex flex-col items-center justify-center">
                    <div className="grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-4">
                        <img src="/square1.jpeg" alt="" className="w-20 object-cover transition-transform" style={{transform: `matrix(${gridValue[0].w}, 0, 0, ${gridValue[0].h}, ${gridValue[0].x}, ${gridValue[0].y})`}}/>
                        <img src="/square2.jpeg" alt="" className="w-20 object-cover transition-transform" style={{transform: `matrix(${gridValue[1].w}, 0, 0, ${gridValue[1].h}, ${gridValue[1].x}, ${gridValue[1].y})`}}/>
                        <img src="/square3.jpeg" alt="" className="w-20 object-cover transition-transform" style={{transform: `matrix(${gridValue[2].w}, 0, 0, ${gridValue[2].h}, ${gridValue[2].x}, ${gridValue[2].y})`}}/>
                        <img src="/square4.jpeg" alt="" className="w-20 object-cover transition-transform" style={{transform: `matrix(${gridValue[3].w}, 0, 0, ${gridValue[3].h}, ${gridValue[3].x}, ${gridValue[3].y})`}}/>
                    </div>
                    <p
                        className="text-center text-white mt-10 w-96"
                        style={{
                            opacity:0.04 * (percent-30 > 0 ? percent-30 : 0)
                        }}
                    >
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, vero, esse consequuntur placeat pariatur nostrum, nemo provident ea officia tenetur hic quo iure? Ratione molestias, nemo ipsam reprehenderit error dolorum?
                    </p>
                </div>
            </div>
        </ScrollTransformWrapper>
    )
}