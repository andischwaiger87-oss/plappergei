import { useState } from 'react';
import { Lock as LockIcon, LockOpen as LockOpenIcon, X } from '@phosphor-icons/react';

interface Props {
    onClose: () => void;
}

export function AdminView({ onClose }: Props) {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Demo password - configurable later
        if (password === '1234') {
            setIsAuthenticated(true);
        } else {
            alert('Falsches Passwort!');
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-banana-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-card p-8 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-rose-500 transition-colors"
                >
                    <X size={24} weight="bold" />
                </button>

                <h2 className="text-2xl font-display font-black text-slate-800 mb-6 flex items-center gap-2">
                    {isAuthenticated ? <LockOpenIcon className="text-banana-500" /> : <LockIcon className="text-slate-400" />}
                    Admin Bereich
                </h2>

                {!isAuthenticated ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <p className="text-slate-500">Bitte Passwort eingeben (Demo: 1234)</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-4 rounded-xl border-2 border-slate-100 font-bold focus:border-banana-400 outline-none text-center text-xl"
                            placeholder="••••"
                            autoFocus
                        />
                        <button
                            type="submit"
                            className="btn-primary w-full"
                        >
                            Entsperren
                        </button>
                    </form>
                ) : (
                    <div className="space-y-6">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-slate-700 mb-2">Einstellungen</h3>
                            <p className="text-sm text-slate-400 italic">
                                Hier folgen bald Optionen für:<br />
                                - Eigene Wörter hinzufügen<br />
                                - Pinzgauer Aufnahmen verwalten<br />
                                - App-Reset
                            </p>
                        </div>

                        <button className="w-full py-3 font-bold text-slate-400 hover:text-slate-600">
                            Passwort ändern (Bald verfügbar)
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
