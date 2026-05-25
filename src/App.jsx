import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import PrintCV from './components/PrintCV';
import Portfolio from './components/Portfolio';
import GithubStats from './components/GithubStats';
import MiniGames from './components/MiniGames';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Background3D from './components/Background3D';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate preloader
    const timer = setTimeout(() => {
      setLoading(false);
      // Wait a bit for React to render and for layout to settle, then refresh GSAP
      setTimeout(() => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }, 300);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-x-hidden w-full">
      {/* Preloader */}
      {loading && (
        <div className="preloader" style={{ opacity: loading ? 1 : 0 }}>
          <div className="loader"></div>
        </div>
      )}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* 3D Background */}
      <Background3D />

      {/* Main Content */}
      <div className="screen-content">
        <Navbar />
        <Hero />
        <About />
        <Education />
        <Skills />
        <Portfolio />
        <GithubStats />
        <MiniGames />
        <Contact />
        <Footer />
      </div>
      <PrintCV />
    </div>
  );
}

export default App;
