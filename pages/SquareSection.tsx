import { useEffect, useRef, useState } from "react";
import ScrollTransformWrapper, {ScrollTransformWrapperRefTypes} from "./components/ScrollTransformWrapper";
import useScrollPercent from "./useScrollPercent";
import _ from 'lodash';
import getCalculatedValueByPercent from "./lib/getCalculatedValueByPercent";
import PicTextSection from "./PicTextSection";
import useWindowSize from "./useWindowResize";

export default function SquareSection() {
    const wrapperRef = useRef<ScrollTransformWrapperRefTypes>();

    const bgRef = useRef<any>();

    const [percent] = useScrollPercent(wrapperRef);

    const initGridValue = [
        { w: 3, h: 3, x: -450, y: -517 },
        { w: 1.5, h: 1.5, x: 533, y: -642 },
        { w: 2, h: 2, x: -655, y: 589 },
        { w: 2.5, h: 2.5, x: 534, y: 305 },
    ]

    const naturalGridValue = [
        { w: 1, h: 1, x: 0, y: 0 },
        { w: 1, h: 1, x: 0, y: 0 },
        { w: 1, h: 1, x: 0, y: 0 },
        { w: 1, h: 1, x: 0, y: 0 }
    ]
    const [gridValue, setGridValue] = useState(naturalGridValue);

    const [wholeSize, setWholeSize] = useState(10);
    const [textOpacity, setTextOpacity] = useState(1);
    const [textHorizontal, setTextHorizontal] = useState(0);
    const [textOpacity2, setTextOpacity2] = useState(1);
    const [dimmerOpacity, setDimmerOpacity] = useState(0);

    const upScaling = (percent: any) => {
        const size = getCalculatedValueByPercent(58, 75, percent, -10, -1) * -1
        bgRef.current.style.transform = `matrix(${size}, 0, 0, ${size}, 0, 0)`
    }
    const size = useWindowSize();
    useEffect(() => {
        if (size.width > 768) {

            let temp = [...gridValue];
            setTextOpacity(getCalculatedValueByPercent(50, 65, percent, -1, 0) * -1);
            setTextHorizontal(getCalculatedValueByPercent(50, 65, percent, 0, 200) * -1);
            setDimmerOpacity(getCalculatedValueByPercent(50, 65, percent, -0.4, 0) * -1);

            // setWholeSize(getCalculatedValueByPercent(58, 75, percent, -10, -1) * -1);

            temp = initGridValue.map(grid => {
                return {
                    w: getCalculatedValueByPercent(58, 75, percent, -1 * grid.w, -1) * -1,
                    h: getCalculatedValueByPercent(58, 75, percent, -1 * grid.h, -1) * -1,
                    x: grid.x < 0
                        ? getCalculatedValueByPercent(58, 75, percent, grid.x, 0)
                        : getCalculatedValueByPercent(58, 75, percent, -1 * grid.x, 0) * -1,
                    y: grid.y < 0
                        ? getCalculatedValueByPercent(58, 75, percent, grid.y, 0)
                        : getCalculatedValueByPercent(58, 75, percent, -1 * grid.y, 0) * -1,
                }
            })
            setGridValue(temp);

            requestAnimationFrame(() => upScaling(percent))

            setTextOpacity2(getCalculatedValueByPercent(70, 80, percent));
        } else {
            bgRef.current.style.transform = `matrix(1, 0, 0, 1, 0, 0)`;
            setGridValue(naturalGridValue);
            setTextOpacity(1);
            setTextHorizontal(0);
            setDimmerOpacity(0);
            setTextOpacity2(1);
        }


    }, [percent, size.width])
    return (
        <ScrollTransformWrapper
            ref={wrapperRef}
            height='150vh'
            bgColor="black"
        >

            <div className="w-full h-full flex flex-col items-center justify-center py-40">
                <div
                    className="m-auto mb-20 md:mb-52 mt-10 md:absolute z-20 text-white text-center"
                    style={{
                        transform: `matrix(1, 0, 0, 1, 0, ${textHorizontal})`,
                        opacity: textOpacity,
                        width: '30%',
                        minWidth: '320px'

                    }}
                >
                    <h3 className="text-4xl mb-7">
                        SQUARE
                        </h3>
                    <p className="text-lg">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, vero, esse consequuntur placeat pariatur nostrum, nemo provident ea officia tenetur hic quo iure? Ratione molestias, nemo ipsam reprehenderit error dolorum?
                        </p>
                </div>

                {/* dimmer */}
                <div className="absolute z-10 w-screen h-screen bg-black" style={{ opacity: dimmerOpacity }} />

                <div className="md:absolute flex flex-col items-center justify-cente">
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
                            <img src="/square1.jpeg" alt="" className="w-20 object-cover transition-transform duration-200" style={{ transform: `matrix(${gridValue[0].w}, 0, 0, ${gridValue[0].h}, ${gridValue[0].x}, ${gridValue[0].y})` }} />
                            <img src="/square2.jpeg" alt="" className="w-20 object-cover transition-transform duration-200" style={{ transform: `matrix(${gridValue[1].w}, 0, 0, ${gridValue[1].h}, ${gridValue[1].x}, ${gridValue[1].y})` }} />
                            <img src="/square3.jpeg" alt="" className="w-20 object-cover transition-transform duration-200" style={{ transform: `matrix(${gridValue[2].w}, 0, 0, ${gridValue[2].h}, ${gridValue[2].x}, ${gridValue[2].y})` }} />
                            <img src="/square4.jpeg" alt="" className="w-20 object-cover transition-transform duration-200" style={{ transform: `matrix(${gridValue[3].w}, 0, 0, ${gridValue[3].h}, ${gridValue[3].x}, ${gridValue[3].y})` }} />
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