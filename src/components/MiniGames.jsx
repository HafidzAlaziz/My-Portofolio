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
                    start: "top 80%",
                },
                y: 60,
                opacity: 0,
                scale: 0.95,
                duration: 1,
                stagger: 0.3,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="minigames" className="py-20 px-4" ref={sectionRef}>
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 game-container">
                    <span className="gradient-text flex items-center justify-center gap-3">
                        <Gamepad2 size={40} className="text-cyan-400" />
                        Play Games With Me!! Let's Goo!
                    </span>
                </h2>

                <div className="flex flex-col gap-12">
                    {/* Snake Animation - Active on HafidzAlaziz/HafidzAlaziz repo */}
                    <div className="game-container card p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-colors w-full overflow-x-auto shadow-2xl flex flex-col items-center justify-center bg-slate-800/80">
                        <h3 className="text-lg font-semibold text-slate-300 mb-6 font-primary uppercase tracking-wider">GitHub Contribution Snake</h3>
                        <img
                            src="https://raw.githubusercontent.com/MfidzDev/MfidzDev/output/snake.svg"
                            alt="Snake animation"
                            className="max-w-none md:max-w-full"
                        />
                    </div>

                    {/* Pacman Animation - Active on HafidzAlaziz/HafidzAlaziz repo */}
                    <div className="game-container card p-6 rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-colors w-full overflow-x-auto shadow-2xl flex flex-col items-center justify-center bg-slate-800/80">
                        <h3 className="text-lg font-semibold text-slate-300 mb-6 font-primary uppercase tracking-wider">GitHub Contribution Pacman</h3>
                        <picture>
                            <source media="(prefers-color-scheme: dark)" srcSet="https://raw.githubusercontent.com/MfidzDev/MfidzDev/output/pacman-contribution-graph-dark.svg" />
                            <source media="(prefers-color-scheme: light)" srcSet="https://raw.githubusercontent.com/MfidzDev/MfidzDev/output/pacman-contribution-graph.svg" />
                            <img
                                alt="pacman contribution graph"
                                src="https://raw.githubusercontent.com/MfidzDev/MfidzDev/output/pacman-contribution-graph.svg"
                                className="max-w-none md:max-w-full"
                            />
                        </picture>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MiniGames;
