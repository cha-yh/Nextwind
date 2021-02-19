import { useEffect, useRef, useState } from 'react';
import { Link, Element } from 'react-scroll';
import CardSection from './CardSection';
import ContactSection from './ContactSection';
import FramedAnimationSection from './FramedAnimationSection';
import HeroSection from './HeroSection';
import Nav from './Nav';
import NoneStickySection from './NoneStickySection';
import PicTextSection from './PicTextSection';
import SquareSection from './SquareSection';
import TransformSection from './TransformSection';

export default function Home() {
    const [isLower, setIsLower] = useState(false);
    const [prePageY, setPrePageY] = useState(0);
    const [scrollMoving, setScrollMoving] = useState<"UP" | "DOWN">("UP");

    const scrollHandler = () => {
        const pageYOffset = window.pageYOffset;

        if (prePageY > pageYOffset) {
            // console.log('up')
            setScrollMoving("UP");
        } else {
            // console.log('down')
            setScrollMoving("DOWN");
        }
        setPrePageY(pageYOffset);
        setIsLower(window.pageYOffset > 60);
        return;
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        }
    }, [
        prePageY
    ])

    return (
        <div className="bg-black">
            <Nav />

            {/* scroll top button */}
            <button
                className={`text-sm w-12 h-12 md:text-md md:w-14 md:h-14 border border-gray-800 bg-gray-800 text-white z-20 fixed bottom-5 right-5 transition-all duration-500 ${!isLower ? "opacity-0" : "opacity-100"} `}
                onClick={() => { window.scroll({ top: 0, left: 0, behavior: "smooth" }) }}
            >
                TOP
            </button>

            <section><Element id="section1" ><HeroSection /></Element></section>
            {/* <section><Element id=""><NoneStickySection /></Element></section> */}
            <section className="mb-48 md:mb-0"><Element id="textpic-section" ><TransformSection /></Element></section>
            <section className="mb-48 md:mb-0"><Element id="animated-section"><FramedAnimationSection /></Element></section>
            <section className="mb-48 md:mb-0"><Element id="square-section"><SquareSection /></Element></section>
            <section className="mb-48 md:mb-0"><Element id="pictext-section"><PicTextSection /></Element></section>
            <section className="mb-48 md:mb-0"><Element id="cards-section"><CardSection /></Element></section>
            <section className="mb-48 md:mb-0"><Element id="contact-section"><ContactSection /></Element></section>
            <footer className="w-full py-20 bg-gray-100">
                <div className="container m-auto">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-3xl font-bold mb-4">Nextwind</h3>

                        {/* icons */}
                        <div className="flex mb-4">
                            <img src="/facebook.png" alt="facebook" className="h-5 mx-2" />
                            <img src="/instagram.png" alt="instagram" className="h-5 mx-2" />
                            <img src="/twitter.png" alt="twitter" className="h-5 mx-2" />
                        </div>

                        <p className="text-sm">© Copyright - Nextwind 2021</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}