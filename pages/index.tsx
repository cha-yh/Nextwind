export default function Home() {
    return (
        <div>
            <header>
                <div className="flex justify-between items-center container mx-auto">
                    <img src="/apple.png" alt="" className="w-20"/>
                    <ul className="flex">
                        <li className="mx-2"><a href="#">menu1</a></li>
                        <li className="mx-2"><a href="#">menu2</a></li>
                        <li className="mx-2"><a href="#">menu3</a></li>
                    </ul>
                </div>
            </header>
            <div className="">
                <section className="relative " style={{height: 'calc(100vh - 60px)'}}>
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{backgroundImage: 'url(https://cdn.pixabay.com/photo/2020/12/20/10/01/advent-5846564_960_720.jpg)'}}
                    />

                    {/* dimmer */}
                    <div className="w-full h-full absolute top-0 left-0 opacity-50 bg-black"></div> 

                    <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center text-white">
                        <h1 className="text-4xl mb-5">Title title</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, quisquam?</p>
                    </div>
                </section>
            </div>
            <div className="container m-auto">
                <section className="flex items-center justify-center my-10">
                    <img src="https://images.unsplash.com/photo-1609729015759-8f18dd32f562?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1348&q=80" alt="" className="object-cover h-96 flex-1 mx-2"/>

                    <div className="flex-1 mx-2">
                        <h3 className="text-lg font-bold mb-10">Lorem ipsum dolor sit amet.</h3>
                        <ul>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, enim.</li>
                        </ul>
                    </div>
                </section>
            </div>
            <footer className="w-full h-60">

            </footer>
        </div>
    )
}