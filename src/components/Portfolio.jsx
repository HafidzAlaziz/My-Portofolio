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

    const [showAllCerts, setShowAllCerts] = useState(false);
    const displayedCerts = showAllCerts ? certificates : certificates.slice(0, 3);

    return (
        <section id="portofolio" className="py-20 px-4 bg-slate-900/50">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    <span className="gradient-text">Portofolio</span>
                </h2>

                {/* Tab Navigation */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`btn px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-lg flex items-center gap-2 shadow-lg transition-all ${activeTab === 'projects' ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                    >
                        <FolderGit2 size={24} /> Projects
                    </button>

                    <button
                        onClick={() => setActiveTab('certificates')}
                        className={`btn px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold text-lg flex items-center gap-2 shadow-lg transition-all ${activeTab === 'certificates' ? 'bg-gradient-to-r from-green-500 to-teal-400 text-white scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                    >
                        <Award size={24} /> Certificates
                    </button>
                </div>

                {/* Content Sections */}
                <div className="relative min-h-[500px]">

                    {/* Projects Section */}
                    {activeTab === 'projects' && (
                        <div className="content-section bg-slate-900/80 rounded-2xl shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-300">
                            <h2 className="text-3xl font-bold text-white mb-8 border-b border-blue-500 pb-4">My Projects</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {projects.map((project, idx) => (
                                    <div key={idx} className="card group bg-slate-800 rounded-xl overflow-hidden shadow-lg relative border border-slate-700 hover:border-blue-500/50 transition-colors">
                                        <div className="h-48 w-full bg-slate-900 overflow-hidden">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
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
