import {Link, Element} from 'react-scroll';

export default function Home() {
    return (
        <div>
            <header className="w-full fixed top-0 z-10 bg-white">
                <div className="flex justify-between items-center container mx-auto">
                    <Link activeClass="" to="section1" spy={true} smooth={true} offset={-60} duration={200}>
                        <img src="/apple.png" alt="" className="w-20"/>
                    </Link>
                    
                    <ul className="flex">
                        <li className="mx-2">
                            <Link activeClass="text-green-500" to="testid1" spy={true} smooth={true} offset={-70} duration={200}>
                                menu 1
                            </Link>
                        </li>
                        <li className="mx-2">
                            <Link activeClass="text-green-500" to="testid2" spy={true} smooth={true} offset={-70} duration={200}>
                                menu 2
                            </Link>
                        </li>
                        <li className="mx-2">
                            <Link activeClass="text-green-500" to="testid3" spy={true} smooth={true} offset={-70} duration={200}>
                                menu 3
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>

            {/* header dummy for space */}
            <div className="" style={{height: "60px"}}/>

            <div className="">
                <Element id="section1" className="relative " style={{height: 'calc(100vh - 60px)'}}>
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/12/20/10/01/advent-5846564_960_720.jpg)'}}
                    />

                    {/* dimmer */}
                    <div className="w-full absolute top-0 left-0 opacity-50 bg-black" style={{height: 'calc(100vh - 60px)'}} />

                    <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center text-white" >
                        <h1 className="text-4xl mb-5">Title title</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, quisquam?</p>
                    </div>
                </Element>
            </div>
            <div className="container m-auto">
                <Element className="flex items-center justify-center my-40" id="testid1">
                    <img src="https://images.unsplash.com/photo-1609729015759-8f18dd32f562?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1348&q=80" alt="" className="object-cover h-96 flex-1 mx-2"/>

                    <div className="flex-1 mx-2">
                        <h3 className="text-lg font-bold mb-10">Lorem ipsum dolor sit amet.</h3>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                        </ul>
                    </div>
                </Element>

                {/* card section */}
                <Element className="flex items-center justify-center my-40" id="testid2">
                    <div className="flex">
                        {[
                            {imgUrl: "https://images.unsplash.com/photo-1609767500458-d2a133f61cab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "rabit", contents: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, similique."},
                            {imgUrl: "https://images.unsplash.com/photo-1609770242416-21d590c2a157?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "car", contents: "Lorem ipsum dolor sit, amet consectetur adipisicing."},
                            {imgUrl: "https://images.unsplash.com/photo-1609700731241-d4b42fa1f483?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80", title: "snow", contents: "Lorem ipsum dolor sit, amet consectetur adipisicing elit."},
                        ].map(item => (
                            <div className="mx-2 flex-1">
                                <img src={item.imgUrl} alt="" className="w-60 h-96 object-cover"/>
                                <h5>{item.title}</h5>
                                <p>{item.contents}</p>
                            </div>
                        ))}
                    </div>
                    
                </Element>

                <Element className="flex items-center justify-center my-40" id="testid3">
                    <img src="https://images.unsplash.com/photo-1609729015759-8f18dd32f562?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1348&q=80" alt="" className="object-cover h-96 flex-1 mx-2"/>

                    <div className="flex-1 mx-2">
                        <h3 className="text-lg font-bold mb-10">Lorem ipsum dolor sit amet.</h3>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                        </ul>
                    </div>
                </Element>
            </div>
            <footer className="w-full h-60 mb-96">

            </footer>
        </div>
    )
}