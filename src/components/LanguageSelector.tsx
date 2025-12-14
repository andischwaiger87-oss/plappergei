import { LANGUAGES, type LanguageId } from '../data/languages';

interface Props {
    current: LanguageId;
    onChange: (id: LanguageId) => void;
    label: string;
}

export function LanguageSelector({ current, onChange, label }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                {label}
            </label>
            <select
                value={current}
                onChange={(e) => onChange(e.target.value as LanguageId)}
                className="bg-white border-2 border-slate-100 text-slate-700 font-bold text-lg rounded-xl px-4 py-2 focus:outline-none focus:border-banana-400 transition-colors cursor-pointer appearance-none shadow-sm"
            >
                {LANGUAGES.map(lang => (
                    <option key={lang.id} value={lang.id}>
                        {lang.flag} {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
