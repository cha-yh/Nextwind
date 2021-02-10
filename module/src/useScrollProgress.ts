import { MutableRefObject, useEffect, useState } from "react";
import { ContentsWrapperRefTypes } from "./ContentsWrapper";

export default function useScrollProgress(wrapperRef: MutableRefObject<ContentsWrapperRefTypes>, threshold?: number) {
    const THRESHOLD = [null, undefined].includes(threshold) ? 0.5 : threshold;
    
    const [progress, setProgress] = useState(0);

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
        const progress = Math.floor((currentY - startY + 1) / (endY - startY) * 100);
        setProgress(progress);
    }

    const handleIntersection = ([ entry ]) => {
        if (entry.isIntersecting) { // in
            document.addEventListener('scroll', handleScrollInSection);
        } else { // out
            document.removeEventListener('scroll', handleScrollInSection);
        }
    };

    return [progress];
}