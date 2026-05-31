import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    navbar: {
      home: 'Home',
      about: 'About Me',
      education: 'Education',
      skills: 'Skills',
      portfolio: 'Portfolio',
      githubStats: 'GitHub Stats',
      miniGames: 'Mini Games',
      contact: 'Contact',
    },
    hero: {
      hello: "Hello, I'm",
      title: 'Fullstack Developer',
      contactBtn: 'Contact Me',
      portfolioBtn: 'See Portfolio',
      downloadBtn: 'Download CV',
      reactionLabel: 'Reactions:',
      reactionTitle: 'React with {emoji}',
    },
    about: {
      title: 'About Me',
      whoAmI: 'Who Am I?',
      desc1: "I'm a {cyanText} passionate about creating comprehensive web solutions. With deep expertise in both Frontend and Backend, I focus on building applications that are not only visually stunning but also architecturally robust.",
      desc2: 'My journey in web development started 3 years ago, and since then, I have worked on various projects ranging from simple landing pages to complex web applications.',
      desc3: 'I believe in continuous learning and always keep up with the latest technologies and design trends to deliver cutting-edge solutions.',
      downloadBtn: 'Download CV',
      services: {
        frontend: {
          title: 'Frontend Development',
          desc: 'Building responsive, interactive, and high-performance web interfaces.'
        },
        backend: {
          title: 'Backend Development',
          desc: 'Developing server-side logic, APIs, and secure database management.'
        },
        uiux: {
          title: 'UI/UX Design',
          desc: 'Designing intuitive user experiences with a modern aesthetic.'
        },
        fullstack: {
          title: 'Fullstack Solutions',
          desc: 'Providing end-to-end solutions from design to deployment.'
        }
      }
    },
    education: {
      title: 'Educational Journey',
      learnHeader: 'What I Studied/Achieved:',
      highschool: {
        institution: 'SMKN 1 Ciomas',
        period: '2022 - 2025',
        level: 'Vocational High School (SMK)',
        title: 'PPLG (Software and Game Development)',
        status: 'Graduated',
        desc: 'Initial foundation in programming, focusing on web development and Internet of Things (IoT) systems.',
        highlights: [
          'Learned C++, JavaScript, HTML, CSS, PHP, React JS, and Laravel.',
          'Developed IoT (Internet of Things) systems and simple hardware integrations.',
          'Built various dynamic, responsive, and functional web projects.'
        ]
      },
      college: {
        institution: 'STMIK Tazkia',
        period: '2025 - Present',
        level: 'Higher Education (University)',
        title: 'Science and Technology - Informatics Engineering',
        status: 'Semester 2',
        desc: 'Focus on computer science foundations, programming logic, system architecture, and modern infrastructure and admin concepts.',
        highlights: [
          'Studying Algorithms & Data Structures for code optimization.',
          'Learning basic concepts of Cloud Computing and infrastructure management.',
          'Studying operating systems functionality, architecture, and memory management.',
          'Developing problem-solving skills through structured programming.'
        ]
      }
    },
    skills: {
      title: 'My Skills',
      categories: {
        frontend: 'Frontend (React, Tailwind, Vite)',
        backend: 'Backend (Laravel, PHP, Go)',
        database: 'Database & API Management',
        uiux: 'UI/UX Design (Figma, Canva)'
      }
    },
    portfolio: {
      title: 'Portfolio',
      projectsTab: 'Projects',
      certsTab: 'Certificates',
      webSubtab: 'Website',
      mobileSubtab: 'Mobile App',
      webHeading: 'Website Portfolio',
      mobileHeading: 'Mobile Application Store',
      lockedBtn: 'Access Restricted',
      visitBtn: 'Visit App',
      downloads: 'downloads',
      installBtn: 'Install',
      certificatesHeading: 'My Certificates',
      viewCertBtn: 'View Certificate',
      imageLimitText: 'Image Limited (Too Many Requests). View via link.',
      backBtn: 'Hide',
      viewAllProjects: 'View All Projects',
      viewAllCerts: 'View All Certificates',
      modalCloseTitle: 'Close preview',
      modalScrolledStarLabel: 'Rating',
      modalDeveloper: 'Hafidz Alaziz',
      modalInstallCount: 'installs',
      modalAppInfoTitle: 'App Info',
      modalVersion: 'Version',
      modalSize: 'Size',
      modalLastUpdate: 'Last Update',
      modalLastUpdateVal: 'January 2024',
      modalClickZoomText: 'Click photo to zoom • Scroll →',
      modalAboutVersionTitle: 'About Version {role}',
      modalAboutAppTitle: 'What is {title}?',
      modalPreviewTitle: 'Preview {role}',
      sharedClipboardText: 'Portfolio link copied to clipboard!',
      // Dynamic Projects long descriptions:
      projectWebKuuDesc: 'Professional website creation services and creative digital solutions for your business.',
      projectWinaDesc: 'Store profile website for herbal medicine center and thibbun nabawi products in Bogor.',
      projectEduSmartDesc: 'Modern online course platform with industry standard curriculum and experienced mentors.',
      projectKopiSenjaDesc: 'Coffee shop landing page with warm aesthetics and eye-pleasing animations.',
      projectWeddingDesc: 'Premium wedding digital invitation with countdown, RSVP, and interactive photo gallery.',
      projectEcoSmartDesc: 'UMKM e-commerce analytics dashboard with comprehensive and modern data visualization.',
      projectUmkmStoreDesc: 'Marketplace platform to support Indonesian local UMKM products.',
      projectProfServiceDesc: 'Professional business consulting service website with premium and modern design.',
      projectELearningDesc: 'An integrated Academic Management & Smart Attendance system designed to modernize teaching and learning processes with digital presence and course management.',
      projectELearningLongDesc: 'A comprehensive E-Learning application dividing roles into Student, Lecturer, and Admin. Supports academic activities from digital study plans (KRS), dynamic QR Code attendance, to real-time grade and assignment management.',
      projectELearningRoles: {
        student: {
          name: 'Student',
          desc: 'Students can perform Google Login, fill study plans digitally, make instant attendance scans via QR Scanner, monitor semester grades history, and view daily class schedules.'
        },
        lecturer: {
          name: 'Lecturer',
          desc: 'Lecturers have full control over class management, generating QR Code attendance for each session, assigning homework, and inputting student grades directly.'
        },
        admin: {
          name: 'Admin',
          desc: 'Administrators manage the broader academic ecosystem, from managing Users (Lecturer/Student), Course settings, Departments, to lecturer assignments.'
        }
      },
      projectFinFlowDesc: 'A smart financial application that combines artificial intelligence and gamification elements to help you achieve financial freedom in a fun way.',
      projectFinFlowLongDesc: 'FinFlow revolutionizes how you record finances with Google Gemini AI integration for automatic receipt scanning. Equipped with Gamification features like Quests and Badges to build positive saving habits.',
      projectFinFlowRoles: {
        user: {
          name: 'User',
          desc: 'Enjoy a smart financial management experience with AI Receipt Scanner for automatic logging, AI financial assistant, and exciting gamification (Quests & Badges). Monitor your financial progress with interactive charts and manage saving targets (Smart Goals) easily.'
        }
      }
    },
    githubStats: {
      title: 'GitHub Stats & Achievements',
      overview: 'GitHub Overview',
      streak: 'Current Streak',
      langs: 'Top Languages',
      achievements: 'GitHub Achievements',
      mobileScrollText: 'Scroll sideways to view all'
    },
    miniGames: {
      title: 'Play Games!! Let\'s Goo!',
      snakeTitle: 'GitHub Contribution Snake',
      snakeError: 'Failed to load Snake animation. Make sure the file exists in the repository.',
      pacmanTitle: 'GitHub Contribution Pacman',
      pacmanError: 'Failed to load Pacman animation. Make sure the file exists in the repository.'
    },
    contact: {
      title: 'Contact',
      cardTitle: 'Contact Information',
      helperText: 'Or contact me directly by clicking the options below:',
      formTitle: 'Send a Message',
      successMessage: 'Message Sent! 🎉',
      successSub: 'Thank you! I will reply soon.',
      fieldName: 'Your Name',
      fieldEmail: 'Your Email',
      fieldSubject: 'Subject',
      fieldMessage: 'Message',
      placeholderName: 'Enter Your Name',
      placeholderEmail: 'Enter Your Email',
      placeholderSubject: 'Enter Subject',
      placeholderMessage: 'Enter Message',
      btnSend: 'Send Message',
      errName: 'Name is required.',
      errEmailRequired: 'Email is required.',
      errEmailInvalid: 'Please enter a valid email.',
      errSubject: 'Subject is required.',
      errMessage: 'Message cannot be empty.',
      followMe: 'Follow Me',
      labels: {
        email: 'Email',
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        discord: 'Discord',
        location: 'Location',
      },
      locationVal: 'Ciomas, Bogor, West Java',
    },
    footer: {
      title: 'Portfolio',
      subTitle: 'Fullstack Developer',
      backToTop: 'Back to top',
      copyright: '© {year} Hafidz. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    }
  },
  id: {
    navbar: {
      home: 'Beranda',
      about: 'Tentang Saya',
      education: 'Pendidikan',
      skills: 'Skill',
      portfolio: 'Portofolio',
      githubStats: 'GitHub Stats',
      miniGames: 'Mini Games',
      contact: 'Kontak',
    },
    hero: {
      hello: 'Hello, Saya',
      title: 'Fullstack Developer',
      contactBtn: 'Kontak Saya',
      portfolioBtn: 'Lihat Portofolio',
      downloadBtn: 'Download CV',
      reactionLabel: 'Reaksi:',
      reactionTitle: 'Reaksi dengan {emoji}',
    },
    about: {
      title: 'Tentang Saya',
      whoAmI: 'Siapa Saya?',
      desc1: 'Saya seorang {cyanText} yang bersemangat dalam menciptakan solusi web komprehensif. Dengan keahlian mendalam di sisi Frontend maupun Backend, saya fokus pada pembangunan aplikasi yang tidak hanya cantik secara visual, tetapi juga kuat secara arsitektur.',
      desc2: 'Perjalanan saya dalam pengembangan web dimulai 3 tahun yang lalu, dan sejak itu, saya telah mengerjakan banyak proyek mulai dari halaman arahan sederhana hingga aplikasi web kompleks.',
      desc3: 'Saya percaya pada pembelajaran berkelanjutan dan selalu mengikuti perkembangan teknologi dan tren desain terkini untuk memberikan solusi mutakhir.',
      downloadBtn: 'Download CV',
      services: {
        frontend: {
          title: 'Frontend Development',
          desc: 'Membangun antarmuka web yang responsif, interaktif, dan berperforma tinggi.'
        },
        backend: {
          title: 'Backend Development',
          desc: 'Mengembangkan logika sisi server, API, dan pengelolaan database yang aman.'
        },
        uiux: {
          title: 'UI/UX Design',
          desc: 'Merancang pengalaman pengguna yang intuitif dengan estetika modern.'
        },
        fullstack: {
          title: 'Fullstack Solutions',
          desc: 'Memberikan solusi end-to-end dari perancangan hingga deployment.'
        }
      }
    },
    education: {
      title: 'Perjalanan Pendidikan',
      learnHeader: 'Apa yang Dipelajari/Dicapai:',
      highschool: {
        institution: 'SMKN 1 Ciomas',
        period: '2022 - 2025',
        level: 'Sekolah Menengah Kejuruan (SMK)',
        title: 'PPLG (Pengembangan Perangkat Lunak dan Gim)',
        status: 'Lulus',
        desc: 'Fondasi awal dalam dunia pemrograman, berfokus pada pengembangan website (web development) dan sistem Internet of Things (IoT).',
        highlights: [
          'Mempelajari pemrograman C++, JavaScript, HTML, CSS, PHP, serta framework React JS dan Laravel.',
          'Mengembangkan sistem berbasis IoT (Internet of Things) dan integrasi perangkat keras sederhana.',
          'Membangun berbagai proyek aplikasi web dinamis, responsif, dan fungsional.'
        ]
      },
      college: {
        institution: 'STMIK Tazkia',
        period: '2025 - Sekarang',
        level: 'Pendidikan Tinggi (Kuliah)',
        title: 'Sains dan Teknologi - Teknik Informatika',
        status: 'Semester 2',
        desc: 'Fokus pada fondasi dasar ilmu komputer, pengembangan logika pemrograman, arsitektur sistem, serta konsep administrasi dan infrastruktur modern.',
        highlights: [
          'Mempelajari Algoritma & Struktur Data untuk optimasi kode.',
          'Mempelajari konsep dasar Cloud Computing dan pengelolaan infrastruktur.',
          'Mempelajari sistem kerja, arsitektur, dan manajemen memori pada Sistem Operasi.',
          'Mengembangkan kemampuan problem solving melalui pemrograman terstruktur.'
        ]
      }
    },
    skills: {
      title: 'Skill Saya',
      categories: {
        frontend: 'Frontend (React, Tailwind, Vite)',
        backend: 'Backend (Laravel, PHP, Go)',
        database: 'Database & API Management',
        uiux: 'UI/UX Design (Figma, Canva)'
      }
    },
    portfolio: {
      title: 'Portofolio',
      projectsTab: 'Projek',
      certsTab: 'Sertifikat',
      webSubtab: 'Website',
      mobileSubtab: 'Mobile App',
      webHeading: 'Website Portfolio',
      mobileHeading: 'Mobile Application Store',
      lockedBtn: 'Tidak Dapat Mengakses',
      visitBtn: 'Kunjungi Aplikasi',
      downloads: 'unduhan',
      installBtn: 'Pasang',
      certificatesHeading: 'Sertifikat Saya',
      viewCertBtn: 'Lihat Sertifikat',
      imageLimitText: 'Gambar Terbatas (Too Many Requests). Lihat via tautan.',
      backBtn: 'Sembunyikan',
      viewAllProjects: 'Lihat Semua Projek',
      viewAllCerts: 'Lihat Semua Sertifikat',
      modalCloseTitle: 'Tutup pratinjau',
      modalScrolledStarLabel: 'Peringkat',
      modalDeveloper: 'Hafidz Alaziz',
      modalInstallCount: 'pemasangan',
      modalAppInfoTitle: 'Info Aplikasi',
      modalVersion: 'Versi',
      modalSize: 'Ukuran',
      modalLastUpdate: 'Pembaruan Terakhir',
      modalLastUpdateVal: 'Januari 2024',
      modalClickZoomText: 'Klik foto untuk memperbesar • Geser →',
      modalAboutVersionTitle: 'Tentang Versi {role}',
      modalAboutAppTitle: 'Apa itu {title}?',
      modalPreviewTitle: 'Pratinjau {role}',
      sharedClipboardText: 'Link portofolio disalin ke papan klip!',
      // Dynamic Projects long descriptions:
      projectWebKuuDesc: 'Layanan jasa pembuatan website profesional dan solusi digital kreatif untuk bisnis Anda.',
      projectWinaDesc: 'Website profil toko pusat obat herbal dan produk thibbun nabawi di Bogor.',
      projectEduSmartDesc: 'Platform kursus online modern dengan kurikulum standar industri dan mentor berpengalaman.',
      projectKopiSenjaDesc: 'Landing page kedai kopi dengan estetika hangat dan animasi yang memanjakan mata.',
      projectWeddingDesc: 'Undangan digital pernikahan premium dengan countdown, RSVP, dan galeri foto interaktif.',
      projectEcoSmartDesc: 'Dashboard analitik e-commerce UMKM dengan visualisasi data yang komprehensif dan modern.',
      projectUmkmStoreDesc: 'Platform marketplace untuk mendukung produk-produk lokal UMKM Indonesia.',
      projectProfServiceDesc: 'Website jasa konsultasi bisnis profesional dengan desain premium dan modern.',
      projectELearningDesc: 'Sistem Manajemen Akademik & Absensi Pintar terintegrasi yang dirancang untuk memodernisasi proses belajar mengajar dengan fitur presensi digital dan manajemen kursus.',
      projectELearningLongDesc: 'Aplikasi E-Learning komprehensif yang membagi peran menjadi Mahasiswa, Dosen, dan Admin. Mendukung aktivitas akademik mulai dari KRS digital, absensi via QR Code yang dinamis, hingga manajemen nilai dan penugasan secara real-time.',
      projectELearningRoles: {
        student: {
          name: 'Mahasiswa',
          desc: 'Mahasiswa dapat melakukan Login Google, mengisi KRS secara digital, melakukan presensi instan dengan QR Scanner, memantau riwayat nilai semester, dan melihat jadwal kuliah harian.'
        },
        lecturer: {
          name: 'Dosen',
          desc: 'Dosen memiliki kontrol penuh atas manajemen kelas, pembuatan kode QR absensi untuk setiap sesi, pemberian tugas, serta penginputan nilai mahasiswa secara langsung.'
        },
        admin: {
          name: 'Admin',
          desc: 'Administrator mengelola ekosistem akademik secara luas, mulai dari manajemen User (Dosen/Mahasiswa), pengaturan Mata Kuliah, Jurusan, hingga penugasan pengajar.'
        }
      },
      projectFinFlowDesc: 'Aplikasi keuangan cerdas yang menggabungkan kecerdasan buatan dan elemen gamifikasi untuk membantu Anda mencapai kebebasan finansial dengan cara yang menyenangkan.',
      projectFinFlowLongDesc: 'FinFlow merevolusi cara Anda mencatat keuangan dengan integrasi Google Gemini AI untuk scan struk otomatis. Dilengkapi fitur Gamifikasi seperti Quests dan Badges untuk membangun kebiasaan menabung yang positif.',
      projectFinFlowRoles: {
        user: {
          name: 'User',
          desc: 'Nikmati pengalaman pengelolaan keuangan yang cerdas dengan AI Receipt Scanner untuk pencatatan otomatis, asisten keuangan AI, serta fitur gamifikasi (Quests & Badges) yang seru. Pantau progres finansial Anda dengan grafik interaktif dan kelola target menabung (Smart Goals) dengan mudah.'
        }
      }
    },
    githubStats: {
      title: 'GitHub Stats & Achievements',
      overview: 'GitHub Overview',
      streak: 'Current Streak',
      langs: 'Top Languages',
      achievements: 'GitHub Achievements',
      mobileScrollText: 'Scroll ke samping untuk melihat semua'
    },
    miniGames: {
      title: 'Play Games!! Let\'s Goo!',
      snakeTitle: 'GitHub Contribution Snake',
      snakeError: 'Gagal memuat animasi Snake. Pastikan file tersedia di repository.',
      pacmanTitle: 'GitHub Contribution Pacman',
      pacmanError: 'Gagal memuat animasi Pacman. Pastikan file tersedia di repository.'
    },
    contact: {
      title: 'Kontak',
      cardTitle: 'Informasi Kontak',
      helperText: 'Atau hubungi saya secara langsung dengan mengeklik opsi di bawah ini:',
      formTitle: 'Kirim Pesan',
      successMessage: 'Pesan Terkirim! 🎉',
      successSub: 'Terima kasih! Saya akan segera membalas.',
      fieldName: 'Nama Kamu',
      fieldEmail: 'Email Kamu',
      fieldSubject: 'Subjek',
      fieldMessage: 'Pesan',
      placeholderName: 'Masukan Nama Kamu',
      placeholderEmail: 'Masukan Email Kamu',
      placeholderSubject: 'Masukan Subjek',
      placeholderMessage: 'Masukan Pesan',
      btnSend: 'Kirim Pesan',
      errName: 'Nama harus diisi.',
      errEmailRequired: 'Email harus diisi.',
      errEmailInvalid: 'Masukkan email yang valid.',
      errSubject: 'Subjek harus diisi.',
      errMessage: 'Pesan tidak boleh kosong.',
      followMe: 'Ikuti Saya',
      labels: {
        email: 'Email',
        whatsapp: 'WhatsApp',
        telegram: 'Telegram',
        discord: 'Discord',
        location: 'Lokasi',
      },
      locationVal: 'Ciomas, Bogor, Jawa Barat',
    },
    footer: {
      title: 'Portfolio',
      subTitle: 'Fullstack Developer',
      backToTop: 'Kembali ke atas',
      copyright: '© {year} Hafidz. Hak cipta dilindungi.',
      privacy: 'Kebijakan Privasi',
      terms: 'Syarat dan Ketentuan'
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('portfolio_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'id' : 'en'));
  };

  const t = (path, replacements = {}) => {
    const keys = path.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        return path;
      }
    }
    
    if (typeof result === 'string') {
      let text = result;
      Object.keys(replacements).forEach(key => {
        text = text.replaceAll(`{${key}}`, replacements[key]);
      });
      return text;
    }
    
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
