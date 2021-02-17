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
    const childrenRef = useRef<HTMLDivElement>();

    const [sectionHeight, setSectionHeight] = useState(height);
    const [stickyHeight, setStickyHeight] = useState('100%');
    const size = useWindowSize();

    useEffect(() => {
        const childrenHeight = childrenRef.current.clientHeight;
        const viewPortWidth = size.width;
        const viewPortHeight = size.height;
        const isWide = viewPortWidth > 768;
        const isContentsTaller = childrenHeight >= viewPortHeight;

        if(!isContentsTaller) {
            setSectionHeight(height);
            setStickyHeight(height);
        } else {
            if(isWide) {
                setSectionHeight(height);
                setStickyHeight('100vh');
            } else {
                setSectionHeight('100%');
                setStickyHeight('100%');
            }
        }
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
            <div 
                ref={stickyRef}
                className={styles.sticky} 
                style={{
                    height: stickyHeight
                }}
            >
                <div className={styles.fullBox} ref={childrenRef}>
                    {children}
                </div>
            </div>
        </div>
    )
})

export default ContentsWrapper;