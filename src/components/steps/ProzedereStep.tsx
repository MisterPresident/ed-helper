import type { Encounter } from '../../types';
import { useEncounters } from '../../store/encounters';

const PROZEDERE_CHIPS = [
  'stationäre Aufnahme',
  'Monitor / Überwachung',
  'Intensivstation',
  'Entlassung nach Hause',
  'ambulante Wiedervorstellung',
  'Hausärztliche Nachsorge',
  'Konsil Kardiologie',
  'Konsil Neurologie',
  'Konsil Chirurgie',
  'Konsil Gynäkologie',
  'Konsil Urologie',
  'Labor-Verlauf',
  'EKG-Verlauf',
  'Verlaufssono',
];

export function ProzedereStep({
  enc,
  onAdvance,
  onBack,
}: {
  enc: Encounter;
  onAdvance: () => void;
  onBack: () => void;
}) {
  const setText = useEncounters((s) => s.setProzedere);
  const setChips = useEncounters((s) => s.setProzedereChips);

  const chips = enc.prozedereChips ?? [];
  const toggle = (chip: string) => {
    setChips(enc.id, chips.includes(chip) ? chips.filter((c) => c !== chip) : [...chips, chip]);
  };

  return (
    <div className="card">
      <h3 className="text-base font-semibold mb-1">Prozedere</h3>
      <p className="text-sm text-slate-500 mb-3">
        Chips für Standardmaßnahmen, Freitext für Details.
      </p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {PROZEDERE_CHIPS.map((c) => {
          const active = chips.includes(c);
          return (
            <button
              key={c}
              onClick={() => toggle(c)}
              className={`chip ${
                active
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'border-slate-300 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
      <textarea
        rows={4}
        className="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-900"
        placeholder="Details: Aufnahmestation, Zeitpunkt Verlaufslabor, spezifische Therapie, Aufklärung …"
        value={enc.prozedere ?? ''}
        onChange={(e) => setText(enc.id, e.target.value)}
      />
      <div className="mt-4 flex justify-between">
        <button className="btn-outline" onClick={onBack}>
          ← Zurück
        </button>
        <button className="btn-primary" onClick={onAdvance}>
          Zusammenfassung →
        </button>
      </div>
    </div>
  );
}
