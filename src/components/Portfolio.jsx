import React, { useState, useEffect } from 'react';
import { FolderGit2, Award, Smartphone, Globe, Star, Download, X, Info, ChevronRight, Share2 } from 'lucide-react';

import { FIREBASE_DB_URL } from '../firebaseConfig';

const DB_BASE = FIREBASE_DB_URL?.replace(/\/$/, '');
const DOWNLOADS_PATH = `${DB_BASE}/app_downloads.json`;

async function fetchDownloads() {
    try {
        const res = await fetch(DOWNLOADS_PATH);
        if (!res.ok) return {};
        const data = await res.json();
        return data || {};
    } catch {
        return {};
    }
}

async function incrementDownloadFirebase(appTitle, currentCount) {
    try {
        await fetch(DOWNLOADS_PATH, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [appTitle]: (currentCount || 0) + 1 }),
        });
    } catch (err) {
        console.error('Firebase update failed:', err);
    }
}

const Portfolio = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [activeSubTab, setActiveSubTab] = useState('web');
    const [selectedApp, setSelectedApp] = useState(null);
    const [activeRoleTab, setActiveRoleTab] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalScrolled, setIsModalScrolled] = useState(false);

    const handleModalScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        if (scrollTop > 150) {
            if (!isModalScrolled) setIsModalScrolled(true);
        } else if (scrollTop < 40) {
            if (isModalScrolled) setIsModalScrolled(false);
        }
    };

    const projects = [
        {
            title: "SI-TENB",
            desc: "Aplikasi Website Pengaduan",
            image: "/assets/projek1.jpg",
            tags: ["React", "Laravel", "Tailwind"],
            link: null,
            locked: true,
            category: "web"
        },
        {
            title: "Vayana",
            desc: "High-performance modern web application built with TypeScript.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "Next.js", "Tailwind"],
            link: "https://vayana-hazel.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "Handara Bali",
            desc: "Luxury resort landing page featuring Bali's iconic Handara gate.",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=400",
            tags: ["React", "GSAP", "Tailwind"],
            link: "https://handara-bali.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "Kopi Senja",
            desc: "Elegant coffee shop landing page with a warm, sunset aesthetic.",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400",
            tags: ["React", "Tailwind", "Framer Motion"],
            link: "https://kopi-senja-ten.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "PulseBoard Agency",
            desc: "Dynamic agency management dashboard with real-time analytics.",
            image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Chart.js"],
            link: "https://pulse-board-agency.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "Chatbot AI",
            desc: "Smart conversational agent powered by advanced language models.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=400",
            tags: ["JavaScript", "OpenAI API", "CSS"],
            link: "https://chatbot-dusky-eta-13.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "Neural Automation",
            desc: "Workflow automation platform integrating AI the core logic.",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://neural-automation-platform.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "Company Profile",
            desc: "Professional corporate presence with modern design patterns.",
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://company-profile-xi-indol.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "Dashboard Sample",
            desc: "Clean and minimalist data visualization interface.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://dashboard-sample-red.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "EduSmart Academy",
            desc: "Online learning platform management system.",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://edu-smart-academy.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "UMKM Ivory",
            desc: "Marketplace and management for Small and Medium Enterprises.",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://umkm-ivory.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "The Wedding",
            desc: "Digital invitation and guest management system.",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://the-wedding-wheat.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "Waseas",
            desc: "Modern SaaS landing page template.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
            tags: ["TypeScript", "React", "Tailwind"],
            link: "https://waseas.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "WebKu",
            desc: "Personal portfolio and blog platform.",
            image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400",
            tags: ["JavaScript", "React", "Tailwind"],
            link: "https://web-ku-theta.vercel.app",
            locked: false,
            category: "web"
        },
        {
            title: "Global Preyest Times",
            desc: "Website untuk Mencari Jadwal Sholat Internasional",
            image: "/assets/projek2.png",
            tags: ["Aladhan API", "Tailwind", "Nominatim API"],
            link: "https://global-prayes-times.netlify.app",
            locked: false,
            category: "web"
        },
        {
            title: "Ecommerce Sederhana",
            desc: "Sebuah website ecommerce sederhana",
            image: "/assets/projek3.png",
            tags: ["Javascript", "Tailwind"],
            link: "https://ecomerce0.netlify.app/",
            locked: false,
            category: "web"
        },
        {
            title: "E-Learning App",
            desc: "Sistem Manajemen Akademik & Absensi Pintar terintegrasi yang dirancang untuk memodernisasi proses belajar mengajar dengan fitur presensi digital dan manajemen kursus.",
            image: "/Preview/E-Learning/app_logo.png",
            tags: ["Flutter", "Firebase", "QR Scanner"],
            link: "https://drive.google.com/uc?export=download&id=1kRho6VvMq0DoK1yLaDh0ki1OfzvEG7rd",
            locked: false,
            category: "mobile",
            size: "70.4 MB",
            rating: 4.8,
            longDesc: "Aplikasi E-Learning komprehensif yang membagi peran menjadi Mahasiswa, Dosen, dan Admin. Mendukung aktivitas akademik mulai dari KRS digital, absensi via QR Code yang dinamis, hingga manajemen nilai dan penugasan secara real-time.",
            roles: [
                {
                    name: "Mahasiswa",
                    desc: "Mahasiswa dapat melakukan Login Google, mengisi KRS secara digital, melakukan presensi instan dengan QR Scanner, memantau riwayat nilai semester, dan melihat jadwal kuliah harian.",
                    screenshots: [
                        "/Preview/E-Learning/Siswa/image.png",
                        "/Preview/E-Learning/Siswa/image copy.png",
                        "/Preview/E-Learning/Siswa/image copy 2.png",
                        "/Preview/E-Learning/Siswa/image copy 3.png"
                    ]
                },
                {
                    name: "Dosen",
                    desc: "Dosen memiliki kontrol penuh atas manajemen kelas, pembuatan kode QR absensi untuk setiap sesi, pemberian tugas, serta penginputan nilai mahasiswa secara langsung.",
                    screenshots: [
                        "/Preview/E-Learning/Guru/image.png",
                        "/Preview/E-Learning/Guru/image copy.png",
                        "/Preview/E-Learning/Guru/image copy 2.png",
                        "/Preview/E-Learning/Guru/image copy 3.png",
                        "/Preview/E-Learning/Guru/image copy 4.png"
                    ]
                },
                {
                    name: "Admin",
                    desc: "Administrator mengelola ekosistem akademik secara luas, mulai dari manajemen User (Dosen/Mahasiswa), pengaturan Mata Kuliah, Jurusan, hingga penugasan pengajar.",
                    screenshots: [
                        "/Preview/E-Learning/Admin/image.png",
                        "/Preview/E-Learning/Admin/image copy.png",
                        "/Preview/E-Learning/Admin/image copy 2.png",
                        "/Preview/E-Learning/Admin/image copy 3.png"
                    ]
                }
            ]
        },
        {
            title: "FinFlow",
            desc: "Aplikasi keuangan cerdas yang menggabungkan kecerdasan buatan dan elemen gamifikasi untuk membantu Anda mencapai kebebasan finansial dengan cara yang menyenangkan.",
            image: "/Preview/FinFlow/logo.png",
            tags: ["Flutter", "Gemini AI", "SQLite"],
            link: "https://drive.google.com/uc?export=download&id=1xEKbh54Ux8opmoD15axKGz94l3YXNQ65",
            locked: false,
            category: "mobile",
            size: "54.6 MB",
            rating: 4.9,
            longDesc: "FinFlow merevolusi cara Anda mencatat keuangan dengan integrasi Google Gemini AI untuk scan struk otomatis. Dilengkapi fitur Gamifikasi seperti Quests dan Badges untuk membangun kebiasaan menabung yang positif.",
            roles: [
                {
                    name: "User",
                    desc: "Nikmati pengalaman pengelolaan keuangan yang cerdas dengan AI Receipt Scanner untuk pencatatan otomatis, asisten keuangan AI, serta fitur gamifikasi (Quests & Badges) yang seru. Pantau progres finansial Anda dengan grafik interaktif dan kelola target menabung (Smart Goals) dengan mudah.",
                    screenshots: [
                        "/Preview/FinFlow/image.png",
                        "/Preview/FinFlow/image copy.png",
                        "/Preview/FinFlow/image copy 2.png",
                        "/Preview/FinFlow/image copy 3.png",
                        "/Preview/FinFlow/image copy 4.png",
                        "/Preview/FinFlow/image copy 5.png",
                        "/Preview/FinFlow/image copy 6.png"
                    ]
                }
            ]
        }
    ];


    const certificates = [
        { title: "Flexible Kickstart UI UX Design", issuer: "Rakamin Academy", date: "Juli 2024", image: "/assets/sertifikat/certificate-314889UI_UX272024-EG.pdf" },
        { title: "Kickstart UI UX Design Journey", issuer: "Rakamin Academy", date: "Juli 2024", image: "/assets/sertifikat/certificate-314889UI_UX272024.pdf" },
        { title: "UI / UX for Beginners", issuer: "Great Learning Academy", date: "Juli 2024", image: "/assets/sertifikat/Great Learning.pdf" },
        { title: "Seminar Literasi Digital Sektor Pendidikan", issuer: "Kominfo", date: "Februari 2024", image: "/assets/sertifikat/Literasi .png" },
        { title: "Webinar Large Language Model AI", issuer: "B-TECH", date: "Juni 2025", image: "/assets/sertifikat/Muhammad Hafidz Alaziz (3).pdf" },
        { title: "Pengimbasan Master Trainer 2024", issuer: "Google for Education", date: "Oktober 2024", image: "/assets/sertifikat/Muhammad Hafidz Alaziz.pdf" },
        { title: "Introduction to Information Security", issuer: "Cyber Academy", date: "September 2025", image: "/assets/sertifikat/Certificate-of-Completion-Introduction-to-Information-Security.pdf" },
        { title: "Belajar Dasar Visualisasi Data", issuer: "Dicoding", date: "September 2023", image: "/assets/sertifikat/sertifikat_course_177_3239478_180923135021.png" },
        { title: "Memulai Dasar Pemrograman", issuer: "Dicoding", date: "Agustus 2023", image: "/assets/sertifikat/sertifikat_course_237_3239478_240823193807.png" },
        { title: "Pengenalan ke Logika Pemrograman", issuer: "Dicoding", date: "Agustus 2023", image: "/assets/sertifikat/sertifikat_course_302_3239478_300823081623.png" },
        { title: "Belajar Dasar AI", issuer: "Dicoding", date: "Oktober 2025", image: "/assets/sertifikat/sertifikat_course_653_3239478_041025155139.pdf" },
        { title: "Introduction to Financial Literacy", issuer: "Dicoding", date: "Desember 2025", image: "/assets/sertifikat/sertifikat_course_905_3239478_191225181656.pdf" }
    ];

    const [showAllProjects, setShowAllProjects] = useState(false);
    const filteredProjects = projects.filter(p => p.category === activeSubTab);
    const displayedProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 3);

    const [showAllCerts, setShowAllCerts] = useState(false);
    const displayedCerts = showAllCerts ? certificates : certificates.slice(0, 3);

    // Global Download Tracking (Firebase)
    const [downloadCounts, setDownloadCounts] = useState({
        "E-Learning App": 0,
        "FinFlow": 0
    });

    useEffect(() => {
        // Initial Fetch
        fetchDownloads().then(data => {
            if (Object.keys(data).length > 0) {
                setDownloadCounts(prev => ({ ...prev, ...data }));
            }
        });

        // SSE Real-time Updates
        if (!FIREBASE_DB_URL) return;
        
        const sseUrl = `${DOWNLOADS_PATH}?sse=true`;
        let es;
        try {
            es = new EventSource(sseUrl);
            es.addEventListener('put', (e) => {
                const payload = JSON.parse(e.data);
                if (payload && payload.data) {
                    setDownloadCounts(prev => ({ ...prev, ...payload.data }));
                }
            });
            es.addEventListener('patch', (e) => {
                const payload = JSON.parse(e.data);
                if (payload && payload.data) {
                    setDownloadCounts(prev => ({ ...prev, ...payload.data }));
                }
            });
        } catch (err) {
            console.error('SSE connection failed:', err);
        }

        return () => es && es.close();
    }, []);

    const formatCount = (num) => {
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num.toString();
    };

    // Simple Animated Counter Component for Portfolio
    const PortfolioCounter = ({ value }) => {
        const [displayValue, setDisplayValue] = useState(value);
        const [isAnimating, setIsAnimating] = useState(false);

        useEffect(() => {
            if (value !== displayValue) {
                setIsAnimating(true);
                const timer = setTimeout(() => {
                    setDisplayValue(value);
                    setIsAnimating(false);
                }, 400);
                return () => clearTimeout(timer);
            }
        }, [value, displayValue]);

        return (
            <span className={`inline-block transition-all duration-300 ${isAnimating ? 'scale-125 text-blue-400 brightness-150 font-bold' : 'scale-100'}`}>
                {formatCount(displayValue)}
            </span>
        );
    };

    const handleInstall = (app) => {
        const currentCount = downloadCounts[app.title] || 0;
        
        // Optimistic update locally
        setDownloadCounts(prev => ({ ...prev, [app.title]: currentCount + 1 }));
        
        // Global update to Firebase
        incrementDownloadFirebase(app.title, currentCount);
        
        // Trigger download
        const link = document.createElement('a');
        link.href = app.link;
        link.download = app.link.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = async (app) => {
        const shareData = {
            title: app.title,
            text: app.desc,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link portofolio disalin ke papan klip!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    // Initial role for modal
    useEffect(() => {
        if (selectedApp && selectedApp.roles) {
            setActiveRoleTab(selectedApp.roles[0].name);
        }
    }, [selectedApp]);

    // Clear scroll state when app changes and lock body scroll
    useEffect(() => {
        setIsModalScrolled(false);
        if (selectedApp) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedApp]);

    const activeRole = selectedApp?.roles?.find(r => r.name === activeRoleTab);

    return (
        <section id="portofolio" className="py-20 px-4 bg-slate-900/50">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    <span className="gradient-text">Portofolio</span>
                </h2>

                <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-12">
                    <button
                        onClick={() => { setActiveTab('projects'); setShowAllProjects(false); }}
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

                {activeTab === 'projects' && (
                    <div className="flex justify-center gap-4 mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                        <button
                            onClick={() => { setActiveSubTab('web'); setShowAllProjects(false); }}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${activeSubTab === 'web' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50' : 'bg-slate-800/50 text-slate-400 border border-transparent hover:border-slate-600'}`}
                        >
                            <Globe size={16} /> Website
                        </button>
                        <button
                            onClick={() => { setActiveSubTab('mobile'); setShowAllProjects(false); }}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all ${activeSubTab === 'mobile' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50' : 'bg-slate-800/50 text-slate-400 border border-transparent hover:border-slate-600'}`}
                        >
                            <Smartphone size={16} /> Mobile App
                        </button>
                    </div>
                )}

                <div className="relative min-h-[500px]">
                    {activeTab === 'projects' && (
                        <div className="content-section bg-slate-900/80 rounded-2xl shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-300">
                            <h2 className="text-3xl font-bold text-white mb-8 border-b border-blue-500 pb-4">
                                {activeSubTab === 'web' ? 'Website Portfolio' : 'Mobile Application Store'}
                            </h2>

                            {activeSubTab === 'web' ? (
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
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {displayedProjects.map((project, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setSelectedApp(project)}
                                            className="group cursor-pointer flex flex-col items-center animate-in fade-in zoom-in duration-300"
                                        >
                                            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-3">
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl opacity-20 group-hover:opacity-40 transition-opacity blur-lg"></div>
                                                <div className="relative w-full h-full bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 group-hover:border-purple-500 transition-colors p-1 shadow-xl">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover rounded-2xl"
                                                    />
                                                </div>
                                            </div>
                                            <h3 className="text-white font-medium text-center text-sm md:text-base line-clamp-1 w-full">{project.title}</h3>
                                            <div className="flex items-center gap-1 mt-1 text-slate-400 text-xs">
                                                <span>{project.rating}</span>
                                                <Star size={10} className="fill-yellow-500 text-yellow-500" />
                                                <span className="mx-1">•</span>
                                                <PortfolioCounter value={downloadCounts[project.title] || 0} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {filteredProjects.length > 3 && (activeSubTab === 'web' || showAllProjects) && (
                                <div className="text-center mt-10">
                                    <button
                                        onClick={() => setShowAllProjects(!showAllProjects)}
                                        className="bg-slate-800 border border-slate-600 hover:border-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all hover:bg-slate-700"
                                    >
                                        {showAllProjects ? 'Sembunyikan' : 'Lihat Semua Projek'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

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

            {selectedApp && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4">
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSelectedApp(null)}></div>
                    <div className="relative w-full max-w-3xl h-full md:h-auto md:max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-bottom-8 duration-300 flex flex-col">
                        <div 
                            onScroll={handleModalScroll}
                            className="h-full overflow-y-auto custom-scrollbar flex-1 relative rounded-3xl"
                            style={{ scrollbarGutter: 'stable' }}
                        >
                            <div className={`sticky top-0 bg-slate-900/95 backdrop-blur-md z-[70] border-b border-slate-800 transition-all duration-300 ease-in-out rounded-t-3xl ${isModalScrolled ? 'p-3 md:p-4 shadow-xl' : 'p-5 md:p-8'}`}>
                                <div className="flex items-start md:items-center gap-4 relative pr-14 md:pr-16">
                                    <img 
                                        src={selectedApp.image} 
                                        alt={selectedApp.title} 
                                        className={`rounded-2xl object-cover shadow-lg border border-slate-700 transition-all duration-300 ease-in-out flex-shrink-0 ${isModalScrolled ? 'w-12 h-12 md:w-14 md:h-14' : 'w-20 h-20 md:w-32 md:h-32'}`} 
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 md:gap-4 transition-all duration-300">
                                            
                                            {/* Text and Stats */}
                                            <div className="min-w-0 flex-1 mt-1 md:mt-0">
                                                <h3 className={`font-bold text-white transition-all duration-300 truncate ${isModalScrolled ? 'text-lg md:text-xl' : 'text-xl md:text-3xl lg:text-4xl'}`}>
                                                    {selectedApp.title}
                                                </h3>
                                                
                                                <div className={`flex items-center gap-1 text-[11px] md:text-xs transition-all duration-300 ease-in-out ${isModalScrolled && selectedApp.rating ? 'opacity-100 max-h-10 mt-0.5' : 'opacity-0 max-h-0 overflow-hidden m-0'}`}>
                                                    <span className="font-bold text-white">{selectedApp.rating}</span>
                                                    <Star size={10} className="fill-yellow-500 text-yellow-500" />
                                                    <span className="text-slate-400 ml-0.5">
                                                        (<PortfolioCounter value={downloadCounts[selectedApp.title] || 0} />)
                                                    </span>
                                                </div>

                                                <div className={`grid transition-all duration-300 ease-in-out ${isModalScrolled ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100 mt-1 md:mt-3'}`}>
                                                    <div className="overflow-hidden">
                                                        <p className="text-blue-400 font-medium mb-2 md:mb-4 text-xs md:text-base">Hafidz Alaziz</p>
                                                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm">
                                                            <div className="flex items-center gap-1 text-slate-300 bg-slate-800/80 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border border-slate-700/50">
                                                                <span className="font-bold text-white">{selectedApp.rating}</span>
                                                                <Star size={12} className="fill-yellow-500 text-yellow-500" />
                                                                <span className="text-slate-500 ml-1 hidden md:inline">
                                                                    (<PortfolioCounter value={downloadCounts[selectedApp.title] || 0} />)
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-slate-300 bg-slate-800/80 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border border-slate-700/50">
                                                                <Info size={12} className="text-blue-400" />
                                                                <span>{selectedApp.size}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Buttons Action */}
                                            <div className={`flex flex-row gap-2 transition-all duration-300 flex-shrink-0 origin-top-right mt-1 md:mt-0 ${isModalScrolled ? 'scale-90 md:scale-95' : 'scale-100 lg:mt-2'}`}>
                                                <button onClick={() => handleInstall(selectedApp)} className="bg-green-600 hover:bg-green-500 text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold transition-transform active:scale-95 flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(22,163,74,0.3)] hover:shadow-[0_0_20px_rgba(22,163,74,0.5)] text-xs md:text-sm border border-green-500/30">
                                                    <Download size={16} /> <span>Install</span>
                                                </button>
                                                <button onClick={() => handleShare(selectedApp)} className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 md:px-4 py-2 md:py-3 rounded-xl font-semibold transition-all active:scale-95 text-xs md:text-sm flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-500 shadow-lg">
                                                    <Share2 size={16} />
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                    
                                    {/* Close Button Absolute Pos */}
                                    <button onClick={() => setSelectedApp(null)} className={`absolute top-0 right-0 p-1.5 bg-slate-800/80 backdrop-blur hover:bg-red-500/20 rounded-full text-slate-400 hover:text-red-400 transition-colors z-[80] border border-slate-700/50`}>
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>

                            {selectedApp.roles && (
                                <div className="px-6 py-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-slate-800 bg-slate-900/50">
                                    {selectedApp.roles.map((role, i) => (
                                        <button key={i} onClick={() => setActiveRoleTab(role.name)} className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeRoleTab === role.name ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                                            {role.name}
                                        </button>
                                    ))}
                                </div>
                            )}

                        <div className="p-4 md:p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                <h4 className="text-white font-bold text-lg">Preview {activeRoleTab}</h4>
                                <span className="text-slate-400 text-[10px] md:text-xs bg-slate-800/50 px-3 py-1 rounded-full w-fit">
                                    Klik foto untuk memperbesar • Scroll →
                                </span>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                                {(activeRole?.screenshots || selectedApp.screenshots || []).map((shot, i) => (
                                    <div 
                                        key={i} 
                                        className="flex-shrink-0 relative group cursor-zoom-in"
                                        onClick={() => setSelectedImage(shot)}
                                    >
                                        <img src={shot} alt={`preview ${i}`} className="h-80 md:h-[400px] rounded-2xl border border-slate-800 shadow-xl transition-transform duration-300 group-hover:scale-[1.02]" />
                                        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-800 bg-slate-900/30">
                            <h4 className="text-white font-bold text-lg mb-3">Tentang Versi {activeRoleTab}</h4>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">{activeRole?.desc || selectedApp.desc}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-white font-bold text-lg mb-3">Apa Itu {selectedApp.title}?</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">{selectedApp.longDesc}</p>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider text-slate-500">Tech Stack</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {(activeRole?.tags || selectedApp.tags).map((tag, i) => (
                                                <span key={i} className="text-blue-400 text-xs bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full font-medium">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider text-slate-500">App Info</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm"><span className="text-slate-500">Versi</span><span className="text-slate-300 font-medium">2.1.0</span></div>
                                            <div className="flex justify-between text-sm"><span className="text-slate-500">Ukuran</span><span className="text-slate-300 font-medium">{selectedApp.size}</span></div>
                                            <div className="flex justify-between text-sm"><span className="text-slate-500">Update Terakhir</span><span className="text-slate-300 font-medium">Januari 2024</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Lightbox (Zoom) */}
            {selectedImage && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/95 backdrop-blur-sm transition-all duration-300"
                        onClick={() => setSelectedImage(null)}
                    ></div>
                    <div className="relative max-w-full max-h-full flex items-center justify-center animate-in zoom-in duration-300">
                        <img 
                            src={selectedImage} 
                            alt="Zoomed Preview" 
                            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
                        />
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all"
                        >
                            <X size={28} />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;

