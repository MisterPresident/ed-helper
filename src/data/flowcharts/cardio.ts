import type { FlowchartDef } from '../../types';

export const thoraxschmerzFlow: FlowchartDef = {
  symptomKey: 'thoraxschmerz',
  rootKey: 'thx_ekg',
  nodes: {
    thx_ekg: {
      key: 'thx_ekg',
      type: 'action',
      label: '12-Kanal-EKG ≤ 10 min + Vitalzeichen + Monitor',
      next: 'thx_stemi',
    },
    thx_stemi: {
      key: 'thx_stemi',
      type: 'decision',
      label: 'STEMI / NSTEMI-Äquivalent?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'thx_pci' },
        { when: 'nein', label: 'Nein', to: 'thx_dissektion' },
      ],
    },
    thx_pci: {
      key: 'thx_pci',
      type: 'action',
      label: 'Herzkatheter aktivieren (Door-to-Balloon ≤ 90 min)',
      detail: 'ASS 250 mg, Heparin, P2Y12-Inhibitor nach lokalem Standard',
      redFlagKey: 'rf_thx_acs',
      next: 'thx_disposition',
    },
    thx_dissektion: {
      key: 'thx_dissektion',
      type: 'decision',
      label: 'Reißender Schmerz + Ausstrahlung Rücken + BD-Differenz > 20 mmHg?',
      driver: { kind: 'anamnese', questionKey: 'thx_ausstrahlung' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'thx_dissekt_tx' },
        { when: 'nein', label: 'Nein', to: 'thx_pneumo' },
      ],
    },
    thx_dissekt_tx: {
      key: 'thx_dissekt_tx',
      type: 'action',
      label: 'CT-Angio Aorta + Herzchirurgie',
      detail: 'BD an beiden Armen messen, Esmolol/Labetalol; Schmerzkontrolle',
      redFlagKey: 'rf_thx_dissektion',
      next: 'thx_disposition',
    },
    thx_pneumo: {
      key: 'thx_pneumo',
      type: 'decision',
      label: 'Einseitig fehlendes AG + Hypotonie + gestaute Halsvenen?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'thx_pneumo_tx' },
        { when: 'nein', label: 'Nein', to: 'thx_lae' },
      ],
    },
    thx_pneumo_tx: {
      key: 'thx_pneumo_tx',
      type: 'action',
      label: 'Sofortentlastung (2./3. ICR MCL oder 4./5. ICR vord. Axillarlinie)',
      redFlagKey: 'rf_thx_spannungspneu',
      next: 'thx_disposition',
    },
    thx_lae: {
      key: 'thx_lae',
      type: 'decision',
      label: 'Dyspnoe + Immobilisation/OP/Malignom?',
      driver: { kind: 'anamnese', questionKey: 'thx_immobil' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'thx_wells' },
        { when: 'nein', label: 'Nein', to: 'thx_acs_wfu' },
      ],
    },
    thx_wells: {
      key: 'thx_wells',
      type: 'action',
      label: 'Wells/Geneva-Score + D-Dimer, ggf. CT-Angio',
      scoreKey: 'wellsPE',
      redFlagKey: 'rf_thx_lae',
      next: 'thx_acs_wfu',
    },
    thx_acs_wfu: {
      key: 'thx_acs_wfu',
      type: 'action',
      label: 'HEART-Score + Troponin seriell (0/3 h)',
      detail: 'Bei HEART ≤ 3 + neg. Troponin: niedriges Risiko, ambulante Abklärung erwägen',
      scoreKey: 'heart',
      next: 'thx_disposition',
    },
    thx_disposition: {
      key: 'thx_disposition',
      type: 'disposition',
      label: 'Disposition nach HEART + Befunden',
      detail: 'HEART ≥ 4 oder Troponin-Dynamik → CCU/IMC. Niedrigrisiko → ambulante Stresstestung.',
    },
  },
};

export const palpitationenFlow: FlowchartDef = {
  symptomKey: 'palpitationen',
  rootKey: 'palp_instabil',
  nodes: {
    palp_instabil: {
      key: 'palp_instabil',
      type: 'decision',
      label: 'Instabil (Hypotonie, Synkope, Thoraxschmerz, Lungenödem)?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'palp_kardioversion' },
        { when: 'nein', label: 'Nein', to: 'palp_breit' },
      ],
    },
    palp_kardioversion: {
      key: 'palp_kardioversion',
      type: 'action',
      label: 'Sofortige synchronisierte Kardioversion (Analgosedierung)',
      redFlagKey: 'rf_palp_instabil',
      next: 'palp_disposition',
    },
    palp_breit: {
      key: 'palp_breit',
      type: 'decision',
      label: 'EKG: QRS ≥ 120 ms (breite Tachykardie)?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'palp_vt' },
        { when: 'nein', label: 'Nein', to: 'palp_regelmaessig' },
      ],
    },
    palp_vt: {
      key: 'palp_vt',
      type: 'action',
      label: 'VT bis Gegenbeweis → Amiodaron 300 mg i.v., kein AV-Blocker bei WPW/FBI',
      detail: 'Bei FBI-Tachykardie (Breit + Unregelmäßig): Procainamid/Kardioversion',
      next: 'palp_disposition',
    },
    palp_regelmaessig: {
      key: 'palp_regelmaessig',
      type: 'decision',
      label: 'Regelmäßig?',
      driver: { kind: 'anamnese', questionKey: 'palp_regelmaessig' },
      edges: [
        { when: 'ja', label: 'Ja (SVT)', to: 'palp_vagal' },
        { when: 'nein', label: 'Nein (VHF)', to: 'palp_vhf' },
      ],
    },
    palp_vagal: {
      key: 'palp_vagal',
      type: 'action',
      label: 'Vagusmanöver / Adenosin 6→12 mg i.v.',
      detail: 'Bei Persistenz: Betablocker, Ca-Antagonist',
      next: 'palp_disposition',
    },
    palp_vhf: {
      key: 'palp_vhf',
      type: 'action',
      label: 'VHF-Management: Frequenz vs. Rhythmuskontrolle + CHA₂DS₂-VASc',
      detail: 'Bei < 48 h Anamnese ggf. Kardioversion erwägen, sonst TEE oder OAK vorab',
      next: 'palp_disposition',
    },
    palp_disposition: {
      key: 'palp_disposition',
      type: 'disposition',
      label: 'Aufnahme bei instabiler / neu diagnostizierter Arrhythmie',
      detail: 'Ambulant bei stabiler bekannter SVT mit terminiertem Anfall',
    },
  },
};

export const bradykardieFlow: FlowchartDef = {
  symptomKey: 'bradykardie',
  rootKey: 'brady_instabil',
  nodes: {
    brady_instabil: {
      key: 'brady_instabil',
      type: 'decision',
      label: 'Instabil (Hypotonie, Synkope, Brustschmerz, HI)?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'brady_av' },
        { when: 'nein', label: 'Nein', to: 'brady_hyperkal' },
      ],
    },
    brady_av: {
      key: 'brady_av',
      type: 'decision',
      label: 'EKG: AV-Block II° Typ 2 oder III°?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'brady_pacing' },
        { when: 'nein', label: 'Nein', to: 'brady_atropin' },
      ],
    },
    brady_atropin: {
      key: 'brady_atropin',
      type: 'action',
      label: 'Atropin 0,5 mg i.v. (max 3 mg)',
      detail: 'Bei Nicht-Ansprechen: Adrenalin-Perfusor 2–10 µg/min oder transkutanes Pacing',
      next: 'brady_pacing',
    },
    brady_pacing: {
      key: 'brady_pacing',
      type: 'action',
      label: 'Transkutanes Pacing → transvenöses Pacing, Kardiologie',
      redFlagKey: 'rf_brady_av3',
      next: 'brady_hyperkal',
    },
    brady_hyperkal: {
      key: 'brady_hyperkal',
      type: 'decision',
      label: 'EKG: Peaked T, breiter QRS, Sinus-Wave?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'brady_kalzium' },
        { when: 'nein', label: 'Nein', to: 'brady_brash' },
      ],
    },
    brady_kalzium: {
      key: 'brady_kalzium',
      type: 'action',
      label: 'Ca-Gluconat 10 % 10–30 ml i.v. + Insulin/Glukose + Dialyse',
      redFlagKey: 'rf_brady_hyperkal',
      next: 'brady_brash',
    },
    brady_brash: {
      key: 'brady_brash',
      type: 'decision',
      label: 'AV-Blocker + Niereninsuffizienz?',
      driver: { kind: 'anamnese', questionKey: 'brady_niereninsuffizienz' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'brady_brash_tx' },
        { when: 'nein', label: 'Nein', to: 'brady_disposition' },
      ],
    },
    brady_brash_tx: {
      key: 'brady_brash_tx',
      type: 'action',
      label: 'BRASH-Pathway: Volumen + Ca + AV-Blocker pausieren + K⁺-Senkung',
      next: 'brady_disposition',
    },
    brady_disposition: {
      key: 'brady_disposition',
      type: 'disposition',
      label: 'Stationär (Telemetrie/IMC) bei symptomatischer/AV-Block-Bradykardie',
      detail: 'Ambulant bei asymptomatischer Sinusbradykardie ohne Begleiterkrankung',
    },
  },
};

export const hypertensivFlow: FlowchartDef = {
  symptomKey: 'hypertensiv',
  rootKey: 'hyp_emergency',
  nodes: {
    hyp_emergency: {
      key: 'hyp_emergency',
      type: 'decision',
      label: 'Endorganschaden vorhanden?',
      detail: 'Neuro, Thoraxschmerz, Dyspnoe, Sehstörung, Krampfanfall, Eklampsie',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Emergency', to: 'hyp_emergency_tx' },
        { when: 'nein', label: 'Urgency', to: 'hyp_urgency' },
      ],
    },
    hyp_emergency_tx: {
      key: 'hyp_emergency_tx',
      type: 'action',
      label: 'Kontrollierte BD-Senkung i.v. (max 25 % in 1. Stunde)',
      detail: 'Mittel: Urapidil, Nitroglycerin, Labetalol — Auswahl nach Endorgan',
      next: 'hyp_endorgan',
    },
    hyp_endorgan: {
      key: 'hyp_endorgan',
      type: 'decision',
      label: 'Welcher Endorganschaden dominiert?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ze', label: 'ZNS / SAB / ICB', to: 'hyp_zns' },
        { when: 'aorta', label: 'Aortendissektion', to: 'hyp_aorta' },
        { when: 'lunge', label: 'Lungenödem', to: 'hyp_lunge' },
        { when: 'eklampsie', label: 'Eklampsie', to: 'hyp_eklampsie' },
      ],
    },
    hyp_zns: {
      key: 'hyp_zns',
      type: 'action',
      label: 'CCT, Neurologie; Ziel-RR je nach Pathologie (ICB: < 140; ischäm. Stroke: konservativ)',
      redFlagKey: 'rf_hyp_enzephalopathie',
      next: 'hyp_disposition',
    },
    hyp_aorta: {
      key: 'hyp_aorta',
      type: 'action',
      label: 'Esmolol/Labetalol (HF + BD), Ziel-RR < 120 syst., CT-Angio Aorta',
      redFlagKey: 'rf_hyp_dissektion',
      next: 'hyp_disposition',
    },
    hyp_lunge: {
      key: 'hyp_lunge',
      type: 'action',
      label: 'Nitro-Perfusor + CPAP/NIV + Furosemid',
      redFlagKey: 'rf_hyp_lungenoedem',
      next: 'hyp_disposition',
    },
    hyp_eklampsie: {
      key: 'hyp_eklampsie',
      type: 'action',
      label: 'Magnesium 4–6 g i.v., Labetalol, sofort Gyn',
      redFlagKey: 'rf_hyp_eklampsie',
      next: 'hyp_disposition',
    },
    hyp_urgency: {
      key: 'hyp_urgency',
      type: 'action',
      label: 'Orale Senkung (z.B. Amlodipin/Captopril), keine schnelle i.v.-Senkung',
      detail: 'Ursachen suchen (Schmerz, Stress, vergessene Antihypertensiva)',
      next: 'hyp_disposition',
    },
    hyp_disposition: {
      key: 'hyp_disposition',
      type: 'disposition',
      label: 'Emergency → IMC/Intensiv; Urgency → ambulant mit Nachsorge ≤ 72 h',
    },
  },
};

export const dyspnoeFlow: FlowchartDef = {
  symptomKey: 'dyspnoe',
  rootKey: 'dysp_a',
  nodes: {
    dysp_a: {
      key: 'dysp_a',
      type: 'decision',
      label: 'Stridor oder Schluckbeschwerden (Atemwegsproblem)?',
      driver: { kind: 'anamnese', questionKey: 'dysp_stridor' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'dysp_a_tx' },
        { when: 'nein', label: 'Nein', to: 'dysp_pneumo' },
      ],
    },
    dysp_a_tx: {
      key: 'dysp_a_tx',
      type: 'action',
      label: 'Atemwegsmanagement: HNO/Anästhesie, Intubationsbereitschaft',
      detail: 'Anaphylaxie? → Adrenalin 0,5 mg i.m. sofort',
      next: 'dysp_pneumo',
    },
    dysp_pneumo: {
      key: 'dysp_pneumo',
      type: 'decision',
      label: 'Einseitig fehlendes AG + Hypotonie?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'dysp_pneumo_tx' },
        { when: 'nein', label: 'Nein', to: 'dysp_orthopnoe' },
      ],
    },
    dysp_pneumo_tx: {
      key: 'dysp_pneumo_tx',
      type: 'action',
      label: 'V.a. Spannungspneumothorax → Sofortentlastung',
      redFlagKey: 'rf_dysp_spannungspneu',
      next: 'dysp_disposition',
    },
    dysp_orthopnoe: {
      key: 'dysp_orthopnoe',
      type: 'decision',
      label: 'Orthopnoe + feuchte RGs bds?',
      driver: { kind: 'anamnese', questionKey: 'dysp_orthopnoe' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'dysp_lungenoedem' },
        { when: 'nein', label: 'Nein', to: 'dysp_lae' },
      ],
    },
    dysp_lungenoedem: {
      key: 'dysp_lungenoedem',
      type: 'action',
      label: 'CPAP + Nitro + Furosemid (SCAPE-Pathway)',
      redFlagKey: 'rf_dysp_lungenoedem',
      next: 'dysp_disposition',
    },
    dysp_lae: {
      key: 'dysp_lae',
      type: 'decision',
      label: 'TVT/LAE-Risiko (Wells)?',
      driver: { kind: 'anamnese', questionKey: 'dysp_tvt_lae' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'dysp_lae_tx' },
        { when: 'nein', label: 'Nein', to: 'dysp_copd' },
      ],
    },
    dysp_lae_tx: {
      key: 'dysp_lae_tx',
      type: 'action',
      label: 'Wells/PERC → D-Dimer / CT-Angio',
      scoreKey: 'wellsPE',
      redFlagKey: 'rf_dysp_lae',
      next: 'dysp_copd',
    },
    dysp_copd: {
      key: 'dysp_copd',
      type: 'decision',
      label: 'Bekannte COPD/Asthma + exspiratorisches Giemen?',
      driver: { kind: 'anamnese', questionKey: 'dysp_copd_asthma' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'dysp_copd_tx' },
        { when: 'nein', label: 'Nein', to: 'dysp_pneumonie' },
      ],
    },
    dysp_copd_tx: {
      key: 'dysp_copd_tx',
      type: 'action',
      label: 'Salbutamol + Ipratropium DA, Steroide; ggf. NIV (COPD), MgSO₄ (Asthma)',
      detail: 'Silent chest = Maximalvariante → Intensiv',
      redFlagKey: 'rf_dysp_silentchest',
      next: 'dysp_disposition',
    },
    dysp_pneumonie: {
      key: 'dysp_pneumonie',
      type: 'action',
      label: 'CURB-65 / CRB-65 + Rö-Thorax + AB nach lokalem Standard',
      scoreKey: 'curb65',
      next: 'dysp_disposition',
    },
    dysp_disposition: {
      key: 'dysp_disposition',
      type: 'disposition',
      label: 'Disposition nach NEWS2 + Ursache',
      detail: 'NEWS2 ≥ 5 → Intermediate Care / engmaschige Reevaluation',
    },
  },
};

export const cardioFlows = [
  thoraxschmerzFlow,
  palpitationenFlow,
  bradykardieFlow,
  hypertensivFlow,
  dyspnoeFlow,
];
