import { useEffect, useRef, useState } from 'react';
import ScrollTransformWrapper from './components/ScrollTransformWrapper';

const THRESHOLD = 0.5;

export default function TransformSection2() {
    const wrapperRef = useRef<any>();
    
    const [horizontalValue, setHorizontalValue] = useState(0);
    const [imageSize, setImageSize] = useState(0.8);
    const [textAnmValue, setTextAnmValue] = useState(0);

    useEffect(() => {
        let observer;
        console.log('wrapperRef', wrapperRef);
        if (wrapperRef) {
            observer = new IntersectionObserver(handleIntersection, { threshold: THRESHOLD });
            observer.observe(wrapperRef.current.stickyWrapper);
        }

        return () => observer && observer.disconnect();

    }, [wrapperRef])

    const handleScrollInSection = () => {
        const viewPortHeight = window.innerHeight;
        const sectionHeight = wrapperRef.current.sectionWrapper.getBoundingClientRect().height;
        const startY = viewPortHeight * THRESHOLD;
        const endY = sectionHeight + viewPortHeight * (1 - THRESHOLD);
        const gap = endY - startY;
        const currentY = window.pageYOffset;
        const percent = Math.floor(currentY / gap * 100);
        const isOdd = percent % 2 === 1;

        // NOTE: set image size by percent
        // NOTE: percent: 0 -> 20, size: 0.8 -> 1, one scroll(2%) 0.02 up
        if( percent < 20 ) {
            setImageSize(0.8 + percent * 0.01);
        } else if( 51 < percent) {
            console.log('over 51')
            setTextAnmValue((percent - 50) * 2) // 0.5 -> 1
        }

        setHorizontalValue(percent);

        console.log(`currentY: ${currentY}, ${percent}%`);
    }

    const handleIntersection = ([ entry ]) => {
        if (entry.isIntersecting) { // in
            console.log('in')
            document.addEventListener('scroll', handleScrollInSection);
        } else { // out
            console.log('out')
            document.removeEventListener('scroll', handleScrollInSection);
        }
      };

    
    return (
        <ScrollTransformWrapper
            ref={wrapperRef}
        >
            <div className="w-full h-full flex items-center justify-center ">
                <div className="absolute flex items-center justify-center">
                    <p
                        className="w-80 text-white"
                        style={{
                            transform: `matrix(1, 0, 0, 1, 0, ${-textAnmValue*0.5})`,
                            opacity: `${textAnmValue*0.01}`
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