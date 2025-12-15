// src/components/IntroScreen.tsx
import { useEffect, useState } from 'react';

interface IntroScreenProps {
  onFinish: () => void;
}

export const IntroScreen = ({ onFinish }: IntroScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Nach 2 Sekunden beginnt das Ausblenden (Opacity geht auf 0)
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // 2. Nach 2.5 Sekunden (wenn die Transition fertig ist) wird die Komponente entfernt
    const removeTimer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center gap-6 animate-pulse">
        {/* Dein Logo Code - Groß skaliert für das Intro */}
        <div className="flex items-center gap-4">
          <h1 className="text-5xl md:text-7xl font-display font-black text-banana-600 tracking-tight cursor-default select-none">
            Plapper<span className="text-sky-400">gei</span>
          </h1>
          {/* Papagei Emoji mit kleiner Wackel-Animation */}
          <span className="text-5xl md:text-7xl animate-bounce">
            🦜
          </span>
        </div>
        
        {/* Optional: Ein kleiner Lade-Indikator */}
        <p className="text-slate-400 font-bold tracking-widest text-sm uppercase mt-4">
          Lade Vokabeln...
        </p>
      </div>
    </div>
  );
};