export type TreatmentKey =
  | 'analgetika'
  | 'antibiotika'
  | 'antiepileptika'
  | 'antikoagulation'
  | 'kardiovaskulaer'
  | 'infusionen'
  | 'weitere';

export type TreatmentSection = {
  key: TreatmentKey;
  label: string;
  placeholder: string;
  chips: string[];
};

export const TREATMENT_SECTIONS: TreatmentSection[] = [
  {
    key: 'analgetika',
    label: 'Analgetika / Schmerzmittel',
    placeholder: 'z.B. Metamizol 1g i.v., Ibuprofen 400mg p.o.',
    chips: [
      'Metamizol 1g i.v.',
      'Metamizol 500mg p.o.',
      'Ibuprofen 400mg p.o.',
      'Paracetamol 1g i.v.',
      'Paracetamol 500mg p.o.',
      'Morphin 5mg i.v.',
      'Piritramid 7,5mg i.v.',
      'Tramadol 100mg i.v.',
      'Diclofenac 75mg i.m.',
    ],
  },
  {
    key: 'antibiotika',
    label: 'Antibiotika',
    placeholder: 'z.B. Ceftriaxon 2g i.v.',
    chips: [
      'Ceftriaxon 2g i.v.',
      'Amoxicillin-Clavulansäure 2,2g i.v.',
      'Piperacillin-Tazobactam 4,5g i.v.',
      'Meropenem 1g i.v.',
      'Ciprofloxacin 400mg i.v.',
      'Metronidazol 500mg i.v.',
      'Clindamycin 600mg i.v.',
      'Ampicillin 2g i.v.',
    ],
  },
  {
    key: 'antiepileptika',
    label: 'Antiepileptika',
    placeholder: 'z.B. Lorazepam 2mg i.v.',
    chips: [
      'Lorazepam 2mg i.v.',
      'Diazepam 10mg i.v.',
      'Levetiracetam 1000mg i.v.',
      'Valproat 20mg/kg i.v.',
      'Phenytoin 15mg/kg i.v.',
      'Phenobarbital 15mg/kg i.v.',
    ],
  },
  {
    key: 'antikoagulation',
    label: 'Antikoagulation',
    placeholder: 'z.B. Heparin 5000 IE i.v.',
    chips: [
      'Heparin 5000 IE i.v.',
      'Enoxaparin 1mg/kg s.c.',
      'Fondaparinux 2,5mg s.c.',
      'Aspirin 500mg p.o.',
      'Aspirin 250mg i.v.',
      'Rivaroxaban 15mg p.o.',
      'Apixaban 10mg p.o.',
    ],
  },
  {
    key: 'kardiovaskulaer',
    label: 'Kardiovaskulär',
    placeholder: 'z.B. Metoprolol 5mg i.v.',
    chips: [
      'Metoprolol 5mg i.v.',
      'Amiodaron 300mg i.v.',
      'Adenosin 6mg i.v.',
      'Atropin 0,5mg i.v.',
      'Nitroglycerin 0,8mg s.l.',
      'Furosemid 40mg i.v.',
      'Noradrenalin 0,1µg/kg/min i.v.',
    ],
  },
  {
    key: 'infusionen',
    label: 'Infusionen / Volumen',
    placeholder: 'z.B. NaCl 0,9% 500ml i.v.',
    chips: [
      'NaCl 0,9% 500ml i.v.',
      'Ringer-Laktat 500ml i.v.',
      'Glukose 5% 500ml i.v.',
      'Glukose 40% 50ml i.v.',
      'HAES 6% 500ml i.v.',
    ],
  },
  {
    key: 'weitere',
    label: 'Weitere',
    placeholder: 'Sonstige Medikamente und Maßnahmen',
    chips: [
      'Ondansetron 4mg i.v.',
      'Pantoprazol 40mg i.v.',
      'Dexamethason 8mg i.v.',
      'Prednisolon 100mg i.v.',
      'Naloxon 0,4mg i.v.',
      'Salbutamol 2,5mg inhal.',
      'Ipratropium 0,5mg inhal.',
      'O₂ 2 l/min',
    ],
  },
];
