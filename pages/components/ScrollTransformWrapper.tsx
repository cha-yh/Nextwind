import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import useWindowSize from '../useWindowResize';

export type ScrollTransformWrapperRefTypes = {
    readonly sectionWrapper: HTMLDivElement;
    readonly stickyWrapper: HTMLDivElement;
};

type Props = {
    height: string;
    bgColor: string;
    children: React.ReactNode
}
type PropTypes = Props;

const ScrollTransformWrapper = React.forwardRef<ScrollTransformWrapperRefTypes, PropTypes>(({height, bgColor, children}, ref) => {
    const sectionRef = useRef<HTMLDivElement>();
    const stickyRef = useRef<HTMLDivElement>();

    const [sectionHeight, setSectionHeight] = useState(height);
    const size = useWindowSize();
    useEffect(() => {
        setSectionHeight(window.innerWidth > 768 ? height : '100%');
    }, [size])

    useImperativeHandle(ref, () => ({
        get sectionWrapper() {
            return sectionRef.current;
        },
        get stickyWrapper() {
            return stickyRef.current;
        }
    }));

    return (
        <div
            className="w-full"
            style={{
                height: sectionHeight,
                background: bgColor
            }}
            ref={sectionRef}
        >
            <div className="md:sticky w-full md:h-screen h-full top-0" style={{background: bgColor}} ref={stickyRef}>
                <div className="w-full h-full overflow-hidden relative">
                    {children}
                </div>
            </div>
        </div>
    )
})

export default ScrollTransformWrapper;