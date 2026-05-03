import { useState, useContext } from 'react';
import { useEncounters } from '../store/encounters';
import { AuthContext } from '../lib/authContext';

export function TabBar() {
  const { logout } = useContext(AuthContext);
  const encounters = useEncounters((s) => s.encounters);
  const activeId = useEncounters((s) => s.activeId);
  const create = useEncounters((s) => s.createEncounter);
  const setActive = useEncounters((s) => s.setActive);
  const remove = useEncounters((s) => s.removeEncounter);
  const rename = useEncounters((s) => s.renameEncounter);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-white p-3 flex flex-col gap-2 overflow-y-auto">
      <button className="btn-primary" onClick={() => create()}>
        + Patient
      </button>
      <div className="flex flex-col gap-1 mt-1">
        {encounters.length === 0 && (
          <p className="text-sm text-slate-500 px-1">Noch kein Patient angelegt.</p>
        )}
        {encounters.map((e) => {
          const active = e.id === activeId;
          const isEditing = editingId === e.id;
          return (
            <div
              key={e.id}
              className={`group rounded-md border text-sm ${
                active
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isEditing ? (
                <input
                  autoFocus
                  className="w-full bg-transparent px-2 py-1.5 outline-none"
                  value={draft}
                  onChange={(ev) => setDraft(ev.target.value)}
                  onBlur={() => {
                    rename(e.id, draft);
                    setEditingId(null);
                  }}
                  onKeyDown={(ev) => {
                    if (ev.key === 'Enter') {
                      rename(e.id, draft);
                      setEditingId(null);
                    } else if (ev.key === 'Escape') {
                      setEditingId(null);
                    }
                  }}
                />
              ) : (
                <div className="flex items-center">
                  <button
                    className="flex-1 text-left px-2 py-1.5 truncate"
                    onClick={() => setActive(e.id)}
                    onDoubleClick={() => {
                      setEditingId(e.id);
                      setDraft(e.label);
                    }}
                  >
                    {e.label}
                  </button>
                  <button
                    className={`px-2 py-1 opacity-0 group-hover:opacity-70 hover:opacity-100 ${
                      active ? 'text-white' : 'text-slate-500'
                    }`}
                    title="Schließen"
                    onClick={() => {
                      if (confirm(`"${e.label}" wirklich schließen?`)) remove(e.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-xs text-slate-400 mt-auto px-1">
        Doppelklick auf Name = umbenennen. Daten nur lokal im Browser.
      </p>
      <button className="btn-outline text-xs mt-1 w-full" onClick={logout}>
        Abmelden
      </button>
    </aside>
  );
}
