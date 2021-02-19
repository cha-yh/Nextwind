import { useEffect, useRef, useState } from 'react';
import {ContentsWrapper, getWeightByProgress, useScrollProgress} from '../module/src';
import useNarrow from '../lib/useNarrow';

export default function TransformSection2() {
    const wrapperRef = useRef();
    const [progress] = useScrollProgress(wrapperRef);

    const [imgageHorizontal, setImageHorizontal] = useState(0);
    const [imageSize, setImageSize] = useState(1);
    const [imageOpacity, setImageOpacity] = useState(1);
    const [textOpacity, setTextOpacity] = useState(1);
    const [textHorizontal, setTextHorizontal] = useState(0);

    const isNarrow = useNarrow();
    useEffect(() => {
        if(!isNarrow) {
            const textOpct = getWeightByProgress(0, 40, progress);
            setTextOpacity(textOpct);
            setTextHorizontal(getWeightByProgress(0, 50, progress, -100, 0));
    
            setImageSize(getWeightByProgress(0, 20, progress, 0.8));
            setImageOpacity(getWeightByProgress(0, 20, progress));
            setImageHorizontal(getWeightByProgress(0, 20, progress, -10, 0));

        } else {
            setTextOpacity(1);
            setTextHorizontal(0);
            setImageSize(1);
            setImageOpacity(1);
            setImageHorizontal(0);
        }
    }, [progress, isNarrow])

    return (
        <ContentsWrapper
            ref={wrapperRef}
            height={isNarrow ? "100%" : "130vh"}
            contentHeight={isNarrow ? "100%" : "100vh"}
        >
            <div className="w-full h-full flex items-center justify-center py-40">
                <div className="md:absolute flex flex-col-reverse md:flex-row items-center justify-center">
                    <p
                        className="max-w-sm mt-10 md:mt-0 md: mr-10 text-white transition-all duration-500"
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
        </ContentsWrapper>
    )
}