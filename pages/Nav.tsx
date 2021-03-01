import { useEffect, useState } from 'react';
import {Link} from 'react-scroll';
import useNarrow from '../lib/useNarrow';
import useWindowSize from '../module/src/useWindowResize';
// import MenuIcon from '/public/menu.svg';

export default function Nav() {
    const [visibleMobileMenu, setVisibleMobileMenu] = useState(false);
    const {width} = useWindowSize();
    const isNarrow = useNarrow(768);
    const showMobileMenu = (e: any) => {
        e.preventDefault();
        setVisibleMobileMenu(!visibleMobileMenu);
    }
    
    return (
        <nav className={`w-full h-14 sticky top-0 z-40`}>
            <div className="w-full absolute top-0 left-0">
                {/* background */}
                <div className="w-full h-full absolute bg-gray-800 opacity-70 z-40" />

                {/* nav contents */}
                <div className="relative text-white flex justify-between items-center container mx-auto z-50 h-14">
                    <Link
                        className="cursor-pointer"
                        activeClass="" to="section1" spy={true} smooth={true} offset={-60} duration={200}
                    >
                        <img src="/nextwind_icon_white.svg" alt="" className="h-10 m-2"/>
                    </Link>
                    {isNarrow && false
                        ?
                        <>
                            {visibleMobileMenu
                                ?
                                <div className="absolute top-0 left-0 w-full h-full bg-green-500">
                                    <div className="flex justify-end items-center h-14">
                                        <img src="/close.svg" alt="" className="h-5 m-2 text-white hover:opacity-50 cursor-pointer" onClick={showMobileMenu}/>
                                    </div>
                                    <div className="w-full h-screen bg-green-300"></div>

                                </div>

                                :
                                <div className="hover:opacity-50 cursor-pointer " >
                                    <img src="/menu.svg" alt="" className="h-6 m-2 text-white" onClick={showMobileMenu}/>
                                </div>
                            }
                        </>
                        

                        :
                        <ul className="flex">
                            <li className="mx-2">
                                <Link 
                                    className="cursor-pointer hover:text-green-300"
                                    activeClass="text-green-500" to="textpic-section" spy={true} smooth={true} offset={0} duration={200}
                                >
                                    textpic
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link 
                                    className="cursor-pointer hover:text-green-300"
                                    activeClass="text-green-500" to="animated-section" spy={true} smooth={true} offset={0} duration={200}
                                >
                                    animated
                                </Link>
                            </li>
                            <li className="mx-2">
                                <Link 
                                    className="cursor-pointer hover:text-green-300"
                                    activeClass="text-green-500" to="square-section" spy={true} smooth={true} offset={0} duration={200}
                                >
                                    square
                                </Link>
                            </li>

                            <li className="mx-2">
                                <Link 
                                    className="cursor-pointer hover:text-green-300"
                                    activeClass="text-green-500" to="pictext-section" spy={true} smooth={true} offset={0} duration={200}
                                >
                                    pictext
                                </Link>
                            </li>

                            <li className="mx-2">
                                <Link 
                                    className="cursor-pointer hover:text-green-300"
                                    activeClass="text-green-500" to="cards-section" spy={true} smooth={true} offset={0} duration={200}
                                >
                                    cards
                                </Link>
                            </li>

                            <li className="mx-2">
                                <Link 
                                    className="cursor-pointer hover:text-green-300"
                                    activeClass="text-green-500" to="contact-section" spy={true} smooth={true} offset={0} duration={200}
                                >
                                    contact
                                </Link>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </nav>
    )
}