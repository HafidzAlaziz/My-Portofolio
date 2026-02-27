import React, { useEffect, useRef, useState, useCallback } from 'react';
import { User, Code2 } from 'lucide-react';
import gsap from 'gsap';
import profileImg from '../assets/profile.png';
import { FIREBASE_DB_URL } from '../firebaseConfig';

// ─── Firebase REST helpers ─────────────────────────────────────────────────
// Strip trailing slash to avoid double-slash in path
const DB_BASE = FIREBASE_DB_URL.replace(/\/$/, '');
const REACTIONS_PATH = `${DB_BASE}/reactions.json`;

async function fetchReactions() {
    try {
        const res = await fetch(REACTIONS_PATH);
        if (!res.ok) return {}; // Ignore 401/404 errors as valid data
        const data = await res.json();
        return data || {};
    } catch {
        return {};
    }
}

async function incrementReaction(emoji, currentCount) {
    try {
        await fetch(REACTIONS_PATH, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [emoji]: (currentCount || 0) + 1 }),
        });
    } catch {
        // silent fail, optimistic update already applied
    }
}


// ─── GSAP Animated Counter ─────────────────────────────────────────────────
const AnimatedCount = ({ value, loaded }) => {
    const spanRef = useRef(null);
    const tweenRef = useRef(null);
    const counterObj = useRef({ val: 0 });
    const hasPlayed = useRef(false);

    useEffect(() => {
        if (!loaded) return;
        if (tweenRef.current) tweenRef.current.kill();

        if (!hasPlayed.current) {
            // ── First load: Dramatic Count-Up ───────────────────────────
            hasPlayed.current = true;
            counterObj.current.val = 0;

            // Jolt animation for the container
            gsap.fromTo(spanRef.current,
                { opacity: 0, scale: 0, y: 5 },
                { opacity: 1, scale: 1.1, y: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 1.8 }
            ).eventCallback("onComplete", () => {
                gsap.to(spanRef.current, { scale: 1, duration: 0.3 });
            });

            // Numeric tween
            tweenRef.current = gsap.to(counterObj.current, {
                val: value,
                duration: 1.2,
                ease: 'power2.out',
                delay: 2.0, // wait for hero text stagger
                onUpdate: () => {
                    if (spanRef.current)
                        spanRef.current.textContent = Math.round(counterObj.current.val);
                },
            });
        } else {
            // ── On click/update: quick pop ──────────────────────────────
            tweenRef.current = gsap.to(counterObj.current, {
                val: value,
                duration: 0.4,
                ease: 'back.out(2)',
                onUpdate: () => {
                    if (spanRef.current)
                        spanRef.current.textContent = Math.round(counterObj.current.val);
                },
            });
            gsap.fromTo(spanRef.current,
                { scale: 1.8, color: '#67e8f9', filter: 'brightness(1.5)' },
                { scale: 1, color: '#cbd5e1', filter: 'brightness(1)', duration: 0.4, ease: 'back.out(2)' }
            );
        }
        return () => { if (tweenRef.current) tweenRef.current.kill(); };
    }, [value, loaded]); // eslint-disable-line

    return (
        <span
            ref={spanRef}
            style={{
                fontSize: '11px',
                fontFamily: 'monospace',
                fontWeight: 700,
                color: '#cbd5e1',
                minWidth: '16px',
                display: 'inline-block',
                textAlign: 'center',
                opacity: 0, // initially hidden for dramatic entry
            }}
        >
            0
        </span>
    );
};


// ─── Hero Component ────────────────────────────────────────────────────────
const EMOJI_LIST = ['❤️', '🔥', '🚀', '👍'];
const POLL_INTERVAL = 5000; // fallback polling every 5s

const Hero = () => {
    const contentRef = useRef(null);
    const [reactions, setReactions] = useState({ '❤️': 0, '🔥': 0, '🚀': 0, '👍': 0 });
    const [reactionsLoaded, setReactionsLoaded] = useState(false); // true once Firebase responded
    const [floatingEmojis, setFloatingEmojis] = useState([]);
    const [clickedEmoji, setClickedEmoji] = useState(null);
    const sseRef = useRef(null);

    // ── Load from Firebase & subscribe via SSE ───────────────────────────
    useEffect(() => {
        // initial load
        fetchReactions().then(data => {
            setReactions(prev => ({ ...prev, ...data }));
            setReactionsLoaded(true); // signal AnimatedCount to start count-up
        });

        // real-time subscription (Firebase SSE)
        const sseUrl = `${FIREBASE_DB_URL}/reactions.json?sse=true`;
        let es;
        try {
            es = new EventSource(sseUrl);
            es.addEventListener('put', (e) => {
                const payload = JSON.parse(e.data);
                if (payload && payload.data) {
                    setReactions(prev => ({ ...prev, ...payload.data }));
                }
            });
            es.addEventListener('patch', (e) => {
                const payload = JSON.parse(e.data);
                if (payload && payload.data) {
                    setReactions(prev => ({ ...prev, ...payload.data }));
                }
            });
            sseRef.current = es;
        } catch {
            // fallback polling
            const interval = setInterval(() => {
                fetchReactions().then(data => {
                    setReactions(prev => ({ ...prev, ...data }));
                });
            }, POLL_INTERVAL);
            return () => clearInterval(interval);
        }

        return () => es && es.close();
    }, []);

    // ── GSAP hero entrance ───────────────────────────────────────────────
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.hero-text',
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 1.5 }
            );
        }, contentRef);
        return () => ctx.revert();
    }, []);

    // ── GSAP floating emoji animation ────────────────────────────────────
    useEffect(() => {
        floatingEmojis.forEach(item => {
            const el = document.getElementById(`emoji-${item.id}`);
            if (el && !el.dataset.animated) {
                el.dataset.animated = 'true';
                gsap.to(el, {
                    y: -140,
                    x: item.x + (Math.random() * 40 - 20),
                    opacity: 0,
                    scale: 1.6,
                    duration: 1.4,
                    ease: 'power1.out',
                });
            }
        });
    }, [floatingEmojis]);

    const handleEmojiClick = useCallback((emoji) => {
        const currentCount = reactions[emoji] || 0;

        // Optimistic update
        setReactions(prev => ({ ...prev, [emoji]: prev[emoji] + 1 }));

        // Firebase persist
        incrementReaction(emoji, currentCount);

        // Floating emoji
        const id = Date.now();
        setFloatingEmojis(prev => [...prev, { id, emoji, x: Math.random() * 80 - 40 }]);
        setTimeout(() => {
            setFloatingEmojis(prev => prev.filter(item => item.id !== id));
        }, 2000);

        // Button pop feedback
        setClickedEmoji(emoji);
        setTimeout(() => setClickedEmoji(null), 300);
    }, [reactions]);

    return (
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4" ref={contentRef}>
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

                    {/* ── Reaction Bar ─────────────────────────────────── */}
                    <div className="flex items-center justify-center md:justify-start gap-2 bg-slate-800/30 px-4 py-2.5 rounded-full border border-slate-700/50 backdrop-blur-sm relative hero-text mb-12 md:mb-16 w-fit mx-auto md:mx-0">
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider hidden sm:block pr-1">Reaksi:</span>

                        {EMOJI_LIST.map((emoji) => (
                            <button
                                key={emoji}
                                onClick={() => handleEmojiClick(emoji)}
                                className={`relative group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all duration-150 
                                    hover:bg-slate-700/50 active:scale-90
                                    ${clickedEmoji === emoji ? 'scale-90 bg-slate-700/60' : 'scale-100'}`}
                                title={`Reaksi dengan ${emoji}`}
                            >
                                {/* emoji */}
                                <span className={`text-base transition-transform duration-150 ${clickedEmoji === emoji ? 'scale-125' : 'group-hover:scale-110'}`}>
                                    {emoji}
                                </span>

                                {/* animated counter */}
                                <AnimatedCount value={reactions[emoji] ?? 0} loaded={reactionsLoaded} />

                                {/* floating emoji burst */}
                                <div className="absolute bottom-full left-1/2 pointer-events-none pb-2">
                                    {floatingEmojis.filter(f => f.emoji === emoji).map(f => (
                                        <span
                                            key={f.id}
                                            id={`emoji-${f.id}`}
                                            className="absolute text-lg -translate-x-1/2 select-none"
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

                                    {/* Achievement Badges */}
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
            <div className="w-full overflow-hidden opacity-0 hero-text mt-12 md:mt-24 mb-4">
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
