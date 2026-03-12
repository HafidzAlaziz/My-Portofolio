import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Youtube, Instagram, Linkedin, Github, Send } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
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
        if (!formData.name) tempErrors.name = 'Nama harus diisi.';
        if (!formData.email) {
            tempErrors.email = 'Email harus diisi.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Masukkan email yang valid.';
        }
        if (!formData.subject) tempErrors.subject = 'Subjek harus diisi.';
        if (!formData.message) tempErrors.message = 'Pesan tidak boleh kosong.';
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
        { icon: <Mail className="text-cyan-400 w-5 h-5" />, label: 'Email', value: 'hafidzalaziz721@gmail.com', bg: 'group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30' },
        { icon: <Phone className="text-indigo-400 w-5 h-5" />, label: 'No Hp', value: '+62895613114028', bg: 'group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30' },
        { icon: <MapPin className="text-purple-400 w-5 h-5" />, label: 'Lokasi', value: 'Ciomas, Bogor, Jawa Barat', bg: 'group-hover:bg-purple-500/10 group-hover:border-purple-500/30' },
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
                        <span className="gradient-text section-heading">Kontak</span>
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="md:w-1/2 contact-info-wrapper">
                        <div className="card tilt-card p-6 md:p-8 rounded-2xl h-full border border-slate-700/50 contact-info-content">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-8 border-b border-slate-700 pb-4">Informasi Kontak</h3>
                            <div className="space-y-6">
                                {contactItems.map((item, i) => (
                                    <div key={i} className="contact-item-wrapper">
                                        <div className="flex items-center group contact-item-content">
                                            <div className={`w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mr-5 transition-all duration-300 ${item.bg}`}>
                                                {item.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                                                <p className="text-sm text-slate-200 font-medium">{item.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 pt-8 border-t border-slate-700">
                                <h4 className="text-base font-medium mb-5 text-slate-300">Ikuti Saya</h4>
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
                        <div className="card p-6 md:p-8 rounded-2xl h-full border border-slate-700/50 contact-form-content">
                            <h3 className="text-2xl font-semibold mb-8 text-white">Kirim Pesan</h3>
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center h-64 gap-4 animate-bounce-in">
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                                        <Send size={28} className="text-green-400" />
                                    </div>
                                    <p className="text-green-400 font-semibold text-lg">Pesan Terkirim! 🎉</p>
                                    <p className="text-slate-400 text-sm text-center">Terima kasih! Saya akan segera membalas.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                                    {[
                                        { id: 'name', label: 'Nama Kamu', type: 'text', placeholder: 'Masukan Nama Kamu' },
                                        { id: 'email', label: 'Email Kamu', type: 'email', placeholder: 'Masukan Email Kamu' },
                                        { id: 'subject', label: 'Subjek', type: 'text', placeholder: 'Masukan Subjek' },
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
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Pesan</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="4"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${errors.message ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'} text-white outline-none transition-all duration-300 resize-none focus:bg-slate-800 focus:shadow-[0_0_0_2px_rgba(34,211,238,0.15)]`}
                                            placeholder="Masukan Pesan"
                                        />
                                        {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-2 group pulse-glow"
                                    >
                                        <Send size={18} className="transition-transform group-hover:translate-x-1" />
                                        Kirim Pesan
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
