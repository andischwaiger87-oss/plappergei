import type { LanguageId } from '../data/languages';

class AudioEngine {
    private static instance: AudioEngine;
    private synth: SpeechSynthesis;

    private constructor() {
        this.synth = window.speechSynthesis;
    }

    public static getInstance(): AudioEngine {
        if (!AudioEngine.instance) {
            AudioEngine.instance = new AudioEngine();
        }
        return AudioEngine.instance;
    }

    public async play(text: string, langId: LanguageId, fileUrl?: string): Promise<void> {
        // Priority: File > TTS
        if (fileUrl) {
            try {
                const audio = new Audio(fileUrl);
                await audio.play();
                return;
            } catch (e) {
                console.warn('Audio file failed, falling back to TTS', e);
            }
        }

        // TTS Fallback (For dev and missing files)
        const utterance = new SpeechSynthesisUtterance(text);
        // Map our IDs to BCP 47
        const langMap: Record<string, string> = {
            de: 'de-DE',
            pinz: 'de-AT', // Approximate
            en: 'en-US',
            it: 'it-IT',
            fr: 'fr-FR',
            tr: 'tr-TR',
            es: 'es-ES',
            'ar-sy': 'ar-SA', // Approximate
            zh: 'zh-CN',
        };
        utterance.lang = langMap[langId] || 'en-US';
        utterance.rate = 0.9; // Slightly slower for kids
        this.synth.speak(utterance);
    }
}

export const audioEngine = AudioEngine.getInstance();
