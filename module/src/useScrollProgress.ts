import { MutableRefObject, useEffect, useState } from "react";
import { ContentsWrapperRefTypes } from "./ContentsWrapper";

export default function useScrollProgress(wrapperRef: MutableRefObject<ContentsWrapperRefTypes>, threshold?: number) {
    const THRESHOLD = [null, undefined].includes(threshold) ? 0.5 : threshold;
    
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let observer: IntersectionObserver;
        if (wrapperRef.current.contentElement) {
            observer = new IntersectionObserver(handleIntersection, { threshold: THRESHOLD });
            observer.observe(wrapperRef.current.contentElement);
        }

        return () => {
            return observer && observer.disconnect()
        };

    }, [wrapperRef])

    const handleScrollInSection = () => {
        if(wrapperRef) {
            if(wrapperRef.current) {
                if(wrapperRef.current.wrapperElement) {
                    const sectionHeight = wrapperRef.current.wrapperElement.getBoundingClientRect().height;
                    const sectionOffsetY = wrapperRef.current.wrapperElement.offsetTop;
                    const currentY = window.pageYOffset;
                    const startY = sectionOffsetY - (sectionHeight * THRESHOLD);
                    const endY = startY + sectionHeight;
                    const progress = Math.floor((currentY - startY + 1) / (endY - startY) * 100);
                    setProgress(progress);
                }
            }
        }
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