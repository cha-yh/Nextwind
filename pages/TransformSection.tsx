import { useEffect, useRef, useState } from 'react';
import ScrollTransformWrapper from './components/ScrollTransformWrapper';
import useScrollPercent from './useScrollPercent';
import {Element} from 'react-scroll';

export default function TransformSection2() {
    const wrapperRef = useRef<any>();
    
    const [percent] = useScrollPercent(wrapperRef);

    const [imgageHorizontal, setImageHorizontal] = useState(0);
    const [imageSize, setImageSize] = useState(0.8);
    const [imageOpacity, setImageOpacity] = useState(0);
    const [textOpacity, setTextOpacity] = useState(0);
    const [textHorizontal, setTextHorizontal] = useState(0);

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

    useEffect(() => {

        const textOpct = getCalculatedValueByPercent(0, 40, percent);
        setTextOpacity(textOpct);
        setTextHorizontal(getCalculatedValueByPercent(0, 50, percent, -100, 0));

        setImageSize(getCalculatedValueByPercent(0, 20, percent, 0.8));
        setImageOpacity(getCalculatedValueByPercent(0, 20, percent));
        setImageHorizontal(getCalculatedValueByPercent(0, 20, percent, -10, 0))

        console.log(`currentY: ${percent}%`);
    }, [percent])
    
    return (
        <section>
        <ScrollTransformWrapper
            ref={wrapperRef}
            height='130vh'
            bgColor="black"
        >
            <Element id="textpic-section" className="h-full">
                <div className="w-full h-full flex items-center justify-center ">
                    <div className="absolute flex items-center justify-center">
                        <p
                            className="w-80 text-white transition-all duration-500"
                            style={{
                                transform: `matrix(1, 0, 0, 1, 0, ${textHorizontal * -1})`,
                                opacity: `${textOpacity}`
                            }}
                        >
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam itaque, consequatur, quasi ipsam nesciunt neque sunt placeat sit est omnis quos fuga eum dignissimos voluptates reiciendis quidem dolores! Animi, atque!
                        </p> 

                        <img
                            src="/black_bg_women.jpeg" alt=""
                            className=" object-cover w-96 transition-all duration-500"
                            style={{
                                transform: `matrix(${imageSize}, 0, 0, ${imageSize}, 0, ${imgageHorizontal * -1})`,
                                opacity: imageOpacity
                            }}
                        />
                    </div>
                </div>
            </Element>
        </ScrollTransformWrapper>
        </section>
    )
}