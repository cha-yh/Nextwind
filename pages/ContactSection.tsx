import { useEffect, useRef, useState } from 'react';
import {ContentsWrapper, getWeightByProgress, useScrollProgress} from '../module/src';
import useWindowSize from './useWindowResize';

const TITLE_INIT_SIZE = 1.5;

export default function ContactSection() {
    const ref = useRef();
    const [percent] = useScrollProgress(ref);

    const [titleSize, setTitleSize] = useState(TITLE_INIT_SIZE);
    const [contentsOpct, setContentsOpct] = useState(0);
    const [mapOpct, setMapOpct] = useState(0);

    const {width} = useWindowSize();

    useEffect(() => {
        if(width > 768) {
            const weight1 = getWeightByProgress(0, 20, percent);
            const weight2 = getWeightByProgress(10, 25, percent);
            const weight3 = getWeightByProgress(25, 40, percent);
            setTitleSize(TITLE_INIT_SIZE - weight1 * (TITLE_INIT_SIZE - 1));
            setContentsOpct(weight2);
            setMapOpct(weight3);
        } else {
            setTitleSize(1)
            setContentsOpct(1)
            setMapOpct(1)
        }
    }, [percent, width])

    return (
        <ContentsWrapper
            ref={ref}
            bgColor="#0e0d0d"
            height="100vh"
        >
            <div className="container m-auto text-white flex flex-col items-center justify-center py-40" >
                <h2
                    className="text-3xl mb-16 text-center transition-transform"
                    style={{ transform: `matrix(${titleSize}, 0, 0, ${titleSize}, 0, 0)` }}
                >
                    CONTACT
                    </h2>

                <div className="flex flex-col justify-between md:flex-row">
                    <div
                        className="mx-2 flex-1 mb-10 md:max-w-sm transition-opacity duration-1000"
                        style={{ opacity: contentsOpct }}
                    >
                        <h3 className="text-2xl mb-4">Next wind</h3>
                        <address className="mb-4">
                            <span className="not-italic font-bold">Address:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, dolores!
                            </address>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p className="italic text-blue-700">email@gmail.com</p>
                    </div>
                    <div
                        className="mx-2 flex-1 transition-opacity duration-1000"
                        style={{ opacity: mapOpct }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.2045638779937!2d-122.4120096844066!3d37.808677217980666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580fc8bb3211d%3A0xbaf631600de6b39e!2z7ZS87Ja0IDM5!5e0!3m2!1sko!2skr!4v1613129945662!5m2!1sko!2skr"
                            width="100%" height="400"
                            frameBorder="0" style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0}
                        >
                        </iframe>
                    </div>
                </div>
            </div>

        </ContentsWrapper>
    )
}