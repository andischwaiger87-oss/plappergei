import { motion, AnimatePresence } from 'framer-motion';
import { Sticker } from '@phosphor-icons/react';

interface Props {
    show: boolean;
    onComplete: () => void;
}

export function StickerUnlockNotification({ show, onComplete }: Props) {
    return (
        <AnimatePresence onExitComplete={onComplete}>
            {show && (
                <motion.div
                    initial={{ y: 100, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: 50, opacity: 0, scale: 0.8 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white rounded-2xl shadow-card-hover p-4 flex items-center gap-4 border-4 border-banana-200"
                >
                    <div className="bg-banana-100 p-3 rounded-full text-banana-500">
                        <Sticker size={32} weight="fill" />
                    </div>
                    <div>
                        <h4 className="font-display font-black text-banana-600">Neuer Sticker!</h4>
                        <p className="text-slate-500 text-xs font-bold uppercase">Sieh in dein Album</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
