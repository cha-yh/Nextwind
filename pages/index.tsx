import { useEffect, useRef, useState } from 'react';
import {Link, Element} from 'react-scroll';
import CardSection from './CardSection';
import ContactSection from './ContactSection';
import PicTextSection from './PicTextSection';
import SquareSection from './SquareSection';
import TransformSection from './TransformSection';

export default function Home() {
    const [isLower, setIsLower] = useState(false);
    const [prePageY, setPrePageY] = useState(0);
    const [scrollMoving, setScrollMoving] = useState<"UP"|"DOWN">("UP");

    const scrollHandler = () => {
        const pageYOffset = window.pageYOffset;

        if(prePageY > pageYOffset) {
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
        <div>
            <nav className={`w-full h-14 sticky top-0 z-10`}>
                <div className="w-full absolute top-0 left-0">
                    {/* background */}
                    <div className="w-full h-full absolute bg-white z-10" />

                    {/* nav contents */}
                    <div className="relative flex justify-between items-center container mx-auto z-20">
                        <Link activeClass="" to="section1" spy={true} smooth={true} offset={-60} duration={200}>
                            <img src="/nextwind_icon.png" alt="" className="w-8 m-3"/>
                        </Link>
                        
                        <ul className="flex">
                            <li className="mx-2">
                                <Link activeClass="text-green-500" to="testid1" spy={true} smooth={true} offset={0} duration={200}>
                                    menu 1
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link activeClass="text-green-500" to="card-section" spy={true} smooth={true} offset={0} duration={200}>
                                    cards
                                </Link>
                            </li>

                            <li className="mx-2">
                                <Link activeClass="text-green-500" to="contact-section" spy={true} smooth={true} offset={0} duration={200}>
                                    contanct
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* scroll top button */}
            <button
                className={`text-sm w-12 h-12 md:text-md md:w-14 md:h-14 border border-gray-800 bg-gray-800 text-white z-20 fixed bottom-5 right-5 transition-all duration-500 ${!isLower ? "opacity-0" : "opacity-100"} `}
                onClick={() => {window.scroll({top:0, left: 0, behavior: "smooth"})}}
            >
                TOP
            </button>

            <div className="">
                <Element id="section1" className="relative" style={{height: 'calc(100vh - 56px)'}}>
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1609795386999-182f7609dc74?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'}}
                    />

                    <div className="w-full absolute top-0 left-0 opacity-50 bg-black" style={{height: 'calc(100vh - 56px)'}} />

                    <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center text-white" >
                        <h1 className="text-4xl mb-5">Title title</h1>
                        <p className="text-center px-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, quisquam?</p>
                    </div>
                </Element>
            </div>
            <TransformSection />
            <SquareSection />
            <PicTextSection />
            <CardSection />
            <ContactSection />
            <footer className="w-full py-20 bg-gray-100">
                <div className="container m-auto">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-3xl font-bold mb-4">Nextwind</h3>

                        {/* icons */}
                        <div className="flex mb-4">
                            <img src="/facebook.png" alt="facebook" className="h-5 mx-2"/>
                            <img src="/instagram.png" alt="instagram" className="h-5 mx-2"/>
                            <img src="/twitter.png" alt="twitter" className="h-5 mx-2"/>
                        </div>

                        <p className="text-sm">© Copyright - Nextwind 2021</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}