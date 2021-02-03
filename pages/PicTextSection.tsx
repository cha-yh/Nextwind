import { useEffect, useRef, useState } from 'react';
import ScrollTransformWrapper, { ScrollTransformWrapperRefTypes } from './components/ScrollTransformWrapper';
import getCalculatedValueByPercent from './lib/getCalculatedValueByPercent';
import useScrollPercent from './useScrollPercent';
import useWindowSize from './useWindowResize';

export default function PicTextSection() {
    const ref = useRef<ScrollTransformWrapperRefTypes>();
    const [percent] = useScrollPercent(ref);

    const [imageSize, setImageSize] = useState(1);
    const [imgOpacity, setImgOpacity] = useState(1);
    const [imgHorizontal, setImgHorizontal] = useState(0);
    const [textOpacity, setTextOpacity] = useState(1);
    
    const size = useWindowSize();

    useEffect(() => {
        if(size.width > 768) {
            setTextOpacity(getCalculatedValueByPercent(40, 50, percent));
            setImgOpacity(getCalculatedValueByPercent(0, 30, percent, 0.2));
            setImageSize(getCalculatedValueByPercent(0, 20, percent, 0.7));
            setImgHorizontal(getCalculatedValueByPercent(0, 30, percent, -150, 0) * -1);

            setImgOpacity(getCalculatedValueByPercent(70, 100, percent, -1, -0.7) * -1);
            setTextOpacity(getCalculatedValueByPercent(70, 100, percent, -1, -0.7) * -1);
        } else {
            setTextOpacity(1)
            setImgOpacity(1)
            setImageSize(1)
            setImgHorizontal(0)
        }
    }, [percent, size.width])

    return (
        <ScrollTransformWrapper
            height="120vh"
            ref={ref}
        >
            <div className="container m-auto">
                <div className="flex flex-col items-center justify-center py-40">
                    <img
                        src="https://images.unsplash.com/photo-1609729015759-8f18dd32f562?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1348&q=80" alt=""
                        className="object-cover h-96 flex-1 mx-2 mb-10 max-w-2xl transition-all duration-300"
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
                </div>
            </div>
        </ScrollTransformWrapper>
    )
}