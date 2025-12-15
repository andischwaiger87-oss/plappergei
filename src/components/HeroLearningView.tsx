// src/components/HeroLearningView.tsx
import { SpeakerHigh } from '@phosphor-icons/react';
import type { VocabItem } from '../data/vocab';
import type { LanguageId } from '../data/languages';
import { audioEngine } from '../utils/audio';

interface Props {
  item: VocabItem;
  primaryLang: LanguageId;
  secondaryLang: LanguageId;
}

export function HeroLearningView({ item, primaryLang, secondaryLang }: Props) {
  
  // WICHTIG: Hier übergeben wir 'item.id' an die AudioEngine!
  const playPrimary = () => {
    audioEngine.play(item.translations[primaryLang], primaryLang, item.id);
  };

  const playSecondary = () => {
    audioEngine.play(item.translations[secondaryLang], secondaryLang, item.id);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      
      {/* Das Bild des Objekts */}
      <div 
        className="w-full aspect-square bg-white rounded-3xl shadow-xl border-4 border-slate-100 p-8 flex items-center justify-center relative overflow-hidden group cursor-pointer"
        onClick={playPrimary}
      >
        <img 
          src={item.image} 
          alt={item.translations['en']}
          className="w-full h-full object-contain drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500 ease-spring"
        />
        
        {/* Play Overlay Icon (erscheint beim Hovern) */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <div className="bg-white/90 p-4 rounded-full text-banana-500 shadow-sm backdrop-blur-sm">
                <SpeakerHigh size={48} weight="fill" />
             </div>
        </div>
      </div>

      {/* Die Buttons zum Abspielen */}
      <div className="w-full space-y-3">
        
        {/* Hauptsprache (Lernen) - Groß & Gelb */}
        <button 
          onClick={playPrimary}
          className="w-full flex items-center justify-between p-4 bg-banana-400 hover:bg-banana-300 active:scale-95 text-white rounded-2xl shadow-lg shadow-banana-200 transition-all border-b-4 border-banana-500 hover:border-banana-400 active:border-b-0 active:mt-1"
        >
          <span className="text-3xl font-black font-display tracking-wide drop-shadow-sm">
            {item.translations[primaryLang]}
          </span>
          <SpeakerHigh size={32} weight="fill" className="opacity-90" />
        </button>

        {/* Muttersprache (Hilfe) - Kleiner & Dezent */}
        <button 
          onClick={playSecondary}
          className="w-full flex items-center justify-between p-3 bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl border-2 border-slate-100 transition-colors group"
        >
          <span className="text-lg font-bold">
            {item.translations[secondaryLang]}
          </span>
          <SpeakerHigh size={24} weight="bold" className="group-hover:text-banana-400 transition-colors" />
        </button>

      </div>
    </div>
  );
}