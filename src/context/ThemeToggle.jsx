import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={toggleTheme}
            className={`relative p-2.5 rounded-xl border transition-colors duration-300 overflow-hidden group ${isDark
                    ? 'bg-neutral-800/50 border-neutral-700/50 hover:border-cyan-500/50'
                    : 'bg-neutral-100 border-neutral-200 hover:border-cyan-500/50'
                }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <AnimatePresence mode="wait">
                {isDark ? (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -90, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 90, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Sun size={18} className="text-amber-400" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ rotate: 90, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: -90, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Moon size={18} className="text-indigo-500" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default ThemeToggle;