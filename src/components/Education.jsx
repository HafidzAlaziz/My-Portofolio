import React, { useEffect, useRef } from 'react';
import { GraduationCap, Code, Calendar, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        let ctx;
        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                // Section Title Animation
                gsap.from(titleRef.current, {
                    scrollTrigger: {
                        trigger: titleRef.current,
                        start: 'top 85%',
                    },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    onComplete: () => titleRef.current?.classList.add('visible'),
                });

                // Timeline Line Animation (Draw down as user scrolls)
                gsap.fromTo(lineRef.current, 
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 60%',
                            end: 'bottom 70%',
                            scrub: 1.5,
                        }
                    }
                );

                // Left card slide in (SMK)
                gsap.from('.education-card-left', {
                    scrollTrigger: {
                        trigger: '.education-item-left',
                        start: 'top 80%',
                    },
                    x: -100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                });

                // Right card slide in (Kuliah)
                gsap.from('.education-card-right', {
                    scrollTrigger: {
                        trigger: '.education-item-right',
                        start: 'top 80%',
                    },
                    x: 100,
                    opacity: 0,
                    duration: 1,
                    ease: 'power3.out',
                });

                // Timeline point markers scale up (animate individually for robustness)
                document.querySelectorAll('.timeline-badge').forEach((badge) => {
                    gsap.from(badge, {
                        scrollTrigger: {
                            trigger: badge,
                            start: 'top 85%',
                            toggleActions: 'play none none none',
                        },
                        scale: 0,
                        opacity: 0,
                        duration: 0.6,
                        ease: 'back.out(1.7)',
                    });
                });

                ScrollTrigger.refresh();
            }, sectionRef);
        }, 100);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, []);

    const educationData = [
        {
            id: 'highschool',
            type: 'highschool',
            institution: 'SMKN 1 Ciomas',
            period: '2022 - 2025',
            level: 'Sekolah Menengah Kejuruan (SMK)',
            title: 'PPLG (Pengembangan Perangkat Lunak dan Gim)',
            status: 'Lulus',
            desc: 'Fondasi awal dalam dunia pemrograman, berfokus pada pengembangan website (web development) dan sistem Internet of Things (IoT).',
            highlights: [
                'Mempelajari pemrograman C++, JavaScript, HTML, CSS, PHP, serta framework React JS dan Laravel.',
                'Mengembangkan sistem berbasis IoT (Internet of Things) dan integrasi perangkat keras sederhana.',
                'Membangun berbagai proyek aplikasi web dinamis, responsif, dan fungsional.'
            ],
            icon: <GraduationCap size={24} className="text-purple-400 relative z-10" />,
            accentColor: 'from-indigo-500 to-purple-600',
            glowColor: 'group-hover:border-purple-500/50',
            badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
        },
        {
            id: 'college',
            type: 'college',
            institution: 'STMIK Tazkia',
            period: '2025 - Sekarang',
            level: 'Pendidikan Tinggi (Kuliah)',
            title: 'Sains dan Teknologi - Teknik Informatika',
            status: 'Semester 2',
            desc: 'Fokus pada fondasi dasar ilmu komputer, pengembangan logika pemrograman, arsitektur sistem, serta konsep administrasi dan infrastruktur modern.',
            highlights: [
                'Mempelajari Algoritma & Struktur Data untuk optimasi kode.',
                'Mempelajari konsep dasar Cloud Computing dan pengelolaan infrastruktur.',
                'Mempelajari sistem kerja, arsitektur, dan manajemen memori pada Sistem Operasi.',
                'Mengembangkan kemampuan problem solving melalui pemrograman terstruktur.'
            ],
            icon: <Code size={24} className="text-cyan-400 relative z-10" />,
            accentColor: 'from-cyan-400 to-indigo-500',
            glowColor: 'group-hover:border-cyan-500/50',
            badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
        }
    ];

    return (
        <section id="education" className="py-20 px-4 bg-slate-900/30 relative" ref={sectionRef}>
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-5xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-20" ref={titleRef}>
                    <span className="gradient-text section-heading">Perjalanan Pendidikan</span>
                </h2>

                <div className="relative">
                    {/* Center Line for Desktop, Left Line for Mobile */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800/80 -translate-x-1/2" />
                    <div 
                        ref={lineRef}
                        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-purple-600 -translate-x-1/2 origin-top" 
                    />

                    {/* Timeline Items */}
                    <div className="space-y-16">
                        {educationData.map((item) => {
                            const isCollege = item.type === 'college';
                            
                            return (
                                <div 
                                    key={item.id} 
                                    className={`flex flex-col md:flex-row relative items-start ${isCollege ? 'education-item-right md:flex-row-reverse' : 'education-item-left'} w-full`}
                                >
                                    {/* Timeline Badge (Circle containing the Icon) */}
                                    <div className="timeline-badge absolute left-4 md:left-1/2 top-2 md:top-6 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center z-20 shadow-lg shadow-black/50">
                                        <div className="absolute inset-0 rounded-full bg-slate-800 animate-ping opacity-20 scale-75 group-hover:scale-100" />
                                        {item.icon}
                                    </div>

                                    {/* Spacer/Empty half for Desktop */}
                                    <div className="hidden md:block w-1/2" />

                                    {/* Card Container */}
                                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isCollege ? 'md:pr-12' : 'md:pl-12'} education-card-${isCollege ? 'right' : 'left'}`}>
                                        <div className={`group card card-glow tilt-card p-6 md:p-8 rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-md transition-all duration-300 ${item.glowColor}`}>
                                            
                                            {/* Period & Status Badge */}
                                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                                <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                    <Calendar size={16} className="text-indigo-400" />
                                                    <span className="font-semibold">{item.period}</span>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${item.badgeBg}`}>
                                                    {item.status}
                                                </span>
                                            </div>

                                            {/* University/School details */}
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-indigo-300 transition-all duration-300">
                                                {item.institution}
                                            </h3>
                                            <div className="text-sm font-semibold text-indigo-400/90 mb-4">
                                                {item.level}
                                            </div>

                                            {/* Major */}
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 text-slate-200 border border-slate-700/30 text-sm mb-5 font-semibold">
                                                <BookOpen size={16} className="text-purple-400" />
                                                {item.title}
                                            </div>

                                            {/* Description */}
                                            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-5">
                                                {item.desc}
                                            </p>

                                            {/* Highlights */}
                                            <div className="border-t border-slate-800/80 pt-4">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Apa yang Dipelajari/Dicapai:</h4>
                                                <ul className="space-y-2">
                                                    {item.highlights.map((highlight, idx) => (
                                                        <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300 leading-relaxed">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400 mt-2 shrink-0" />
                                                            <span>{highlight}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
