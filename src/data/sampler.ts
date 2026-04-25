export type SamplerField = {
  key:
    | 'symptoms'
    | 'allergien'
    | 'medikation'
    | 'vorerkrankungen'
    | 'voroperationen'
    | 'lastMeal'
    | 'event'
    | 'risiko';
  label: string;
  placeholder: string;
};

export const SAMPLER_FIELDS: SamplerField[] = [
  { key: 'symptoms', label: 'S – Symptome', placeholder: 'Beschwerden, Begleitsymptome' },
  { key: 'allergien', label: 'A – Allergien', placeholder: 'keine bekannt / Medikamente / Kontrastmittel' },
  { key: 'medikation', label: 'M – Medikation', placeholder: 'ASS, Bisoprolol, Ramipril…' },
  { key: 'vorerkrankungen', label: 'P – Vorerkrankungen', placeholder: 'KHK, aHT, Diabetes, Malignome…' },
  { key: 'voroperationen', label: 'P – Voroperationen', placeholder: 'Appendektomie 2015, Cholezystektomie 2018…' },
  { key: 'lastMeal', label: 'L – Letzte Mahlzeit', placeholder: 'Uhrzeit, Art' },
  { key: 'event', label: 'E – Ereignis / Hergang', placeholder: 'Was ist passiert, Trigger, Kontext' },
  { key: 'risiko', label: 'R – Risikofaktoren', placeholder: 'Raucher, Adipositas, Immobilität, Reise, OP…' },
];
