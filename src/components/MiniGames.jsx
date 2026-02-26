import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gamepad2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MiniGames = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".game-container", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                },
                y: 40,
                opacity: 0.2, // Mulai dari 0.2 agar tidak benar-benar hilang jika macet
                scale: 0.98,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Cache buster to force refresh
    const version = new Date().getTime();

    return (
        <section id="minigames" className="py-20 px-4" ref={sectionRef}>
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-2xl md:text-4xl font-bold text-center mb-16 game-container">
                    <span className="gradient-text flex items-center justify-center gap-3">
                        <Gamepad2 size={32} className="text-cyan-400 md:w-10 md:h-10" />
                        Play Games With Me!! Let's Goo!
                    </span>
                </h2>

                <div className="flex flex-col gap-8 md:gap-12">
                    {/* Snake Animation */}
                    <div className="game-container card p-5 sm:p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-colors w-full overflow-hidden shadow-2xl flex flex-col items-center justify-center bg-slate-800/80">
                        <h3 className="text-base sm:text-lg font-semibold text-slate-300 mb-6 font-primary uppercase tracking-wider">GitHub Contribution Snake</h3>
                        <div className="w-full overflow-x-auto pb-4 flex justify-start md:justify-center">
                            <img
                                src="https://raw.githubusercontent.com/HafidzAlaziz/HafidzAlaziz/output/snake-dark.svg"
                                alt="GitHub Snake Animation"
                                className="max-w-none h-auto min-w-[600px] md:min-w-0 md:w-full select-none"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <p className="hidden text-slate-400 text-sm">Gagal memuat animasi Snake. Pastikan file tersedia di repository.</p>
                        </div>
                    </div>

                    {/* Pacman Animation */}
                    <div className="game-container card p-5 sm:p-6 rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-colors w-full overflow-hidden shadow-2xl flex flex-col items-center justify-center bg-slate-800/80">
                        <h3 className="text-base sm:text-lg font-semibold text-slate-300 mb-6 font-primary uppercase tracking-wider">GitHub Contribution Pacman</h3>
                        <div className="w-full overflow-x-auto pb-4 flex justify-start md:justify-center">
                            <img
                                src="https://raw.githubusercontent.com/HafidzAlaziz/HafidzAlaziz/output/pacman-contribution-graph-dark.svg"
                                alt="GitHub Pacman Animation"
                                className="max-w-none h-auto min-w-[600px] md:min-w-0 md:w-full select-none"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'block';
                                }}
                            />
                            <p className="hidden text-slate-400 text-sm">Gagal memuat animasi Pacman. Pastikan file tersedia di repository.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MiniGames;
