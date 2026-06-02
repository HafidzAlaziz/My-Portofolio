import React, { useState, useEffect, useRef } from 'react';
import { Home, User, GraduationCap, Code2, FolderGit2, BarChart3, Gamepad2, Mail } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
    const { language, toggleLanguage, t } = useLanguage();
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
                // Adjust for fixed navbar height on desktop, less on mobile
                const isMobile = window.innerWidth < 1024;
                const navHeight = isMobile ? 20 : 80;
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: { y: targetEl, offsetY: navHeight },
                    ease: "power2.out"
                });
            }
        }
    };

    const navLinks = [
        { name: t('navbar.home'), href: '#home', id: 'home', icon: <Home size={18} /> },
        { name: t('navbar.about'), href: '#about', id: 'about', icon: <User size={18} /> },
        { name: t('navbar.education'), href: '#education', id: 'education', icon: <GraduationCap size={18} /> },
        { name: t('navbar.skills'), href: '#skills', id: 'skills', icon: <Code2 size={18} /> },
        { name: t('navbar.portfolio'), href: '#portofolio', id: 'portofolio', icon: <FolderGit2 size={18} /> },
        { name: t('navbar.githubStats'), href: '#github-stats', id: 'github-stats', icon: <BarChart3 size={18} /> },
        { name: t('navbar.miniGames'), href: '#minigames', id: 'minigames', icon: <Gamepad2 size={18} /> },
        { name: t('navbar.contact'), href: '#contact', id: 'contact', icon: <Mail size={18} /> },
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
        <>
            {/* Top Header */}
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl shadow-black/20' : 'bg-transparent py-3 lg:py-5'}`}>
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

                    {/* Mobile Top Controls (Logo left, Lang toggle right) */}
                    <div className="lg:hidden flex items-center">
                        {languageToggleButton}
                    </div>
                </div>
            </nav>

            {/* Floating Mobile Bottom Navigation Dock */}
            <div className="lg:hidden fixed bottom-4 left-3 right-3 z-50 flex justify-center pointer-events-none">
                <div className="w-full max-w-md bg-slate-900/95 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl px-1 py-1 shadow-black/50 flex items-center justify-between pointer-events-auto gap-0.5">
                    {navLinks.map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`flex flex-col items-center justify-center flex-1 h-10 rounded-xl transition-all duration-300 relative group ${
                                    isActive 
                                        ? 'text-cyan-400 bg-cyan-500/10 scale-105' 
                                        : 'text-slate-400 hover:text-cyan-400 hover:bg-slate-800/40 active:scale-95'
                                }`}
                                title={link.name}
                            >
                                <div className={`transition-transform duration-300 ${isActive ? 'translate-y-[-2px] filter drop-shadow-[0_0_8px_rgba(78,168,222,0.6)]' : 'group-hover:scale-110'}`}>
                                    {link.icon}
                                </div>
                                {/* Tiny Indicator Dot */}
                                {isActive && (
                                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                                )}
                            </a>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Navbar;
