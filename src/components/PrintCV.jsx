import React from 'react';
import profileImg from '../assets/profile.png';
import { Mail, Phone, MapPin, Github, Linkedin, Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translateDate = (dateStr, lang) => {
    if (!dateStr) return '';
    if (lang === 'en') {
        return dateStr
            .replace('Juli', 'July')
            .replace('Februari', 'February')
            .replace('Juni', 'June')
            .replace('Okt ', 'Oct ')
            .replace('Okt', 'October')
            .replace('Oktober', 'October')
            .replace('Agustus', 'August')
            .replace('Desember', 'December')
            .replace('Des ', 'Dec ')
            .replace('Des', 'December')
            .replace('Sept', 'Sept')
            .replace('Sekarang', 'Present');
    }
    return dateStr;
};

const PrintCV = () => {
    const { language, t } = useLanguage();

    const skills = [
        { name: 'Frontend', desc: 'React, Tailwind CSS, Vite, Vue.js, Next.js' },
        { name: 'Backend', desc: 'Laravel, PHP, Go' },
        { name: 'Database', desc: 'MySQL, MariaDB, Firebase' },
    ];

    const education = [
        {
            institution: t('education.college.institution'),
            period: t('education.college.period'),
            level: t('education.college.level'),
            title: t('education.college.title'),
            status: t('education.college.status'),
            highlights: t('education.college.highlights') || []
        },
        {
            institution: t('education.highschool.institution'),
            period: t('education.highschool.period'),
            level: t('education.highschool.level'),
            title: t('education.highschool.title'),
            status: t('education.highschool.status'),
            highlights: t('education.highschool.highlights') || []
        }
    ];

    const certificates = [
        { title: 'Webinar Large Language Model AI', issuer: 'B-TECH', date: 'Juni 2025' },
        { title: 'Introduction to Information Security', issuer: 'Cyber Academy', date: 'Sept 2025' },
        { title: 'Belajar Dasar AI', issuer: 'Dicoding', date: 'Okt 2025' },
        { title: 'Introduction to Financial Literacy', issuer: 'Dicoding', date: 'Des 2025' },
        { title: 'Flexible Kickstart UI UX Design', issuer: 'Rakamin Academy', date: 'Juli 2024' },
        { title: 'Kickstart UI UX Design Journey', issuer: 'Rakamin Academy', date: 'Juli 2024' },
        { title: 'UI / UX for Beginners', issuer: 'Great Learning Academy', date: 'Juli 2024' },
        { title: 'Pengimbasan Master Trainer 2024', issuer: 'Google for Education', date: 'Okt 2024' },
        { title: 'Seminar Literasi Digital Sektor Pendidikan', issuer: 'Kominfo', date: 'Feb 2024' },
        { title: 'Belajar Dasar Visualisasi Data', issuer: 'Dicoding', date: 'Sept 2023' },
        { title: 'Memulai Dasar Pemrograman', issuer: 'Dicoding', date: 'Agustus 2023' },
        { title: 'Pengenalan ke Logika Pemrograman', issuer: 'Dicoding', date: 'Agustus 2023' }
    ];

    const projects = [
        { 
            title: 'WebKuu', 
            desc: language === 'en' 
                ? 'Professional website creation services and creative digital solutions.' 
                : 'Layanan jasa pembuatan website profesional dan solusi digital kreatif.', 
            tech: 'React, Supabase' 
        },
        { 
            title: 'E-Learning App', 
            desc: language === 'en' 
                ? 'Smart Academic Management & Attendance system with QR Scanner.' 
                : 'Sistem Manajemen Akademik & Absensi Pintar dengan QR Scanner.', 
            tech: 'Flutter, Firebase' 
        },
        { 
            title: 'FinFlow', 
            desc: language === 'en' 
                ? 'Smart financial application integrated with Google Gemini AI and Gamification.' 
                : 'Aplikasi keuangan cerdas terintegrasi Google Gemini AI dan Gamifikasi.', 
            tech: 'Flutter, Gemini AI' 
        }
    ];

    return (
        <div className="print-cv-container w-full max-w-[800px] mx-auto bg-white text-slate-800 p-6 font-sans border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-0.5">Muhammad Hafidz Alaziz</h1>
                    <p className="text-base font-semibold text-indigo-600">Fullstack Developer</p>
                    
                    <div className="flex flex-wrap gap-3.5 mt-2 text-xs text-slate-600">
                        <div className="flex items-center gap-1">
                            <Mail size={12} className="text-slate-800" />
                            <span>hafidzalaziz721@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Phone size={12} className="text-slate-800" />
                            <span>+62895613114028</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-slate-800" />
                            <span>{language === 'en' ? 'Bogor, West Java' : 'Bogor, Jawa Barat'}</span>
                        </div>
                    </div>
                </div>

                {/* Profile Photo */}
                <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-slate-800 flex-shrink-0 bg-slate-100 flex items-center justify-center">
                    <img
                        src={profileImg}
                        alt="Muhammad Hafidz Alaziz"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                </div>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-3 gap-5">
                {/* Left Column (1/3 width) */}
                <div className="col-span-1 border-r border-slate-200 pr-4 space-y-4">
                    {/* Ringkasan Profil */}
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 mb-1.5">
                            {language === 'en' ? 'Profile' : 'Profil'}
                        </h2>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                            {language === 'en' 
                                ? "I'm a Fullstack Developer passionate about creating comprehensive web solutions. Focused on applications that are not only visually stunning but also architecturally robust."
                                : "Saya seorang Fullstack Developer yang bersemangat menciptakan solusi web komprehensif. Fokus pada aplikasi yang tidak hanya cantik secara visual, tetapi juga kuat secara arsitektur."
                            }
                        </p>
                    </div>

                    {/* Keterampilan */}
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 mb-1.5">
                            {language === 'en' ? 'Skills' : 'Keterampilan'}
                        </h2>
                        <ul className="space-y-1.5">
                            {skills.map((skill, index) => (
                                <li key={index}>
                                    <p className="text-[11px] font-bold text-slate-900 mb-0.5">{skill.name}</p>
                                    <p className="text-[10px] text-slate-600 leading-tight">{skill.desc}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tautan Sosial */}
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 mb-1.5">
                            {language === 'en' ? 'Social Links' : 'Kontak Sosial'}
                        </h2>
                        <ul className="space-y-1 text-[11px] text-slate-600">
                            <li className="flex items-center gap-1">
                                <Github size={11} className="text-slate-800" />
                                <span>github.com/HafidzAlaziz</span>
                            </li>
                            <li className="flex items-center gap-1">
                                <Linkedin size={11} className="text-slate-800" />
                                <span>linkedin.com/in/hafidz-alaziz</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column (2/3 width) */}
                <div className="col-span-2 space-y-4">
                    {/* Pendidikan */}
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 mb-2 flex items-center gap-1.5">
                            <GraduationCap size={14} /> {language === 'en' ? 'Education' : 'Pendidikan'}
                        </h2>
                        <div className="space-y-2.5">
                            {education.map((edu, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="text-xs font-bold text-slate-900">{edu.institution} <span className="text-slate-500 font-normal">({edu.level})</span></h3>
                                        <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-semibold text-slate-700">{edu.period}</span>
                                    </div>
                                    <p className="text-xs font-semibold text-indigo-600 mb-1">{edu.title} | {edu.status}</p>
                                    <ul className="list-disc list-inside text-[11px] text-slate-600 space-y-0.5">
                                        {Array.isArray(edu.highlights) && edu.highlights.map((h, i) => (
                                            <li key={i}>{h}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Projek Pilihan */}
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 mb-2 flex items-center gap-1.5">
                            <Briefcase size={13} /> {language === 'en' ? 'Featured Projects' : 'Projek Pilihan'}
                        </h2>
                        <div className="space-y-2">
                            {projects.map((proj, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                                        <span className="text-[9px] text-slate-500 font-mono font-semibold">{proj.tech}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-600 leading-relaxed">{proj.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sertifikat */}
                    <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-800 pb-0.5 mb-2 flex items-center gap-1.5">
                            <Award size={14} /> {language === 'en' ? 'Certificates' : 'Sertifikat'}
                        </h2>
                        <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 text-[11px] text-slate-600">
                            {certificates.map((cert, idx) => (
                                <div key={idx} className="flex flex-col border-b border-slate-100 pb-0.5">
                                    <span className="font-semibold text-slate-800 leading-tight">{cert.title}</span>
                                    <span className="text-[9px] text-slate-500 mt-0.5">{cert.issuer} • {translateDate(cert.date, language)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrintCV;
