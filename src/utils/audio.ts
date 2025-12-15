import type { LanguageId } from '../data/languages';

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1/text-to-speech';

// Multilingual v2 voice - works for all languages
const DEFAULT_VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // "Rachel" - clear, natural voice

// ISO 639-1 language codes for ElevenLabs
const ELEVENLABS_LANG_MAP: Record<string, string> = {
    de: 'de',
    pinz: 'de', // Austrian German
    en: 'en',
    it: 'it',
    fr: 'fr',
    tr: 'tr',
    es: 'es',
    ar: 'ar',
    zh: 'zh',
};

// Cache for generated audio (localStorage)
const AUDIO_CACHE_PREFIX = 'tts_cache_';

class AudioEngine {
    private static instance: AudioEngine;
    private synth: SpeechSynthesis;
    private currentAudio: HTMLAudioElement | null = null;

    private constructor() {
        this.synth = window.speechSynthesis;
    }

    public static getInstance(): AudioEngine {
        if (!AudioEngine.instance) {
            AudioEngine.instance = new AudioEngine();
        }
        return AudioEngine.instance;
    }

    private hashText(text: string, lang: string): string {
        // Simple hash for cache key
        let hash = 0;
        const str = `${lang}_${text}`;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
    }

    private getCachedAudio(text: string, lang: string): string | null {
        const key = AUDIO_CACHE_PREFIX + this.hashText(text, lang);
        return localStorage.getItem(key);
    }

    private setCachedAudio(text: string, lang: string, base64Audio: string): void {
        const key = AUDIO_CACHE_PREFIX + this.hashText(text, lang);
        try {
            localStorage.setItem(key, base64Audio);
        } catch (e) {
            // localStorage full, clear old entries
            this.clearOldCache();
        }
    }

    private clearOldCache(): void {
        const keys = Object.keys(localStorage).filter(k => k.startsWith(AUDIO_CACHE_PREFIX));
        // Remove oldest half
        keys.slice(0, Math.floor(keys.length / 2)).forEach(k => localStorage.removeItem(k));
    }

    private async playElevenLabs(text: string, langId: LanguageId): Promise<boolean> {
        if (!ELEVENLABS_API_KEY) {
            return false;
        }

        // Check cache first
        const cached = this.getCachedAudio(text, langId);
        if (cached) {
            return this.playBase64Audio(cached);
        }

        try {
            const response = await fetch(`${ELEVENLABS_API_URL}/${DEFAULT_VOICE_ID}`, {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': ELEVENLABS_API_KEY,
                },
                body: JSON.stringify({
                    text: text,
                    model_id: 'eleven_multilingual_v2',
                    language_code: ELEVENLABS_LANG_MAP[langId] || 'en',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                    }
                }),
            });

            if (!response.ok) {
                console.warn('ElevenLabs API error:', response.status);
                return false;
            }

            const audioBlob = await response.blob();
            const base64 = await this.blobToBase64(audioBlob);

            // Cache the audio
            this.setCachedAudio(text, langId, base64);

            return this.playBase64Audio(base64);
        } catch (e) {
            console.warn('ElevenLabs request failed:', e);
            return false;
        }
    }

    private blobToBase64(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    private playBase64Audio(base64: string): Promise<boolean> {
        return new Promise((resolve) => {
            // Stop any currently playing audio
            if (this.currentAudio) {
                this.currentAudio.pause();
                this.currentAudio = null;
            }

            const audio = new Audio(base64);
            this.currentAudio = audio;

            audio.onended = () => {
                this.currentAudio = null;
                resolve(true);
            };
            audio.onerror = () => {
                this.currentAudio = null;
                resolve(false);
            };

            audio.play().catch(() => resolve(false));
        });
    }

    private playBrowserTTS(text: string, langId: LanguageId): void {
        // Cancel any ongoing speech
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        const langMap: Record<string, string> = {
            de: 'de-DE',
            pinz: 'de-AT',
            en: 'en-US',
            it: 'it-IT',
            fr: 'fr-FR',
            tr: 'tr-TR',
            es: 'es-ES',
            ar: 'ar-SA',
            zh: 'zh-CN',
        };
        utterance.lang = langMap[langId] || 'en-US';
        utterance.rate = 0.9;
        this.synth.speak(utterance);
    }

    public async play(text: string, langId: LanguageId, fileUrl?: string): Promise<void> {
        // Priority 1: Audio file (pre-recorded)
        if (fileUrl) {
            try {
                if (this.currentAudio) {
                    this.currentAudio.pause();
                }
                const audio = new Audio(fileUrl);
                this.currentAudio = audio;
                await audio.play();
                return;
            } catch (e) {
                console.warn('Audio file failed, trying ElevenLabs', e);
            }
        }

        // Priority 2: ElevenLabs API
        const elevenLabsSuccess = await this.playElevenLabs(text, langId);
        if (elevenLabsSuccess) {
            return;
        }

        // Priority 3: Browser TTS fallback
        this.playBrowserTTS(text, langId);
    }

    public stop(): void {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
        this.synth.cancel();
    }
}

export const audioEngine = AudioEngine.getInstance();

