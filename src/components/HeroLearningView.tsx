import { } from 'react';
import type { VocabItem } from '../data/vocab';
import type { LanguageId } from '../data/languages';
import { SpeakerHigh } from '@phosphor-icons/react';
import { audioEngine } from '../utils/audio';
import { motion } from 'framer-motion';

interface Props {
    item: VocabItem;
    primaryLang: LanguageId;
    secondaryLang: LanguageId;
    onNext?: () => void;
    onPrev?: () => void;
}

export function HeroLearningView({ item, primaryLang, secondaryLang }: Props) {

    const playPrimary = () => {
        // WICHTIG: Hier nutzen wir die neue Logik mit item.id
        audioEngine.play(item.translations[primaryLang], primaryLang, item.id);
    };

    const playSecondary = () => {
        // WICHTIG: Hier nutzen wir die neue Logik mit item.id
        audioEngine.play(item.translations[secondaryLang], secondaryLang, item.id);
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

                {/* ZURÜCKGESETZT: Exakt dein ursprünglicher Code für die Emojis */}
                <div className="text-[12rem] drop-shadow-2xl filter transform transition-transform group-hover:rotate-6 select-none">
                    {/* In real app, use <img src={item.image} /> */}
                    {item.emoji || '❓'}
                </div>

                <button className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-full shadow-lg text-banana-600 hover:text-banana-500 transition-colors">
                    <SpeakerHigh size={32} weight="fill" />
                </button>
            </motion.div>

            {/* Text & comparison - Always visible for 'Muttersprache' impact */}
            <div className="w-full text-center space-y-4">
                <motion.div>
                    <h2 className="text-5xl font-display font-black text-slate-800 mb-2" lang={primaryLang}>
                        {item.translations[primaryLang]}
                    </h2>
                </motion.div>

                {/* Secondary Language (Mother Tongue) - Always visible if different/valid */}
                {primaryLang !== secondaryLang && (
                    <motion.div
                        className="bg-white/50 rounded-2xl p-2 cursor-pointer hover:bg-white transition-colors border border-transparent hover:border-banana-200"
                        onClick={playSecondary}
                    >

                        <div className="text-3xl font-display font-bold text-sky-600/80 flex items-center justify-center gap-3" lang={secondaryLang}>
                            {item.translations[secondaryLang]}
                            <SpeakerHigh size={24} className="text-sky-400 opacity-50" />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}