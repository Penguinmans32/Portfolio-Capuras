import React, { useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles, Code2, Palette, Zap, Download, Github, Linkedin, Mail, MapPin, GraduationCap, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Memoized static components to prevent re-renders
const FloatingIcon = React.memo(({ Icon, delay, x, y, size, isDark }) => (
    <motion.div
        className={`absolute hidden md:flex items-center justify-center ${
            isDark ? 'text-cyan-500/30' : 'text-cyan-600/40'
        }`}
        style={{ left: x, top: y, willChange: 'transform' }}
        initial={{ opacity: 0 }}
        animate={{
            opacity: [0.3, 0.6, 0.3],
            y: [0, -20, 0],
        }}
        transition={{
            duration: 8,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
        }}
    >
        <div className={`p-3 rounded-2xl ${
            isDark
                ? 'bg-neutral-900/30 border border-neutral-700/30'
                : 'bg-white/50 border border-neutral-200/50'
        }`}>
            <Icon size={size} strokeWidth={1.5} />
        </div>
    </motion.div>
));

// Memoized Star component
const StarElement = React.memo(({ star }) => (
    <div
        className="absolute rounded-full bg-white"
        style={{
            left:  `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: 0.4,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
        }}
    />
));

// Memoized Particle
const Particle = React.memo(({ index, isDark }) => {
    const style = useMemo(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: Math.random() * 3 + 2,
        height: Math.random() * 3 + 2,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${4 + Math.random() * 2}s`,
    }), []);

    const colorClass = isDark
        ? index % 3 === 0 ? 'bg-cyan-400/30' : index % 3 === 1 ? 'bg-blue-400/30' : 'bg-purple-400/30'
        : index % 3 === 0 ? 'bg-cyan-500/40' : index % 3 === 1 ? 'bg-blue-500/40' : 'bg-purple-500/40';

    return (
        <div
            className={`absolute rounded-full ${colorClass} particle-float`}
            style={style}
        />
    );
});

// Profile Image Component with animated border
const ProfileImage = React.memo(({ isDark }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration:  0.8, delay: 0.2 }}
            className="relative"
        >
            {/* Animated gradient ring */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto">
                {/* Outer rotating gradient border */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 p-1"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{ 
                        background: 'conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #06b6d4)',
                    }}
                >
                    <div className={`w-full h-full rounded-full ${
                        isDark ? 'bg-neutral-950' : 'bg-slate-50'
                    }`} />
                </motion.div>

                {/* Inner static border */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-0.5">
                    <div className={`w-full h-full rounded-full ${
                        isDark ?  'bg-neutral-900' : 'bg-white'
                    } p-1`}>
                        {/* Profile Image Container */}
                        <div className="w-full h-full rounded-full overflow-hidden relative group">
                            {/* Replace this with your actual image */}
                            <img
                                src="/Portfolioimg.jpg" // <-- Replace with your photo path
                                alt="Profile"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                // Fallback to placeholder if image doesn't load
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                            {/* Fallback placeholder */}
                            <div 
                                className={`absolute inset-0 items-center justify-center text-6xl hidden ${
                                    isDark ? 'bg-neutral-800' : 'bg-neutral-100'
                                }`}
                            >
                                👨‍💻
                            </div>
                            
                            {/* Hover overlay */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    </div>
                </div>

                {/* Floating badges around the image */}
                <motion.div
                    className={`absolute -top-2 -right-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                        isDark
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity:  1, scale: 1 }}
                    transition={{ delay: 1, type: "spring" }}
                >
                    <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Open to Work
                    </span>
                </motion.div>

                <motion.div
                    className={`absolute -bottom-2 -left-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                        isDark
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            :  'bg-blue-100 text-blue-600 border border-blue-200'
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, type: "spring" }}
                >
                    <span className="flex items-center gap-1">
                        <GraduationCap size={12} />
                        Class of 2025
                    </span>
                </motion.div>

                <motion.div
                    className={`absolute top-1/2 -right-4 transform -translate-y-1/2 px-3 py-1.5 rounded-full text-xs font-medium ${
                        isDark
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-purple-100 text-purple-600 border border-purple-200'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, type: "spring" }}
                >
                    <span className="flex items-center gap-1">
                        <Code2 size={12} />
                        Full Stack
                    </span>
                </motion.div>
            </div>

            {/* Social Links below image */}
            <motion.div
                className="flex items-center justify-center gap-3 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                {[
                    { icon: Github, href: "https://github.com/Penguinmans32", label: "GitHub" },
                    { icon: Linkedin, href:  "https://www.linkedin.com/in/vaness-capuras-b25b4634a/", label: "LinkedIn" },
                    { icon: Mail, href: "mailto:your. vanesscapuras@example.com", label: "Email" },
                ].map((social, index) => (
                    <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl transition-all ${
                            isDark
                                ? 'bg-neutral-800/50 text-neutral-400 hover:text-cyan-400 hover:bg-neutral-800 border border-neutral-700/50 hover:border-cyan-500/30'
                                : 'bg-white/80 text-neutral-500 hover:text-cyan-600 hover:bg-white border border-neutral-200 hover:border-cyan-500/30 shadow-sm'
                        }`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                    >
                        <social.icon size={20} />
                    </motion.a>
                ))}
            </motion. div>
        </motion.div>
    );
});

// Quick Info Pills
const QuickInfo = React.memo(({ isDark }) => {
    const infos = [
        { icon: MapPin, text: "Philippines", color: "text-emerald-500" },
        { icon: GraduationCap, text:  "BS Information Technology", color: "text-blue-500" },
        { icon: Calendar, text: "OJT Ready 2025", color: "text-purple-500" },
    ];

    return (
        <motion.div
            className="flex flex-wrap justify-center md:justify-start gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
        >
            {infos.map((info, index) => (
                <motion. div
                    key={info.text}
                    initial={{ opacity: 0, y:  10 }}
                    animate={{ opacity: 1, y:  0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
                        isDark
                            ? 'bg-neutral-800/50 text-neutral-400 border border-neutral-700/50'
                            : 'bg-white/80 text-neutral-600 border border-neutral-200 shadow-sm'
                    }`}
                >
                    <info.icon size={14} className={info.color} />
                    <span>{info.text}</span>
                </motion.div>
            ))}
        </motion.div>
    );
});

const Hero = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const prefersReducedMotion = useReducedMotion();

    const [currentRole, setCurrentRole] = useState(0);
    const roles = useMemo(() => [
        'Aspiring Software Developer',
        'Full Stack Enthusiast', 
        'Problem Solver',
        'Quick Learner',
        'Team Player'
    ], []);

    // Simplified mouse tracking
    const mouseX = useMotionValue(50);
    const mouseY = useMotionValue(50);
    const smoothX = useSpring(mouseX, { stiffness: 30, damping: 30 });
    const smoothY = useSpring(mouseY, { stiffness: 30, damping: 30 });

    useEffect(() => {
        if (prefersReducedMotion) return;

        let ticking = false;
        const handleMouseMove = (e) => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const { clientX, clientY } = e;
                    const { innerWidth, innerHeight } = window;
                    mouseX.set((clientX / innerWidth) * 100);
                    mouseY.set((clientY / innerHeight) * 100);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [prefersReducedMotion, mouseX, mouseY]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentRole((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [roles.length]);

    const floatingIcons = useMemo(() => [
        { Icon: Code2, delay: 0, x: '5%', y: '20%', size: 36 },
        { Icon:  Palette, delay: 1, x: '95%', y: '15%', size: 32 },
        { Icon:  Zap, delay: 2, x: '90%', y: '70%', size: 28 },
        { Icon:  Sparkles, delay: 3, x: '8%', y: '75%', size: 30 },
    ], []);

    const stars = useMemo(() =>
        [...Array(12)].map(() => ({
            x: Math. random() * 100,
            y: Math.random() * 100,
            size: Math. random() * 2 + 1,
            duration: Math.random() * 3 + 3,
            delay: Math.random() * 2,
        })), []
    );

    const particleCount = prefersReducedMotion ? 0 : 8;

    const titleText = "Hi, I'm ";
    const nameText = "Vaness"; // <-- Replace with your name
    const subtitleText = "I build things for the web. ";

    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity:  1,
            y: 0,
            transition: {
                delay: i * 0.03,
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    };

    const techStack = useMemo(() => [
        { name: 'React', color: 'from-cyan-400 to-blue-500' },
        { name: 'JavaScript', color: 'from-yellow-400 to-amber-500' },
        { name: 'TypeScript', color: 'from-blue-400 to-indigo-500' },
        { name: 'Kotlin', color: 'from-purple-400 to-violet-500' },
        { name: 'Java', color: 'from-orange-400 to-red-500' },
        { name: 'Python', color: 'from-green-400 to-emerald-500' },
    ], []);

    return (
        <section
            id="hero"
            className="min-h-screen flex flex-col justify-center pt-20 pb-12 relative overflow-hidden"
        >
            {/* Background Elements */}
            {isDark && ! prefersReducedMotion && (
                <div className="absolute inset-0 -z-30">
                    {stars.map((star, i) => (
                        <StarElement key={i} star={star} />
                    ))}
                </div>
            )}

            <div className="absolute inset-0 -z-20">
                <div
                    className={`absolute inset-0 ${
                        isDark
                            ? 'bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)]'
                            : 'bg-[linear-gradient(rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.06)_1px,transparent_1px)]'
                    } bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]`}
                />
            </div>

            <div className="absolute inset-0 -z-15 pointer-events-none">
                <div className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full ${
                    isDark ?  'bg-purple-500/10' : 'bg-purple-500/15'
                } blur-[120px]`} />
                <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full ${
                    isDark ? 'bg-blue-500/10' : 'bg-blue-500/15'
                } blur-[120px]`} />
            </div>

            {! prefersReducedMotion && (
                <motion.div
                    className={`absolute w-[500px] h-[500px] rounded-full -z-10 pointer-events-none ${
                        isDark ? 'opacity-30' : 'opacity-40'
                    }`}
                    style={{
                        background: isDark
                            ? 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)'
                            :  'radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)',
                        left: useTransform(smoothX, [0, 100], ['0%', '50%']),
                        top:  useTransform(smoothY, [0, 100], ['0%', '50%']),
                        willChange: 'transform',
                        filter: 'blur(80px)',
                    }}
                />
            )}

            {! prefersReducedMotion && floatingIcons.map(({ Icon, delay, x, y, size }, index) => (
                <FloatingIcon key={index} Icon={Icon} delay={delay} x={x} y={y} size={size} isDark={isDark} />
            ))}

            {!prefersReducedMotion && (
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    {[...Array(particleCount)].map((_, i) => (
                        <Particle key={i} index={i} isDark={isDark} />
                    ))}
                </div>
            )}

            {/* Main Content - Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                {/* Left Column - Text Content */}
                <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-block"
                    >
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs ${
                            isDark
                                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400'
                                : 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-600'
                        }`}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span>Looking for OJT / Internship</span>
                            <Sparkles size={14} />
                        </div>
                    </motion.div>

                    {/* Rotating Role */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity:  1 }}
                        transition={{ delay: 0.2 }}
                        className="h-6"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentRole}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className={`text-sm font-mono tracking-widest uppercase ${
                                    isDark ?  'text-cyan-400/80' : 'text-cyan-600/80'
                                }`}
                            >
                                &lt; {roles[currentRole]} /&gt;
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Main Title */}
                    <div className="space-y-2">
                        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${
                            isDark ? 'text-white' : 'text-neutral-900'
                        }`}>
                            <span className="block overflow-hidden">
                                {titleText. split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="inline-block"
                                        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                {nameText.split('').map((char, i) => (
                                    <motion.span
                                        key={`name-${i}`}
                                        custom={i + titleText.length}
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="inline-block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                                        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                                <motion.span
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8, type: "spring" }}
                                    className="inline-block ml-2"
                                >
                                    👋
                                </motion.span>
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className={`text-2xl md:text-3xl font-semibold ${
                                isDark ? 'text-neutral-300' : 'text-neutral-700'
                            }`}
                        >
                            {subtitleText}
                        </motion.p>

                        {/* Animated Underline */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX:  1 }}
                            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                            className="h-1 w-32 md:w-40 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full origin-left mx-auto lg:mx-0"
                        />
                    </div>

                    {/* Description */}
                    <motion. p
                        initial={{ opacity:  0, y: 20 }}
                        animate={{ opacity:  1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className={`text-base md:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0 ${
                            isDark ? 'text-neutral-400' : 'text-neutral-600'
                        }`}
                    >
                        A passionate <span className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Information Technology student</span> eager to learn and grow. 
                        I love turning ideas into reality through{' '}
                        <span className={isDark ? 'text-cyan-400' : 'text-cyan-600'}>clean code</span> and{' '}
                        <span className={`font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>thoughtful design</span>. 
                        Ready to bring fresh perspective and dedication to your team! 
                    </motion.p>

                    {/* Quick Info */}
                    <QuickInfo isDark={isDark} />

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start"
                    >
                        <motion.a
                            href="#projects"
                            className="group relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 flex items-center gap-2 overflow-hidden"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="relative z-10">View My Work</span>
                            <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        </motion.a>

                        <motion.a
                            href="/Vaness_Capuras_Resume.pdf" // <-- Replace with your resume path
                            download
                            className={`px-6 py-3 font-semibold rounded-xl border-2 flex items-center gap-2 transition-all ${
                                isDark
                                    ? 'bg-neutral-900/50 text-neutral-300 border-neutral-700/50 hover:border-cyan-500/50 hover:text-white'
                                    : 'bg-white/50 text-neutral-700 border-neutral-200 hover:border-cyan-500/50 hover:text-neutral-900'
                            }`}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Download size={18} />
                            <span>Download CV</span>
                        </motion.a>

                        <motion.a
                            href="#contact"
                            className={`px-6 py-3 font-semibold rounded-xl flex items-center gap-2 transition-all ${
                                isDark
                                    ? 'text-cyan-400 hover:text-cyan-300'
                                    :  'text-cyan-600 hover:text-cyan-700'
                            }`}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Let's Talk</span>
                            <span>→</span>
                        </motion.a>
                    </motion.div>

                    {/* Tech Stack */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity:  1 }}
                        transition={{ delay: 1.2 }}
                        className={`pt-8 flex flex-col items-center lg:items-start gap-3 ${
                            isDark ?  'text-neutral-500' : 'text-neutral-500'
                        }`}
                    >
                        <span className="font-mono text-xs flex items-center gap-2">
                            <Code2 size={14} />
                            Technologies I work with: 
                        </span>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                            {techStack.map((tech, i) => (
                                <motion.span
                                    key={tech.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.3 + i * 0.05 }}
                                    className={`px-3 py-1.5 rounded-lg text-sm cursor-default transition-all ${
                                        isDark
                                            ? 'bg-neutral-800/50 border border-neutral-700/50 text-neutral-400 hover:text-cyan-400 hover:border-cyan-500/30'
                                            : 'bg-white/60 border border-neutral-200 text-neutral-600 hover:text-cyan-600 hover:border-cyan-500/30'
                                    }`}
                                >
                                    {tech.name}
                                </motion.span>
                            ))}
                        </div>
                    </motion. div>
                </div>

                {/* Right Column - Profile Image */}
                <div className="order-1 lg:order-2">
                    <ProfileImage isDark={isDark} />
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className={`text-xs font-mono tracking-widest uppercase ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                    Scroll
                </span>
                <motion.div
                    className={`w-5 h-8 rounded-full flex justify-center pt-1.5 ${
                        isDark ?  'border-2 border-neutral-700' : 'border-2 border-neutral-300'
                    }`}
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <motion.div
                        className="w-1 h-2 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"
                        animate={{ y: [0, 6, 0], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;