import { useEffect, useRef, useState } from 'react';
import ScrollTransformWrapper from './components/ScrollTransformWrapper';
import useScrollPercent from './useScrollPercent';

export default function TransformSection2() {
    const wrapperRef = useRef<any>();
    
    const [percent] = useScrollPercent(wrapperRef);

    const [horizontalValue, setHorizontalValue] = useState(0);
    const [imageSize, setImageSize] = useState(0.8);
    const [textOpacity, setTextOpacity] = useState(0);
    const [textAnmValue, setTextAnmValue] = useState(0);

    useEffect(() => {
        // NOTE: set image size by percent
        // NOTE: percent: 0 -> 20, size: 0.8 -> 1, one scroll(2%) 0.02 up
        
        // 50 -> 1 0.02 * 50
        setTextOpacity(0.02 * percent);
        if( percent < 20 ) {
            setImageSize(0.8 + percent * 0.01);
        } else if( 51 < percent) {
            console.log('over 51')
            setTextAnmValue((percent - 50) * 2) // 0.5 -> 1
        }

        setHorizontalValue(percent);

        // console.log(`currentY: ${percent}%`);
    }, [percent])
    
    return (
        <ScrollTransformWrapper
            ref={wrapperRef}
            height='100vh'
        >
            <div className="w-full h-full flex items-center justify-center ">
                <div className="absolute flex items-center justify-center">
                    <p
                        className="w-80 text-white"
                        style={{
                            transform: `matrix(1, 0, 0, 1, 0, ${-textAnmValue*0.5})`,
                            opacity: `${textOpacity}`
                        }}
                    >
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam itaque, consequatur, quasi ipsam nesciunt neque sunt placeat sit est omnis quos fuga eum dignissimos voluptates reiciendis quidem dolores! Animi, atque!
                    </p> 

                    <img
                        src="/black_bg_women.jpeg" alt=""
                        className=" object-cover w-96 transition-all"
                        style={{
                            transform: `matrix(${imageSize}, 0, 0, ${imageSize}, 0, ${-0.2 * horizontalValue})`,
                            opacity: `${0.01 * horizontalValue * 1.5}`
                        }}
                    />
                </div>
            </div>
        </ScrollTransformWrapper>
    )
}