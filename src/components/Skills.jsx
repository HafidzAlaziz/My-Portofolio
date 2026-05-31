import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);

    const skills = [
        { name: t('skills.categories.frontend'), percentage: 95, color: 'from-cyan-400 to-blue-500' },
        { name: t('skills.categories.backend'), percentage: 88, color: 'from-indigo-400 to-purple-500' },
        { name: t('skills.categories.database'), percentage: 85, color: 'from-purple-400 to-pink-500' },
        { name: t('skills.categories.uiux'), percentage: 92, color: 'from-pink-400 to-orange-400' }
    ];

    useEffect(() => {
        let ctx;
        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                // Heading
                gsap.from('.skills-heading-wrapper', {
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
                    y: 30,
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    onComplete: () => document.querySelector('.skills-heading')?.classList.add('visible'),
                });

                // Card slide up
                gsap.from('.skills-card-wrapper', {
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                });

                // Skill bars animate
                const bars = document.querySelectorAll('.skill-progress');
                bars.forEach((bar) => {
                    const targetWidth = bar.dataset.width;
                    gsap.fromTo(bar,
                        { width: '0%', opacity: 0.5 },
                        {
                            width: targetWidth,
                            opacity: 1,
                            duration: 1.6,
                            ease: 'power3.out',
                            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                        }
                    );
                });

                // Percentage counter tween
                document.querySelectorAll('.skill-percent').forEach((el) => {
                    const target = parseInt(el.dataset.value, 10);
                    const obj = { val: 0 };
                    gsap.to(obj, {
                        val: target,
                        duration: 1.6,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                        onUpdate: () => { el.textContent = Math.round(obj.val) + '%'; }
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

    return (
        <section id="skills" className="py-20 px-4 bg-slate-900/50" ref={sectionRef}>
            <div className="container mx-auto max-w-4xl">
                <div className="skills-heading-wrapper">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 skills-heading">
                        <span className="gradient-text section-heading">{t('skills.title')}</span>
                    </h2>
                </div>
                
                <div className="skills-card-wrapper">
                    <div className="card tilt-card skills-card p-6 md:p-10 rounded-2xl">
                        <div className="space-y-8">
                            {skills.map((skill, index) => (
                                <div key={index} className="group">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{skill.name}</span>
                                        <span
                                            className="skill-percent font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400"
                                            data-value={skill.percentage}
                                        >
                                            0%
                                        </span>
                                    </div>
                                    <div className="skill-bar relative">
                                        <div
                                            className={`skill-progress bg-gradient-to-r ${skill.color} relative`}
                                            data-width={`${skill.percentage}%`}
                                        >
                                            {/* Shimmer overlay */}
                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_linear_infinite] bg-[length:200%_100%]" />
                                        </div>
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

export default Skills;
