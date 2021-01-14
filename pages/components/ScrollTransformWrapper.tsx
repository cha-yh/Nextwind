import React, { useImperativeHandle, useRef } from 'react';

const ScrollTransformWrapper = React.forwardRef(({height, children}:any, ref) => {
    const sectionRef = useRef();
    const stickyRef = useRef();

    useImperativeHandle(ref, () => ({
        get sectionWrapper() {
            return sectionRef.current;
        },
        get stickyWrapper() {
            return stickyRef.current;
        }
      }));

    return (
        <section className="w-full bg-black" style={{height}} ref={sectionRef}>
            <div className="sticky w-full h-screen bg-black top-0" ref={stickyRef}>
                <div className="w-full h-full overflow-hidden relative">
                    {children}
                </div>
            </div>
        </section>
    )
})

export default ScrollTransformWrapper;