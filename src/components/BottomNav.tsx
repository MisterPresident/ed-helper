import { useEncounters, selectActive } from '../store/encounters';
import { useMobileTab, type MobileTab } from '../lib/mobileTab';

type TabDef = {
  key: MobileTab;
  label: string;
  icon: string;
  requiresActive?: boolean;
};

const TABS: TabDef[] = [
  { key: 'patients', label: 'Patienten', icon: '👥' },
  { key: 'workflow', label: 'Workflow', icon: '📋' },
  { key: 'algorithm', label: 'Algorithmus', icon: '⚡', requiresActive: true },
];

export function BottomNav() {
  const { tab, setTab } = useMobileTab();
  const active = useEncounters(selectActive);

  return (
    <nav className="md:hidden shrink-0 border-t border-slate-200 bg-white flex pb-[env(safe-area-inset-bottom)]">
      {TABS.map((t) => {
        const isActive = tab === t.key;
        const disabled = t.requiresActive && !active;
        return (
          <button
            key={t.key}
            onClick={() => !disabled && setTab(t.key)}
            disabled={disabled}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[3.5rem] text-xs font-medium transition ${
              isActive
                ? 'text-slate-900 bg-slate-100'
                : disabled
                  ? 'text-slate-300'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={t.label}
          >
            <span className="text-lg leading-none" aria-hidden>
              {t.icon}
            </span>
            <span>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
