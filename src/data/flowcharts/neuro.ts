import type { FlowchartDef } from '../../types';

export const kopfschmerzFlow: FlowchartDef = {
  symptomKey: 'kopfschmerz',
  rootKey: 'kopf_thunderclap',
  nodes: {
    kopf_thunderclap: {
      key: 'kopf_thunderclap',
      type: 'decision',
      label: 'Donnerschlag-Kopfschmerz (max. in < 1 min)?',
      driver: { kind: 'anamnese', questionKey: 'kopf_thunderclap' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'kopf_sab_tx' },
        { when: 'nein', label: 'Nein', to: 'kopf_meningismus' },
      ],
    },
    kopf_sab_tx: {
      key: 'kopf_sab_tx',
      type: 'action',
      label: 'CCT sofort, bei Negativbefund LP (Xanthochromie)',
      redFlagKey: 'rf_kopf_sab',
      next: 'kopf_meningismus',
    },
    kopf_meningismus: {
      key: 'kopf_meningismus',
      type: 'decision',
      label: 'Fieber + Meningismus?',
      driver: { kind: 'anamnese', questionKey: 'kopf_meningismus' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'kopf_meningitis_tx' },
        { when: 'nein', label: 'Nein', to: 'kopf_fokal' },
      ],
    },
    kopf_meningitis_tx: {
      key: 'kopf_meningitis_tx',
      type: 'action',
      label: 'BK + empirische AB + Dexamethason ≤ 1 h, LP nach CCT',
      detail: 'Empirisch: Ceftriaxon + Ampicillin (± Aciclovir bei Enzephalitis)',
      redFlagKey: 'rf_kopf_meningitis',
      next: 'kopf_disposition',
    },
    kopf_fokal: {
      key: 'kopf_fokal',
      type: 'decision',
      label: 'Fokales Defizit / Vigilanz ↓ / Antikoagulation?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'kopf_icb_tx' },
        { when: 'nein', label: 'Nein', to: 'kopf_arteriitis' },
      ],
    },
    kopf_icb_tx: {
      key: 'kopf_icb_tx',
      type: 'action',
      label: 'CCT, ggf. Gerinnungsantagonisierung',
      redFlagKey: 'rf_kopf_icb',
      next: 'kopf_disposition',
    },
    kopf_arteriitis: {
      key: 'kopf_arteriitis',
      type: 'decision',
      label: '> 50 J + temporale Schmerz / Kauclaudicatio / Visusverlust?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'kopf_arteriitis_tx' },
        { when: 'nein', label: 'Nein', to: 'kopf_glaukom' },
      ],
    },
    kopf_arteriitis_tx: {
      key: 'kopf_arteriitis_tx',
      type: 'action',
      label: 'BSG/CRP + Sofort-Steroid (Prednisolon 60–100 mg), Biopsie ≤ 2 Wochen',
      redFlagKey: 'rf_kopf_arteriitis',
      next: 'kopf_disposition',
    },
    kopf_glaukom: {
      key: 'kopf_glaukom',
      type: 'decision',
      label: 'Rotes Auge + Visusverlust + harter Bulbus?',
      driver: { kind: 'anamnese', questionKey: 'kopf_visus' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'kopf_glaukom_tx' },
        { when: 'nein', label: 'Nein', to: 'kopf_primaer' },
      ],
    },
    kopf_glaukom_tx: {
      key: 'kopf_glaukom_tx',
      type: 'action',
      label: 'Sofort Augenklinik',
      redFlagKey: 'rf_kopf_glaukom',
      next: 'kopf_disposition',
    },
    kopf_primaer: {
      key: 'kopf_primaer',
      type: 'action',
      label: 'Symptomatische Therapie (NSAR/Triptan), Migräne-Therapie',
      next: 'kopf_disposition',
    },
    kopf_disposition: {
      key: 'kopf_disposition',
      type: 'disposition',
      label: 'Disposition nach Ursache',
      detail: 'Sekundär (SAB, Meningitis, ICB, Arteriitis) → stationär; primär → ambulant',
    },
  },
};

export const synkopeFlow: FlowchartDef = {
  symptomKey: 'synkope',
  rootKey: 'syn_ekg',
  nodes: {
    syn_ekg: {
      key: 'syn_ekg',
      type: 'action',
      label: '12-Kanal-EKG + Orthostase + Vitalwerte',
      next: 'syn_kardio',
    },
    syn_kardio: {
      key: 'syn_kardio',
      type: 'decision',
      label: 'Hinweise auf kardiogene Synkope?',
      detail: 'Belastungssynkope, Palpitationen davor, familiäre SCD, struktur. HK',
      driver: { kind: 'anamnese', questionKey: 'syn_belastung' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'syn_kardio_tx' },
        { when: 'nein', label: 'Nein', to: 'syn_lae' },
      ],
    },
    syn_kardio_tx: {
      key: 'syn_kardio_tx',
      type: 'action',
      label: 'Telemetrie, Troponin, Echo, Kardiologie',
      redFlagKey: 'rf_syn_kardiogen',
      next: 'syn_lae',
    },
    syn_lae: {
      key: 'syn_lae',
      type: 'decision',
      label: 'Synkope + Dyspnoe / Tachykardie / Risikofaktor?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'syn_lae_tx' },
        { when: 'nein', label: 'Nein', to: 'syn_blutung' },
      ],
    },
    syn_lae_tx: {
      key: 'syn_lae_tx',
      type: 'action',
      label: 'Wells/PERC + D-Dimer + CT-Angio',
      scoreKey: 'wellsPE',
      redFlagKey: 'rf_syn_lae',
      next: 'syn_blutung',
    },
    syn_blutung: {
      key: 'syn_blutung',
      type: 'decision',
      label: 'Synkope + GI-Blutung / Bauchschmerz?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'syn_blutung_tx' },
        { when: 'nein', label: 'Nein', to: 'syn_score' },
      ],
    },
    syn_blutung_tx: {
      key: 'syn_blutung_tx',
      type: 'action',
      label: 'Hb, Sono Abdomen, ggf. CT (AAA, GIB, ektop)',
      redFlagKey: 'rf_syn_aaa',
      next: 'syn_score',
    },
    syn_score: {
      key: 'syn_score',
      type: 'action',
      label: 'Risiko-Score (SFSR / CSRS / ROSE)',
      scoreKey: 'csrs',
      next: 'syn_disposition',
    },
    syn_disposition: {
      key: 'syn_disposition',
      type: 'disposition',
      label: 'Disposition nach Score + Befunden',
      detail: 'Hochrisiko → stationär/Telemetrie; Niedrigrisiko (vasovagal) → ambulant',
    },
  },
};

export const schwindelFlow: FlowchartDef = {
  symptomKey: 'schwindel',
  rootKey: 'schw_neuro',
  nodes: {
    schw_neuro: {
      key: 'schw_neuro',
      type: 'decision',
      label: 'Doppelbilder / Dysarthrie / Gangstörung (zentrale Hinweise)?',
      driver: { kind: 'anamnese', questionKey: 'schw_neuro' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'schw_zentral' },
        { when: 'nein', label: 'Nein', to: 'schw_hints' },
      ],
    },
    schw_zentral: {
      key: 'schw_zentral',
      type: 'action',
      label: 'Stroke-Pathway → MRT/CT, Neurologie',
      redFlagKey: 'rf_schw_hirnstamm',
      next: 'schw_disposition',
    },
    schw_hints: {
      key: 'schw_hints',
      type: 'decision',
      label: 'HINTS-Befund pathologisch (skew, dir-changing Nystagmus, normaler HIT)?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja → zentral', to: 'schw_zentral_tx' },
        { when: 'nein', label: 'Nein → peripher', to: 'schw_lage' },
      ],
    },
    schw_zentral_tx: {
      key: 'schw_zentral_tx',
      type: 'action',
      label: 'MRT mit DWI, Stroke-Team',
      redFlagKey: 'rf_schw_hints',
      next: 'schw_disposition',
    },
    schw_lage: {
      key: 'schw_lage',
      type: 'decision',
      label: 'Lageabhängig provozierbar (BPPV)?',
      driver: { kind: 'anamnese', questionKey: 'schw_lage' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'schw_bppv_tx' },
        { when: 'nein', label: 'Nein', to: 'schw_neuritis' },
      ],
    },
    schw_bppv_tx: {
      key: 'schw_bppv_tx',
      type: 'action',
      label: 'Dix-Hallpike + Epley-Manöver',
      next: 'schw_disposition',
    },
    schw_neuritis: {
      key: 'schw_neuritis',
      type: 'action',
      label: 'Neuritis vestibularis vs. Menière (Hörverlust?), symptomatische Therapie',
      next: 'schw_disposition',
    },
    schw_disposition: {
      key: 'schw_disposition',
      type: 'disposition',
      label: 'Zentraler Schwindel → Stroke-Unit; peripher → ambulant',
    },
  },
};

export const shtFlow: FlowchartDef = {
  symptomKey: 'sht',
  rootKey: 'sht_gcs',
  nodes: {
    sht_gcs: {
      key: 'sht_gcs',
      type: 'decision',
      label: 'GCS ≤ 13?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'sht_cct_now' },
        { when: 'nein', label: 'Nein', to: 'sht_antikoag' },
      ],
    },
    sht_cct_now: {
      key: 'sht_cct_now',
      type: 'action',
      label: 'CCT sofort + Trauma-Team',
      redFlagKey: 'rf_sht_gcs',
      next: 'sht_hws',
    },
    sht_antikoag: {
      key: 'sht_antikoag',
      type: 'decision',
      label: 'Antikoagulation (NOAK / Marcumar / DAPT)?',
      driver: { kind: 'anamnese', questionKey: 'sht_antikoag' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'sht_antikoag_tx' },
        { when: 'nein', label: 'Nein', to: 'sht_canadian' },
      ],
    },
    sht_antikoag_tx: {
      key: 'sht_antikoag_tx',
      type: 'action',
      label: 'CCT obligat, ggf. Antagonisierung (Idarucizumab, PCC, Andexanet)',
      redFlagKey: 'rf_sht_antikoag',
      next: 'sht_hws',
    },
    sht_canadian: {
      key: 'sht_canadian',
      type: 'action',
      label: 'Canadian-CT-Head-Score zur CCT-Indikation',
      scoreKey: 'canadianCTHead',
      next: 'sht_hws',
    },
    sht_hws: {
      key: 'sht_hws',
      type: 'decision',
      label: 'HWS-Schmerz oder NEXUS positiv?',
      driver: { kind: 'anamnese', questionKey: 'sht_hws_schmerz' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'sht_hws_tx' },
        { when: 'nein', label: 'Nein', to: 'sht_disposition' },
      ],
    },
    sht_hws_tx: {
      key: 'sht_hws_tx',
      type: 'action',
      label: 'Immobilisation + CT HWS',
      redFlagKey: 'rf_sht_hws',
      next: 'sht_disposition',
    },
    sht_disposition: {
      key: 'sht_disposition',
      type: 'disposition',
      label: 'Disposition nach CCT-Befund + Klinik',
      detail: 'Stationäre Überwachung bei Antikoagulation oder Anhalt für Blutung',
    },
  },
};

export const fokalNeuroFlow: FlowchartDef = {
  symptomKey: 'fokal_neuro',
  rootKey: 'fn_bz',
  nodes: {
    fn_bz: {
      key: 'fn_bz',
      type: 'action',
      label: 'BZ messen (Hypoglykämie als Stroke-Mimic ausschließen)',
      next: 'fn_akut',
    },
    fn_akut: {
      key: 'fn_akut',
      type: 'decision',
      label: 'Akut einsetzend (Sekunden bis Minuten)?',
      driver: { kind: 'anamnese', questionKey: 'fn_akut' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'fn_stroke' },
        { when: 'nein', label: 'Nein', to: 'fn_postiktal' },
      ],
    },
    fn_stroke: {
      key: 'fn_stroke',
      type: 'action',
      label: 'Stroke-Pathway: NIHSS + CCT + CT-Angio + Perfusion',
      detail: 'Lyse-/Thrombektomie-Fenster prüfen, Zeitpunkt LSN dokumentieren',
      scoreKey: 'nihss',
      redFlagKey: 'rf_stroke_lyse',
      next: 'fn_disposition',
    },
    fn_postiktal: {
      key: 'fn_postiktal',
      type: 'decision',
      label: 'Vorausgegangener Krampfanfall (Todd-Parese)?',
      driver: { kind: 'anamnese', questionKey: 'fn_postiktal' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'fn_todd' },
        { when: 'nein', label: 'Nein', to: 'fn_other' },
      ],
    },
    fn_todd: {
      key: 'fn_todd',
      type: 'action',
      label: 'Beobachtung (Todd-Parese rückläufig in Stunden), EEG',
      next: 'fn_disposition',
    },
    fn_other: {
      key: 'fn_other',
      type: 'action',
      label: 'CCT/MRT + erweiterte Diagnostik (Tumor, Migräne, FND)',
      next: 'fn_disposition',
    },
    fn_disposition: {
      key: 'fn_disposition',
      type: 'disposition',
      label: 'Stroke-Unit / Neurologie bei akutem Defizit',
      detail: 'TIA: ABCD2-Score + zeitnahe ambulante Abklärung möglich',
    },
  },
};

export const bewvFlow: FlowchartDef = {
  symptomKey: 'bewusstseinsveraenderung',
  rootKey: 'bwv_abc',
  nodes: {
    bwv_abc: {
      key: 'bwv_abc',
      type: 'action',
      label: 'A-B-C, BZ, Pupillen, GCS, Vitalwerte, Temperatur',
      detail: 'Sauerstoff bei SpO₂ < 94 %, Atemwege sichern',
      next: 'bwv_bz',
    },
    bwv_bz: {
      key: 'bwv_bz',
      type: 'decision',
      label: 'BZ < 70 mg/dl?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'bwv_glc' },
        { when: 'nein', label: 'Nein', to: 'bwv_intox' },
      ],
    },
    bwv_glc: {
      key: 'bwv_glc',
      type: 'action',
      label: 'Glucose 40 % 20 ml i.v. / Glucagon 1 mg i.m.',
      redFlagKey: 'rf_bwv_hypoglyk',
      next: 'bwv_disposition',
    },
    bwv_intox: {
      key: 'bwv_intox',
      type: 'decision',
      label: 'Hinweise auf Intoxikation (Miosis, Atemdepression, Anamnese)?',
      driver: { kind: 'anamnese', questionKey: 'bwv_intox_möglich' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'bwv_intox_tx' },
        { when: 'nein', label: 'Nein', to: 'bwv_fokal' },
      ],
    },
    bwv_intox_tx: {
      key: 'bwv_intox_tx',
      type: 'action',
      label: 'Naloxon / Flumazenil je nach Klinik, Giftnotruf',
      redFlagKey: 'rf_bwv_intox',
      next: 'bwv_disposition',
    },
    bwv_fokal: {
      key: 'bwv_fokal',
      type: 'decision',
      label: 'Fokales Defizit / Anisokorie / Antikoagulation?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'bwv_cct' },
        { when: 'nein', label: 'Nein', to: 'bwv_sepsis' },
      ],
    },
    bwv_cct: {
      key: 'bwv_cct',
      type: 'action',
      label: 'CCT sofort, ggf. Antagonisierung',
      redFlagKey: 'rf_bwv_icb',
      next: 'bwv_disposition',
    },
    bwv_sepsis: {
      key: 'bwv_sepsis',
      type: 'decision',
      label: 'Fieber + Vigilanz ↓ (Meningitis / Sepsis)?',
      driver: { kind: 'anamnese', questionKey: 'bwv_fieber' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'bwv_sepsis_tx' },
        { when: 'nein', label: 'Nein', to: 'bwv_lab' },
      ],
    },
    bwv_sepsis_tx: {
      key: 'bwv_sepsis_tx',
      type: 'action',
      label: 'Sepsis-Bundle + LP (nach CCT) + AB + Dexa + Aciclovir',
      redFlagKey: 'rf_bwv_sepsis',
      next: 'bwv_disposition',
    },
    bwv_lab: {
      key: 'bwv_lab',
      type: 'action',
      label: 'Labor: Na⁺, Ca²⁺, NH₃, BGA; Tox-Screening; EEG bei V.a. NKSE',
      redFlagKey: 'rf_bwv_nk_status',
      next: 'bwv_disposition',
    },
    bwv_disposition: {
      key: 'bwv_disposition',
      type: 'disposition',
      label: 'IMC/Intensiv bei persistierender Vigilanzminderung',
    },
  },
};

export const krampfFlow: FlowchartDef = {
  symptomKey: 'krampfanfall',
  rootKey: 'krampf_status',
  nodes: {
    krampf_status: {
      key: 'krampf_status',
      type: 'decision',
      label: 'Anfallsdauer > 5 min / repetitiv ohne Erholung?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'krampf_status_tx' },
        { when: 'nein', label: 'Nein', to: 'krampf_bz' },
      ],
    },
    krampf_status_tx: {
      key: 'krampf_status_tx',
      type: 'action',
      label: 'Lorazepam 4 mg i.v. (oder Midazolam 10 mg i.m.) → Levetiracetam 60 mg/kg',
      detail: 'Bei Persistenz: Intubation + Propofol, Neurologie/Intensiv',
      redFlagKey: 'rf_krampf_status',
      next: 'krampf_bz',
    },
    krampf_bz: {
      key: 'krampf_bz',
      type: 'action',
      label: 'BZ, Elektrolyte, BGA, Toxikologie',
      next: 'krampf_meningismus',
    },
    krampf_meningismus: {
      key: 'krampf_meningismus',
      type: 'decision',
      label: 'Fieber + Meningismus?',
      driver: { kind: 'anamnese', questionKey: 'krampf_fieber' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'krampf_meningitis_tx' },
        { when: 'nein', label: 'Nein', to: 'krampf_erstanfall' },
      ],
    },
    krampf_meningitis_tx: {
      key: 'krampf_meningitis_tx',
      type: 'action',
      label: 'AB + Aciclovir + Dexa, LP nach CCT',
      redFlagKey: 'rf_krampf_meningismus',
      next: 'krampf_erstanfall',
    },
    krampf_erstanfall: {
      key: 'krampf_erstanfall',
      type: 'decision',
      label: 'Erstanfall im Erwachsenenalter?',
      driver: { kind: 'anamnese', questionKey: 'krampf_erstanfall' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'krampf_erstanfall_tx' },
        { when: 'nein', label: 'Nein', to: 'krampf_synkope' },
      ],
    },
    krampf_erstanfall_tx: {
      key: 'krampf_erstanfall_tx',
      type: 'action',
      label: 'cCT/MRT + Labor, EEG ambulant, Fahrverbot',
      redFlagKey: 'rf_krampf_erstanfall',
      next: 'krampf_synkope',
    },
    krampf_synkope: {
      key: 'krampf_synkope',
      type: 'decision',
      label: 'Rasches Erwachen + < 10 Myoklonien (Verdacht konvulsive Synkope)?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'krampf_synkope_tx' },
        { when: 'nein', label: 'Nein', to: 'krampf_disposition' },
      ],
    },
    krampf_synkope_tx: {
      key: 'krampf_synkope_tx',
      type: 'action',
      label: 'EKG, Echo, Telemetrie → Synkopen-Workup',
      redFlagKey: 'rf_krampf_herz',
      next: 'krampf_disposition',
    },
    krampf_disposition: {
      key: 'krampf_disposition',
      type: 'disposition',
      label: 'Aufnahme bei Status / Erstanfall / Sekundärursache',
      detail: 'Bei bekannter Epilepsie + typischem Anfall + voller Erholung ambulant möglich',
    },
  },
};

export const neuroFlows = [
  kopfschmerzFlow,
  synkopeFlow,
  schwindelFlow,
  shtFlow,
  fokalNeuroFlow,
  bewvFlow,
  krampfFlow,
];
