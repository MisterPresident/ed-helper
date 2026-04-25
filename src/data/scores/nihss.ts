import type { ScoreDef, ScoreItem } from '../../types';

// 15-item NIHSS (items 1a–11).
const items: ScoreItem[] = [
  {
    key: 'loc',
    label: '1a – Bewusstseinslage',
    options: [
      { label: 'wach, voll reagibel', points: 0 },
      { label: 'somnolent, durch geringe Stimulation erweckbar', points: 1 },
      { label: 'soporös, benötigt wiederholte Stimulation', points: 2 },
      { label: 'komatös, reflexhaft oder keine Reaktion', points: 3 },
    ],
  },
  {
    key: 'loc_questions',
    label: '1b – Orientierungsfragen (Monat, Alter)',
    options: [
      { label: 'beide korrekt', points: 0 },
      { label: 'eine korrekt', points: 1 },
      { label: 'keine korrekt', points: 2 },
    ],
  },
  {
    key: 'loc_commands',
    label: '1c – Befehle (Augen öffnen/schließen, Faust schließen/öffnen)',
    options: [
      { label: 'beide korrekt', points: 0 },
      { label: 'eine korrekt', points: 1 },
      { label: 'keine korrekt', points: 2 },
    ],
  },
  {
    key: 'gaze',
    label: '2 – Blickbewegung',
    options: [
      { label: 'normal', points: 0 },
      { label: 'partielle Blickparese', points: 1 },
      { label: 'konjugierte Deviation, nicht überwindbar', points: 2 },
    ],
  },
  {
    key: 'visual',
    label: '3 – Gesichtsfeld',
    options: [
      { label: 'kein Ausfall', points: 0 },
      { label: 'partielle Hemianopsie', points: 1 },
      { label: 'komplette Hemianopsie', points: 2 },
      { label: 'bilaterale Hemianopsie / Blindheit', points: 3 },
    ],
  },
  {
    key: 'facial',
    label: '4 – Fazialisparese',
    options: [
      { label: 'normal', points: 0 },
      { label: 'leicht (verstrichene NL-Falte)', points: 1 },
      { label: 'partiell (untere Gesichtshälfte)', points: 2 },
      { label: 'komplett (ein-/beidseitig)', points: 3 },
    ],
  },
  {
    key: 'arm_left',
    label: '5a – Motorik Arm links (10 s bei 90°/45°)',
    options: [
      { label: 'kein Absinken', points: 0 },
      { label: 'Absinken', points: 1 },
      { label: 'Anheben gegen Schwerkraft nicht möglich', points: 2 },
      { label: 'keine aktive Bewegung gegen Schwerkraft', points: 3 },
      { label: 'keine Bewegung', points: 4 },
    ],
  },
  {
    key: 'arm_right',
    label: '5b – Motorik Arm rechts',
    options: [
      { label: 'kein Absinken', points: 0 },
      { label: 'Absinken', points: 1 },
      { label: 'Anheben gegen Schwerkraft nicht möglich', points: 2 },
      { label: 'keine aktive Bewegung gegen Schwerkraft', points: 3 },
      { label: 'keine Bewegung', points: 4 },
    ],
  },
  {
    key: 'leg_left',
    label: '6a – Motorik Bein links (5 s bei 30°)',
    options: [
      { label: 'kein Absinken', points: 0 },
      { label: 'Absinken', points: 1 },
      { label: 'Anheben gegen Schwerkraft nicht möglich', points: 2 },
      { label: 'keine aktive Bewegung gegen Schwerkraft', points: 3 },
      { label: 'keine Bewegung', points: 4 },
    ],
  },
  {
    key: 'leg_right',
    label: '6b – Motorik Bein rechts',
    options: [
      { label: 'kein Absinken', points: 0 },
      { label: 'Absinken', points: 1 },
      { label: 'Anheben gegen Schwerkraft nicht möglich', points: 2 },
      { label: 'keine aktive Bewegung gegen Schwerkraft', points: 3 },
      { label: 'keine Bewegung', points: 4 },
    ],
  },
  {
    key: 'ataxia',
    label: '7 – Extremitätenataxie (FN/KH)',
    options: [
      { label: 'keine', points: 0 },
      { label: 'in einer Extremität', points: 1 },
      { label: 'in zwei Extremitäten', points: 2 },
    ],
  },
  {
    key: 'sensory',
    label: '8 – Sensibilität',
    options: [
      { label: 'normal', points: 0 },
      { label: 'leicht bis mittel reduziert', points: 1 },
      { label: 'schwer/komplett aufgehoben', points: 2 },
    ],
  },
  {
    key: 'language',
    label: '9 – Sprache (Aphasie)',
    options: [
      { label: 'normal', points: 0 },
      { label: 'leichte Aphasie', points: 1 },
      { label: 'schwere Aphasie', points: 2 },
      { label: 'stumm / globale Aphasie', points: 3 },
    ],
  },
  {
    key: 'dysarthria',
    label: '10 – Dysarthrie',
    options: [
      { label: 'normal', points: 0 },
      { label: 'leicht bis mäßig', points: 1 },
      { label: 'schwer', points: 2 },
    ],
  },
  {
    key: 'neglect',
    label: '11 – Neglect / Extinktion',
    options: [
      { label: 'keine', points: 0 },
      { label: 'partiell (eine Modalität)', points: 1 },
      { label: 'ausgeprägt (mehrere Modalitäten)', points: 2 },
    ],
  },
];

export const nihssScore: ScoreDef = {
  key: 'nihss',
  label: 'NIHSS',
  mdcalcUrl: 'https://www.mdcalc.com/calc/715/nih-stroke-scale-score-nihss',
  reference: 'Brott T et al., Stroke 1989',
  items,
  interpret: (total) => {
    if (total === 0) return { band: 'kein Schlaganfallsyndrom klinisch', meaning: '0 Punkte' };
    if (total <= 4) return { band: 'minor stroke', meaning: '1–4 Punkte' };
    if (total <= 15) return { band: 'moderate stroke', meaning: '5–15 Punkte' };
    if (total <= 20) return { band: 'moderate to severe', meaning: '16–20 Punkte' };
    return { band: 'severe stroke', meaning: '> 20 Punkte' };
  },
};
