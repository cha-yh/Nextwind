import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import useWindowSize from './useWindowResize';
import styles from './styles.module.css';

export type ContentsWrapperRefTypes = {
    readonly wrapperElement: HTMLDivElement;
    readonly contentElement: HTMLDivElement;
};

type Props = {
    height?: string;
    contentHeight?: string;
    bgColor?: string;
    isSticky?: boolean;
    children: React.ReactNode
}
type PropTypes = Props;

const ContentsWrapper = React.forwardRef<ContentsWrapperRefTypes, PropTypes>(({height = '120vh', contentHeight = '100vh', bgColor = 'black', isSticky = true, children}, ref) => {
    const wrapperRef = useRef<HTMLDivElement>();
    const contentRef = useRef<HTMLDivElement>();

    const [wrapperHeight, setWrapperHeight] = useState(height);
    const [_contentHeight, setContentHeight] = useState(contentHeight);
    const size = useWindowSize();

    useEffect(() => {
        const stickyHeight = contentRef.current.clientHeight;
        const viewPortWidth = size.width;
        const viewPortHeight = size.height;
        const isWide = viewPortWidth > 768;
        const isContentsTaller = stickyHeight >= viewPortHeight;

        if(!isContentsTaller) {
            setWrapperHeight(height);
            setContentHeight(height);
        } else {
            if(isWide) {
                setWrapperHeight(height);
                setContentHeight(contentHeight);
            } else {
                setWrapperHeight('100%');
                setContentHeight('100%');
            }
        }
    }, [size])

    useImperativeHandle(ref, () => ({
        get wrapperElement() {
            return wrapperRef.current;
        },
        get contentElement() {
            return contentRef.current;
        }
    }));

    return (
        <div
            className={styles.wrapper}
            style={{
                height: wrapperHeight,
                background: bgColor
            }}
            ref={wrapperRef}
        >
            <div 
                ref={contentRef}
                className={`${styles.content} ${isSticky ? styles.sticky : ""}`} 
                style={{
                    height: _contentHeight
                }}
            >
                {children}
            </div>
        </div>
    )
})

export default ContentsWrapper;