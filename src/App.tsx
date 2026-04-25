import { useEncounters, selectActive } from './store/encounters';
import { TabBar } from './components/TabBar';
import { Workflow } from './components/Workflow';
import { Home } from './components/Home';

export function App() {
  const active = useEncounters(selectActive);
  return (
    <div className="h-screen flex">
      <TabBar />
      <main className="flex-1 flex flex-col">
        <header className="border-b border-slate-200 bg-white px-6 py-3 flex items-center justify-between">
          <h1 className="text-base font-semibold">ER Helper</h1>
          <span className="text-xs text-slate-400">lokal · privat</span>
        </header>
        {active ? <Workflow encounter={active} /> : <Home />}
      </main>
    </div>
  );
}
