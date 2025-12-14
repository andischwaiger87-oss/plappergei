import { CATEGORIES } from '../data/vocab';
import type { LanguageId } from '../data/languages';
import { motion } from 'framer-motion';
import { audioEngine } from '../utils/audio';

interface Props {
    currentLang: LanguageId;
    onSelectCategory: (categoryId: string) => void;
}

export function CategoryGrid({ currentLang, onSelectCategory }: Props) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemAnim = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    const handleCategoryClick = (cat: typeof CATEGORIES[0]) => {
        // Play audio (Category Name)
        const label = cat.label[currentLang] || cat.label['en'] || cat.label['de'];
        audioEngine.play(label, currentLang);

        // Navigate immediately (Audio persists in background usually)
        onSelectCategory(cat.id);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-display font-bold text-slate-400 mb-6 text-center uppercase tracking-widest">
                Entdecke die Welt
            </h2>

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                {CATEGORIES.map(cat => (
                    <motion.button
                        key={cat.id}
                        variants={itemAnim}
                        onClick={() => handleCategoryClick(cat)}
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`aspect-square rounded-3xl ${cat.color} flex flex-col items-center justify-center p-4 shadow-card hover:shadow-card-hover transition-shadow relative overflow-hidden group border-4 border-transparent hover:border-white/50`}
                    >
                        <div className="text-6xl mb-2 drop-shadow-md transform group-hover:scale-110 transition-transform duration-300">
                            {cat.icon}
                        </div>
                        <span className="font-display font-bold text-lg md:text-xl tracking-tight text-center">
                            {cat.label[currentLang] || cat.label['en'] || cat.label['de']}
                        </span>

                        {/* Shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
}
