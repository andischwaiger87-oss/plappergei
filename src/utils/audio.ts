import type { LanguageId } from '../data/languages';

class AudioEngine {
    private static instance: AudioEngine;
    private currentAudio: HTMLAudioElement | null = null;

    private constructor() {}

    public static getInstance(): AudioEngine {
        if (!AudioEngine.instance) {
            AudioEngine.instance = new AudioEngine();
        }
        return AudioEngine.instance;
    }

    // Neue Funktion: Sie braucht jetzt die 'itemId' (z.B. 'apple'), um die Datei zu finden
    public play(text: string, langId: LanguageId, itemId?: string): void {
        // 1. Altes Audio stoppen
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }

        // 2. Check: Haben wir eine ID? (Kategorien haben z.B. keine generierten Audios)
        if (!itemId) {
            console.log("🔊 Fallback zu Browser-Stimme für:", text);
            this.playBrowserTTS(text, langId);
            return;
        }

        // 3. Pfad zur Datei bauen: /audio/de/apple.mp3
        // Dialekt 'pinz' holt sich die Dateien aus dem 'pinz' Ordner (den wir generiert haben)
        const audioPath = `/audio/${langId}/${itemId}.mp3`;

        const audio = new Audio(audioPath);
        this.currentAudio = audio;

        // Fehler abfangen (falls eine Datei doch fehlt) -> Browser Stimme nutzen
        audio.onerror = () => {
            console.warn(`⚠️ Datei fehlt: ${audioPath} -> Nutze Computerstimme.`);
            this.playBrowserTTS(text, langId);
        };

        audio.play().catch(e => console.error("Playback failed", e));
    }

    private playBrowserTTS(text: string, langId: LanguageId): void {
        const synth = window.speechSynthesis;
        synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const map: Record<string, string> = {
            de: 'de-DE', pinz: 'de-AT', en: 'en-US', it: 'it-IT',
            fr: 'fr-FR', tr: 'tr-TR', es: 'es-ES', ar: 'ar-SA', zh: 'zh-CN',
        };
        utterance.lang = map[langId] || 'en-US';
        synth.speak(utterance);
    }
}

export const audioEngine = AudioEngine.getInstance();