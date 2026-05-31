import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
    const { language, toggleLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const logoRef = useRef(null);

    useEffect(() => {
        // Logo entrance animation
        gsap.fromTo(logoRef.current,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.5 }
        );
        // Nav links entrance
        gsap.fromTo('.nav-link-anim',
            { opacity: 0, y: -15 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.7 }
        );
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Active section tracker
            const sections = ['home', 'about', 'education', 'skills', 'portofolio', 'github-stats', 'minigames', 'contact'];
            const current = sections.find(id => {
                const el = document.getElementById(id);
                if (!el) return false;
                const rect = el.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });
            if (current) setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                // Adjust for fixed navbar height
                const navHeight = 80;
                gsap.to(window, {
                    duration: 0.8, // Snappier duration
                    scrollTo: { y: targetEl, offsetY: navHeight },
                    ease: "power2.out" // Feels more responsive than power3.inOut
                });
            }
            setIsOpen(false);
        }
    };

    const navLinks = [
        { name: t('navbar.home'), href: '#home', id: 'home' },
        { name: t('navbar.about'), href: '#about', id: 'about' },
        { name: t('navbar.education'), href: '#education', id: 'education' },
        { name: t('navbar.skills'), href: '#skills', id: 'skills' },
        { name: t('navbar.portfolio'), href: '#portofolio', id: 'portofolio' },
        { name: t('navbar.githubStats'), href: '#github-stats', id: 'github-stats' },
        { name: t('navbar.miniGames'), href: '#minigames', id: 'minigames' },
        { name: t('navbar.contact'), href: '#contact', id: 'contact' },
    ];

    const languageToggleButton = (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 hover:bg-slate-700/80 hover:border-cyan-400/50 transition-all duration-300 shadow-md font-sans text-xs font-bold text-slate-300 cursor-pointer"
            title={language === 'en' ? 'Switch to Bahasa Indonesia' : 'Ubah ke Bahasa Inggris'}
        >
            <span className={language === 'en' ? 'text-cyan-400' : 'text-slate-500'}>EN</span>
            <span className="text-slate-600">|</span>
            <span className={language === 'id' ? 'text-cyan-400' : 'text-slate-500'}>ID</span>
        </button>
    );

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl shadow-black/20' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a 
                    href="#home" 
                    onClick={(e) => handleNavClick(e, '#home')}
                    className="text-2xl font-bold shimmer-text" 
                    ref={logoRef}
                >
                    Hafidz
                </a>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center space-x-8">
                    <div className="flex space-x-8 mr-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`nav-link nav-link-anim text-sm xl:text-base relative group transition-colors duration-300 ${activeSection === link.id ? 'text-cyan-400' : 'text-slate-300 hover:text-white'}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300 rounded-full ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                            </a>
                        ))}
                    </div>
                    {languageToggleButton}
                </div>

                {/* Mobile Toggle Container */}
                <div className="lg:hidden flex items-center gap-3">
                    {languageToggleButton}
                    <button
                        className="text-white focus:outline-none p-2 hover:bg-slate-800 rounded-lg transition-all duration-200 active:scale-90"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="transition-all duration-300">
                            {isOpen ? <X size={26} className="rotate-90 transition-transform duration-300" /> : <Menu size={26} />}
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <div className={`lg:hidden absolute w-full bg-slate-900/98 backdrop-blur-xl transition-all duration-400 ease-in-out overflow-hidden shadow-2xl border-b border-slate-800 ${isOpen ? 'max-h-[600px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                <div className="flex flex-col items-center px-6 gap-1">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`w-full text-center py-3 text-base font-medium rounded-xl transition-all duration-200 active:scale-95 ${activeSection === link.id ? 'text-cyan-400 bg-cyan-500/10' : 'text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80'}`}
                            style={{ transitionDelay: isOpen ? `${i * 40}ms` : '0ms' }}
                            onClick={(e) => handleNavClick(e, link.href)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
