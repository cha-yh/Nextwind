import { useEffect, useState } from "react";

const THRESHOLD = 0.5;
export default function useScrollPercent(wrapperRef: any) {
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let observer;
        console.log('wrapperRef', wrapperRef);
        if (wrapperRef) {
            observer = new IntersectionObserver(handleIntersection, { threshold: THRESHOLD });
            observer.observe(wrapperRef.current.stickyWrapper);
        }

        return () => {
            console.log('returned')
            return observer && observer.disconnect()
        };

    }, [wrapperRef])

    const handleScrollInSection = () => {
        const viewPortHeight = window.innerHeight;
        const sectionHeight = wrapperRef.current.sectionWrapper.getBoundingClientRect().height;
        const sectionOffsetY = wrapperRef.current.sectionWrapper.offsetTop ;
        console.log('sectionOffsetY', sectionOffsetY);
        const currentY = window.pageYOffset;
        const startY = sectionOffsetY - (sectionHeight * THRESHOLD);
        // const endY = sectionOffsetY + sectionHeight + sectionHeight * (1 - THRESHOLD);
        const endY = startY + sectionHeight;
        console.log('startY', startY)
        console.log('endY', endY)
        console.log('currentY', currentY)
        const gap = endY - startY;
        const percent = Math.floor((currentY - startY + 1) / (endY - startY) * 100);

        console.log('percent', percent);
        setPercent(percent);

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

    return [percent];
}