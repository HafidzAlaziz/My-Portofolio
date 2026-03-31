import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Trophy, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GithubStats = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        let ctx;
        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                gsap.from(".stat-card-wrapper", {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    },
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out"
                });
                ScrollTrigger.refresh();
            }, sectionRef);
        }, 100);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section id="github-stats" className="py-20 px-4 bg-slate-900/50" ref={sectionRef}>
            <div className="container mx-auto">
                <div className="stat-card-wrapper text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold stat-card">
                        <span className="gradient-text">GitHub Stats & Achievements</span>
                    </h2>
                </div>

                <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 md:gap-8">

                    {/* Main Stats Column */}
                    <div className="flex flex-col gap-6 md:gap-8 lg:w-1/2">
                        <div className="stat-card-wrapper h-full">
                            <div className="card p-5 md:p-6 rounded-2xl stat-card border border-slate-700/50 hover:border-cyan-500/50 transition-colors h-full flex flex-col items-center justify-center min-h-[180px] sm:min-h-[220px]">
                                <div className="flex items-center gap-2 mb-6 w-full">
                                    <Github className="text-cyan-400 w-5 h-5 sm:w-6 sm:h-6" />
                                    <h3 className="text-base sm:text-xl font-semibold text-slate-200">GitHub Overview</h3>
                                </div>
                                <img
                                    src="https://github-readme-stats-fast.vercel.app/api?username=HafidzAlaziz&show_icons=true&theme=dark&hide_border=true&bg_color=0d1117&title_color=22d3ee&icon_color=22d3ee&text_color=cbd5e1"
                                    alt="GitHub Stats"
                                    className="w-full max-w-md hover:scale-105 transition-transform duration-300 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className="stat-card-wrapper h-full">
                            <div className="card p-5 md:p-6 rounded-2xl stat-card border border-slate-700/50 hover:border-indigo-500/50 transition-colors h-full flex flex-col items-center justify-center min-h-[160px] sm:min-h-[200px]">
                                <div className="flex items-center gap-2 mb-6 w-full">
                                    <Target className="text-indigo-400 w-5 h-5 sm:w-6 sm:h-6" />
                                    <h3 className="text-base sm:text-xl font-semibold text-slate-200">Current Streak</h3>
                                </div>
                                <img
                                    src="https://streak-stats.demolab.com/?user=HafidzAlaziz&theme=dark&hide_border=true&background=0d1117&ring=22d3ee&fire=22d3ee&stroke=475569"
                                    alt="GitHub Streak"
                                    className="w-full max-w-md hover:scale-105 transition-transform duration-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Languages Column */}
                    <div className="lg:w-1/2 flex flex-col gap-6 md:gap-8">
                        <div className="stat-card-wrapper h-full">
                            <div className="card p-5 md:p-6 rounded-2xl stat-card border border-slate-700/50 hover:border-purple-500/50 transition-colors h-full flex flex-col items-center justify-center min-h-[160px] sm:min-h-[200px]">
                                <div className="flex items-center gap-2 mb-6 w-full">
                                    <Trophy className="text-purple-400 w-5 h-5 sm:w-6 sm:h-6" />
                                    <h3 className="text-base sm:text-xl font-semibold text-slate-200">Top Languages</h3>
                                </div>
                                <img
                                    src="https://github-readme-stats-fast.vercel.app/api/top-langs/?username=HafidzAlaziz&theme=dark&hide_border=true&include_all_commits=false&count_private=false&layout=compact&bg_color=0d1117&title_color=c084fc&text_color=cbd5e1"
                                    alt="Top Languages"
                                    className="w-full max-w-md hover:scale-105 transition-transform duration-300 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Random Quote */}
                        <div className="stat-card-wrapper flex-grow">
                            <div className="card p-5 md:p-6 rounded-2xl stat-card border border-slate-700/50 hover:border-pink-500/50 transition-colors h-full flex items-center justify-center">
                                <img
                                    src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=dark&bg_color=0d1117&text_color=cbd5e1"
                                    alt="Random Dev Quote"
                                    className="w-full max-w-md hover:scale-105 transition-transform duration-300 rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* GitHub Trophies */}
                <div className="mt-8 stat-card-wrapper">
                    <div className="card p-5 md:p-6 rounded-2xl stat-card border border-slate-700/50 hover:border-yellow-500/50 transition-colors flex flex-col items-center justify-center overflow-x-hidden">
                        <div className="flex items-center gap-2 mb-6 w-full">
                            <Trophy className="text-yellow-400 w-5 h-5 sm:w-6 sm:h-6" />
                            <h3 className="text-base sm:text-xl font-semibold text-slate-200">GitHub Achievements</h3>
                        </div>
                        <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
                            <img
                                src="https://github-trophies.vercel.app/?username=HafidzAlaziz&theme=onedark"
                                alt="GitHub Trophies"
                                className="min-w-[700px] md:min-w-0 md:w-full hover:scale-[1.01] transition-transform duration-300"
                            />
                        </div>
                        <p className="text-slate-500 text-[10px] mt-2 md:hidden">Scroll ke samping untuk melihat semua </p>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default GithubStats;
