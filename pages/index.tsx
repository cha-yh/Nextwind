import { useEffect, useState } from 'react';
import {Link, Element} from 'react-scroll';

export default function Home() {
    const [isLower, setIsLower] = useState(false);
    const [prePageY, setPrePageY] = useState(0);
    const [scrollMoving, setScrollMoving] = useState<"UP"|"DOWN">("UP");
    const scrollHandler = () => {
        const pageYOffset = window.pageYOffset;
        console.log('current page y', window.pageYOffset);
        console.log('pre page y', prePageY);

        if(prePageY > pageYOffset) {
            console.log('up')
            setScrollMoving("UP");
        } else {
            console.log('down')
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
    }, [prePageY])
    return (
        <div>
            <header className={`w-full fixed top-0 z-10 bg-white`}>
                <div className="flex justify-between items-center container mx-auto">
                    <Link activeClass="" to="section1" spy={true} smooth={true} offset={-60} duration={200}>
                        <img src="/nextwind_icon.png" alt="" className="w-10 m-3"/>
                    </Link>
                    
                    <ul className="flex">
                        <li className="mx-2">
                            <Link activeClass="text-green-500" to="testid1" spy={true} smooth={true} offset={-100} duration={200}>
                                menu 1
                            </Link>
                        </li>
                        <li className="mx-2">
                            <Link activeClass="text-green-500" to="card-section" spy={true} smooth={true} offset={-100} duration={200}>
                                cards
                            </Link>
                        </li>

                        <li className="mx-2">
                            <Link activeClass="text-green-500" to="contact-section" spy={true} smooth={true} offset={-100} duration={200}>
                                contanct
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>

            {/* header dummy for space */}
            <div className="" style={{height: "60px"}}/>

            {/* scroll top button */}
            <button
                className={`text-sm w-12 h-12 md:text-md md:w-14 md:h-14 border border-gray-800 bg-gray-800 text-white z-20 fixed bottom-5 right-5 transition-all duration-500 ${!isLower ? "opacity-0" : "opacity-100"} `}
                onClick={() => {window.scroll({top:0, left: 0, behavior: "smooth"})}}
            >
                TOP
            </button>

            <div className="">
                <Element id="section1" className="relative" style={{height: 'calc(100vh - 60px)'}}>
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1609795386999-182f7609dc74?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'}}
                    />

                    {/* dimmer */}
                    <div className="w-full absolute top-0 left-0 opacity-50 bg-black" style={{height: 'calc(100vh - 60px)'}} />

                    <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center text-white" >
                        <h1 className="text-4xl mb-5">Title title</h1>
                        <p className="text-center px-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, quisquam?</p>
                    </div>
                </Element>
            </div>
            <div className="container m-auto">
                <Element className="flex flex-col items-center justify-center py-40 md:flex-row" id="testid1">
                    <img src="https://images.unsplash.com/photo-1609729015759-8f18dd32f562?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1348&q=80" alt="" className="object-cover h-96 flex-1 mx-2"/>

                    <div className="flex-1 mx-2 px-2">
                        <h3 className="text-lg font-bold mb-5">Lorem ipsum dolor sit amet.</h3>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                        </ul>
                    </div>
                </Element>

                {/* card section */}
                <Element className="container mx-auto flex items-center justify-center py-40" id="card-section">
                    <div className="flex flex-col justify-between w-full md:flex-row">
                        {[
                            {imgUrl: "https://images.unsplash.com/photo-1609767500458-d2a133f61cab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "rabit", contents: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, similique."},
                            {imgUrl: "https://images.unsplash.com/photo-1609770242416-21d590c2a157?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "car", contents: "Lorem ipsum dolor sit, amet consectetur adipisicing."},
                            {imgUrl: "https://images.unsplash.com/photo-1609700731241-d4b42fa1f483?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "snow", contents: "Lorem ipsum dolor sit, amet consectetur adipisicing elit."},
                        ].map((item, index) => (
                            <div className="w-full mb-20 md:w-56 lg:w-80 xl:w-96" key={index}>
                                <img src={item.imgUrl} alt="" className="w-full h-96 object-cover md:w-56 lg:w-80 xl:w-96 "/>
                                <div className="px-2 w-full">
                                    <h5 className="text-lg font-bold">{item.title}</h5>
                                    <p>{item.contents}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </Element>

                {/* contact section */}
                <Element className="flex flex-col items-center justify-center py-40" id="contact-section">
                    <h2 className="text-3xl mb-16 text-center">CONTACT</h2>
                    <div className="flex flex-col justify-between md:flex-row">
                        <div className="mx-2 flex-1 mb-10 md:max-w-sm">
                            <h3 className="text-2xl mb-4">Next wind</h3>
                            <address className="mb-4">
                                <span className="not-italic font-bold">Address:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, dolores!
                            </address>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            <p className="italic text-blue-700">email@gmail.com</p>
                        </div>
                        <div className="mx-2 flex-1">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3166.2624446314835!2d126.94931371558664!3d37.47813273694335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9f8a349ded25%3A0xe009a341d69d0885!2z6rSA7JWF6rWs7LKt!5e0!3m2!1sko!2skr!4v1609845726909!5m2!1sko!2skr"
                                width="100%" height="400"
                                frameBorder="0" style={{border:0}} allowFullScreen aria-hidden="false" tabIndex={0}
                            >
                            </iframe>
                        </div>
                    </div>
                </Element>
            </div>
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