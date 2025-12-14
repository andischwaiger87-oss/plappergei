import { useState } from 'react';
import type { VocabItem } from '../data/vocab';
import type { LanguageId } from '../data/languages';
import { SpeakerHigh, ArrowsLeftRight } from '@phosphor-icons/react';
import { audioEngine } from '../utils/audio';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    item: VocabItem;
    primaryLang: LanguageId;
    secondaryLang: LanguageId;
    onNext?: () => void;
    onPrev?: () => void;
}

export function HeroLearningView({ item, primaryLang, secondaryLang }: Props) {
    const [showComparison, setShowComparison] = useState(false);

    const playPrimary = () => {
        audioEngine.play(item.translations[primaryLang], primaryLang, item.audio?.[primaryLang]);
    };

    const playSecondary = () => {
        audioEngine.play(item.translations[secondaryLang], secondaryLang, item.audio?.[secondaryLang]);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-lg mx-auto p-6">

            {/* Main Object Card */}
            <motion.div
                layout
                className="card-base w-full aspect-square flex items-center justify-center mb-8 relative overflow-hidden group cursor-pointer"
                onClick={playPrimary}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-banana-100 to-white opacity-50" />

                {/* Fallback to Emoji if image fails/missing, highly styled */}
                <div className="text-[12rem] drop-shadow-2xl filter transform transition-transform group-hover:rotate-6 select-none">
                    {/* In real app, use <img src={item.image} /> */}
                    {item.emoji || '❓'}
                </div>

                <button className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full shadow-lg text-banana-600 hover:text-banana-500 transition-colors">
                    <SpeakerHigh size={32} weight="fill" />
                </button>
            </motion.div>

            {/* Text & comparison */}
            <div className="w-full text-center space-y-6">
                <motion.div>
                    <h2 className="text-5xl font-display font-black text-slate-800 mb-2">
                        {item.translations[primaryLang]}
                    </h2>
                </motion.div>

                <AnimatePresence>
                    {showComparison && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-sky-50 rounded-2xl p-4 border-2 border-sky-100 cursor-pointer"
                            onClick={playSecondary}
                        >
                            <div className="text-sky-500 font-bold mb-1 text-sm uppercase tracking-wider">
                                Deine Sprache
                            </div>
                            <div className="text-3xl font-display font-bold text-sky-900 flex items-center justify-center gap-3">
                                {item.translations[secondaryLang]}
                                <SpeakerHigh size={24} className="text-sky-400" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setShowComparison(!showComparison)}
                    className="flex items-center justify-center gap-2 mx-auto text-slate-400 font-bold hover:text-slate-600 transition-colors py-2 px-4 rounded-xl hover:bg-slate-100"
                >
                    <ArrowsLeftRight size={20} />
                    {showComparison ? 'Vergleich ausblenden' : 'Vergleichen'}
                </button>
            </div>
        </div>
    );
}
