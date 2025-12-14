import { motion } from 'framer-motion';
import { VOCAB_ITEMS } from '../data/vocab';
import { ProgressManager } from '../utils/progress';
import { Sticker, X } from '@phosphor-icons/react';

interface Props {
    onClose: () => void;
}

export function StickerAlbumView({ onClose }: Props) {
    const unlockedIds = ProgressManager.getUnlockedStickers();
    const totalItems = VOCAB_ITEMS.length;
    const unlockedCount = unlockedIds.length;

    return (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center p-4 overflow-y-auto">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-3 bg-slate-100 rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors z-50 shadow-sm"
            >
                <X size={24} weight="bold" />
            </button>

            <header className="w-full max-w-4xl mt-8 mb-8 text-center space-y-2">
                <h2 className="text-4xl font-display font-black text-banana-500 tracking-tight flex items-center justify-center gap-3">
                    <Sticker weight="fill" className="text-banana-400" />
                    Dein Sticker-Album
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                    {unlockedCount} von {totalItems} Stickern gesammelt
                </p>

                {/* Progress Bar */}
                <div className="w-full max-w-md mx-auto h-4 bg-slate-100 rounded-full overflow-hidden mt-4">
                    <div
                        className="h-full bg-banana-400 transition-all duration-1000 ease-out"
                        style={{ width: `${(unlockedCount / totalItems) * 100}%` }}
                    />
                </div>
            </header>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 w-full max-w-4xl pb-12">
                {VOCAB_ITEMS.map(item => {
                    const isUnlocked = unlockedIds.includes(item.id);
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`aspect-square rounded-2xl flex items-center justify-center p-2 relative ${isUnlocked ? 'bg-white shadow-md border-2 border-banana-100' : 'bg-slate-50 border-2 border-slate-100 border-dashed'}`}
                        >
                            <div className={`text-4xl sm:text-5xl transition-all duration-500 ${isUnlocked ? 'filter-none scale-100' : 'filter grayscale opacity-20 blur-[1px]'}`}>
                                {item.emoji}
                            </div>

                            {!isUnlocked && (
                                <div className="absolute inset-0 flex items-center justify-center text-slate-200">
                                    {/* Lock icon or simple placeholder */}
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
