import { useEffect, useRef, useState } from 'react';
import {ContentsWrapper, getWeightByProgress, useScrollProgress} from '../module/src';
import useNarrow from '../lib/useNarrow';

export default function TransformSection2() {
    const wrapperRef = useRef();
    const [progress] = useScrollProgress(wrapperRef);

    const [imgageHorizontal, setImageHorizontal] = useState(0);
    const [imageSize, setImageSize] = useState(1);
    const [imageOpacity, setImageOpacity] = useState(1);
    const [textOpacity, setTextOpacity] = useState(-100);
    const [textHorizontal, setTextHorizontal] = useState(0);

    const isNarrow = useNarrow();
    useEffect(() => {
        if(!isNarrow) {
            let textOpct = -100;
            
            if(progress <= 40) {
                textOpct = getWeightByProgress(0, 40, progress, -100, 100) * -1;
            } else {
                textOpct = getWeightByProgress(80, 120, progress, -100, 100);
            }
            setTextOpacity(textOpct);

            setTextHorizontal(getWeightByProgress(0, 50, progress, -50, 0));
    
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
                    <div
                        className="relative transition-all duration-500 max-w-sm mt-10 md:mt-0 md: mr-10 text-white"
                        style={{
                            transform: `matrix(1, 0, 0, 1, 0, ${textHorizontal * -1})`
                        }}
                    >
                        <h3 className="text-2xl mb-4">Opacity Gradient</h3>
                        <p>Gradient weight: {textOpacity.toFixed(2)}</p>
                        <p className="mb-3">Scroll progress (threshold: 0.5): {progress.toFixed(2)}%</p>
                        <p
                            className="text-sm"
                        >
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam itaque, consequatur, quasi ipsam nesciunt neque sunt placeat sit est omnis quos fuga eum dignissimos voluptates reiciendis quidem dolores! Animi, atque!
                        </p>

                        <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{backgroundImage:`linear-gradient(180deg, rgb(0,0,0) ${textOpacity}%, rgba(0,0,0,0) ${textOpacity + 100}%)`}}
                        />
                    </div>
                    <div
                        className="relative transition-all duration-500"
                        style={{
                            transform: `matrix(${imageSize}, 0, 0, ${imageSize}, 0, ${imgageHorizontal * -1})`
                        }}
                    >
                        <img
                            src="/black_bg_women.jpeg" alt=""
                            className=" object-cover w-96"
                        />
                        <div
                            className="absolute top-0 left-0 w-full h-full"
                            style={{backgroundImage: `linear-gradient(180deg, rgb(0,0,0) ${textOpacity}%, rgba(0,0,0,0) ${textOpacity + 100}%)`}}
                        />
                    </div>
                </div>
            </div>
        </ContentsWrapper>
    )
}