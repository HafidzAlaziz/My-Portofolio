import React, { useEffect, useRef } from 'react';
import { MonitorPlay, PenTool, Cuboid, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
        let ctx;
        // Gunakan timeout kecil untuk memastikan DOM dirender sebelum kalkulasi posisi ScrollTrigger
        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                // Heading reveal + underline
                gsap.from(headingRef.current, {
                    scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    onComplete: () => headingRef.current?.classList.add('visible'),
                });

                // Left text card slides in from left
                gsap.from('.about-text-wrapper', {
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                    x: -60,
                    opacity: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                });

                // Service cards stagger from bottom
                gsap.from('.about-card-wrapper', {
                    scrollTrigger: { trigger: '.about-cards-grid', start: 'top 85%' },
                    y: 50,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'back.out(1.4)',
                });

                // Icon micro-animation on each card hover (GSAP)
                document.querySelectorAll('.about-card-content').forEach(card => {
                    const icon = card.querySelector('.card-icon');
                    if (icon) {
                        card.addEventListener('mouseenter', () => gsap.to(icon, { rotate: 8, scale: 1.2, duration: 0.3, ease: 'back.out(2)' }));
                        card.addEventListener('mouseleave', () => gsap.to(icon, { rotate: 0, scale: 1, duration: 0.3, ease: 'power2.out' }));
                    }
                });
                
                // Segarkan perhitungan posisi ScrollTrigger
                ScrollTrigger.refresh();

            }, sectionRef);
        }, 100);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, []);

    const services = [
        {
            title: 'Frontend Development',
            desc: 'Membangun antarmuka web yang responsif, interaktif, dan berperforma tinggi.',
            icon: <MonitorPlay size={36} className="text-cyan-400 mb-4 card-icon" />,
            border: 'hover:border-cyan-500/40',
            glow: 'group-hover:text-cyan-300',
        },
        {
            title: 'Backend Development',
            desc: 'Mengembangkan logika sisi server, API, dan pengelolaan database yang aman.',
            icon: <Zap size={36} className="text-indigo-400 mb-4 card-icon" />,
            border: 'hover:border-indigo-500/40',
            glow: 'group-hover:text-indigo-300',
        },
        {
            title: 'UI/UX Design',
            desc: 'Merancang pengalaman pengguna yang intuitif dengan estetika modern.',
            icon: <PenTool size={36} className="text-purple-400 mb-4 card-icon" />,
            border: 'hover:border-purple-500/40',
            glow: 'group-hover:text-purple-300',
        },
        {
            title: 'Fullstack Solutions',
            desc: 'Memberikan solusi end-to-end dari perancangan hingga deployment.',
            icon: <Cuboid size={36} className="text-pink-400 mb-4 card-icon" />,
            border: 'hover:border-pink-500/40',
            glow: 'group-hover:text-pink-300',
        }
    ];

    return (
        <section id="about" className="py-20 px-4" ref={sectionRef}>
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" ref={headingRef}>
                    <span className="gradient-text section-heading">Tentang Saya</span>
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Text */}
                    <div className="md:w-1/2 about-text-wrapper w-full">
                        <div className="card tilt-card p-5 sm:p-8 rounded-2xl about-text-content text-center md:text-left">
                            <h3 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6">Siapa Saya?</h3>
                            <p className="text-slate-300 mb-4 leading-relaxed text-sm sm:text-base">
                                Saya seorang <strong className="text-cyan-400 font-bold">Fullstack Developer</strong> yang bersemangat dalam menciptakan solusi web komprehensif. Dengan keahlian mendalam di sisi Frontend maupun Backend, saya fokus pada pembangunan aplikasi yang tidak hanya cantik secara visual, tetapi juga kuat secara arsitektur.
                            </p>
                            <p className="text-slate-300 mb-4 leading-relaxed text-sm sm:text-base">
                                Perjalanan saya dalam pengembangan web dimulai 3 tahun yang lalu, dan sejak itu, saya telah mengerjakan banyak proyek mulai dari halaman arahan sederhana hingga aplikasi web kompleks.
                            </p>
                            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                                Saya percaya pada pembelajaran berkelanjutan dan selalu mengikuti perkembangan teknologi dan tren desain terkini untuk memberikan solusi mutakhir.
                            </p>
                        </div>
                    </div>

                    {/* Service Cards */}
                    <div className="md:w-1/2 about-cards-grid">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {services.map((service, idx) => (
                                <div key={idx} className="about-card-wrapper">
                                    <div
                                        className={`group card card-glow p-5 sm:p-6 rounded-2xl about-card-content border border-slate-700/30 ${service.border} transition-all duration-300 cursor-default`}
                                    >
                                        {service.icon}
                                        <h4 className={`text-lg sm:text-xl font-semibold mb-2 transition-colors ${service.glow}`}>{service.title}</h4>
                                        <p className="text-slate-400 text-xs sm:text-sm">{service.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
