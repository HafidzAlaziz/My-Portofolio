import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Youtube, Instagram, Linkedin, Github, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const WhatsAppIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12.004 2c-5.51 0-9.99 4.49-9.99 10 0 1.76.46 3.47 1.33 4.97L2 22l5.23-1.37c1.44.79 3.06 1.2 4.74 1.2 5.51 0 9.99-4.49 9.99-10S17.514 2 12.004 2zm5.2 13.92c-.22.63-1.28 1.21-1.77 1.26-.49.05-.98.24-3.13-.6-2.73-1.07-4.47-3.83-4.61-4.01-.14-.19-1.12-1.48-1.12-2.83 0-1.35.7-2.01.95-2.28.25-.26.54-.33.72-.33h.52c.16 0 .37-.06.57.42.2.49.69 1.68.75 1.8.06.12.1.26.02.43-.08.17-.12.27-.24.41-.12.14-.26.31-.37.42-.12.12-.25.25-.11.49.14.24.63 1.03 1.35 1.67.92.82 1.7 1.07 1.94 1.19.24.12.38.1.52-.06.14-.17.62-.72.79-.97.17-.25.34-.21.57-.12.23.09 1.48.7 1.73.82.25.12.42.18.48.29.06.11.06.64-.16 1.27z" />
    </svg>
);

const TelegramIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M11.944 0C5.356 0 0 5.356 0 11.944c0 6.588 5.356 11.944 11.944 11.944 6.588 0 11.944-5.356 11.944-11.944C23.888 5.356 18.532 0 11.944 0zm5.669 8.216l-1.925 9.07c-.143.639-.522.797-1.059.497l-2.93-2.16-1.414 1.36c-.156.156-.288.288-.588.288l.21-2.98 5.43-4.9c.235-.211-.051-.328-.367-.118l-6.72 4.23-2.89-.9c-.628-.196-.64-.628.131-.93l11.29-4.36c.523-.19.98.12.822.893z" />
    </svg>
);

const DiscordIcon = ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
    </svg>
);

const Contact = () => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        let ctx;
        const timer = setTimeout(() => {
            ctx = gsap.context(() => {
                // Heading
                gsap.from('.contact-heading-wrapper', {
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
                    y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
                    onComplete: () => document.querySelector('.contact-heading')?.classList.add('visible'),
                });

                // Info card slides from left
                gsap.from('.contact-info-wrapper', {
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                    x: -60, opacity: 0, duration: 0.9, ease: 'power3.out',
                });

                // Form slides from right
                gsap.from('.contact-form-wrapper', {
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                    x: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
                });

                // Contact items stagger
                gsap.from('.contact-item-wrapper', {
                    scrollTrigger: { trigger: '.contact-info-wrapper', start: 'top 80%' },
                    x: -30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
                });

                // Social icons bounce
                gsap.from('.social-icon-wrapper', {
                    scrollTrigger: { trigger: '.social-icons-row', start: 'top 90%' },
                    scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(2)',
                });

                ScrollTrigger.refresh();
            }, sectionRef);
        }, 100);

        return () => {
            clearTimeout(timer);
            if (ctx) ctx.revert();
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name) tempErrors.name = t('contact.errName');
        if (!formData.email) {
            tempErrors.email = t('contact.errEmailRequired');
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = t('contact.errEmailInvalid');
        }
        if (!formData.subject) tempErrors.subject = t('contact.errSubject');
        if (!formData.message) tempErrors.message = t('contact.errMessage');
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
    };

    const contactItems = [
        { 
            icon: <Mail className="text-cyan-400 w-5 h-5" />, 
            label: t('contact.labels.email'), 
            value: 'hafidzalaziz721@gmail.com', 
            href: 'mailto:hafidzalaziz721@gmail.com',
            bg: 'group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30' 
        },
        { 
            icon: <WhatsAppIcon className="text-emerald-400 w-5 h-5" />, 
            label: t('contact.labels.whatsapp'), 
            value: '+62 895-6131-14028', 
            href: 'https://wa.me/62895613114028?text=Halo%20Hafidz,%20saya%20tertarik%20dengan%20portofolio%20Anda.',
            bg: 'group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30' 
        },
        { 
            icon: <TelegramIcon className="text-sky-400 w-5 h-5" />, 
            label: t('contact.labels.telegram'), 
            value: '@hafidz_alaziz', 
            href: 'https://t.me/hafidz_alaziz',
            bg: 'group-hover:bg-sky-500/10 group-hover:border-sky-500/30' 
        },
        { 
            icon: <DiscordIcon className="text-indigo-400 w-5 h-5" />, 
            label: t('contact.labels.discord'), 
            value: 'hafidz_alaziz', 
            href: 'https://discord.com/users/hafidz_alaziz',
            bg: 'group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30' 
        },
        { 
            icon: <MapPin className="text-purple-400 w-5 h-5" />, 
            label: t('contact.labels.location'), 
            value: t('contact.locationVal'), 
            href: 'https://maps.google.com/?q=Ciomas,Bogor,Jawa+Barat',
            bg: 'group-hover:bg-purple-500/10 group-hover:border-purple-500/30' 
        },
    ];

    const socials = [
        { icon: <Youtube size={18} />, href: 'https://youtube.com/@fidz47', hoverColor: 'hover:text-red-500 hover:border-red-500/40 hover:bg-red-500/10' },
        { icon: <Instagram size={18} />, href: 'https://www.instagram.com/hfidz_alaziz', hoverColor: 'hover:text-pink-500 hover:border-pink-500/40 hover:bg-pink-500/10' },
        { icon: <Linkedin size={18} />, href: 'https://id.linkedin.com/in/hafidz-alaziz-9a044b362', hoverColor: 'hover:text-blue-500 hover:border-blue-500/40 hover:bg-blue-500/10' },
        { icon: <Github size={18} />, href: 'https://github.com/HafidzAlaziz', hoverColor: 'hover:text-white hover:border-white/30 hover:bg-white/5' },
    ];

    return (
        <section id="contact" className="py-20 px-4" ref={sectionRef}>
            <div className="container mx-auto">
                <div className="contact-heading-wrapper">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 contact-heading">
                        <span className="gradient-text section-heading">{t('contact.title')}</span>
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="md:w-1/2 contact-info-wrapper">
                        <div className="card tilt-card p-5 md:p-8 rounded-2xl h-full border border-slate-700/50 contact-info-content">
                            <h3 className="text-lg sm:text-2xl font-semibold mb-2 border-b border-slate-700 pb-4">{t('contact.cardTitle')}</h3>
                            <p className="text-xs text-slate-400 mb-6 italic">{t('contact.helperText')}</p>
                            <div className="space-y-6">
                                {contactItems.map((item, i) => (
                                    <div key={i} className="contact-item-wrapper">
                                        <a 
                                            href={item.href} 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            className="block focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-xl"
                                        >
                                            <div className="flex items-center group contact-item-content cursor-pointer">
                                                <div className={`w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mr-5 transition-all duration-300 ${item.bg}`}>
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                                                    <p className="text-sm text-slate-200 font-medium transition-colors group-hover:text-cyan-400">{item.value}</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-700">
                                <h4 className="text-base font-medium mb-5 text-slate-300">{t('contact.followMe')}</h4>
                                <div className="flex space-x-3 social-icons-row">
                                    {socials.map((s, i) => (
                                        <div key={i} className="social-icon-wrapper">
                                            <a
                                                href={s.href}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={`social-icon-content w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center transition-all duration-300 text-slate-300 hover:-translate-y-2 hover:shadow-lg ${s.hoverColor}`}
                                            >
                                                {s.icon}
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:w-1/2 contact-form-wrapper">
                        <div className="card p-5 md:p-8 rounded-2xl h-full border border-slate-700/50 contact-form-content">
                            <h3 className="text-lg sm:text-2xl font-semibold mb-6 md:mb-8 text-white">{t('contact.formTitle')}</h3>
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center h-64 gap-4 animate-bounce-in">
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                                        <Send size={28} className="text-green-400" />
                                    </div>
                                    <p className="text-green-400 font-semibold text-lg">{t('contact.successMessage')}</p>
                                    <p className="text-slate-400 text-sm text-center">{t('contact.successSub')}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                    {[
                                        { id: 'name', label: t('contact.fieldName'), type: 'text', placeholder: t('contact.placeholderName') },
                                        { id: 'email', label: t('contact.fieldEmail'), type: 'email', placeholder: t('contact.placeholderEmail') },
                                        { id: 'subject', label: t('contact.fieldSubject'), type: 'text', placeholder: t('contact.placeholderSubject') },
                                    ].map(field => (
                                        <div key={field.id}>
                                            <label htmlFor={field.id} className="block text-sm font-medium text-slate-400 mb-2">{field.label}</label>
                                            <input
                                                type={field.type}
                                                id={field.id}
                                                name={field.id}
                                                value={formData[field.id]}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${errors[field.id] ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'} text-white outline-none transition-all duration-300 focus:bg-slate-800 focus:shadow-[0_0_0_2px_rgba(34,211,238,0.15)]`}
                                                placeholder={field.placeholder}
                                            />
                                            {errors[field.id] && <p className="text-red-400 text-xs mt-1.5">{errors[field.id]}</p>}
                                        </div>
                                    ))}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">{t('contact.fieldMessage')}</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${errors.message ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'} text-white outline-none transition-all duration-300 resize-none focus:bg-slate-800 focus:shadow-[0_0_0_2px_rgba(34,211,238,0.15)]`}
                                            placeholder={t('contact.placeholderMessage')}
                                        />
                                        {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2 group pulse-glow"
                                    >
                                        <Send size={18} className="transition-transform group-hover:translate-x-1" />
                                        {t('contact.btnSend')}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
