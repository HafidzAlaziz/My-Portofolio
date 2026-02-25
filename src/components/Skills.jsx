import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);

    const skills = [
        { name: 'Frontend (React, Tailwind, Vite)', percentage: 95 },
        { name: 'Backend (Laravel, PHP, Go)', percentage: 88 },
        { name: 'Database & API Management', percentage: 85 },
        { name: 'UI/UX Design (Figma, Canva)', percentage: 92 }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".skill-progress",
                { width: "0%" },
                {
                    width: (i, target) => target.dataset.width,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" className="py-20 px-4 bg-slate-900/50" ref={sectionRef}>
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    <span className="gradient-text">Skill Saya</span>
                </h2>
                <div className="card p-6 md:p-8 rounded-2xl">
                    <div className="space-y-8">
                        {skills.map((skill, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <span className="font-medium text-slate-200">{skill.name}</span>
                                    <span className="text-cyan-400 font-semibold">{skill.percentage}%</span>
                                </div>
                                <div className="skill-bar">
                                    <div
                                        className="skill-progress"
                                        data-width={`${skill.percentage}%`}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
