export class ProgressManager {
    private static STORAGE_KEY = 'sprachtransformator_stickers';

    static getUnlockedStickers(): string[] {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    static unlockSticker(vocabId: string): boolean {
        const unlocked = this.getUnlockedStickers();
        if (!unlocked.includes(vocabId)) {
            unlocked.push(vocabId);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(unlocked));
            return true; // Newly unlocked
        }
        return false; // Already unlocked
    }

    static resetProgress() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
}
