import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
    Send,
    Mail,
    MapPin,
    Phone,
    MessageSquare,
    User,
    AtSign,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    Github,
    Linkedin,
    Clock,
    Heart,
    Coffee,
    Zap,
    Star,
    Copy,
    AlertCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';


const EMAILJS_SERVICE_ID = 'service_6bp58r5';    
const EMAILJS_TEMPLATE_ID = 'template_9mnrwn4';   
const EMAILJS_PUBLIC_KEY = 'sprSuUAIEqs4Wjsw9';     

// Animated Input Component
const AnimatedInput = ({ label, icon: Icon, type = "text", placeholder, isDark, delay, name, value, onChange, required, ... props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
        >
            <label className={`block text-xs font-mono mb-2 transition-colors ${
                isFocused
                    ? isDark ? 'text-cyan-400' : 'text-cyan-600'
                    : isDark ?  'text-neutral-500' : 'text-neutral-400'
            }`}>
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
            <div className="relative group">
                <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    isFocused
                        ? isDark ? 'text-cyan-400' : 'text-cyan-600'
                        : isDark ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                    <Icon size={18} />
                </div>

                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-300 outline-none ${
                        isDark
                            ? 'bg-neutral-900/50 border border-neutral-800 text-white placeholder: text-neutral-600 focus:border-cyan-500/50 focus:bg-neutral-900/80'
                            : 'bg-white/50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-cyan-500/50 focus:bg-white shadow-sm focus:shadow-lg'
                    }`}
                    {...props}
                />

                <motion.div
                    className={`absolute inset-0 rounded-xl pointer-events-none`}
                    animate={{
                        boxShadow: isFocused
                            ? isDark
                                ? '0 0 0 3px rgba(6, 182, 212, 0.1), 0 0 20px rgba(6, 182, 212, 0.1)'
                                : '0 0 0 3px rgba(6, 182, 212, 0.1), 0 0 20px rgba(6, 182, 212, 0.15)'
                            : '0 0 0 0px transparent'
                    }}
                    transition={{ duration: 0.2 }}
                />

                <AnimatePresence>
                    {hasValue && ! isFocused && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity:  1, scale: 1 }}
                            exit={{ opacity:  0, scale: 0 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500"
                        >
                            <CheckCircle2 size={18} />
                        </motion. div>
                    )}
                </AnimatePresence>
            </div>
        </motion. div>
    );
};

// Animated Textarea Component
const AnimatedTextarea = ({ label, icon: Icon, placeholder, isDark, delay, name, value, onChange, required, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);
    const charCount = value ?  value.length : 0;

    return (
        <motion. div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
        >
            <div className="flex items-center justify-between mb-2">
                <label className={`text-xs font-mono transition-colors ${
                    isFocused
                        ? isDark ? 'text-cyan-400' : 'text-cyan-600'
                        : isDark ? 'text-neutral-500' : 'text-neutral-400'
                }`}>
                    {label} {required && <span className="text-rose-500">*</span>}
                </label>
                <span className={`text-xs font-mono ${
                    charCount > 450
                        ? 'text-amber-500'
                        : isDark ?  'text-neutral-600' : 'text-neutral-400'
                }`}>
                    {charCount}/500
                </span>
            </div>
            <div className="relative">
                <div className={`absolute left-4 top-4 transition-colors ${
                    isFocused
                        ?  isDark ? 'text-cyan-400' : 'text-cyan-600'
                        :  isDark ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                    <Icon size={18} />
                </div>

                <textarea
                    rows={5}
                    maxLength={500}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`w-full pl-12 pr-4 py-4 rounded-xl transition-all duration-300 outline-none resize-none ${
                        isDark
                            ? 'bg-neutral-900/50 border border-neutral-800 text-white placeholder:text-neutral-600 focus:border-cyan-500/50 focus:bg-neutral-900/80'
                            :  'bg-white/50 border border-neutral-200 text-neutral-900 placeholder:text-neutral-400 focus:border-cyan-500/50 focus:bg-white shadow-sm focus:shadow-lg'
                    }`}
                    {...props}
                />

                <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    animate={{
                        boxShadow: isFocused
                            ? isDark
                                ? '0 0 0 3px rgba(6, 182, 212, 0.1), 0 0 20px rgba(6, 182, 212, 0.1)'
                                : '0 0 0 3px rgba(6, 182, 212, 0.1), 0 0 20px rgba(6, 182, 212, 0.15)'
                            : '0 0 0 0px transparent'
                    }}
                    transition={{ duration: 0.2 }}
                />
            </div>
        </motion.div>
    );
};

// Contact Info Card
const ContactInfoCard = ({ icon:  Icon, label, value, href, delay, isDark, color, isLink }) => {
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        if (isLink && href) {
            window.open(href, '_blank');
        } else if (value) {
            navigator. clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5 }}
            viewport={{ once: true }}
            className={`group relative p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                isDark
                    ? 'bg-neutral-900/30 hover:bg-neutral-800/50 border border-neutral-800/50 hover:border-neutral-700'
                    : 'bg-white/50 hover:bg-white border border-neutral-200/50 hover:border-neutral-300 shadow-sm hover:shadow-lg'
            }`}
            whileHover={{ x: 5, scale: 1.02 }}
            onClick={handleClick}
        >
            <div className="flex items-center gap-4">
                <motion.div
                    className={`p-3 rounded-xl ${isDark ? 'bg-neutral-800/80' : 'bg-neutral-100'}`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                >
                    <Icon className={color} size={22} />
                </motion.div>
                <div className="flex-1">
                    <p className={`text-xs font-mono mb-1 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        {label}
                    </p>
                    <p className={`font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                        {value}
                    </p>
                </div>
                <motion.div
                    className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                        isDark ? 'text-neutral-500' : 'text-neutral-400'
                    }`}
                    animate={copied ? { scale: [1, 1.2, 1] } : {}}
                >
                    {copied ? (
                        <CheckCircle2 size={18} className="text-emerald-500" />
                    ) : (
                        <Copy size={18} />
                    )}
                </motion.div>
            </div>

            <AnimatePresence>
                {copied && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-medium ${
                            isDark
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-emerald-100 text-emerald-600 border border-emerald-200'
                        }`}
                    >
                        Copied!
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Social Link Button
const SocialButton = ({ icon: Icon, href, label, color, delay, isDark }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4, type: "spring" }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        className={`relative p-4 rounded-2xl transition-all duration-300 group ${
            isDark
                ?  'bg-neutral-900/50 border border-neutral-800/50 hover:border-neutral-700'
                :  'bg-white/50 border border-neutral-200/50 hover:border-neutral-300 shadow-sm hover:shadow-lg'
        }`}
        aria-label={label}
    >
        <motion.div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />
        <Icon className={`relative z-10 w-6 h-6 ${
            isDark ? 'text-neutral-400 group-hover:text-white' : 'text-neutral-500 group-hover:text-neutral-900'
        } transition-colors`} />
    </motion.a>
);

// Availability Badge
const AvailabilityBadge = ({ isDark }) => (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y:  0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl ${
            isDark
                ? 'bg-emerald-500/10 border border-emerald-500/20'
                : 'bg-emerald-50 border border-emerald-200'
        }`}
    >
        <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <span className={`text-sm font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
            Available for OJT / Internship
        </span>
        <motion.div
            animate={{ rotate: [0, 14, -14, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
            👋
        </motion.div>
    </motion.div>
);

const Contact = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    
    // Form state
    const [formData, setFormData] = useState({
        from_name: '',
        from_email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Send email using EmailJS
            const result = await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );

            console.log('Email sent successfully:', result.text);
            setSubmitStatus('success');
            
            // Reset form
            setFormData({
                from_name: '',
                from_email: '',
                subject: '',
                message:  ''
            });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);

        } catch (error) {
            console.error('Email send failed:', error);
            setSubmitStatus('error');
            
            // Reset error message after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { 
            icon: Mail, 
            label: "Email", 
            value: "vanesscapuras@gmail.com", 
            color: "text-cyan-500" 
        },
        { 
            icon: MapPin, 
            label: "Location", 
            value: "Cebu City, Philippines", 
            color: "text-purple-500" 
        },
        { 
            icon: Phone, 
            label: "Phone", 
            value: "+63 969 343 4416", 
            color: "text-emerald-500" 
        },
        { 
            icon:  Clock, 
            label: "Timezone", 
            value: "GMT+8 (Philippine Time)", 
            color: "text-amber-500" 
        },
    ];

    const socialLinks = [
        { icon: Github, href: "https://github.com/Penguinmans32", label: "GitHub", color: "from-neutral-500 to-neutral-700" },
        { icon:  Linkedin, href: "https://www.linkedin.com/in/vaness-capuras-b25b4634a/", label: "LinkedIn", color:  "from-blue-500 to-blue-700" },
    ];

    const floatingIcons = [
        { icon:  Heart, x: '5%', y: '20%', delay: 0 },
        { icon: Coffee, x: '92%', y: '15%', delay: 0.5 },
        { icon: Star, x: '88%', y: '80%', delay: 1 },
        { icon:  Zap, x: '8%', y: '75%', delay: 1.5 },
    ];

    return (
        <section
            id="contact"
            ref={containerRef}
            className="py-24 md:py-36 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className={`absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[150px] ${
                    isDark ?  'bg-cyan-500/10' : 'bg-cyan-500/15'
                }`} />
                <div className={`absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full blur-[150px] ${
                    isDark ?  'bg-purple-500/10' : 'bg-purple-500/15'
                }`} />

                {/* Grid pattern */}
                <div className={`absolute inset-0 ${
                    isDark
                        ? 'bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)]'
                        : 'bg-[linear-gradient(rgba(6,182,212,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.07)_1px,transparent_1px)]'
                } bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]`} />

                {/* Floating icons */}
                {floatingIcons.map(({ icon: Icon, x, y, delay }, index) => (
                    <motion.div
                        key={index}
                        className={`absolute hidden md:block ${
                            isDark ? 'text-neutral-800' : 'text-neutral-300'
                        }`}
                        style={{ left: x, top: y }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? {
                            opacity: [0.3, 0.5, 0.3],
                            y: [0, -10, 0],
                        } : {}}
                        transition={{
                            duration: 6,
                            delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Icon size={30} strokeWidth={1} />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y:  30 }}
                    animate={isInView ? { opacity:  1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono mb-6 ${
                            isDark
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                : 'bg-cyan-500/10 text-cyan-600 border border-cyan-500/30'
                        }`}
                    >
                        <MessageSquare size={16} />
                        <span>Get In Touch</span>
                    </motion.div>

                    <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${
                        isDark ?  'text-white' : 'text-neutral-900'
                    }`}>
                        Let's{' '}
                        <span className="relative inline-block">
                            <span className="text-gradient">Connect</span>
                            <motion.span
                                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                        </span>
                    </h2>
                    <p className={`text-lg max-w-2xl mx-auto mb-8 ${
                        isDark ?  'text-neutral-400' : 'text-neutral-600'
                    }`}>
                        Have a question or want to work together? Feel free to reach out!  📬
                    </p>

                    <AvailabilityBadge isDark={isDark} />
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left Side - Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } :  {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Intro Card */}
                        <motion. div
                            className={`p-8 rounded-3xl ${
                                isDark
                                    ? 'bg-neutral-900/40 border border-neutral-800/50'
                                    : 'bg-white/60 border border-neutral-200/50 shadow-xl'
                            }`}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.div
                                className="flex items-center gap-4 mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.div
                                    className="text-5xl"
                                    animate={{ rotate: [0, 14, -14, 0] }}
                                    transition={{ duration:  2, repeat: Infinity, repeatDelay: 2 }}
                                >
                                    👋
                                </motion.div>
                                <div>
                                    <h3 className={`text-2xl font-bold ${
                                        isDark ? 'text-white' : 'text-neutral-900'
                                    }`}>
                                        Say Hello! 
                                    </h3>
                                    <p className={isDark ? 'text-neutral-400' : 'text-neutral-600'}>
                                        I'd love to hear from you
                                    </p>
                                </div>
                            </motion.div>

                            <p className={`leading-relaxed mb-6 ${
                                isDark ? 'text-neutral-400' : 'text-neutral-600'
                            }`}>
                                Whether you have a question about my projects, want to discuss an internship opportunity, 
                                or just want to say hi — feel free to send me a message.  I'll get back to you as soon as possible!
                            </p>

                            <div className={`flex items-center gap-3 p-3 rounded-xl ${
                                isDark ?  'bg-neutral-800/50' : 'bg-neutral-100'
                            }`}>
                                <Clock className={isDark ? 'text-cyan-400' : 'text-cyan-600'} size={18} />
                                <span className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                    Typical response time: <strong>Within 24 hours</strong>
                                </span>
                            </div>
                        </motion.div>

                        {/* Contact Info Cards */}
                        <div className="space-y-3">
                            {contactInfo. map((info, index) => (
                                <ContactInfoCard
                                    key={info.label}
                                    {... info}
                                    delay={0.3 + index * 0.1}
                                    isDark={isDark}
                                />
                            ))}
                        </div>

                        {/* Social Links */}
                        <motion. div
                            initial={{ opacity:  0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            viewport={{ once: true }}
                            className={`p-6 rounded-3xl ${
                                isDark
                                    ?  'bg-neutral-900/30 border border-neutral-800/50'
                                    : 'bg-white/50 border border-neutral-200/50 shadow-lg'
                            }`}
                        >
                            <h4 className={`text-sm font-mono mb-4 ${
                                isDark ?  'text-neutral-500' : 'text-neutral-400'
                            }`}>
                                // Find me online
                            </h4>
                            <div className="flex items-center gap-3">
                                {socialLinks.map((social, index) => (
                                    <SocialButton
                                        key={social.label}
                                        {...social}
                                        delay={0.6 + index * 0.1}
                                        isDark={isDark}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } :  {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <motion.form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className={`relative p-8 md:p-10 rounded-3xl overflow-hidden ${
                                isDark
                                    ? 'bg-neutral-900/40 border border-neutral-800/50'
                                    : 'bg-white/70 border border-neutral-200/50 shadow-2xl'
                            }`}
                        >
                            {/* Animated gradient border */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-1. 5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                                style={{ backgroundSize: '200% 100%' }}
                                animate={{
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat:  Infinity,
                                    ease: "linear",
                                }}
                            />

                            {/* Form Header */}
                            <div className="flex items-center gap-3 mb-8">
                                <motion.div
                                    className={`p-3 rounded-xl ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'}`}
                                    animate={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <Send className={isDark ? 'text-cyan-400' : 'text-cyan-600'} size={24} />
                                </motion. div>
                                <div>
                                    <h3 className={`text-xl font-bold ${
                                        isDark ? 'text-white' : 'text-neutral-900'
                                    }`}>
                                        Send a Message
                                    </h3>
                                    <p className={`text-sm ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                        Fill out the form below
                                    </p>
                                </div>
                            </div>

                            {/* Success/Error State Overlay */}
                            <AnimatePresence>
                                {submitStatus && (
                                    <motion. div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale:  0.9 }}
                                        className={`absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl z-20 ${
                                            isDark ?  'bg-neutral-900/95' : 'bg-white/95'
                                        }`}
                                    >
                                        {submitStatus === 'success' ? (
                                            <>
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", delay: 0.2 }}
                                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mb-6"
                                                >
                                                    <CheckCircle2 className="text-white" size={40} />
                                                </motion.div>
                                                <h4 className={`text-2xl font-bold mb-2 ${
                                                    isDark ? 'text-white' : 'text-neutral-900'
                                                }`}>
                                                    Message Sent!  🎉
                                                </h4>
                                                <p className={`text-center ${
                                                    isDark ?  'text-neutral-400' : 'text-neutral-600'
                                                }`}>
                                                    Thanks for reaching out! I'll get back to you soon. 
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <motion. div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", delay: 0.2 }}
                                                    className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center mb-6"
                                                >
                                                    <AlertCircle className="text-white" size={40} />
                                                </motion.div>
                                                <h4 className={`text-2xl font-bold mb-2 ${
                                                    isDark ? 'text-white' : 'text-neutral-900'
                                                }`}>
                                                    Oops! Something went wrong
                                                </h4>
                                                <p className={`text-center ${
                                                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                                                }`}>
                                                    Please try again or email me directly at vanesscapuras@gmail.com
                                                </p>
                                            </>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Form Fields */}
                            <div className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-5">
                                    <AnimatedInput
                                        label="Your Name"
                                        icon={User}
                                        name="from_name"
                                        value={formData.from_name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        isDark={isDark}
                                        delay={0.4}
                                        required
                                    />
                                    <AnimatedInput
                                        label="Your Email"
                                        icon={AtSign}
                                        type="email"
                                        name="from_email"
                                        value={formData.from_email}
                                        onChange={handleChange}
                                        placeholder="john@example.com"
                                        isDark={isDark}
                                        delay={0.5}
                                        required
                                    />
                                </div>

                                <AnimatedInput
                                    label="Subject"
                                    icon={Sparkles}
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What's this about?"
                                    isDark={isDark}
                                    delay={0.6}
                                />

                                <AnimatedTextarea
                                    label="Your Message"
                                    icon={MessageSquare}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me what you have in mind..."
                                    isDark={isDark}
                                    delay={0.7}
                                    required
                                />

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
                                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    className={`relative w-full py-4 px-8 rounded-xl font-semibold text-white overflow-hidden transition-all ${
                                        isSubmitting ?  'cursor-not-allowed opacity-80' : 'cursor-pointer'
                                    }`}
                                >
                                    {/* Button gradient background */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                                        style={{ backgroundSize: '200% 100%' }}
                                        animate={{
                                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat:  Infinity,
                                            ease:  "linear",
                                        }}
                                    />

                                    {/* Shine effect */}
                                    {! isSubmitting && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                                            animate={{
                                                x: ['-200%', '200%'],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat:  Infinity,
                                                repeatDelay: 3,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    )}

                                    {/* Button content */}
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {isSubmitting ? (
                                            <>
                                                <motion.div
                                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <motion.div
                                                    animate={{ x: [0, 5, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    <ArrowRight size={20} />
                                                </motion.div>
                                            </>
                                        )}
                                    </span>
                                </motion.button>

                                {/* Privacy note */}
                                <p className={`text-xs text-center ${
                                    isDark ? 'text-neutral-600' : 'text-neutral-400'
                                }`}>
                                    🔒 Your information is secure and will never be shared. 
                                </p>
                            </div>
                        </motion.form>
                    </motion.div>
                </div>

                {/* Bottom Message */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`mt-20 p-8 md:p-12 rounded-3xl text-center ${
                        isDark
                            ? 'bg-gradient-to-br from-neutral-900/80 to-neutral-800/50 border border-neutral-800/50'
                            : 'bg-gradient-to-br from-white/80 to-neutral-50/80 border border-neutral-200/50 shadow-xl'
                    }`}
                >
                    <motion.div
                        className="text-5xl mb-6"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        🚀
                    </motion.div>
                    <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${
                        isDark ? 'text-white' : 'text-neutral-900'
                    }`}>
                        Let's Build Something Together!
                    </h3>
                    <p className={`max-w-xl mx-auto mb-6 ${
                        isDark ?  'text-neutral-400' : 'text-neutral-600'
                    }`}>
                        I'm excited to learn, grow, and contribute to real-world projects. 
                        Looking forward to hearing from you! 
                    </p>
                    <motion.a
                        href="mailto:vanesscapuras@gmail.com"
                        className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all ${
                            isDark
                                ? 'bg-white text-neutral-900 hover:bg-neutral-100'
                                : 'bg-neutral-900 text-white hover:bg-neutral-800'
                        }`}
                        whileHover={{ scale: 1.02, y: -3 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Mail size={20} />
                        <span>vanesscapuras@gmail.com</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;