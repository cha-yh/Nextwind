import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import useWindowSize from './useWindowResize';
import styles from './styles.module.css';

export type ContentsWrapperRefTypes = {
    readonly sectionWrapper: HTMLDivElement;
    readonly stickyWrapper: HTMLDivElement;
};

type Props = {
    height?: string;
    bgColor?: string;
    children: React.ReactNode
}
type PropTypes = Props;

const ContentsWrapper = React.forwardRef<ContentsWrapperRefTypes, PropTypes>(({height = '100%', bgColor = 'black', children}, ref) => {
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
            className={styles.section}
            style={{
                height: sectionHeight,
                background: bgColor
            }}
            ref={sectionRef}
        >
            <div className={styles.sticky} style={{background: bgColor}} ref={stickyRef}>
                <div className={styles.fullBox}>
                    {children}
                </div>
            </div>
        </div>
    )
})

export default ContentsWrapper;