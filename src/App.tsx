import { useState } from 'react';
import { useEncounters, selectActive } from './store/encounters';
import { TabBar } from './components/TabBar';
import { Workflow } from './components/Workflow';
import { Home } from './components/Home';
import { SidePanel } from './components/SidePanel';
import { BottomNav } from './components/BottomNav';
import { AuthGate } from './components/AuthGate';
import { MobileTabContext, type MobileTab } from './lib/mobileTab';

export function App() {
  const active = useEncounters(selectActive);
  const [mobileTab, setMobileTab] = useState<MobileTab>('workflow');

  return (
    <AuthGate>
      <MobileTabContext.Provider value={{ tab: mobileTab, setTab: setMobileTab }}>
        <div className="h-screen flex flex-col">
          <header className="shrink-0 border-b border-slate-200 bg-white px-4 md:px-6 py-3 flex items-center justify-between">
            <h1 className="text-base font-semibold">ER Helper</h1>
            <span className="text-xs text-slate-400">lokal · privat</span>
          </header>

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            <section
              className={`${mobileTab === 'patients' ? 'flex' : 'hidden'} md:flex w-full md:w-56 shrink-0 overflow-hidden`}
            >
              <TabBar />
            </section>

            <main
              className={`${mobileTab === 'workflow' ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0 overflow-hidden`}
            >
              {active ? <Workflow encounter={active} /> : <Home />}
            </main>

            <section
              className={`${mobileTab === 'algorithm' ? 'flex' : 'hidden'} md:flex w-full md:w-80 shrink-0 overflow-hidden`}
            >
              {active ? (
                <SidePanel enc={active} />
              ) : (
                <div className="flex-1 grid place-items-center p-6 text-center text-sm text-slate-500 bg-slate-50">
                  Erst Patient anlegen, dann erscheint hier der Algorithmus.
                </div>
              )}
            </section>
          </div>

          <BottomNav />
        </div>
      </MobileTabContext.Provider>
    </AuthGate>
  );
}
