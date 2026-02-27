import React, { useState } from 'react';
import { FolderGit2, Award } from 'lucide-react';

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('projects');

    const projects = [
        {
            title: "SI-TENB",
            desc: "Aplikasi Website Pengaduan",
            image: "/assets/projek1.jpg",
            tags: ["React", "Laravel", "Tailwind"],
            link: null,
            locked: true
        },
        {
            title: "Vayana",
            desc: "High-performance modern web application built with TypeScript.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "Next.js", "Tailwind"],
            link: "https://vayana-hazel.vercel.app",
            locked: false
        },
        {
            title: "Handara Bali",
            desc: "Luxury resort landing page featuring Bali's iconic Handara gate.",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400",
            tags: ["React", "GSAP", "Tailwind"],
            link: "https://handara-bali.vercel.app",
            locked: false
        },
        {
            title: "Kopi Senja",
            desc: "Elegant coffee shop landing page with a warm, sunset aesthetic.",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400",
            tags: ["React", "Tailwind", "Framer Motion"],
            link: "https://kopi-senja-ten.vercel.app",
            locked: false
        },
        {
            title: "PulseBoard Agency",
            desc: "Dynamic agency management dashboard with real-time analytics.",
            image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Chart.js"],
            link: "https://pulse-board-agency.vercel.app",
            locked: false
        },
        {
            title: "Chatbot AI",
            desc: "Smart conversational agent powered by advanced language models.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400",
            tags: ["JavaScript", "OpenAI API", "CSS"],
            link: "https://chatbot-dusky-eta-13.vercel.app",
            locked: false
        },
        {
            title: "Neural Automation",
            desc: "Workflow automation platform integrating AI the core logic.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://neural-automation-platform.vercel.app",
            locked: false
        },
        {
            title: "Company Profile",
            desc: "Professional corporate presence with modern design patterns.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://company-profile-xi-indol.vercel.app",
            locked: false
        },
        {
            title: "Dashboard Sample",
            desc: "Clean and minimalist data visualization interface.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://dashboard-sample-red.vercel.app",
            locked: false
        },
        {
            title: "EduSmart Academy",
            desc: "Online learning platform management system.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://edu-smart-academy.vercel.app",
            locked: false
        },
        {
            title: "UMKM Ivory",
            desc: "Marketplace and management for Small and Medium Enterprises.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://umkm-ivory.vercel.app",
            locked: false
        },
        {
            title: "The Wedding",
            desc: "Digital invitation and guest management system.",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://the-wedding-wheat.vercel.app",
            locked: false
        },
        {
            title: "Waseas",
            desc: "Modern SaaS landing page template.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://waseas.vercel.app",
            locked: false
        },
        {
            title: "WebKu",
            desc: "Personal portfolio and blog platform.",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400",
            tags: ["JavaScript", "React", "Tailwind"],
            link: "https://web-ku-theta.vercel.app",
            locked: false
        },
        {
            title: "Global Preyest Times",
            desc: "Website untuk Mencari Jadwal Sholat Internasional",
            image: "/assets/projek2.png",
            tags: ["Aladhan API", "Tailwind", "Nominatim API"],
            link: "https://global-prayes-times.netlify.app",
            locked: false
        },
        {
            title: "Ecommerce Sederhana",
            desc: "Sebuah website ecommerce sederhana",
            image: "/assets/projek3.png",
            tags: ["Javascript", "Tailwind"],
            link: "https://ecomerce0.netlify.app/",
            locked: false
        }
    ];

    const certificates = [
        { title: "Memulai Dasar Pemrograman", issuer: "Dicoding-Indonesia", date: "24 Agustus 2023", image: "/assets/sertifikat1.png" },
        { title: "Belajar Visualisasi Data", issuer: "Dicoding-Indonesia", date: "18 September 2023", image: "/assets/sertifikat2.png" },
        { title: "Flexible Kickstart UI UX Design Journey", issuer: "Rakamin Academy", date: "Juli 2024", image: "/assets/sertifikat3.png" },
        { title: "Excellent Grade | Kickstart UI UX", issuer: "Rakamin Academy", date: "Juli 2024", image: "/assets/sertifikat4.png" },
        { title: "Pengimbasan Master Trainer 2024", issuer: "Google - REFO", date: "Oktober 2024", image: "/assets/sertifikat5.png" },
        { title: "Online Course UI/UX For Beginers", issuer: "Great Learning", date: "Juli 2024", image: "/assets/sertifikat6.png" },
        { title: "Pengenalan Logika Pemrograman", issuer: "Dicoding-Indonesia", date: "30 Agustus 2023", image: "/assets/sertifikat7.png" },
        { title: "Seminar Literasi Digital", issuer: "Kominfo", date: "20 Februari 2024", image: "/assets/sertifikat8.png" }
    ];

    const [showAllProjects, setShowAllProjects] = useState(false);
    const displayedProjects = showAllProjects ? projects : projects.slice(0, 3);

    const [showAllCerts, setShowAllCerts] = useState(false);
    const displayedCerts = showAllCerts ? certificates : certificates.slice(0, 3);

    return (
        <section id="portofolio" className="py-20 px-4 bg-slate-900/50">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    <span className="gradient-text">Portofolio</span>
                </h2>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`btn px-5 py-2.5 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg flex items-center gap-2 shadow-lg transition-all ${activeTab === 'projects' ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                    >
                        <FolderGit2 size={20} className="md:w-6 md:h-6" /> Projects
                    </button>

                    <button
                        onClick={() => setActiveTab('certificates')}
                        className={`btn px-5 py-2.5 md:px-8 md:py-4 rounded-xl font-semibold text-base md:text-lg flex items-center gap-2 shadow-lg transition-all ${activeTab === 'certificates' ? 'bg-gradient-to-r from-green-500 to-teal-400 text-white scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                    >
                        <Award size={20} className="md:w-6 md:h-6" /> Certificates
                    </button>
                </div>

                {/* Content Sections */}
                <div className="relative min-h-[500px]">

                    {/* Projects Section */}
                    {activeTab === 'projects' && (
                        <div className="content-section bg-slate-900/80 rounded-2xl shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-300">
                            <h2 className="text-3xl font-bold text-white mb-8 border-b border-blue-500 pb-4">My Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {displayedProjects.map((project, idx) => (
                                    <div key={idx} className="card group bg-slate-800 rounded-xl overflow-hidden shadow-lg relative border border-slate-700 hover:border-blue-500/50 transition-colors">
                                        <div className="h-48 w-full bg-slate-900 overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                            <p className="text-slate-400 mb-6 text-sm h-10">{project.desc}</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag, i) => (
                                                    <span key={i} className="bg-slate-700/50 border border-slate-600 text-xs text-slate-300 px-3 py-1 rounded-full">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            {project.locked ? (
                                                <button className="bg-red-500/20 text-red-400 border border-red-500/50 px-6 py-2 rounded-lg font-semibold backdrop-blur-sm cursor-not-allowed">
                                                    Tidak Dapat Mengakses
                                                </button>
                                            ) : (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30">
                                                    Kunjungi Aplikasi
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-10">
                                <button
                                    onClick={() => setShowAllProjects(!showAllProjects)}
                                    className="bg-slate-800 border border-slate-600 hover:border-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all hover:bg-slate-700"
                                >
                                    {showAllProjects ? 'Sembunyikan' : 'Lihat Semua Projek'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Certificates Section */}
                    {activeTab === 'certificates' && (
                        <div className="content-section bg-slate-900/80 rounded-2xl shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-300">
                            <h2 className="text-3xl font-bold text-white mb-8 border-b border-green-500 pb-4">My Certificates</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {displayedCerts.map((cert, idx) => (
                                    <div key={idx} className="card group bg-slate-800 rounded-xl overflow-hidden shadow-lg relative border border-slate-700 hover:border-green-500/50 transition-colors">
                                        <div className="h-48 w-full bg-slate-900 overflow-hidden">
                                            <img src={cert.image} alt={cert.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold text-white mb-2 truncate" title={cert.title}>{cert.title}</h3>
                                            <p className="text-slate-400 text-sm mb-1">{cert.issuer}</p>
                                            <p className="text-slate-500 text-xs">{cert.date}</p>
                                        </div>
                                        <div className="absolute inset-0 bg-slate-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button
                                                onClick={() => window.open(cert.image, '_blank')}
                                                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-500 transition-colors shadow-lg shadow-green-500/30"
                                            >
                                                Lihat Sertifikat
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-10">
                                <button
                                    onClick={() => setShowAllCerts(!showAllCerts)}
                                    className="bg-slate-800 border border-slate-600 hover:border-green-500 text-white px-8 py-3 rounded-full font-semibold transition-all hover:bg-slate-700"
                                >
                                    {showAllCerts ? 'Sembunyikan' : 'Lihat Semua Sertifikat'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
