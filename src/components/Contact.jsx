import React, { useState } from 'react';
import { Mail, Phone, MapPin, Youtube, Instagram, Linkedin, Github } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
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
            // Logic to submit form (e.g., EmailJS) goes here
            console.log('Form submitted:', formData);
            alert('Pesan berhasil dikirim!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }
    };

    return (
        <section id="contact" className="py-20 px-4">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
                    <span className="gradient-text">Kontak</span>
                </h2>

                <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <div className="md:w-1/2">
                        <div className="card p-5 sm:p-6 md:p-8 rounded-2xl h-full border border-slate-700/50">
                            <h3 className="text-xl sm:text-2xl font-semibold mb-8 border-b border-slate-700 pb-4">Informasi Kontak</h3>
                            <div className="space-y-6 sm:space-y-8">
                                <div className="flex items-center group">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mr-4 sm:mr-6 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                                        <Mail className="text-cyan-400 group-hover:scale-110 transition-transform w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-slate-400 mb-1">Email</p>
                                        <p className="text-sm sm:text-slate-200 font-medium truncate max-w-[180px] sm:max-w-none">hafidzalaziz721@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center group">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mr-4 sm:mr-6 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-colors">
                                        <Phone className="text-indigo-400 group-hover:scale-110 transition-transform w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-slate-400 mb-1">No Hp</p>
                                        <p className="text-sm sm:text-slate-200 font-medium">+62895613114028</p>
                                    </div>
                                </div>

                                <div className="flex items-center group">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mr-4 sm:mr-6 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-colors">
                                        <MapPin className="text-purple-400 group-hover:scale-110 transition-transform w-5 h-5 sm:w-6 sm:h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs sm:text-sm text-slate-400 mb-1">Lokasi</p>
                                        <p className="text-sm sm:text-slate-200 font-medium">Ciomas, Bogor, Jawa Barat</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 sm:mt-12 pt-8 border-t border-slate-700">
                                <h4 className="text-base sm:text-lg font-medium mb-6 text-slate-300">Ikuti Saya</h4>
                                <div className="flex space-x-3 sm:space-x-4">
                                    <a href="https://youtube.com/@fidz47" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 hover:-translate-y-1 transition-all text-slate-300 hover:text-red-500">
                                        <Youtube size={18} className="sm:w-5 sm:h-5" />
                                    </a>
                                    <a href="https://www.instagram.com/hfidz_alaziz" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 hover:-translate-y-1 transition-all text-slate-300 hover:text-pink-500">
                                        <Instagram size={18} className="sm:w-5 sm:h-5" />
                                    </a>
                                    <a href="https://id.linkedin.com/in/hafidz-alaziz-9a044b362" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 hover:-translate-y-1 transition-all text-slate-300 hover:text-blue-500">
                                        <Linkedin size={18} className="sm:w-5 sm:h-5" />
                                    </a>
                                    <a href="https://github.com/HafidzAlaziz" target="_blank" rel="noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 hover:-translate-y-1 transition-all text-slate-300 hover:text-white">
                                        <Github size={18} className="sm:w-5 sm:h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="md:w-1/2">
                        <div className="card p-6 md:p-8 rounded-2xl h-full border border-slate-700/50">
                            <h3 className="text-2xl font-semibold mb-8 text-white">Kirim Pesan</h3>
                            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Nama Kamu</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${errors.name ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'} text-white outline-none transition-colors`}
                                        placeholder="Masukan Nama Kamu"
                                    />
                                    {errors.name && <p className="text-red-400 text-xs mt-2">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email Kamu</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${errors.email ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'} text-white outline-none transition-colors`}
                                        placeholder="Masukan Email Kamu"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-slate-400 mb-2">Subjek</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${errors.subject ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'} text-white outline-none transition-colors`}
                                        placeholder="Masukan Subjek"
                                    />
                                    {errors.subject && <p className="text-red-400 text-xs mt-2">{errors.subject}</p>}
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Pesan</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border ${errors.message ? 'border-red-500' : 'border-slate-700 focus:border-cyan-400'} text-white outline-none transition-colors resize-none`}
                                        placeholder="Masukan Pesan"
                                    ></textarea>
                                    {errors.message && <p className="text-red-400 text-xs mt-2">{errors.message}</p>}
                                </div>

                                <button type="submit" className="w-full py-4 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
