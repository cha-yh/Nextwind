import { useEffect, useRef, useState } from 'react';
import { Element } from 'react-scroll';
import ScrollTransformWrapper from './components/ScrollTransformWrapper';
import useScrollPercent from './useScrollPercent';

export default function PicTextSection() {
    const ref = useRef();
    const [percent] = useScrollPercent(ref);

    const [imageSize, setImageSize] = useState(0.8);
    const [imgOpacity, setImgOpacity] = useState(0.3);
    const [imgHorizontal, setImgHorizontal] = useState(0);
    const [textOpacity, setTextOpacity] = useState(0);

    const getCalculatedValueByPercent = (start, end, percent, min = 0, max = 1) => {
        const diff = end - start;
        const x = (max - min) / diff;
        const calculatedValue = min + x * (percent - start);
        return calculatedValue < min
            ? min
            : calculatedValue > max
                ? max
                : calculatedValue;

    }

    useEffect(() => {
        setTextOpacity(getCalculatedValueByPercent(20, 40, percent));
        setImgOpacity(getCalculatedValueByPercent(0, 30, percent, 0.3));
        setImageSize(getCalculatedValueByPercent(0, 20, percent, 0.8));
        setImgHorizontal(getCalculatedValueByPercent(0, 30, percent, -100, 0) * -1);
    }, [percent])

    return (
        <ScrollTransformWrapper
            height="130vh"
            ref={ref}
            bgColor="black"
        >
            <section className="container m-auto">
                <Element className="flex flex-col items-center justify-center py-40" id="pictext-section">
                    <img
                        src="https://images.unsplash.com/photo-1609729015759-8f18dd32f562?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1348&q=80" alt=""
                        className="object-cover h-96 flex-1 mx-2 mb-10"
                        style={{
                            transform: `matrix(${imageSize}, 0, 0, ${imageSize}, 0, ${imgHorizontal})`,
                            opacity: imgOpacity
                        }}
                    />

                    <div
                        className="flex-1 mx-2 px-2 text-white"
                        style={{
                            opacity: textOpacity
                        }}
                    >
                        <h3 className="text-lg font-bold mb-5">Lorem ipsum dolor sit amet.</h3>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit</li>
                            <li>Lorem ipsum dolor sit amet consectetur </li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                        </ul>
                    </div>
                </Element>
            </section>
        </ScrollTransformWrapper>
    )
}