import type { FlowchartDef } from '../../types';

export const abdomenschmerzFlow: FlowchartDef = {
  symptomKey: 'abdomenschmerz',
  rootKey: 'abd_stable',
  nodes: {
    abd_stable: {
      key: 'abd_stable',
      type: 'decision',
      label: 'Hämodynamisch stabil?',
      detail: 'RR, HR, Bewusstsein, Hautkolorit',
      driver: { kind: 'manual' },
      edges: [
        { when: 'nein', label: 'Instabil', to: 'abd_shockroom' },
        { when: 'ja', label: 'Stabil', to: 'abd_peritonismus' },
      ],
    },
    abd_shockroom: {
      key: 'abd_shockroom',
      type: 'action',
      label: 'Schockraum → A-B-C, FAST-Sono, OP-Bereitschaft',
      detail: 'V.a. AAA-Ruptur, Hohlorganperforation, Mesenterialischämie, ektope Schwangerschaft',
      next: 'abd_killer',
    },
    abd_peritonismus: {
      key: 'abd_peritonismus',
      type: 'decision',
      label: 'Peritonismus / Abwehrspannung?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Akutes Abdomen', to: 'abd_acuteabd' },
        { when: 'nein', label: 'Kein Peritonismus', to: 'abd_lokalisation' },
      ],
    },
    abd_acuteabd: {
      key: 'abd_acuteabd',
      type: 'action',
      label: 'CT Abdomen mit KM + Chirurgie konsultieren',
      detail: 'Labor inkl. Laktat, Lipase, β-HCG, BGA; Volumen, AB bei Sepsis',
      next: 'abd_killer',
    },
    abd_lokalisation: {
      key: 'abd_lokalisation',
      type: 'decision',
      label: 'Lokalisation des Schmerzes?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ruq', label: 'RUQ / Epigastrium', to: 'abd_ruq' },
        { when: 'rlq', label: 'RLQ', to: 'abd_rlq' },
        { when: 'llq', label: 'LLQ', to: 'abd_llq' },
        { when: 'flanke', label: 'Flanke', to: 'abd_flanke' },
        { when: 'diffus', label: 'Diffus', to: 'abd_diffus' },
      ],
    },
    abd_ruq: {
      key: 'abd_ruq',
      type: 'action',
      label: 'Sono Galle/Leber, Lipase, Bili, LFP',
      detail: 'DDx: Cholezystitis, Cholangitis, Hepatitis, Ulcus, Pankreatitis',
      next: 'abd_killer',
    },
    abd_rlq: {
      key: 'abd_rlq',
      type: 'action',
      label: 'Appendizitis-Workup (Sono, ggf. CT) + β-HCG bei Frauen',
      detail: 'DDx: Appendizitis, ektope Schwangerschaft, Ovarialtorsion, Nierenkolik',
      next: 'abd_killer',
    },
    abd_llq: {
      key: 'abd_llq',
      type: 'action',
      label: 'CT bei V.a. Divertikulitis',
      detail: 'DDx: Divertikulitis, Sigmadivertikel-Blutung, Ovar (links)',
      next: 'abd_killer',
    },
    abd_flanke: {
      key: 'abd_flanke',
      type: 'action',
      label: 'Sono Nieren, U-Stix, Hämaturie?',
      detail: 'DDx: Nierenkolik, Pyelonephritis, AAA (! Sono Aorta)',
      next: 'abd_killer',
    },
    abd_diffus: {
      key: 'abd_diffus',
      type: 'action',
      label: 'Laktat + EKG + BZ + β-HCG',
      detail: 'DDx: Mesenterialischämie, DKA, inferiorer STEMI, ektope Schwangerschaft',
      next: 'abd_killer',
    },
    abd_killer: {
      key: 'abd_killer',
      type: 'decision',
      label: 'Killer-DDx ausgeschlossen?',
      detail: 'AAA, Mesenterialischämie, Perforation, ektope Schwangerschaft, DKA, ACS',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'abd_disposition' },
        { when: 'nein', label: 'Unklar', to: 'abd_ct' },
      ],
    },
    abd_ct: {
      key: 'abd_ct',
      type: 'action',
      label: 'CT-Angio Abdomen, ggf. erweiterte Diagnostik',
      next: 'abd_disposition',
    },
    abd_disposition: {
      key: 'abd_disposition',
      type: 'disposition',
      label: 'Disposition nach DDx und Klinik',
      detail: 'Schmerzbefund + Verlauf + Labor entscheiden Aufnahme vs. ambulante Wiedervorstellung',
    },
  },
};

export const ogibFlow: FlowchartDef = {
  symptomKey: 'ogib',
  rootKey: 'ogib_stable',
  nodes: {
    ogib_stable: {
      key: 'ogib_stable',
      type: 'decision',
      label: 'Hämodynamisch stabil?',
      detail: 'RR sys, HR, Schockindex, GCS',
      driver: { kind: 'manual' },
      edges: [
        { when: 'nein', label: 'Instabil', to: 'ogib_shock' },
        { when: 'ja', label: 'Stabil', to: 'ogib_aaa' },
      ],
    },
    ogib_shock: {
      key: 'ogib_shock',
      type: 'action',
      label: 'Massivtransfusion + Notfall-ÖGD',
      detail: '2× großlumige Zugänge, Kreuzblut/EK, FFP/TXA, Intensiv',
      redFlagKey: 'rf_gib_massiv',
      next: 'ogib_aaa',
    },
    ogib_aaa: {
      key: 'ogib_aaa',
      type: 'decision',
      label: 'Z.n. AAA-OP oder aortalem Stent?',
      driver: { kind: 'anamnese', questionKey: 'ogib_aaa_op' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ogib_aortoent' },
        { when: 'nein', label: 'Nein', to: 'ogib_varizen' },
      ],
    },
    ogib_aortoent: {
      key: 'ogib_aortoent',
      type: 'action',
      label: 'V.a. aorto-enterale Fistel → CT-Angio Aorta + Gefäßchirurgie',
      detail: 'Sentinel-Blutung kann massiver Blutung vorausgehen',
      redFlagKey: 'rf_gib_aortoent',
      next: 'ogib_varizen',
    },
    ogib_varizen: {
      key: 'ogib_varizen',
      type: 'decision',
      label: 'Bekannte Leberzirrhose / portale Hypertension?',
      driver: { kind: 'anamnese', questionKey: 'ogib_zirrhose' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ogib_varizen_tx' },
        { when: 'nein', label: 'Nein', to: 'ogib_gbs' },
      ],
    },
    ogib_varizen_tx: {
      key: 'ogib_varizen_tx',
      type: 'action',
      label: 'Terlipressin + Ceftriaxon + dringliche ÖGD (≤ 12 h)',
      detail: 'PPI i.v., Erythromycin 250 mg vor ÖGD, ggf. Ballontamponade',
      redFlagKey: 'rf_gib_varizen',
      next: 'ogib_disposition',
    },
    ogib_gbs: {
      key: 'ogib_gbs',
      type: 'action',
      label: 'Risikostratifizierung mit Glasgow-Blatchford-Score',
      detail: 'GBS = 0–1 → ambulante ÖGD erwägbar; GBS ≥ 7 → frühe ÖGD ≤ 24 h',
      scoreKey: 'gbs',
      next: 'ogib_ppi',
    },
    ogib_ppi: {
      key: 'ogib_ppi',
      type: 'action',
      label: 'PPI i.v. (Pantoprazol 80 mg Bolus, dann 8 mg/h)',
      detail: 'Erythromycin 250 mg i.v. 30 min vor ÖGD verbessert Sicht',
      next: 'ogib_disposition',
    },
    ogib_disposition: {
      key: 'ogib_disposition',
      type: 'disposition',
      label: 'Stationäre Aufnahme (Gastro/IMC), ÖGD nach Risiko',
      detail: 'GBS = 0 + jung + keine Komorbidität → ambulante ÖGD möglich',
    },
  },
};

export const ugibFlow: FlowchartDef = {
  symptomKey: 'ugib',
  rootKey: 'ugib_stable',
  nodes: {
    ugib_stable: {
      key: 'ugib_stable',
      type: 'decision',
      label: 'Hämodynamisch stabil?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'nein', label: 'Instabil', to: 'ugib_shock' },
        { when: 'ja', label: 'Stabil', to: 'ugib_oegd_first' },
      ],
    },
    ugib_shock: {
      key: 'ugib_shock',
      type: 'action',
      label: 'Massivtransfusion + Notfall-ÖGD VOR Koloskopie',
      detail: 'Bei massiver Hämatochezie kann OGIB mit rascher Passage Ursache sein',
      redFlagKey: 'rf_gib_massiv',
      next: 'ugib_disposition',
    },
    ugib_oegd_first: {
      key: 'ugib_oegd_first',
      type: 'decision',
      label: 'Verdacht auf obere GI-Quelle (Hämatemesis, Meläna, Synkope, hoher Schockindex)?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja → erst ÖGD', to: 'ugib_oegd' },
        { when: 'nein', label: 'Nein', to: 'ugib_ischaemie' },
      ],
    },
    ugib_oegd: {
      key: 'ugib_oegd',
      type: 'action',
      label: 'ÖGD zum Ausschluss OGIB',
      next: 'ugib_ischaemie',
    },
    ugib_ischaemie: {
      key: 'ugib_ischaemie',
      type: 'decision',
      label: 'Schmerz > Befund + vaskuläres Risiko (VHF, AVK)?',
      driver: { kind: 'anamnese', questionKey: 'ugib_vask_risiko' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ugib_ischaemie_tx' },
        { when: 'nein', label: 'Nein', to: 'ugib_oakland' },
      ],
    },
    ugib_ischaemie_tx: {
      key: 'ugib_ischaemie_tx',
      type: 'action',
      label: 'V.a. ischämische Kolitis → Laktat, CT-Angio, Chirurgie',
      redFlagKey: 'rf_gib_ischaemie',
      next: 'ugib_oakland',
    },
    ugib_oakland: {
      key: 'ugib_oakland',
      type: 'action',
      label: 'Risikostratifizierung mit Oakland-Score',
      detail: 'Oakland ≤ 8 → ambulante Koloskopie erwägbar; > 8 → stationär + Koloskopie ≤ 24 h',
      scoreKey: 'oakland',
      next: 'ugib_disposition',
    },
    ugib_disposition: {
      key: 'ugib_disposition',
      type: 'disposition',
      label: 'Disposition nach Oakland + Komorbidität + Stabilität',
      detail: 'Bei persistierender Blutung Angio-CT/Embolisation erwägen',
    },
  },
};

export const uebelkeitFlow: FlowchartDef = {
  symptomKey: 'uebelkeit_erbrechen',
  rootKey: 'ueb_red',
  nodes: {
    ueb_red: {
      key: 'ueb_red',
      type: 'decision',
      label: 'Schwallartig + Kopfschmerz / Vigilanz ↓?',
      detail: 'Hirndruck-Warnzeichen',
      driver: { kind: 'anamnese', questionKey: 'ueb_schwallartig' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ueb_icp' },
        { when: 'nein', label: 'Nein', to: 'ueb_blut' },
      ],
    },
    ueb_icp: {
      key: 'ueb_icp',
      type: 'action',
      label: 'CCT sofort, Oberkörperhochlagerung, Neurologie/Neurochirurgie',
      redFlagKey: 'rf_ueb_icp',
      next: 'ueb_disposition',
    },
    ueb_blut: {
      key: 'ueb_blut',
      type: 'decision',
      label: 'Hämatemesis oder kaffeesatzartig?',
      driver: { kind: 'anamnese', questionKey: 'ueb_blut' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ueb_gib' },
        { when: 'nein', label: 'Nein', to: 'ueb_ileus' },
      ],
    },
    ueb_gib: {
      key: 'ueb_gib',
      type: 'action',
      label: '→ OGIB-Pathway (PPI, GBS, ÖGD)',
      redFlagKey: 'rf_ueb_gib',
      next: 'ueb_disposition',
    },
    ueb_ileus: {
      key: 'ueb_ileus',
      type: 'decision',
      label: 'Galliges oder fäkulentes Erbrechen + Stuhl-/Windverhalt?',
      driver: { kind: 'anamnese', questionKey: 'ueb_galle_faekulent' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ueb_ileus_tx' },
        { when: 'nein', label: 'Nein', to: 'ueb_diabetes' },
      ],
    },
    ueb_ileus_tx: {
      key: 'ueb_ileus_tx',
      type: 'action',
      label: 'Rö/CT Abdomen, Magensonde, Chirurgie',
      redFlagKey: 'rf_ueb_ileus',
      next: 'ueb_disposition',
    },
    ueb_diabetes: {
      key: 'ueb_diabetes',
      type: 'decision',
      label: 'Diabetes + Polyurie/-dipsie?',
      driver: { kind: 'anamnese', questionKey: 'ueb_diabetes' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ueb_dka' },
        { when: 'nein', label: 'Nein', to: 'ueb_schwanger' },
      ],
    },
    ueb_dka: {
      key: 'ueb_dka',
      type: 'action',
      label: 'BZ, BGA, Keton → DKA-Pathway',
      redFlagKey: 'rf_ueb_dka',
      next: 'ueb_disposition',
    },
    ueb_schwanger: {
      key: 'ueb_schwanger',
      type: 'decision',
      label: 'Schwangerschaft möglich?',
      driver: { kind: 'anamnese', questionKey: 'ueb_schwanger' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ueb_hcg' },
        { when: 'nein', label: 'Nein', to: 'ueb_symptomatic' },
      ],
    },
    ueb_hcg: {
      key: 'ueb_hcg',
      type: 'action',
      label: 'β-HCG → bei pos. Hyperemesis vs. ektop ausschließen',
      redFlagKey: 'rf_ueb_schwanger',
      next: 'ueb_symptomatic',
    },
    ueb_symptomatic: {
      key: 'ueb_symptomatic',
      type: 'action',
      label: 'Antiemese (Ondansetron / MCP) + Volumengabe',
      detail: 'Elektrolyte ausgleichen, Dehydration prüfen',
      redFlagKey: 'rf_ueb_dehydration',
      next: 'ueb_disposition',
    },
    ueb_disposition: {
      key: 'ueb_disposition',
      type: 'disposition',
      label: 'Disposition nach Ursache + Dehydrationsgrad',
      detail: 'Ambulant bei klarem benigner Ursache, sonst stationär',
    },
  },
};

export const diarrhoeFlow: FlowchartDef = {
  symptomKey: 'diarrhoe',
  rootKey: 'diar_sepsis',
  nodes: {
    diar_sepsis: {
      key: 'diar_sepsis',
      type: 'decision',
      label: 'qSOFA ≥ 2 oder Schockzeichen?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'diar_sepsis_tx' },
        { when: 'nein', label: 'Nein', to: 'diar_blutig' },
      ],
    },
    diar_sepsis_tx: {
      key: 'diar_sepsis_tx',
      type: 'action',
      label: 'Sepsis-Bundle → BK, Laktat, breite AB, Volumen',
      redFlagKey: 'rf_diar_sepsis',
      next: 'diar_blutig',
    },
    diar_blutig: {
      key: 'diar_blutig',
      type: 'decision',
      label: 'Blutige Diarrhoe?',
      driver: { kind: 'anamnese', questionKey: 'diar_blutig' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'diar_blutig_tx' },
        { when: 'nein', label: 'Nein', to: 'diar_antibiose' },
      ],
    },
    diar_blutig_tx: {
      key: 'diar_blutig_tx',
      type: 'action',
      label: 'Stuhlkultur inkl. EHEC + Loperamid VERMEIDEN',
      detail: 'HUS-Risiko prüfen (Krea, LDH, Thrombozyten); ggf. CT bei V.a. Ischämie',
      redFlagKey: 'rf_diar_blutig',
      next: 'diar_antibiose',
    },
    diar_antibiose: {
      key: 'diar_antibiose',
      type: 'decision',
      label: 'AB / Krankenhausaufenthalt letzte 8 Wochen?',
      driver: { kind: 'anamnese', questionKey: 'diar_antibiose' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'diar_cdiff' },
        { when: 'nein', label: 'Nein', to: 'diar_immunsuppr' },
      ],
    },
    diar_cdiff: {
      key: 'diar_cdiff',
      type: 'action',
      label: 'C.-diff-Test (GDH + Toxin) + Isolation',
      detail: 'Bei pos: Vancomycin oral / Fidaxomicin; PPI absetzen',
      redFlagKey: 'rf_diar_cdiff',
      next: 'diar_immunsuppr',
    },
    diar_immunsuppr: {
      key: 'diar_immunsuppr',
      type: 'decision',
      label: 'Immunsuppression / HIV / Chemo?',
      driver: { kind: 'anamnese', questionKey: 'diar_immunsuppr' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'diar_extended' },
        { when: 'nein', label: 'Nein', to: 'diar_dehydration' },
      ],
    },
    diar_extended: {
      key: 'diar_extended',
      type: 'action',
      label: 'Erweiterte Stuhldiagnostik (CMV, Cryptosporidien, Microsporidien)',
      redFlagKey: 'rf_diar_immunsuppr',
      next: 'diar_dehydration',
    },
    diar_dehydration: {
      key: 'diar_dehydration',
      type: 'decision',
      label: 'Schwere Dehydration / Hypotension / Oligurie?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'diar_volumen' },
        { when: 'nein', label: 'Nein', to: 'diar_disposition' },
      ],
    },
    diar_volumen: {
      key: 'diar_volumen',
      type: 'action',
      label: 'i.v.-Volumen, Elektrolyt-Substitution, stationäre Aufnahme',
      redFlagKey: 'rf_diar_dehydration',
      next: 'diar_disposition',
    },
    diar_disposition: {
      key: 'diar_disposition',
      type: 'disposition',
      label: 'Disposition nach Klinik + Hydratationsstatus',
      detail: 'Ambulant bei klarer viraler Genese ohne Dehydration und ohne Red Flags',
    },
  },
};

export const obstipationFlow: FlowchartDef = {
  symptomKey: 'obstipation',
  rootKey: 'obs_ileus',
  nodes: {
    obs_ileus: {
      key: 'obs_ileus',
      type: 'decision',
      label: 'Übelkeit/Erbrechen + Stuhl-/Windverhalt + geblähtes Abdomen?',
      driver: { kind: 'anamnese', questionKey: 'obs_erbrechen' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'obs_ileus_tx' },
        { when: 'nein', label: 'Nein', to: 'obs_cauda' },
      ],
    },
    obs_ileus_tx: {
      key: 'obs_ileus_tx',
      type: 'action',
      label: 'V.a. Ileus → Rö/CT Abdomen, Magensonde, Chirurgie',
      redFlagKey: 'rf_obs_ileus',
      next: 'obs_cauda',
    },
    obs_cauda: {
      key: 'obs_cauda',
      type: 'decision',
      label: 'Reithosenhypästhesie / Blasen-/Mastdarmstörung?',
      driver: { kind: 'anamnese', questionKey: 'obs_neuro' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'obs_cauda_tx' },
        { when: 'nein', label: 'Nein', to: 'obs_malignom' },
      ],
    },
    obs_cauda_tx: {
      key: 'obs_cauda_tx',
      type: 'action',
      label: 'MRT LWS notfallmäßig + Neurochirurgie',
      redFlagKey: 'rf_obs_caudasynd',
      next: 'obs_disposition',
    },
    obs_malignom: {
      key: 'obs_malignom',
      type: 'decision',
      label: 'Blut im Stuhl / Stuhlkaliberänderung / Gewichtsverlust?',
      driver: { kind: 'anamnese', questionKey: 'obs_blut' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'obs_malignom_tx' },
        { when: 'nein', label: 'Nein', to: 'obs_dru' },
      ],
    },
    obs_malignom_tx: {
      key: 'obs_malignom_tx',
      type: 'action',
      label: 'CT Abdomen + zeitnahe Koloskopie',
      redFlagKey: 'rf_obs_malignom',
      next: 'obs_dru',
    },
    obs_dru: {
      key: 'obs_dru',
      type: 'action',
      label: 'DRU + Labor (K⁺, Ca²⁺, TSH, Krea)',
      detail: 'Koprostase ausschließen; metabolische Ursachen abklären',
      redFlagKey: 'rf_obs_elektrolyte',
      next: 'obs_konservativ',
    },
    obs_konservativ: {
      key: 'obs_konservativ',
      type: 'action',
      label: 'Stufentherapie: Macrogol → Bisacodyl → Klysma / manuelle Ausräumung',
      detail: 'Obstipierende Medikamente prüfen und ggf. pausieren',
      next: 'obs_disposition',
    },
    obs_disposition: {
      key: 'obs_disposition',
      type: 'disposition',
      label: 'Disposition nach Erfolg + Red Flags',
      detail: 'Aufnahme bei Ileus, Cauda, Malignomverdacht; sonst ambulante Nachsorge',
    },
  },
};

export const ikterusFlow: FlowchartDef = {
  symptomKey: 'ikterus',
  rootKey: 'ikt_cholangitis',
  nodes: {
    ikt_cholangitis: {
      key: 'ikt_cholangitis',
      type: 'decision',
      label: 'Fieber + RUQ-Schmerz + Ikterus (Charcot-Trias)?',
      driver: { kind: 'anamnese', questionKey: 'ikt_fieber' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ikt_cholangitis_tx' },
        { when: 'nein', label: 'Nein', to: 'ikt_leberversagen' },
      ],
    },
    ikt_cholangitis_tx: {
      key: 'ikt_cholangitis_tx',
      type: 'action',
      label: 'BK + breite AB ≤ 1 h + ERCP ≤ 24 h',
      detail: 'Bei Reynolds-Pentade (+ Hypotension + Vigilanz ↓) → Intensiv + dringliche Galleableitung',
      redFlagKey: 'rf_ikt_cholangitis',
      next: 'ikt_leberversagen',
    },
    ikt_leberversagen: {
      key: 'ikt_leberversagen',
      type: 'decision',
      label: 'INR > 1,5 + Enzephalopathie ohne vorbestehende LE?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ikt_alf_tx' },
        { when: 'nein', label: 'Nein', to: 'ikt_haemolyse' },
      ],
    },
    ikt_alf_tx: {
      key: 'ikt_alf_tx',
      type: 'action',
      label: 'Transplantzentrum kontaktieren, NAC bei V.a. Paracetamol',
      redFlagKey: 'rf_ikt_leberversagen',
      next: 'ikt_disposition',
    },
    ikt_haemolyse: {
      key: 'ikt_haemolyse',
      type: 'decision',
      label: 'Hb-Abfall + LDH ↑ + Haptoglobin ↓ + indir. Bili ↑?',
      driver: { kind: 'manual' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ikt_haemolyse_tx' },
        { when: 'nein', label: 'Nein', to: 'ikt_obstruktion' },
      ],
    },
    ikt_haemolyse_tx: {
      key: 'ikt_haemolyse_tx',
      type: 'action',
      label: 'Coombs, Retikulozyten, Blutausstrich → Hämatologie',
      redFlagKey: 'rf_ikt_haemolyse',
      next: 'ikt_obstruktion',
    },
    ikt_obstruktion: {
      key: 'ikt_obstruktion',
      type: 'decision',
      label: 'Schmerzloser progredienter Ikterus + Gewichtsverlust?',
      driver: { kind: 'anamnese', questionKey: 'ikt_gewicht' },
      edges: [
        { when: 'ja', label: 'Ja', to: 'ikt_obstruktion_tx' },
        { when: 'nein', label: 'Nein', to: 'ikt_workup' },
      ],
    },
    ikt_obstruktion_tx: {
      key: 'ikt_obstruktion_tx',
      type: 'action',
      label: 'V.a. maligne Obstruktion → CT/MRCP + Tumormarker',
      redFlagKey: 'rf_ikt_obstruktion',
      next: 'ikt_workup',
    },
    ikt_workup: {
      key: 'ikt_workup',
      type: 'action',
      label: 'Sono Galle/Leber + LFP + Hepatitis-Serologie + Quick/INR',
      detail: 'Direktes vs. indirektes Bili differenzieren; Paracetamol-Spiegel bei Verdacht',
      next: 'ikt_disposition',
    },
    ikt_disposition: {
      key: 'ikt_disposition',
      type: 'disposition',
      label: 'Disposition nach Ursache und Schweregrad',
      detail: 'Cholangitis / ALF / Hämolyse: stationär. Stabile Hepatitis / Gilbert: ambulant.',
    },
  },
};

export const giFlows = [
  abdomenschmerzFlow,
  ogibFlow,
  ugibFlow,
  uebelkeitFlow,
  diarrhoeFlow,
  obstipationFlow,
  ikterusFlow,
];
