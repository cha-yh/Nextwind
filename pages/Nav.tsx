import {Link} from 'react-scroll';

export default function Nav() {
    return (
        <nav className={`w-full h-14 sticky top-0 z-10`}>
            <div className="w-full absolute top-0 left-0">
                {/* background */}
                <div className="w-full h-full absolute bg-gray-800 opacity-70 z-10" />

                {/* nav contents */}
                <div className="relative text-white flex justify-between items-center container mx-auto z-20">
                    <Link
                        className="cursor-pointer"
                        activeClass="" to="section1" spy={true} smooth={true} offset={-60} duration={200}
                    >
                        <img src="/nextwind_icon_white.svg" alt="" className="h-10 m-2"/>
                    </Link>
                    
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
                </div>
            </div>
        </nav>
    )
}