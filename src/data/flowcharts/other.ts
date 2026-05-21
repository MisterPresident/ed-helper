import type { FlowchartDef } from '../../types';

export const ruekenFlankeFlow: FlowchartDef = {
  symptomKey: 'ruecken_flanke',
  rootKey: 'rueck_aaa',
  nodes: {
    rueck_aaa: {
      key: 'rueck_aaa',
      type: 'decision',
      label: 'Pulsierende Resistenz / Hypotonie / bekanntes AAA?',
      driver: { kind: 'anamnese', questionKey: 'rueck_bekannt' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'rueck_aaa_tx' },
        { when: 'nein', label: 'Nein', to: 'rueck_cauda' },
      ],
    },
    rueck_aaa_tx: {
      key: 'rueck_aaa_tx',
      type: 'action',
      label: 'Sofort-Sono Aorta + CT-Angio, OP-Bereitschaft',
      redFlagKey: 'rf_rueck_aaa',
      next: 'rueck_disposition',
    },
    rueck_cauda: {
      key: 'rueck_cauda',
      type: 'decision',
      label: 'Reithosenhypästhesie / Blasen-/Mastdarmstörung?',
      driver: { kind: 'anamnese', questionKey: 'rueck_neuro' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'rueck_cauda_tx' },
        { when: 'nein', label: 'Nein', to: 'rueck_infekt' },
      ],
    },
    rueck_cauda_tx: {
      key: 'rueck_cauda_tx',
      type: 'action',
      label: 'MRT LWS notfallmäßig + Neurochirurgie',
      redFlagKey: 'rf_rueck_cauda',
      next: 'rueck_disposition',
    },
    rueck_infekt: {
      key: 'rueck_infekt',
      type: 'decision',
      label: 'Fieber + punktueller Klopfschmerz / i.v.-Drogen?',
      driver: { kind: 'anamnese', questionKey: 'rueck_fieber' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'rueck_infekt_tx' },
        { when: 'nein', label: 'Nein', to: 'rueck_kolik' },
      ],
    },
    rueck_infekt_tx: {
      key: 'rueck_infekt_tx',
      type: 'action',
      label: 'MRT + BK + AB-Empirie (V.a. Spondylodiszitis)',
      redFlagKey: 'rf_rueck_infekt',
      next: 'rueck_disposition',
    },
    rueck_kolik: {
      key: 'rueck_kolik',
      type: 'decision',
      label: 'Kolikartig + Ausstrahlung Leiste + Hämaturie?',
      driver: { kind: 'anamnese', questionKey: 'rueck_kolik' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'rueck_kolik_tx' },
        { when: 'nein', label: 'Nein', to: 'rueck_muskulo' },
      ],
    },
    rueck_kolik_tx: {
      key: 'rueck_kolik_tx',
      type: 'action',
      label: 'Sono Niere/Harnleiter, U-Stix, Metamizol, ggf. CT low-dose',
      next: 'rueck_disposition',
    },
    rueck_muskulo: {
      key: 'rueck_muskulo',
      type: 'action',
      label: 'Symptomatisch (NSAR, Bewegung), Hausarzt-Anbindung',
      next: 'rueck_disposition',
    },
    rueck_disposition: {
      key: 'rueck_disposition',
      type: 'disposition',
      label: 'Disposition nach DDx',
      detail: 'AAA / Cauda / Spondylodiszitis: stationär; Kolik / Lumbago: meist ambulant',
    },
  },
};

export const intoxikationFlow: FlowchartDef = {
  symptomKey: 'intoxikation',
  rootKey: 'intox_abc',
  nodes: {
    intox_abc: {
      key: 'intox_abc',
      type: 'action',
      label: 'A-B-C-D-E, BZ, GCS, Pupillen, Temperatur, EKG (QRS, QTc)',
      next: 'intox_atemdep',
    },
    intox_atemdep: {
      key: 'intox_atemdep',
      type: 'decision',
      label: 'Atemdepression / Miosis (Opioid-Toxidrom)?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'intox_naloxon' },
        { when: 'nein', label: 'Nein', to: 'intox_substanz' },
      ],
    },
    intox_naloxon: {
      key: 'intox_naloxon',
      type: 'action',
      label: 'Naloxon 0,4–2 mg i.v. (titrieren), ggf. Perfusor',
      redFlagKey: 'rf_intox_atemdep',
      next: 'intox_substanz',
    },
    intox_substanz: {
      key: 'intox_substanz',
      type: 'decision',
      label: 'Substanz bekannt?',
      driver: { kind: 'anamnese', questionKey: 'intox_substanz_bekannt' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'intox_paracetamol' },
        { when: 'nein', label: 'Nein', to: 'intox_toxscreen' },
      ],
    },
    intox_paracetamol: {
      key: 'intox_paracetamol',
      type: 'action',
      label: 'Spiegel (Paracetamol, Salicylat, EtOH, Methanol), Rumack-Matthew',
      detail: 'NAC bei Paracetamol-Intox; Fomepizol bei Methanol/Ethylenglykol',
      redFlagKey: 'rf_intox_paracetamol',
      next: 'intox_qrs',
    },
    intox_toxscreen: {
      key: 'intox_toxscreen',
      type: 'action',
      label: 'Tox-Screening, Giftnotruf, fremdanamnese',
      next: 'intox_qrs',
    },
    intox_qrs: {
      key: 'intox_qrs',
      type: 'decision',
      label: 'QRS-Verbreiterung / QTc > 500 ms?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'intox_qrs_tx' },
        { when: 'nein', label: 'Nein', to: 'intox_disposition' },
      ],
    },
    intox_qrs_tx: {
      key: 'intox_qrs_tx',
      type: 'action',
      label: 'Natriumbikarbonat (TCA), MgSO₄ bei QTc / Torsades',
      redFlagKey: 'rf_intox_qt',
      next: 'intox_disposition',
    },
    intox_disposition: {
      key: 'intox_disposition',
      type: 'disposition',
      label: 'Mind. 6 h Monitoring; bei Retardpräparat 24 h; psych. Anbindung',
    },
  },
};

export const sepsisFlow: FlowchartDef = {
  symptomKey: 'sepsis',
  rootKey: 'sep_qsofa',
  nodes: {
    sep_qsofa: {
      key: 'sep_qsofa',
      type: 'action',
      label: 'qSOFA-Screening + Vitalwerte + Laktat',
      scoreKey: 'qsofa',
      next: 'sep_bundle',
    },
    sep_bundle: {
      key: 'sep_bundle',
      type: 'action',
      label: 'Hour-1-Bundle: BK ×2, breite AB ≤ 1 h, Volumen 30 ml/kg, Laktat-Verlauf',
      redFlagKey: 'rf_sep_qsofa',
      next: 'sep_fokus',
    },
    sep_fokus: {
      key: 'sep_fokus',
      type: 'decision',
      label: 'Infektfokus klinisch erkennbar?',
      driver: { kind: 'anamnese', questionKey: 'sep_fokus_bekannt' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'sep_fokus_tx' },
        { when: 'nein', label: 'Nein', to: 'sep_fokussuche' },
      ],
    },
    sep_fokus_tx: {
      key: 'sep_fokus_tx',
      type: 'action',
      label: 'Fokusabhängige Diagnostik + Sanierung (Drainage, OP)',
      next: 'sep_meningismus',
    },
    sep_fokussuche: {
      key: 'sep_fokussuche',
      type: 'action',
      label: 'Erweiterte Fokussuche (Echo, CT, Liquor, Urin, Wundabstriche)',
      redFlagKey: 'rf_sep_infektquelle',
      next: 'sep_meningismus',
    },
    sep_meningismus: {
      key: 'sep_meningismus',
      type: 'decision',
      label: 'Meningismus / Petechien?',
      driver: { kind: 'anamnese', questionKey: 'sep_petechien' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'sep_men_tx' },
        { when: 'nein', label: 'Nein', to: 'sep_laktat' },
      ],
    },
    sep_men_tx: {
      key: 'sep_men_tx',
      type: 'action',
      label: 'AB + Dexa (Meningitis) / Isolation (Meningokokken), LP nach CCT',
      redFlagKey: 'rf_sep_meningismus',
      next: 'sep_laktat',
    },
    sep_laktat: {
      key: 'sep_laktat',
      type: 'decision',
      label: 'Laktat ≥ 4 mmol/l oder Hypotonie trotz Volumen?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'sep_vaso' },
        { when: 'nein', label: 'Nein', to: 'sep_disposition' },
      ],
    },
    sep_vaso: {
      key: 'sep_vaso',
      type: 'action',
      label: 'Vasopressor (Noradrenalin) + Intensiv',
      redFlagKey: 'rf_sep_laktat',
      next: 'sep_disposition',
    },
    sep_disposition: {
      key: 'sep_disposition',
      type: 'disposition',
      label: 'IMC bei Sepsis; Intensiv bei septischem Schock',
    },
  },
};

export const anaphylaxieFlow: FlowchartDef = {
  symptomKey: 'anaphylaxie',
  rootKey: 'ana_grad',
  nodes: {
    ana_grad: {
      key: 'ana_grad',
      type: 'decision',
      label: 'Schweregrad?',
      driver: { kind: 'manual' },
      edges: [
        { when: '1', label: 'I (Haut)', to: 'ana_grad1' },
        { when: '2', label: 'II (+ GI/Resp)', to: 'ana_adrenalin' },
        { when: '3', label: 'III (Schock)', to: 'ana_adrenalin' },
        { when: '4', label: 'IV (Stillstand)', to: 'ana_cpr' },
      ],
    },
    ana_grad1: {
      key: 'ana_grad1',
      type: 'action',
      label: 'H1- + H2-Blocker + Prednisolon 100 mg, Beobachtung 6 h',
      next: 'ana_disposition',
    },
    ana_adrenalin: {
      key: 'ana_adrenalin',
      type: 'action',
      label: 'Adrenalin 0,5 mg i.m. (anterolateraler Oberschenkel) — wiederholen alle 5–10 min',
      detail: 'Zusätzlich H1+H2, Steroid, Volumen 20 ml/kg, O₂',
      redFlagKey: 'rf_ana_schock',
      next: 'ana_stridor',
    },
    ana_cpr: {
      key: 'ana_cpr',
      type: 'action',
      label: 'Reanimation + Adrenalin 1 mg i.v. + Intubation',
      redFlagKey: 'rf_ana_bewusst',
      next: 'ana_disposition',
    },
    ana_stridor: {
      key: 'ana_stridor',
      type: 'decision',
      label: 'Stridor / Larynxödem?',
      driver: { kind: 'anamnese', questionKey: 'ana_stridor' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ana_stridor_tx' },
        { when: 'nein', label: 'Nein', to: 'ana_bronchospasmus' },
      ],
    },
    ana_stridor_tx: {
      key: 'ana_stridor_tx',
      type: 'action',
      label: 'Adrenalin vernebelt 5 mg + HNO + Intubationsbereitschaft',
      redFlagKey: 'rf_ana_stridor',
      next: 'ana_bronchospasmus',
    },
    ana_bronchospasmus: {
      key: 'ana_bronchospasmus',
      type: 'action',
      label: 'Salbutamol DA + ggf. MgSO₄',
      next: 'ana_disposition',
    },
    ana_disposition: {
      key: 'ana_disposition',
      type: 'disposition',
      label: 'Beobachtung 6–24 h (biphasischer Verlauf), Notfallset + Allergologie',
    },
  },
};

export const allgemeinFlow: FlowchartDef = {
  symptomKey: 'allgemein',
  rootKey: 'all_screen',
  nodes: {
    all_screen: {
      key: 'all_screen',
      type: 'action',
      label: 'Vollständige Anamnese (SAMPLER) + Vitalwerte + Basis-Labor',
      next: 'all_red',
    },
    all_red: {
      key: 'all_red',
      type: 'decision',
      label: 'NEWS2 ≥ 5 oder qSOFA ≥ 2?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'all_intensiv' },
        { when: 'nein', label: 'Nein', to: 'all_symptom' },
      ],
    },
    all_intensiv: {
      key: 'all_intensiv',
      type: 'action',
      label: 'Engmaschige Reevaluation, ggf. IMC',
      scoreKey: 'news2',
      next: 'all_disposition',
    },
    all_symptom: {
      key: 'all_symptom',
      type: 'action',
      label: 'Hauptbeschwerde herausarbeiten → spezifischen Pathway wählen',
      next: 'all_disposition',
    },
    all_disposition: {
      key: 'all_disposition',
      type: 'disposition',
      label: 'Disposition nach Befunden und Verlauf',
    },
  },
};

export const otherFlows = [
  ruekenFlankeFlow,
  intoxikationFlow,
  sepsisFlow,
  anaphylaxieFlow,
  allgemeinFlow,
];
