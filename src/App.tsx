import { useState } from 'react';
import { HeroLearningView } from './components/HeroLearningView';
import { CategoryGrid } from './components/CategoryGrid';
import { LanguageSelector } from './components/LanguageSelector';
import { AdminView } from './components/AdminView';
import { StickerAlbumView } from './components/StickerAlbumView';
import { StickerUnlockNotification } from './components/StickerUnlockNotification';
import { IntroScreen } from './components/IntroScreen'; // <--- NEU: Import
import { VOCAB_ITEMS, CATEGORIES } from './data/vocab';
import type { LanguageId } from './data/languages';
import { ArrowLeft, Gear, Sticker } from '@phosphor-icons/react';
import { ProgressManager } from './utils/progress';

function App() {
  // State
  const [showIntro, setShowIntro] = useState(true); // <--- NEU: Intro State
  const [primaryLang, setPrimaryLang] = useState<LanguageId>('de');
  const [secondaryLang, setSecondaryLang] = useState<LanguageId>('en');

  // Navigation State
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showStickers, setShowStickers] = useState(false);
  const [showUnlockId, setShowUnlockId] = useState<string | null>(null);

  // Derived Data
  const filteredItems = selectedCategoryId
    ? VOCAB_ITEMS.filter(item => item.categoryId === selectedCategoryId)
    : [];

  const currentItem = filteredItems[currentItemIndex];
  const currentCategory = CATEGORIES.find(c => c.id === selectedCategoryId);

  // Sticker Logic
  const handleItemView = (itemId: string) => {
    // Unlock sticker when viewing
    const isNew = ProgressManager.unlockSticker(itemId);
    if (isNew) {
      setShowUnlockId(itemId);
    }
  };

  // Trigger unlock when current item changes
  if (currentItem && selectedCategoryId) {
    handleItemView(currentItem.id);
  }

  const handleNext = () => {
    setCurrentItemIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentItemIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-banana-200">

      {/* NEU: Intro Screen Overlay */}
      {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}

      {/* Overlays */}
      {showAdmin && <AdminView onClose={() => setShowAdmin(false)} />}
      {showStickers && <StickerAlbumView onClose={() => setShowStickers(false)} />}
      <div className="hidden sm:block">
        <StickerUnlockNotification show={!!showUnlockId} onComplete={() => setShowUnlockId(null)} />
      </div>

      {/* Header */}
      <header className="px-4 py-3 flex flex-wrap gap-4 justify-between items-center bg-white/80 backdrop-blur-md shadow-sm z-30 sticky top-0 border-b border-slate-100">
        <div className="flex items-center gap-4">

          {selectedCategoryId && (
            <button
              onClick={() => {
                setSelectedCategoryId(null);
                setCurrentItemIndex(0);
              }}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            >
              <ArrowLeft size={24} weight="bold" />
            </button>
          )}

          <h1 className="text-2xl font-display font-black text-banana-600 tracking-tight cursor-pointer select-none" onClick={() => setSelectedCategoryId(null)}>
            Plapper<span className="text-sky-400">gei</span> 🦜
          </h1>
        </div>

        <div className="flex gap-2 items-center">
          <button
            onClick={() => setShowStickers(true)}
            className="hidden sm:block p-2 rounded-xl text-slate-400 hover:text-banana-500 hover:bg-banana-50 transition-colors mr-2"
            title="Sticker Album"
          >
            <Sticker size={32} weight="duotone" />
          </button>

          <div className="hidden sm:flex gap-2">
            <LanguageSelector
              label="🎓 Lernen"
              current={primaryLang}
              onChange={setPrimaryLang}
            />
            <LanguageSelector
              label="🏠 Muttersprache"
              current={secondaryLang}
              onChange={setSecondaryLang}
            />
          </div>

          {/* Admin Button */}
          <button
            onClick={() => setShowAdmin(true)}
            className="ml-1 p-2 rounded-xl text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-colors"
            title="Einstellungen"
          >
            <Gear size={24} weight="fill" />
          </button>
        </div>
      </header>

      {/* Mobile Language Selector (stacked below header on very small screens) */}
      <div className="sm:hidden px-4 py-1 flex gap-2 justify-center bg-white border-b border-slate-50">
        <LanguageSelector
          label="🎓 Lernen"
          current={primaryLang}
          onChange={setPrimaryLang}
        />
        <LanguageSelector
          label="🏠 Muttersprache"
          current={secondaryLang}
          onChange={setSecondaryLang}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 w-full max-w-7xl mx-auto">

        {!selectedCategoryId ? (
          // View: Category Grid
          <CategoryGrid
            currentLang={primaryLang}
            onSelectCategory={setSelectedCategoryId}
          />
        ) : (
          // View: Learning Interface
          <div className="w-full flex flex-col items-center animate-pop">
            <div className={`mb-8 px-6 py-2 rounded-full ${currentCategory?.color} font-bold uppercase tracking-widest text-sm`}>
              {currentCategory?.label[primaryLang] || currentCategory?.label['en'] || currentCategory?.label['de']}
            </div>

            {filteredItems.length > 0 ? (
              <div className="relative w-full max-w-lg">
                <HeroLearningView
                  item={currentItem}
                  primaryLang={primaryLang}
                  secondaryLang={secondaryLang}
                />

                {/* Navigation Arrows for Items */}
                {filteredItems.length > 1 && (
                  <div className="flex justify-between w-full px-8 mt-8">
                    <button onClick={handlePrev} className="p-4 rounded-2xl bg-white shadow-lg text-slate-400 hover:text-slate-800 hover:scale-110 transition-all">
                      <ArrowLeft size={24} weight="bold" />
                    </button>
                    <button onClick={handleNext} className="p-4 rounded-2xl bg-white shadow-lg text-slate-400 hover:text-slate-800 hover:scale-110 transition-all transform rotate-180">
                      <ArrowLeft size={24} weight="bold" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-12 text-slate-400">
                <p>Noch keine Objekte in dieser Kategorie.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;