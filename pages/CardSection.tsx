import { useEffect, useRef, useState } from 'react';
import ScrollTransformWrapper, { ScrollTransformWrapperRefTypes } from './components/ScrollTransformWrapper';
import getCalculatedValueByPercent from './lib/getCalculatedValueByPercent';
import useScrollPercent from './useScrollPercent';
import useWindowSize from './useWindowResize';

export default function CardSection() {
    const ref = useRef<ScrollTransformWrapperRefTypes>();
    const containerRef = useRef<HTMLDivElement>();
    const [isNarrow, setIsNarrow] = useState(true);

    const [percent] = useScrollPercent(ref);
    
    const size = useWindowSize();

    useEffect(() => {
        if(size.width > 768) {
            setIsNarrow(false);
        } else {
            setIsNarrow(true)
        }
    }, [size.width])
    return (
        <ScrollTransformWrapper
            height='120vh'
            ref={ref}
        >

            <div ref={containerRef} className="container mx-auto flex items-center justify-center py-40" >
                <div className="flex flex-col justify-between w-full md:flex-row">
                    {
                        [
                            { imgUrl: "https://images.unsplash.com/photo-1609767500458-d2a133f61cab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "rabit", contents: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, similique." },
                            { imgUrl: "https://images.unsplash.com/photo-1609770242416-21d590c2a157?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "car", contents: "Lorem ipsum dolor sit, amet consectetur adipisicing." },
                            { imgUrl: "https://images.unsplash.com/photo-1609700731241-d4b42fa1f483?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "snow", contents: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." },
                        ].map((item, index) => {
                            const img = getCalculatedValueByPercent(index * 15, index * 15 + 15, percent)
                            const text = getCalculatedValueByPercent(index * 20 + 10, index * 20 + 20, percent)
                            return (
                                <div className="w-full mb-20 md:w-56 lg:w-80 xl:w-96" key={index}>
                                    <img
                                        src={item.imgUrl} alt="" className="w-full h-96 object-cover md:w-56 lg:w-80 xl:w-96 transition-opacity duration-500"
                                        style={{
                                            // transform: `matrix(1, 0, 0, 1, 0, ${-50 + 30 * img})`,
                                            opacity: isNarrow ? 1 : img
                                        }}
                                    />
                                    <div className="px-2 w-full text-white" style={{ opacity: isNarrow ? 1 : img }}>
                                        <h5 className="text-lg font-bold">{item.title}</h5>
                                        <p>{item.contents}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </ScrollTransformWrapper>
    )
}

