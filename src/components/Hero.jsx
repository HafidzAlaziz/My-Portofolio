import React, { useEffect, useRef } from 'react';
import { User, Code2 } from 'lucide-react';
import gsap from 'gsap';
import profileImg from '../assets/profile.png';

const Hero = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-text",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 1.5 }
            );
        }, contentRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-4" ref={contentRef}>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 hero-text">
                        <span className="block">Hello, Saya</span>
                        <span className="gradient-text">Muhammad Hafidz Alaziz</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl text-slate-400 mb-6 hero-text">Fullstack Developer</h2>
                    <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 hero-text">
                        <a href="#contact" className="btn-primary px-8 py-3 rounded-full text-white font-medium text-center">
                            Kontak Saya
                        </a>
                        <a href="#portofolio" className="px-8 py-3 rounded-full border border-slate-600 text-white hover:bg-slate-800 transition-colors text-center">
                            Lihat Portofolio
                        </a>
                    </div>
                </div>

                <div className="md:w-1/2 flex flex-col items-center hero-text">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6 group">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-20 blur-2xl spin-slow"></div>
                        <div className="floating relative z-10 w-full h-full flex items-center justify-center">
                            <svg className="w-full h-full absolute" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#22D3EE" opacity="0.8" d="M40.8,-70.4C52.9,-64.5,62.9,-53.1,70.1,-40C77.3,-26.9,81.7,-13.5,81.2,-0.3C80.7,12.9,75.3,25.8,67.8,37.4C60.3,49,50.7,59.3,39.1,65.3C27.5,71.3,13.8,73,0.7,71.8C-12.3,70.6,-24.6,66.5,-36.9,60.5C-49.2,54.5,-61.5,46.6,-68.9,35.3C-76.3,24,-78.8,9.3,-77.9,-5.2C-77,-19.7,-72.7,-34,-64.3,-45.1C-55.9,-56.2,-43.4,-64.1,-30.5,-69.4C-17.6,-74.7,-4.4,-77.4,8.5,-76.1C21.4,-74.8,28.7,-76.3,40.8,-70.4Z" transform="translate(100 100)" />
                            </svg>

                            <div className="absolute inset-0 flex items-center justify-center z-10 p-2">
                                <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-full bg-slate-900 border-4 border-slate-700 overflow-visible flex items-center justify-center shadow-lg">
                                    <img
                                        src={profileImg}
                                        alt="Muhammad Hafidz Alaziz"
                                        className="w-full h-full object-cover rounded-full"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <User size={120} className="text-slate-600 hidden" />

                                    {/* Achievement Badges in Circle */}
                                    <div className="absolute top-0 right-0 -translate-y-2 translate-x-2 w-12 h-12 md:w-20 md:h-20 drop-shadow-lg transform transition-transform hover:scale-110 cursor-help" title="Pull Shark">
                                        <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" alt="Pull Shark" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-12 h-12 md:w-20 md:h-20 drop-shadow-lg transform transition-transform hover:scale-110 cursor-help" title="YOLO">
                                        <img src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" alt="YOLO" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="absolute bottom-1/4 -right-4 w-12 h-12 md:w-20 md:h-20 drop-shadow-lg transform transition-transform hover:scale-110 cursor-help" title="Quickdraw">
                                        <img src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png" alt="Quickdraw" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack Marquee directly adapted from GitHub README */}
            <div className="absolute bottom-4 left-0 w-full overflow-hidden opacity-0 hero-text">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
                        <Code2 size={16} className="text-cyan-400" />
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em]">Full Tech Stack</h3>
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
                    </div>

                    <div className="marquee-container">
                        <div className="animate-marquee flex items-center gap-4 md:gap-8">
                            {[
                                { name: "C++", logo: "c%2B%2B", color: "00599C" },
                                { name: "Go", logo: "go", color: "00ADD8" },
                                { name: "HTML5", logo: "html5", color: "E34F26" },
                                { name: "CSS3", logo: "css3", color: "1572B6" },
                                { name: "JavaScript", logo: "javascript", color: "F7DF1E" },
                                { name: "PHP", logo: "php", color: "777BB4" },
                                { name: "Python", logo: "python", color: "3670A0" },
                                { name: "Cloudflare", logo: "Cloudflare", color: "F38020" },
                                { name: "AWS", logo: "amazon-aws", color: "FF9900" },
                                { name: "Firebase", logo: "firebase", color: "039BE5" },
                                { name: "Vercel", logo: "vercel", color: "000000" },
                                { name: "Netlify", logo: "netlify", color: "00C7B7" },
                                { name: "Laravel", logo: "laravel", color: "FF2D20" },
                                { name: "React", logo: "react", color: "20232a" },
                                { name: "Vite", logo: "vite", color: "646CFF" },
                                { name: "Vue.js", logo: "vuedotjs", color: "35495e" },
                                { name: "Next.js", logo: "next.js", color: "000000" },
                                { name: "Nuxt JS", logo: "nuxt.js", color: "00DC82" },
                                { name: "MariaDB", logo: "mariadb", color: "003545" },
                                { name: "MySQL", logo: "mysql", color: "4479A1" },
                                { name: "Figma", logo: "figma", color: "F24E1E" },
                                { name: "Canva", logo: "Canva", color: "00C4CC" },
                                { name: "GitHub", logo: "github", color: "121011" },
                                { name: "GitLab", logo: "gitlab", color: "181717" },
                                { name: "Git", logo: "git", color: "F05033" },
                                { name: "Unity", logo: "unity", color: "000000" }
                            ].map((tech, index) => (
                                <img
                                    key={index}
                                    src={`https://img.shields.io/badge/${tech.name}-${tech.color}?style=for-the-badge&logo=${tech.logo}&logoColor=white`}
                                    alt={tech.name}
                                    className="h-7 md:h-10 hover:scale-110 transition-transform duration-300"
                                />
                            ))}
                            {/* Duplicate for seamless loop */}
                            {[
                                { name: "C++", logo: "c%2B%2B", color: "00599C" },
                                { name: "Go", logo: "go", color: "00ADD8" },
                                { name: "HTML5", logo: "html5", color: "E34F26" },
                                { name: "CSS3", logo: "css3", color: "1572B6" },
                                { name: "JavaScript", logo: "javascript", color: "F7DF1E" },
                                { name: "PHP", logo: "php", color: "777BB4" },
                                { name: "Python", logo: "python", color: "3670A0" },
                                { name: "Cloudflare", logo: "Cloudflare", color: "F38020" },
                                { name: "AWS", logo: "amazon-aws", color: "FF9900" },
                                { name: "Firebase", logo: "firebase", color: "039BE5" },
                                { name: "Vercel", logo: "vercel", color: "000000" },
                                { name: "Netlify", logo: "netlify", color: "00C7B7" },
                                { name: "Laravel", logo: "laravel", color: "FF2D20" },
                                { name: "React", logo: "react", color: "20232a" },
                                { name: "Vite", logo: "vite", color: "646CFF" },
                                { name: "Vue.js", logo: "vuedotjs", color: "35495e" },
                                { name: "Next.js", logo: "next.js", color: "000000" },
                                { name: "Nuxt JS", logo: "nuxt.js", color: "00DC82" },
                                { name: "MariaDB", logo: "mariadb", color: "003545" },
                                { name: "MySQL", logo: "mysql", color: "4479A1" },
                                { name: "Figma", logo: "figma", color: "F24E1E" },
                                { name: "Canva", logo: "Canva", color: "00C4CC" },
                                { name: "GitHub", logo: "github", color: "121011" },
                                { name: "GitLab", logo: "gitlab", color: "181717" },
                                { name: "Git", logo: "git", color: "F05033" },
                                { name: "Unity", logo: "unity", color: "000000" }
                            ].map((tech, index) => (
                                <img
                                    key={`dup-${index}`}
                                    src={`https://img.shields.io/badge/${tech.name}-${tech.color}?style=for-the-badge&logo=${tech.logo}&logoColor=white`}
                                    alt={tech.name}
                                    className="h-7 md:h-10 hover:scale-110 transition-transform duration-300"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
