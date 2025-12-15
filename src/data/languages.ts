export type LanguageId = 'de' | 'pinz' | 'en' | 'it' | 'fr' | 'tr' | 'es' | 'ar' | 'zh';

export interface Language {
    id: LanguageId;
    name: string;
    flag: string; // Emoji for now, asset later
    isDialect?: boolean;
}

export const LANGUAGES: Language[] = [
    { id: 'de', name: 'Deutsch', flag: '🇦🇹' },
    { id: 'en', name: 'English', flag: '🇬🇧' },
    { id: 'it', name: 'Italiano', flag: '🇮🇹' },
    { id: 'fr', name: 'Français', flag: '🇫🇷' },
    { id: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { id: 'es', name: 'Español', flag: '🇪🇸' },
    { id: 'ar', name: 'Arabisch', flag: '🇸🇦' },
    { id: 'zh', name: 'Chinesisch', flag: '🇨🇳' },
];

