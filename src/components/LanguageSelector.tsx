import { useState, useRef, useEffect } from 'react';
import { LANGUAGES, type LanguageId } from '../data/languages';
import { CaretDown, Check } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    current: LanguageId;
    onChange: (id: LanguageId) => void;
    label: string;
}

export function LanguageSelector({ current, onChange, label }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentLang = LANGUAGES.find(l => l.id === current);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative z-50" ref={containerRef}>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1 mb-1 block">
                {label}
            </label>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-banana-400 text-slate-800 font-bold text-lg rounded-2xl px-3 py-2 shadow-sm transition-all w-full md:min-w-[160px] min-w-0"
            >
                <span className="text-3xl leading-none filter drop-shadow-sm">{currentLang?.flag}</span>
                <span className="flex-1 text-left truncate">{currentLang?.name}</span>
                <CaretDown size={20} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} weight="bold" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border-2 border-slate-100 overflow-hidden max-h-80 overflow-y-auto"
                    >
                        <div className="p-2 space-y-1">
                            {LANGUAGES.map(lang => (
                                <button
                                    key={lang.id}
                                    onClick={() => {
                                        onChange(lang.id);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${current === lang.id
                                        ? 'bg-banana-50 text-banana-900'
                                        : 'hover:bg-slate-50 text-slate-700'
                                        }`}
                                >
                                    <span className="text-3xl leading-none filter drop-shadow-sm">{lang.flag}</span>
                                    <div className="flex-1 text-left">
                                        <div className="font-bold leading-tight">{lang.name}</div>
                                        {lang.isDialect && <div className="text-xs text-slate-400 font-normal">Dialekt</div>}
                                    </div>
                                    {current === lang.id && <Check size={20} className="text-banana-600" weight="bold" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
