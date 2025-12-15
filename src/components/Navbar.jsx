import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Terminal, Github, Linkedin, Menu, X, Sparkles } from 'lucide-react';
import ThemeToggle from '../context/ThemeToggle';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const { scrollY } = useScroll();

    // Track scroll position for navbar background
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    // Track active section
    useEffect(() => {
        const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' }
        );

        sections.forEach((section) => {
            const element = document.getElementById(section);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    const socialLinks = [
        { Icon: Github, href: 'https://github.com', label: 'GitHub' },
        { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    ];

    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const linkVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }
    };

    const mobileMenuVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        },
        visible: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const mobileItemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
        >
            <motion.div
                className={`container mx-auto max-w-6xl rounded-2xl transition-all duration-500 ${isScrolled
                    ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-lg shadow-neutral-200/20 dark:shadow-black/20 border border-neutral-200/50 dark:border-neutral-800/50'
                    : 'bg-transparent'
                    }`}
            >
                <div className="px-6 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#hero"
                        className="flex items-center gap-2 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            className="relative p-2 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <Terminal size={20} />
                            <motion.div
                                className="absolute -top-1 -right-1"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles size={12} className="text-amber-400" />
                            </motion.div>
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg text-neutral-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                                Vaness Capuras
                            </span>
                            <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-500 -mt-1">
                                Software Developer
                            </span>
                        </div>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, index) => {
                            const isActive = activeSection === link.href.slice(1);
                            return (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    variants={linkVariants}
                                    className="relative px-4 py-2 text-sm font-medium transition-colors"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                >
                                    <span className={`relative z-10 ${isActive
                                        ? 'text-cyan-500 dark:text-cyan-400'
                                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                                        }`}>
                                        {link.name}
                                    </span>

                                    {/* Active indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute inset-0 bg-cyan-500/10 dark:bg-cyan-400/10 rounded-lg border border-cyan-500/20 dark:border-cyan-400/20"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}

                                    {/* Hover underline */}
                                    <motion.span
                                        className="absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full origin-left"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-3">
                        {/* Social Links - Desktop */}
                        <div className="hidden md:flex items-center gap-1">
                            {socialLinks.map(({ Icon, href, label }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-all"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={label}
                                >
                                    <Icon size={18} />
                                </motion.a>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-px h-6 bg-neutral-200 dark:bg-neutral-800" />

                        {/* Theme Toggle */}
                        <ThemeToggle />

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2.5 rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X size={20} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu size={20} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="md:hidden overflow-hidden border-t border-neutral-200/50 dark:border-neutral-800/50"
                        >
                            <div className="px-6 py-4 space-y-2">
                                {navLinks.map((link) => {
                                    const isActive = activeSection === link.href.slice(1);
                                    return (
                                        <motion.a
                                            key={link.name}
                                            href={link.href}
                                            variants={mobileItemVariants}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                                ? 'bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20'
                                                : 'text-neutral-600 dark: text-neutral-400 hover: bg-neutral-100 dark: hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-white'
                                                }`}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    className="w-1.5 h-1.5 rounded-full bg-cyan-500"
                                                    layoutId="mobileActive"
                                                />
                                            )}
                                            {link.name}
                                        </motion.a>
                                    );
                                })}

                                {/* Mobile Social Links */}
                                <motion.div
                                    variants={mobileItemVariants}
                                    className="flex items-center gap-2 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50"
                                >
                                    {socialLinks.map(({ Icon, href, label }) => (
                                        <motion.a
                                            key={label}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Icon size={18} />
                                            <span className="text-sm">{label}</span>
                                        </motion.a>
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;