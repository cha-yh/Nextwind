import { useEffect, useRef } from 'react';
import {Element} from 'react-scroll';
import ScrollTransformWrapper from './components/ScrollTransformWrapper';
import useScrollPercent from './useScrollPercent';

export default function CardSection() {
    const ref = useRef();
    const [percent] = useScrollPercent(ref);

    const getCalculatedValueByPercent = (start, end, percent, min = 0) => {
        const diff = end - start;
        const x = (1-min) / diff;
        const calculatedValue = min + x * (percent - start);
        return calculatedValue < min
            ? min
            : calculatedValue > 1
                ? 1
                : calculatedValue;
        
    }

    useEffect(() => {
        console.log('percent', percent);

        // 0~10% : first img
        // 10~20% : first text

        // 20~30% : second img
        // 30~40% : second text

        // 40~50% : third img
        // 50~60% : third text

        
        return () => {
            
        }
    }, [percent])
    return (
        <section>
            <ScrollTransformWrapper
                bgColor="black"
                height="150vh"
                ref={ref}
            >
                <Element className="container mx-auto flex items-center justify-center py-40" id="card-section">
                    <div className="flex flex-col justify-between w-full md:flex-row">
                        {[
                            {imgUrl: "https://images.unsplash.com/photo-1609767500458-d2a133f61cab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "rabit", contents: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, similique."},
                            {imgUrl: "https://images.unsplash.com/photo-1609770242416-21d590c2a157?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "car", contents: "Lorem ipsum dolor sit, amet consectetur adipisicing."},
                            {imgUrl: "https://images.unsplash.com/photo-1609700731241-d4b42fa1f483?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "snow", contents: "Lorem ipsum dolor sit, amet consectetur adipisicing elit."},
                        ].map((item, index) => {
                            const img = getCalculatedValueByPercent(index * 20, index * 20 + 20, percent)
                            const text = getCalculatedValueByPercent(index * 20 + 10, index * 20 + 20, percent)
                            return (
                                <div className="w-full mb-20 md:w-56 lg:w-80 xl:w-96" key={index}>
                                    <img
                                        src={item.imgUrl} alt="" className="w-full h-96 object-cover md:w-56 lg:w-80 xl:w-96"
                                        style={{
                                            // transform: `matrix(1, 0, 0, 1, 0, ${-50 + 30 * img})`,
                                            opacity: img
                                        }}
                                    />
                                    <div className="px-2 w-full text-white" style={{opacity: img}}>
                                        <h5 className="text-lg font-bold">{item.title}</h5>
                                        <p>{item.contents}</p>
                                    </div>
                                </div>
                            )
                        }
                        
                        )}
                    </div>
                    
                </Element>
            </ScrollTransformWrapper>
        </section>
    )
}

