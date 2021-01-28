import { useEffect, useRef, useState } from 'react';
import { Element } from 'react-scroll';

const THRESHOLD = 0.5;

export default function HeroSection() {
    const ref = useRef<any>();
    useEffect(() => {
        let observer;
        if (ref) {
            observer = new IntersectionObserver(handleIntersection, { threshold: THRESHOLD });
            observer.observe(ref.current);
        }

        return () => {
            return observer && observer.disconnect()
        };
    }, [ref])

    const handleIntersection = ([entry]) => {
        if (entry.isIntersecting) { // in
            ref.current.play();
        } else { // out
            ref.current.pause();
        }
    };
    return (
        <div className="relative flex items-center bg-black" style={{ height: 'calc(100vh - 56px)' }}>
            {/* <div
                className="w-full h-full bg-cover bg-center"
                style={{backgroundImage: 'url(https://images.unsplash.com/photo-1609795386999-182f7609dc74?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)'}}
            /> */}
            <video
                ref={ref}
                className="w-screen h-auto"
                autoPlay muted loop
                src="https://player.vimeo.com/external/321962311.sd.mp4?s=dd9fc4e73dec30a68e213eaed998ec8e553508fa&profile_id=164&oauth2_token_id=57447761"
            />

            <div className="w-full absolute top-0 left-0 opacity-40 bg-black" style={{ height: 'calc(100vh - 56px)' }} />

            <div className="w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center text-white" >
                <h1 className="text-4xl mb-5">Title title</h1>
                <p className="text-center px-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, quisquam?</p>
            </div>
        </div>
    )
}