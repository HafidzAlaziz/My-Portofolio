import React from 'react';

const Footer = () => {
    return (
        <footer className="py-10 px-4 bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="mb-6 md:mb-0">
                        <a href="#" className="text-2xl font-bold gradient-text">Portfolio</a>
                        <p className="text-slate-400 mt-2">Web Development & UI-UX Design</p>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <p className="text-slate-400 mb-2">© {new Date().getFullYear()} Hafidz. All rights reserved.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
