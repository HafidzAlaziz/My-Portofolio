import React, { useEffect, useRef } from 'react';
import { MonitorPlay, PenTool, Cuboid, Zap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".about-card", {
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
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const services = [
        {
            title: "Frontend Development",
            desc: "Membangun antarmuka web yang responsif, interaktif, dan berperforma tinggi.",
            icon: <MonitorPlay size={40} className="text-cyan-400 mb-4" />
        },
        {
            title: "Backend Development",
            desc: "Mengembangkan logika sisi server, API, dan pengelolaan database yang aman.",
            icon: <Zap size={40} className="text-indigo-400 mb-4" />
        },
        {
            title: "UI/UX Design",
            desc: "Merancang pengalaman pengguna yang intuitif dengan estetika modern.",
            icon: <PenTool size={40} className="text-purple-400 mb-4" />
        },
        {
            title: "Fullstack Solutions",
            desc: "Memberikan solusi end-to-end dari perancangan hingga deployment.",
            icon: <Cuboid size={40} className="text-pink-400 mb-4" />
        }
    ];

    return (
        <section id="about" className="py-20 px-4" ref={sectionRef}>
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 about-card">
                    <span className="gradient-text">Tentang Saya</span>
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/2 about-card">
                        <div className="card p-5 sm:p-6 md:p-8 rounded-2xl">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-6">Siapa Saya?</h3>
                            <p className="text-slate-300 mb-4 leading-relaxed">
                                Saya seorang <strong className="text-cyan-400 font-bold">Fullstack Developer</strong> yang bersemangat dalam menciptakan solusi web komprehensif. Dengan keahlian mendalam di sisi Frontend maupun Backend, saya fokus pada pembangunan aplikasi yang tidak hanya cantik secara visual, tetapi juga kuat secara arsitektur.
                            </p>
                            <p className="text-slate-300 mb-4 leading-relaxed">
                                Perjalanan saya dalam pengembangan web dimulai 3 tahun yang lalu, dan sejak itu, saya telah mengerjakan banyak proyek mulai dari halaman arahan sederhana hingga aplikasi web kompleks.
                            </p>
                            <p className="text-slate-300 leading-relaxed">
                                Saya percaya pada pembelajaran berkelanjutan dan selalu mengikuti perkembangan teknologi dan tren desain terkini untuk memberikan solusi mutakhir.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {services.map((service, idx) => (
                                <div key={idx} className="card p-5 sm:p-6 rounded-2xl about-card border border-slate-700/30 hover:border-cyan-500/30 transition-colors">
                                    {service.icon}
                                    <h4 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h4>
                                    <p className="text-slate-400 text-xs sm:text-sm">{service.desc}</p>
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
