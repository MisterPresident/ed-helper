import type { RedFlag, RedFlagKey } from '../types';

export const RED_FLAGS: Record<RedFlagKey, RedFlag> = {
  // --- Thoraxschmerz ---
  rf_thx_dissektion: {
    key: 'rf_thx_dissektion',
    label: 'Reißender Schmerz, Ausstrahlung Rücken, BD-Seitendifferenz',
    suspects: 'V.a. Aortendissektion',
    action: 'CT-Angio Aorta, BD bds messen, Herzecho',
  },
  rf_thx_lae: {
    key: 'rf_thx_lae',
    label: 'Dyspnoe, Tachykardie, Immobilisation/OP/Malignom',
    suspects: 'V.a. Lungenembolie',
    action: 'Wells/Geneva, D-Dimere, CT-Angio Thorax',
  },
  rf_thx_acs: {
    key: 'rf_thx_acs',
    label: 'Crescendo, vegetative Symptomatik, EKG-Dynamik',
    suspects: 'V.a. akutes Koronarsyndrom',
    action: 'EKG seriell, Troponin seriell, HEART-Score',
  },
  rf_thx_spannungspneu: {
    key: 'rf_thx_spannungspneu',
    label: 'Trachealdeviation, gestaute Halsvenen, einseitig fehlendes AG',
    suspects: 'V.a. Spannungspneumothorax',
    action: 'Sofortentlastung, keine Diagnostik verzögern',
  },
  rf_thx_boerhaave: {
    key: 'rf_thx_boerhaave',
    label: 'Nach Erbrechen, Mediastinalemphysem, Hautemphysem',
    suspects: 'V.a. Boerhaave-Syndrom',
    action: 'CT Thorax mit Schluckkontrast, Chirurgie',
  },

  // --- Dyspnoe ---
  rf_dysp_lae: {
    key: 'rf_dysp_lae',
    label: 'Plötzliche Dyspnoe + Tachykardie + Risikofaktoren',
    suspects: 'V.a. Lungenembolie',
    action: 'Wells/Geneva, D-Dimere, CT-Angio',
  },
  rf_dysp_spannungspneu: {
    key: 'rf_dysp_spannungspneu',
    label: 'Einseitig fehlendes AG, Trachealdeviation, gestaute Halsvenen',
    suspects: 'V.a. Spannungspneumothorax',
    action: 'Sofortentlastung',
  },
  rf_dysp_lungenoedem: {
    key: 'rf_dysp_lungenoedem',
    label: 'Feuchte RGs bds, Orthopnoe, rosig-schaumiges Sputum',
    suspects: 'V.a. kardiales Lungenödem / akute Linksherzinsuffizienz',
    action: 'CPAP, Nitro, Diuretikum, Echo',
  },
  rf_dysp_silentchest: {
    key: 'rf_dysp_silentchest',
    label: 'Schweres Asthma/COPD mit silent chest, fehlender Giemen',
    suspects: 'Drohende respiratorische Erschöpfung',
    action: 'Sofortige intensivmedizinische Therapie',
  },
  rf_dysp_anaphylaxie: {
    key: 'rf_dysp_anaphylaxie',
    label: 'Stridor, Urtikaria, Hypotonie nach Exposition',
    suspects: 'V.a. Anaphylaxie',
    action: 'Adrenalin i.m., Antihistaminikum, Steroid',
  },

  // --- Abdomenschmerz ---
  rf_abd_perforation: {
    key: 'rf_abd_perforation',
    label: 'Peritonismus, Abwehrspannung, freie Luft im Röntgen',
    suspects: 'V.a. Hohlorganperforation',
    action: 'CT Abdomen, Chirurgie',
  },
  rf_abd_mesenterial: {
    key: 'rf_abd_mesenterial',
    label: 'Missverhältnis Schmerz/Befund, VHF/KHK, Laktat ↑',
    suspects: 'V.a. Mesenterialischämie',
    action: 'CT-Angio Abdomen',
  },
  rf_abd_aaa: {
    key: 'rf_abd_aaa',
    label: 'Pulsierende Resistenz, Synkope, Schock',
    suspects: 'V.a. rupturiertes Aortenaneurysma',
    action: 'Sofort-Sono, OP-Bereitschaft, Massivtransfusion',
  },
  rf_abd_ektop: {
    key: 'rf_abd_ektop',
    label: 'Fertile Frau mit Unterbauchschmerz, Amenorrhoe',
    suspects: 'V.a. ektope Schwangerschaft',
    action: 'β-HCG, Sono, Gynäkologie',
  },
  rf_abd_hodentorsion: {
    key: 'rf_abd_hodentorsion',
    label: 'Junger Mann, akuter Hodenschmerz, Hochstand',
    suspects: 'V.a. Hodentorsion',
    action: 'Sofortige OP, Urologie',
  },
  rf_abd_ileus: {
    key: 'rf_abd_ileus',
    label: 'Geblähtes Abdomen, Erbrechen, fehlende Stuhl-/Windabgabe',
    suspects: 'V.a. Ileus',
    action: 'Röntgen/CT Abdomen, Chirurgie',
  },

  // --- Kopfschmerz ---
  rf_kopf_sab: {
    key: 'rf_kopf_sab',
    label: 'Donnerschlagkopfschmerz, max. Schmerz in Sekunden',
    suspects: 'V.a. Subarachnoidalblutung',
    action: 'CT Schädel, ggf. Liquor',
  },
  rf_kopf_meningitis: {
    key: 'rf_kopf_meningitis',
    label: 'Fieber, Meningismus, Lichtscheu',
    suspects: 'V.a. bakterielle Meningitis',
    action: 'BK, empirische AB innerhalb 1 h, Liquor',
  },
  rf_kopf_icb: {
    key: 'rf_kopf_icb',
    label: 'Vigilanzminderung, fokales Defizit, Antikoagulation',
    suspects: 'V.a. intrakranielle Blutung',
    action: 'CT Schädel, ggf. Gerinnungsantagonisierung',
  },
  rf_kopf_svt: {
    key: 'rf_kopf_svt',
    label: 'Progredient, Stauungspapille, OK/Thrombophilie',
    suspects: 'V.a. Sinusvenenthrombose',
    action: 'CT-/MR-Venografie',
  },
  rf_kopf_arteriitis: {
    key: 'rf_kopf_arteriitis',
    label: '> 50 J, BSG ↑, Kauclaudicatio, Visusverlust',
    suspects: 'V.a. Arteriitis temporalis',
    action: 'Sofort-Steroid, BSG/CRP, Biopsie',
  },
  rf_kopf_glaukom: {
    key: 'rf_kopf_glaukom',
    label: 'Rotes Auge, Visusverlust, harter Bulbus',
    suspects: 'V.a. Glaukomanfall',
    action: 'Sofort-Augenklinik',
  },
  rf_kopf_co: {
    key: 'rf_kopf_co',
    label: 'Exposition (Feuer, Heizung), mehrere Betroffene, Vigilanzminderung',
    suspects: 'V.a. CO-Intoxikation',
    action: 'CO-Hb, 100 % O₂, ggf. HBO',
  },

  // --- Synkope ---
  rf_syn_kardiogen: {
    key: 'rf_syn_kardiogen',
    label: 'Bei Belastung / Palpitationen davor / familiäre SCD',
    suspects: 'V.a. kardiogene Synkope',
    action: 'EKG, Troponin, Echo, Monitor',
  },
  rf_syn_lae: {
    key: 'rf_syn_lae',
    label: 'Synkope mit Dyspnoe/Tachykardie/Risikofaktoren',
    suspects: 'V.a. Lungenembolie',
    action: 'Wells, CT-Angio',
  },
  rf_syn_aaa: {
    key: 'rf_syn_aaa',
    label: 'Synkope + Rücken-/Bauchschmerz + pulsierende Resistenz',
    suspects: 'V.a. rupturiertes AAA',
  },
  rf_syn_gi: {
    key: 'rf_syn_gi',
    label: 'Synkope + Teerstuhl / Hämatemesis / Anämie',
    suspects: 'V.a. obere GI-Blutung',
  },
  rf_syn_sab: {
    key: 'rf_syn_sab',
    label: 'Synkope mit Kopfschmerz',
    suspects: 'V.a. SAB',
  },
  rf_syn_as: {
    key: 'rf_syn_as',
    label: 'Belastungssynkope, spätsystolisches Geräusch',
    suspects: 'V.a. schwere Aortenstenose',
  },

  // --- Schwindel ---
  rf_schw_hints: {
    key: 'rf_schw_hints',
    label: 'HINTS positiv (skew, dir-changing Nystagmus, normal HIT)',
    suspects: 'V.a. zentrale Ursache / Hirnstamm/Kleinhirn-Infarkt',
    action: 'MRT, Stroke-Pathway',
  },
  rf_schw_hirnstamm: {
    key: 'rf_schw_hirnstamm',
    label: 'Doppelbilder, Dysarthrie, Dysphagie, Hemisymptomatik',
    suspects: 'V.a. Hirnstamm-/vertebrobasiläre Ischämie',
  },
  rf_schw_ataxie: {
    key: 'rf_schw_ataxie',
    label: 'Gangataxie, fehlende kompensatorische Stellreaktion',
    suspects: 'V.a. zentrale Läsion',
  },

  // --- SHT/Trauma ---
  rf_sht_gcs: {
    key: 'rf_sht_gcs',
    label: 'GCS ≤ 13 nach SHT',
    suspects: 'Relevantes SHT',
    action: 'CT Schädel',
  },
  rf_sht_erbrechen: {
    key: 'rf_sht_erbrechen',
    label: 'Wiederholtes Erbrechen / Krampfanfall nach Trauma',
    suspects: 'Relevantes SHT',
  },
  rf_sht_antikoag: {
    key: 'rf_sht_antikoag',
    label: 'Antikoagulation unter SHT',
    suspects: 'Intrakranielle Blutung',
    action: 'CT Schädel, ggf. Antagonisierung',
  },
  rf_sht_fokaldefizit: {
    key: 'rf_sht_fokaldefizit',
    label: 'Fokal-neurologisches Defizit nach Trauma',
    suspects: 'Strukturelle Läsion',
  },
  rf_sht_liquorrhoe: {
    key: 'rf_sht_liquorrhoe',
    label: 'Liquorrhö / Brillenhämatom / Battle-Zeichen',
    suspects: 'Schädelbasisfraktur',
  },
  rf_sht_offen: {
    key: 'rf_sht_offen',
    label: 'Offene / imprimierte Fraktur',
    suspects: 'Chirurgische Indikation',
  },
  rf_sht_hws: {
    key: 'rf_sht_hws',
    label: 'HWS-Verdacht (NEXUS/Canadian C-Spine nicht erfüllt)',
    suspects: 'HWS-Verletzung',
    action: 'Immobilisation, CT HWS',
  },

  // --- Fokal-neurol. Defizit ---
  rf_stroke_lyse: {
    key: 'rf_stroke_lyse',
    label: 'Symptombeginn im Lyse-/Thrombektomiefenster',
    suspects: 'Stroke-Pathway aktiv',
    action: 'Stroke-Team, CT/CT-Angio/Perfusion',
  },
  rf_stroke_blickparese: {
    key: 'rf_stroke_blickparese',
    label: 'Blickparese / konjugierte Deviation',
    suspects: 'Hemisphärischer Infarkt',
  },
  rf_stroke_aphasie: {
    key: 'rf_stroke_aphasie',
    label: 'Aphasie / Neglect',
    suspects: 'Kortikaler Infarkt',
  },
  rf_stroke_hemiparese: {
    key: 'rf_stroke_hemiparese',
    label: 'Akute Hemiparese',
    suspects: 'Stroke',
  },

  // --- Rücken-/Flankenschmerz ---
  rf_rueck_cauda: {
    key: 'rf_rueck_cauda',
    label: 'Reithosenhypästhesie / Blasen-Mastdarmstörung',
    suspects: 'V.a. Cauda-equina-Syndrom',
    action: 'MRT LWS notfallmäßig',
  },
  rf_rueck_aaa: {
    key: 'rf_rueck_aaa',
    label: 'Pulsierende Resistenz, Hypotonie',
    suspects: 'V.a. rupturiertes AAA',
  },
  rf_rueck_infekt: {
    key: 'rf_rueck_infekt',
    label: 'Fieber + punktueller Klopfschmerz + i.v.-Drogen/OP',
    suspects: 'V.a. Spondylodiszitis / spinaler Abszess',
    action: 'MRT, BK',
  },
  rf_rueck_malignom: {
    key: 'rf_rueck_malignom',
    label: 'B-Symptomatik, Malignom bekannt, Gewichtsverlust',
    suspects: 'V.a. maligne Infiltration',
  },

  // --- Palpitationen ---
  rf_palp_instabil: {
    key: 'rf_palp_instabil',
    label: 'Instabile Tachykardie (Hypotonie, Synkope, Brustschmerz, Dyspnoe)',
    suspects: 'Sofortige Kardioversion erwägen',
  },
  rf_palp_synkope: {
    key: 'rf_palp_synkope',
    label: 'Synkope im Rahmen der Palpitationen',
    suspects: 'V.a. maligne Rhythmusstörung',
  },
  rf_palp_wpw: {
    key: 'rf_palp_wpw',
    label: 'Delta-Welle / kurze PQ-Zeit im EKG',
    suspects: 'V.a. WPW-Syndrom',
  },
  rf_palp_qt: {
    key: 'rf_palp_qt',
    label: 'QTc ↑ / Torsades-Risiko',
    suspects: 'Drohende Torsades',
    action: 'Trigger entfernen, Mg i.v.',
  },

  // --- Hypertensive Entgleisung ---
  rf_hyp_enzephalopathie: {
    key: 'rf_hyp_enzephalopathie',
    label: 'Vigilanzminderung, Kopfschmerz, Krampfanfall, Sehstörung',
    suspects: 'Hypertensive Enzephalopathie',
  },
  rf_hyp_dissektion: {
    key: 'rf_hyp_dissektion',
    label: 'Reißender Thoraxschmerz, BD-Differenz',
    suspects: 'V.a. Aortendissektion',
  },
  rf_hyp_lungenoedem: {
    key: 'rf_hyp_lungenoedem',
    label: 'Akute Linksherzinsuffizienz mit Lungenödem',
    suspects: 'Hypertensive Entgleisung mit akutem Lungenödem',
  },
  rf_hyp_ischaemie: {
    key: 'rf_hyp_ischaemie',
    label: 'Thoraxschmerz, EKG-Dynamik, Troponin ↑',
    suspects: 'Myokardischämie unter Hypertonie',
  },
  rf_hyp_eklampsie: {
    key: 'rf_hyp_eklampsie',
    label: 'Schwangerschaft > 20 SSW + RR ↑ + Proteinurie/Krampf',
    suspects: 'V.a. Eklampsie',
    action: 'Mg i.v., Gyn konsultieren',
  },

  // --- Intoxikation ---
  rf_intox_atemdep: {
    key: 'rf_intox_atemdep',
    label: 'Atemdepression / Vigilanzminderung',
    suspects: 'Opioid-/Sedativa-Intoxikation',
    action: 'Naloxon / Flumazenil je nach Agens, Atemwegsmanagement',
  },
  rf_intox_krampf: {
    key: 'rf_intox_krampf',
    label: 'Krampfanfall',
    suspects: 'Intoxikation mit krampfinduzierender Substanz',
  },
  rf_intox_qt: {
    key: 'rf_intox_qt',
    label: 'QT-Verlängerung / Rhythmusstörung',
    suspects: 'Kardiotoxische Intoxikation',
  },
  rf_intox_mehanol: {
    key: 'rf_intox_mehanol',
    label: 'Metabolische Azidose mit Anionenlücke + osmotische Lücke',
    suspects: 'V.a. Methanol- / Ethylenglykol-Intoxikation',
    action: 'Fomepizol, Hämodialyse',
  },
  rf_intox_paracetamol: {
    key: 'rf_intox_paracetamol',
    label: 'Paracetamol-Einnahme > 150 mg/kg / Spätlatenz',
    suspects: 'V.a. Paracetamol-Intoxikation',
    action: 'Rumack-Matthew-Nomogramm, N-Acetylcystein',
  },
  rf_intox_co: {
    key: 'rf_intox_co',
    label: 'CO-/Cyanid-Exposition',
    suspects: 'V.a. CO-/Cyanid-Intoxikation',
    action: '100 % O₂, ggf. HBO / Hydroxocobalamin',
  },

  // --- Sepsis ---
  rf_sep_qsofa: {
    key: 'rf_sep_qsofa',
    label: 'qSOFA ≥ 2 (AF ≥ 22, Vigilanzminderung, RR ≤ 100 syst.)',
    suspects: 'V.a. Sepsis mit hoher Mortalität',
    action: 'Sepsis-Bundle: BK, Laktat, breite AB ≤ 1 h, Volumen',
  },
  rf_sep_laktat: {
    key: 'rf_sep_laktat',
    label: 'Laktat ≥ 2 mmol/l (insb. ≥ 4)',
    suspects: 'V.a. septischer Schock / Gewebshypoperfusion',
    action: 'Laktat-Verlauf, Volumen, ggf. Vasopressoren',
  },
  rf_sep_infektquelle: {
    key: 'rf_sep_infektquelle',
    label: 'Unklare Infektquelle trotz Sepsis-Klinik',
    suspects: 'Okkulter Fokus (Endokarditis, Abszess, Cholangitis, Spondylodiszitis)',
    action: 'Zielgerichtete Bildgebung / Echo, multiple BK',
  },
  rf_sep_meningismus: {
    key: 'rf_sep_meningismus',
    label: 'Meningismus + Fieber + Vigilanzminderung',
    suspects: 'V.a. bakterielle Meningitis',
    action: 'Empirische AB + Dexamethason ≤ 1 h, Liquor',
  },
  rf_sep_fulminant: {
    key: 'rf_sep_fulminant',
    label: 'Fulminanter Verlauf (Petechien, Purpura fulminans)',
    suspects: 'V.a. Meningokokkensepsis / Waterhouse-Friderichsen',
    action: 'Sofort AB, Isolation, RKI-Meldung',
  },
  rf_sep_immunsuppr: {
    key: 'rf_sep_immunsuppr',
    label: 'Neutropenie / Immunsuppression / Asplenie',
    suspects: 'Erhöhte Sepsis-Letalität',
    action: 'Frühe empirische Breitband-AB, Isolation',
  },

  // --- Bewusstseinsveränderung ---
  rf_bwv_hypoglyk: {
    key: 'rf_bwv_hypoglyk',
    label: 'BZ < 70 mg/dl (3,9 mmol/l) / Diabetes-Anamnese',
    suspects: 'V.a. Hypoglykämie',
    action: 'BZ messen, 40 % Glucose i.v. / Glucagon',
  },
  rf_bwv_intox: {
    key: 'rf_bwv_intox',
    label: 'Substanzexposition / Miosis / Atemdepression',
    suspects: 'V.a. Intoxikation',
    action: 'Naloxon / Flumazenil je nach Klinik, Anamnese fremd',
  },
  rf_bwv_icb: {
    key: 'rf_bwv_icb',
    label: 'Fokales Defizit / Antikoagulation / Kopfschmerz',
    suspects: 'V.a. intrakranielle Blutung',
    action: 'CT Schädel, ggf. Antagonisierung',
  },
  rf_bwv_hyponat: {
    key: 'rf_bwv_hyponat',
    label: 'Hyponatriämie < 125 mmol/l / Krampfanfall',
    suspects: 'V.a. schwere Hyponatriämie',
    action: 'Natrium-Substitution vorsichtig, keine schnelle Korrektur',
  },
  rf_bwv_sepsis: {
    key: 'rf_bwv_sepsis',
    label: 'Fieber + Vigilanzminderung',
    suspects: 'V.a. septische Enzephalopathie / Meningitis',
    action: 'Sepsis-Workup, Liquor',
  },
  rf_bwv_nk_status: {
    key: 'rf_bwv_nk_status',
    label: 'Blickdeviation / Automatismen / postiktale Vigilanzminderung',
    suspects: 'V.a. nicht-konvulsiven Status epilepticus',
    action: 'EEG, Benzodiazepine empirisch erwägen',
  },
  rf_bwv_hypoxie: {
    key: 'rf_bwv_hypoxie',
    label: 'Hypoxie / Hyperkapnie',
    suspects: 'Respiratorische Enzephalopathie',
    action: 'O₂, BGA, nicht-invasive Beatmung erwägen',
  },
};
