import type { FlowchartDef } from '../../types';

export const arthritisFlow: FlowchartDef = {
  symptomKey: 'arthritis',
  rootKey: 'art_septisch',
  nodes: {
    art_septisch: {
      key: 'art_septisch',
      type: 'decision',
      label: 'Akute Monoarthritis + Fieber + Überwärmung?',
      detail: 'Septische Arthritis ist Notfall — bis zum Beweis des Gegenteils ausschließen',
      driver: { kind: 'anamnese', questionKey: 'art_fieber' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'art_punktion' },
        { when: 'nein', label: 'Nein', to: 'art_haemarthros' },
      ],
    },
    art_punktion: {
      key: 'art_punktion',
      type: 'action',
      label: 'Sofortige Gelenkpunktion vor AB-Gabe',
      detail: 'Zellzahl (> 50 000 → septisch), Gram, Kultur, Kristalle; BK ×2; empirisch Cefazolin / Vancomycin nach Risiko',
      redFlagKey: 'rf_arth_septisch',
      next: 'art_endokarditis',
    },
    art_endokarditis: {
      key: 'art_endokarditis',
      type: 'decision',
      label: 'Klappenersatz / i.v.-Drogen / neues Herzgeräusch?',
      driver: { kind: 'anamnese', questionKey: 'art_klappe_drogen' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'art_endo_tx' },
        { when: 'nein', label: 'Nein', to: 'art_disposition' },
      ],
    },
    art_endo_tx: {
      key: 'art_endo_tx',
      type: 'action',
      label: 'V.a. infektiöse Endokarditis → BK ×3, TTE/TEE, Kardiologie',
      redFlagKey: 'rf_arth_endokarditis',
      next: 'art_disposition',
    },
    art_haemarthros: {
      key: 'art_haemarthros',
      type: 'decision',
      label: 'Antikoagulation / Hämophilie / Trauma?',
      driver: { kind: 'anamnese', questionKey: 'art_antikoag' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'art_haemar_tx' },
        { when: 'nein', label: 'Nein', to: 'art_mono_poly' },
      ],
    },
    art_haemar_tx: {
      key: 'art_haemar_tx',
      type: 'action',
      label: 'V.a. Hämarthros → INR/Faktoren, ggf. Antagonisierung, Bildgebung',
      redFlagKey: 'rf_arth_haemarthros',
      next: 'art_mono_poly',
    },
    art_mono_poly: {
      key: 'art_mono_poly',
      type: 'decision',
      label: 'Monoarthritis oder Polyarthritis?',
      driver: { kind: 'anamnese', questionKey: 'art_mono' },
      edges: [
        { when: 'ja', label: 'Mono (1 Gelenk)', to: 'art_mono_workup' },
        { when: 'nein', label: 'Poly (> 1)', to: 'art_poly_workup' },
      ],
    },
    art_mono_workup: {
      key: 'art_mono_workup',
      type: 'action',
      label: 'Punktion + Kristallanalyse',
      detail: 'Urat (nadelförmig, neg. doppelbrechend) → Gicht; CPPD (rhomb., pos.) → Pseudogicht',
      next: 'art_reaktiv',
    },
    art_poly_workup: {
      key: 'art_poly_workup',
      type: 'action',
      label: 'Labor: BSG, CRP, RF, anti-CCP, ANA, Komplement; Hände/Füße-Rö',
      redFlagKey: 'rf_arth_polyarthritis',
      next: 'art_reaktiv',
    },
    art_reaktiv: {
      key: 'art_reaktiv',
      type: 'decision',
      label: 'Uro-/GI-Infekt in den letzten 6 Wochen?',
      driver: { kind: 'anamnese', questionKey: 'art_uro_gi_infekt' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'art_reaktiv_tx' },
        { when: 'nein', label: 'Nein', to: 'art_lyme' },
      ],
    },
    art_reaktiv_tx: {
      key: 'art_reaktiv_tx',
      type: 'action',
      label: 'V.a. reaktive Arthritis → Erregerdiagnostik (Chlamydia, Yersinia, Campy)',
      next: 'art_disposition',
    },
    art_lyme: {
      key: 'art_lyme',
      type: 'decision',
      label: 'Zeckenstich oder Erythema migrans?',
      driver: { kind: 'anamnese', questionKey: 'art_zecke' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'art_lyme_tx' },
        { when: 'nein', label: 'Nein', to: 'art_disposition' },
      ],
    },
    art_lyme_tx: {
      key: 'art_lyme_tx',
      type: 'action',
      label: 'Borrelien-Serologie + Doxycyclin / Ceftriaxon',
      next: 'art_disposition',
    },
    art_disposition: {
      key: 'art_disposition',
      type: 'disposition',
      label: 'Disposition nach Ursache',
      detail: 'Septisch / Endokarditis / Hämarthros → stationär. Gicht / reaktiv / Lyme → meist ambulant',
    },
  },
};

export const arthralgienFlow: FlowchartDef = {
  symptomKey: 'arthralgien',
  rootKey: 'arl_b_symptome',
  nodes: {
    arl_b_symptome: {
      key: 'arl_b_symptome',
      type: 'decision',
      label: 'B-Symptome (Fieber, Nachtschweiß, Gewichtsverlust)?',
      driver: { kind: 'anamnese', questionKey: 'arl_b_symptome' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'arl_systemic_workup' },
        { when: 'nein', label: 'Nein', to: 'arl_gca' },
      ],
    },
    arl_systemic_workup: {
      key: 'arl_systemic_workup',
      type: 'action',
      label: 'Erweiterte Diagnostik: BSG, CRP, BB-Diff, BK, ANA/ANCA, Echo, ggf. Tumor-Screen',
      redFlagKey: 'rf_arl_systemisch',
      next: 'arl_gca',
    },
    arl_gca: {
      key: 'arl_gca',
      type: 'decision',
      label: '> 50 J + Schultergürtelschmerz + Sehstörung / temporale Kopfschmerzen?',
      driver: { kind: 'anamnese', questionKey: 'arl_kopf_visus' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'arl_gca_tx' },
        { when: 'nein', label: 'Nein', to: 'arl_pmr' },
      ],
    },
    arl_gca_tx: {
      key: 'arl_gca_tx',
      type: 'action',
      label: 'Sofort-Steroid (Prednisolon 60–100 mg) + BSG/CRP, Augenarzt + A. temp.-Biopsie',
      redFlagKey: 'rf_arl_pmr_gca',
      next: 'arl_paraneo',
    },
    arl_pmr: {
      key: 'arl_pmr',
      type: 'decision',
      label: '> 50 J + Schulter-/Beckengürtelschmerz + Morgensteifigkeit > 45 min?',
      driver: { kind: 'anamnese', questionKey: 'arl_schultergurt' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'arl_pmr_tx' },
        { when: 'nein', label: 'Nein', to: 'arl_paraneo' },
      ],
    },
    arl_pmr_tx: {
      key: 'arl_pmr_tx',
      type: 'action',
      label: 'BSG > 40, CRP ↑ → Prednisolon 15–20 mg/d, Rheumatologie',
      next: 'arl_paraneo',
    },
    arl_paraneo: {
      key: 'arl_paraneo',
      type: 'decision',
      label: '> 50 J + Trommelschlägelfinger + Gewichtsverlust?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'arl_paraneo_tx' },
        { when: 'nein', label: 'Nein', to: 'arl_pattern' },
      ],
    },
    arl_paraneo_tx: {
      key: 'arl_paraneo_tx',
      type: 'action',
      label: 'CT Thorax / Abdomen, Tumormarker, Onkologie',
      redFlagKey: 'rf_arl_paraneoplastisch',
      next: 'arl_disposition',
    },
    arl_pattern: {
      key: 'arl_pattern',
      type: 'decision',
      label: 'Symmetrische Verteilung + Morgensteifigkeit > 30 min?',
      driver: { kind: 'anamnese', questionKey: 'arl_symmetrisch' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'arl_inflamm' },
        { when: 'nein', label: 'Nein', to: 'arl_oa' },
      ],
    },
    arl_inflamm: {
      key: 'arl_inflamm',
      type: 'action',
      label: 'V.a. frühe RA / SLE → RF, anti-CCP, ANA, BSG/CRP, Rheumatologie',
      next: 'arl_disposition',
    },
    arl_oa: {
      key: 'arl_oa',
      type: 'action',
      label: 'V.a. Osteoarthrose / Fibromyalgie / virale Genese → symptomatisch',
      detail: 'Bei viralem Infekt: Selbstlimitierend; bei chronisch + Tender Points: Fibromyalgie erwägen',
      next: 'arl_disposition',
    },
    arl_disposition: {
      key: 'arl_disposition',
      type: 'disposition',
      label: 'Disposition nach Verdacht',
      detail: 'GCA / Endokarditis / Paraneoplasie → stationär. Sonst ambulante rheumatologische Anbindung',
    },
  },
};

export const myositisFlow: FlowchartDef = {
  symptomKey: 'myositis',
  rootKey: 'myos_rhabdo',
  nodes: {
    myos_rhabdo: {
      key: 'myos_rhabdo',
      type: 'decision',
      label: 'Dunkler Urin + heftiger Muskelschmerz / Krea ↑?',
      driver: { kind: 'anamnese', questionKey: 'myos_dunkler_urin' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myos_rhabdo_tx' },
        { when: 'nein', label: 'Nein', to: 'myos_kompartment' },
      ],
    },
    myos_rhabdo_tx: {
      key: 'myos_rhabdo_tx',
      type: 'action',
      label: 'Rhabdomyolyse-Pathway: CK, Myoglobin, Krea, K⁺, Ca²⁺, Phosphat',
      detail: 'Volumengabe 200–500 ml/h Ziel-Diurese 200–300 ml/h; Urin-Alkalisierung nur selektiv',
      redFlagKey: 'rf_myo_rhabdo',
      next: 'myos_kompartment',
    },
    myos_kompartment: {
      key: 'myos_kompartment',
      type: 'decision',
      label: 'Trauma / Reperfusion + heftiger Druckschmerz + Sensibilitätsdefizit?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myos_kompartment_tx' },
        { when: 'nein', label: 'Nein', to: 'myos_resp' },
      ],
    },
    myos_kompartment_tx: {
      key: 'myos_kompartment_tx',
      type: 'action',
      label: 'Druckmessung > 30 mmHg → sofort Faszientomie, Chirurgie',
      redFlagKey: 'rf_myo_kompartment',
      next: 'myos_resp',
    },
    myos_resp: {
      key: 'myos_resp',
      type: 'decision',
      label: 'Dyspnoe / Aspirationszeichen / Vitalkapazität ↓?',
      driver: { kind: 'anamnese', questionKey: 'myos_dysphagie' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myos_resp_tx' },
        { when: 'nein', label: 'Nein', to: 'myos_pyom' },
      ],
    },
    myos_resp_tx: {
      key: 'myos_resp_tx',
      type: 'action',
      label: 'BGA, Vitalkapazität, Aspirationsschutz, frühe Intensivanbindung',
      redFlagKey: 'rf_myo_resp',
      next: 'myos_pyom',
    },
    myos_pyom: {
      key: 'myos_pyom',
      type: 'decision',
      label: 'Fokaler Muskelschmerz + Fieber + Schwellung?',
      driver: { kind: 'anamnese', questionKey: 'myos_fokal' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myos_pyom_tx' },
        { when: 'nein', label: 'Nein', to: 'myos_haut' },
      ],
    },
    myos_pyom_tx: {
      key: 'myos_pyom_tx',
      type: 'action',
      label: 'Sono / MRT → Pyomyositis-Workup, BK, Drainage, Staph-AB',
      detail: 'DDx nekrotisierende Fasziitis: Schmerz > Befund, rasche Progression → sofort OP',
      redFlagKey: 'rf_myo_pyom',
      next: 'myos_haut',
    },
    myos_haut: {
      key: 'myos_haut',
      type: 'decision',
      label: 'Heliotropes Erythem / Gottron-Papeln / Schal-Zeichen?',
      driver: { kind: 'anamnese', questionKey: 'myos_haut' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myos_dermato_tx' },
        { when: 'nein', label: 'Nein', to: 'myos_statin' },
      ],
    },
    myos_dermato_tx: {
      key: 'myos_dermato_tx',
      type: 'action',
      label: 'V.a. Dermatomyositis → CK, Aldolase, anti-Jo-1 / anti-Mi-2, Paraneoplasie-Screen',
      redFlagKey: 'rf_myo_dermato',
      next: 'myos_disposition',
    },
    myos_statin: {
      key: 'myos_statin',
      type: 'decision',
      label: 'Statin- / Fibrat-Einnahme?',
      driver: { kind: 'anamnese', questionKey: 'myos_statin' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myos_statin_tx' },
        { when: 'nein', label: 'Nein', to: 'myos_infekt' },
      ],
    },
    myos_statin_tx: {
      key: 'myos_statin_tx',
      type: 'action',
      label: 'Statin pausieren, CK-Verlauf; bei persistierender Schwäche → Anti-HMGCR',
      next: 'myos_disposition',
    },
    myos_infekt: {
      key: 'myos_infekt',
      type: 'decision',
      label: 'Vorangegangener viraler Infekt (Influenza, COVID)?',
      driver: { kind: 'anamnese', questionKey: 'myos_infekt' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myos_viral_tx' },
        { when: 'nein', label: 'Nein', to: 'myos_autoimmun' },
      ],
    },
    myos_viral_tx: {
      key: 'myos_viral_tx',
      type: 'action',
      label: 'V.a. virale Myositis → symptomatisch, CK-Verlauf, Hydration',
      next: 'myos_disposition',
    },
    myos_autoimmun: {
      key: 'myos_autoimmun',
      type: 'action',
      label: 'V.a. PM / IBM / IMNM → CK, Myositis-Antikörper, EMG, Muskelbiopsie',
      next: 'myos_disposition',
    },
    myos_disposition: {
      key: 'myos_disposition',
      type: 'disposition',
      label: 'Disposition nach Schwere',
      detail: 'Rhabdomyolyse / respiratorische Beteiligung / Pyomyositis → stationär. Statin-Myopathie ohne Komplikationen → ambulant',
    },
  },
};

export const myalgienFlow: FlowchartDef = {
  symptomKey: 'myalgien',
  rootKey: 'myal_rhabdo',
  nodes: {
    myal_rhabdo: {
      key: 'myal_rhabdo',
      type: 'decision',
      label: 'Dunkler Urin / reduzierte Diurese / schwere Muskelschmerzen?',
      driver: { kind: 'anamnese', questionKey: 'myal_dunkler_urin' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myal_rhabdo_tx' },
        { when: 'nein', label: 'Nein', to: 'myal_gca' },
      ],
    },
    myal_rhabdo_tx: {
      key: 'myal_rhabdo_tx',
      type: 'action',
      label: 'CK, Myoglobin, Krea, K⁺ → Rhabdomyolyse-Pathway',
      redFlagKey: 'rf_myalg_rhabdo',
      next: 'myal_gca',
    },
    myal_gca: {
      key: 'myal_gca',
      type: 'decision',
      label: '> 50 J + neue Kopfschmerzen / Kauclaudicatio / Sehstörung?',
      driver: { kind: 'anamnese', questionKey: 'myal_alter50_kopf' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myal_gca_tx' },
        { when: 'nein', label: 'Nein', to: 'myal_pmr' },
      ],
    },
    myal_gca_tx: {
      key: 'myal_gca_tx',
      type: 'action',
      label: 'BSG/CRP + Sofort-Steroid 60–100 mg, Sono / A. temp.-Biopsie',
      redFlagKey: 'rf_myalg_gca',
      next: 'myal_pmr',
    },
    myal_pmr: {
      key: 'myal_pmr',
      type: 'decision',
      label: 'Schulter-/Beckengürtelschmerz mit Morgensteifigkeit?',
      driver: { kind: 'anamnese', questionKey: 'myal_morgensteif' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myal_pmr_tx' },
        { when: 'nein', label: 'Nein', to: 'myal_statin' },
      ],
    },
    myal_pmr_tx: {
      key: 'myal_pmr_tx',
      type: 'action',
      label: 'BSG > 40 → V.a. PMR → Prednisolon 15–20 mg/d, Rheumatologie',
      next: 'myal_statin',
    },
    myal_statin: {
      key: 'myal_statin',
      type: 'decision',
      label: 'Statin- / Fibrat-Einnahme?',
      driver: { kind: 'anamnese', questionKey: 'myal_statin' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myal_statin_tx' },
        { when: 'nein', label: 'Nein', to: 'myal_elektrolyte' },
      ],
    },
    myal_statin_tx: {
      key: 'myal_statin_tx',
      type: 'action',
      label: 'CK messen, Statin pausieren bei CK > 10× ULN oder Schwäche',
      redFlagKey: 'rf_myalg_statin',
      next: 'myal_elektrolyte',
    },
    myal_elektrolyte: {
      key: 'myal_elektrolyte',
      type: 'decision',
      label: 'Diuretika / Erbrechen / Durchfall (Elektrolyt-Verlust)?',
      driver: { kind: 'anamnese', questionKey: 'myal_diuretika' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'myal_elektrolyte_tx' },
        { when: 'nein', label: 'Nein', to: 'myal_workup' },
      ],
    },
    myal_elektrolyte_tx: {
      key: 'myal_elektrolyte_tx',
      type: 'action',
      label: 'K⁺, Mg²⁺, Ca²⁺, Phosphat messen + ausgleichen',
      redFlagKey: 'rf_myalg_elektrolyte',
      next: 'myal_workup',
    },
    myal_workup: {
      key: 'myal_workup',
      type: 'action',
      label: 'Basis: TSH, 25-OH-Vit-D, Borrelien-Serologie, virale Anamnese',
      detail: 'Bei chronisch + Tender Points + Schlafstörung → Fibromyalgie erwägen',
      next: 'myal_disposition',
    },
    myal_disposition: {
      key: 'myal_disposition',
      type: 'disposition',
      label: 'Disposition nach Befund',
      detail: 'Rhabdomyolyse / GCA → stationär. PMR / Statin / Elektrolyte → meist ambulante Anbindung',
    },
  },
};

export const rheumaFlows = [
  arthritisFlow,
  arthralgienFlow,
  myositisFlow,
  myalgienFlow,
];
