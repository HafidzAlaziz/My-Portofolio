import React, { useEffect, useRef, useState } from 'react';
import { User, Code2, Heart } from 'lucide-react';
import gsap from 'gsap';
import profileImg from '../assets/profile.png';

const Hero = () => {
    const contentRef = useRef(null);
    const [reactions, setReactions] = useState({
        "❤️": 0,
        "🔥": 0,
        "🚀": 0,
        "👍": 0
    });
    const [floatingEmojis, setFloatingEmojis] = useState([]);

    useEffect(() => {
        // Load counts from localStorage
        const savedReactions = localStorage.getItem('portfolio_reactions');
        if (savedReactions) {
            setReactions(JSON.parse(savedReactions));
        }

        const ctx = gsap.context(() => {
            gsap.fromTo(".hero-text",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out", delay: 1.5 }
            );
        }, contentRef);
        return () => ctx.revert();
    }, []);

    const handleEmojiClick = (emoji) => {
        // Update count
        const newReactions = { ...reactions, [emoji]: reactions[emoji] + 1 };
        setReactions(newReactions);
        localStorage.setItem('portfolio_reactions', JSON.stringify(newReactions));

        // Create floating emoji
        const id = Date.now();
        const newFloatingEmoji = { id, emoji, x: Math.random() * 100 - 50 };
        setFloatingEmojis(prev => [...prev, newFloatingEmoji]);

        // Remove after animation
        setTimeout(() => {
            setFloatingEmojis(prev => prev.filter(item => item.id !== id));
        }, 2000);
    };

    // GSAP Animation for each new floating emoji
    useEffect(() => {
        floatingEmojis.forEach(item => {
            const el = document.getElementById(`emoji-${item.id}`);
            if (el && !el.dataset.animated) {
                el.dataset.animated = "true";
                gsap.to(el, {
                    y: -150,
                    x: item.x + (Math.random() * 40 - 20),
                    opacity: 0,
                    scale: 1.5,
                    duration: 1.5,
                    ease: "power1.out"
                });
            }
        });
    }, [floatingEmojis]);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-24 md:pb-32 px-4" ref={contentRef}>
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                {/* Left Column */}
                <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 hero-text leading-tight">
                        <span className="block text-slate-200">Hello, Saya</span>
                        <span className="gradient-text">Muhammad Hafidz Alaziz</span>
                    </h1>
                    <h2 className="text-lg md:text-2xl text-slate-400 mb-8 hero-text font-medium tracking-wide">Fullstack Developer</h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 hero-text mb-8">
                        <a href="#contact" className="btn-primary px-8 py-3 rounded-full text-white font-medium text-center shadow-lg shadow-cyan-500/20 whitespace-nowrap w-full sm:w-auto">
                            Kontak Saya
                        </a>
                        <a href="#portofolio" className="px-8 py-3 rounded-full border border-slate-600 text-white hover:bg-slate-800 transition-colors text-center whitespace-nowrap w-full sm:w-auto">
                            Lihat Portofolio
                        </a>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-3 bg-slate-800/20 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-sm relative hero-text mb-12 md:mb-16 w-fit mx-auto md:mx-0">
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider hidden sm:block">Reaksi:</span>
                        {Object.entries(reactions).map(([emoji, count]) => (
                            <button
                                key={emoji}
                                onClick={() => handleEmojiClick(emoji)}
                                className="relative group flex items-center gap-1.5 px-1 py-1 hover:bg-slate-700/40 rounded-full transition-all active:scale-95"
                            >
                                <span className="text-lg transition-transform group-hover:scale-120">{emoji}</span>
                                <span className="text-[10px] text-slate-400 font-mono font-medium">{count}</span>

                                <div className="absolute bottom-full left-1/2 pointer-events-none pb-2">
                                    {floatingEmojis.filter(f => f.emoji === emoji).map(f => (
                                        <span
                                            key={f.id}
                                            id={`emoji-${f.id}`}
                                            className="absolute text-lg -translate-x-1/2"
                                        >
                                            {f.emoji}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Column (Hero Illustration) */}
                <div className="md:w-1/2 flex flex-col items-center hero-text mt-8 md:mt-0">
                    <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 mb-6 group">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 opacity-20 blur-3xl spin-slow"></div>
                        <div className="floating relative z-10 w-full h-full flex items-center justify-center">
                            <svg className="w-full h-full absolute scale-110 opacity-70" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#22D3EE" d="M40.8,-70.4C52.9,-64.5,62.9,-53.1,70.1,-40C77.3,-26.9,81.7,-13.5,81.2,-0.3C80.7,12.9,75.3,25.8,67.8,37.4C60.3,49,50.7,59.3,39.1,65.3C27.5,71.3,13.8,73,0.7,71.8C-12.3,70.6,-24.6,66.5,-36.9,60.5C-49.2,54.5,-61.5,46.6,-68.9,35.3C-76.3,24,-78.8,9.3,-77.9,-5.2C-77,-19.7,-72.7,-34,-64.3,-45.1C-55.9,-56.2,-43.4,-64.1,-30.5,-69.4C-17.6,-74.7,-4.4,-77.4,8.5,-76.1C21.4,-74.8,28.7,-76.3,40.8,-70.4Z" transform="translate(100 100)" />
                            </svg>

                            <div className="absolute inset-0 flex items-center justify-center z-10 p-2">
                                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-slate-900 border-4 border-slate-700/50 overflow-visible flex items-center justify-center shadow-2xl">
                                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping"></div>
                                    <img
                                        src={profileImg}
                                        alt="Muhammad Hafidz Alaziz"
                                        className="w-full h-full object-cover rounded-full"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'block';
                                        }}
                                    />
                                    <User size={80} className="text-slate-600 hidden" />

                                    {/* Achievement Badges in Circle */}
                                    <div className="absolute top-0 right-0 -translate-y-2 translate-x-2 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 drop-shadow-lg transform transition-transform hover:scale-110 cursor-help" title="Pull Shark">
                                        <img src="https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png" alt="Pull Shark" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 drop-shadow-lg transform transition-transform hover:scale-110 cursor-help" title="YOLO">
                                        <img src="https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png" alt="YOLO" className="w-full h-full object-contain" />
                                    </div>
                                    <div className="absolute bottom-1/4 -right-4 w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 drop-shadow-lg transform transition-transform hover:scale-110 cursor-help" title="Quickdraw">
                                        <img src="https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png" alt="Quickdraw" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack Marquee */}
            <div className="absolute bottom-20 left-0 w-full overflow-hidden opacity-0 hero-text">
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
