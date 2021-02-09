import { MutableRefObject, useEffect, useState } from "react";
import { ScrollTransformWrapperRefTypes } from "./ScrollTransformWrapper";

export default function useScrollPercent(wrapperRef: MutableRefObject<ScrollTransformWrapperRefTypes>, threshold?: number) {
    const THRESHOLD = [null, undefined].includes(threshold) ? 0.5 : threshold;
    
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let observer;
        if (wrapperRef) {
            observer = new IntersectionObserver(handleIntersection, { threshold: THRESHOLD });
            observer.observe(wrapperRef.current.stickyWrapper);
        }

        return () => {
            return observer && observer.disconnect()
        };

    }, [wrapperRef])

    const handleScrollInSection = () => {
        const sectionHeight = wrapperRef.current.sectionWrapper.getBoundingClientRect().height;
        const sectionOffsetY = wrapperRef.current.sectionWrapper.offsetTop;
        const currentY = window.pageYOffset;
        const startY = sectionOffsetY - (sectionHeight * THRESHOLD);
        const endY = startY + sectionHeight;
        const percent = Math.floor((currentY - startY + 1) / (endY - startY) * 100);
        setPercent(percent);

    }

    const handleIntersection = ([ entry ]) => {
        if (entry.isIntersecting) { // in
            document.addEventListener('scroll', handleScrollInSection);
        } else { // out
            document.removeEventListener('scroll', handleScrollInSection);
        }
    };

    return [percent];
}