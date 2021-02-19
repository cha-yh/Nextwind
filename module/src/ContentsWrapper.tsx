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
                height: height,
                background: bgColor
            }}
            ref={wrapperRef}
        >
            <div 
                ref={contentRef}
                className={`${styles.content} ${isSticky ? styles.sticky : ""}`} 
                style={{
                    height: contentHeight
                }}
            >
                {children}
            </div>
        </div>
    )
})

export default ContentsWrapper;