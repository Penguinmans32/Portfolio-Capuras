import React from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

function AppContent() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark'
        ? 'bg-neutral-950 text-neutral-200'
        : 'bg-slate-50 text-neutral-900'
      }`}>
      <Navbar />
      <main className="container mx-auto px-4 md:px-8 max-w-6xl">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <Contact />
      </main>
      <footer className={`py-8 text-center text-sm border-t transition-colors duration-500 ${theme === 'dark'
          ? 'text-neutral-500 border-neutral-800/50'
          : 'text-neutral-500 border-neutral-200'
        }`}>
        <p>© {new Date().getFullYear()} Vaness Capuras. Built with React & Tailwind.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;