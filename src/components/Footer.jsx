import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    useEffect(() => {
        let ctx;
        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                gsap.from('.footer-content-wrapper', {
                    scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                });
                ScrollTrigger.refresh();
            }, footerRef);
        }, 100);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <footer className="py-10 px-4 bg-slate-900 border-t border-slate-800 relative overflow-hidden" ref={footerRef}>
            {/* Ambient glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

            <div className="container mx-auto relative">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
                    <div className="footer-content-wrapper">
                        <div className="footer-content-body">
                            <a href="#" className="text-2xl font-bold shimmer-text">Portfolio</a>
                            <p className="text-slate-400 mt-2 text-sm">Fullstack Developer</p>
                        </div>
                    </div>

                    {/* Back to top button */}
                    <div className="footer-content-wrapper">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300 pulse-glow text-xl"
                            title="Kembali ke atas"
                        >
                            ↑
                        </button>
                    </div>

                    <div className="footer-content-wrapper">
                        <div className="footer-content-body flex flex-col items-center md:items-end gap-2">
                            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} Hafidz. All rights reserved.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">Privacy Policy</a>
                                <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors text-sm">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
