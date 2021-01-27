import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

const ScrollTransformWrapper = React.forwardRef(({height, bgColor, isSticky = true, children}:any, ref) => {
    const sectionRef = useRef();
    const stickyRef = useRef();

    const [sectionHeight, setSectionHeight] = useState(height);

    useEffect(() => {
        setSectionHeight(window.innerWidth > 768 ? height : '100%');
    }, [])

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