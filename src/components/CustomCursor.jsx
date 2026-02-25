import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);

    useEffect(() => {
        // Only run on desktop devices
        if (window.matchMedia('(pointer: coarse)').matches) {
            if (cursorRef.current) cursorRef.current.style.display = 'none';
            if (followerRef.current) followerRef.current.style.display = 'none';
            return;
        }

        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });

            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', onMouseMove);

        // Add hover effect for interactive elements
        const interactives = document.querySelectorAll('a, button, input, textarea, .card');

        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursor, { scale: 1.5, backgroundColor: "#fff", duration: 0.2 });
                gsap.to(follower, { scale: 1.5, borderColor: "rgba(255,255,255,0.5)", duration: 0.2 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursor, { scale: 1, backgroundColor: "#22d3ee", duration: 0.2 });
                gsap.to(follower, { scale: 1, borderColor: "rgba(34, 211, 238, 0.5)", duration: 0.2 });
            });
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="cursor hidden md:block"></div>
            <div ref={followerRef} className="cursor-follower hidden md:block"></div>
        </>
    );
};

export default CustomCursor;
