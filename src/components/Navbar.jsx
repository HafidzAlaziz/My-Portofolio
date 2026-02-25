import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: '#home' },
        { name: 'Tentang Saya', href: '#about' },
        { name: 'Skill', href: '#skills' },
        { name: 'Portofolio', href: '#portofolio' },
        { name: 'GitHub Stats', href: '#github-stats' },
        { name: 'Mini Games', href: '#minigames' },
        { name: 'Kontak', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800 py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <a href="#" className="text-2xl font-bold gradient-text">Hafidz</a>

                {/* Desktop Nav */}
                <div className="hidden lg:flex space-x-8">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link text-slate-300 hover:text-white transition-colors relative group text-sm xl:text-base">
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-white focus:outline-none p-2 hover:bg-slate-800 rounded-lg transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <div className={`lg:hidden absolute w-full bg-slate-900/98 backdrop-blur-xl transition-all duration-300 ease-in-out overflow-hidden shadow-2xl ${isOpen ? 'max-h-[600px] py-8 border-b border-slate-700 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                <div className="flex flex-col items-center space-y-2 px-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-slate-300 hover:text-cyan-400 transition-all w-full text-center py-4 text-xl font-medium rounded-xl hover:bg-slate-800/80 active:scale-95"
                            onClick={() => setIsOpen(false)}
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
