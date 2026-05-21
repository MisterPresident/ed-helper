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

  // --- Krampfanfall ---
  rf_krampf_status: {
    key: 'rf_krampf_status',
    label: 'Anfallsdauer > 5 min oder repetitiv ohne vollständige Erholung',
    suspects: 'Status epilepticus',
    action: 'Benzodiazepin i.v./i.m., Neurologie, Intensiv',
  },
  rf_krampf_erstanfall: {
    key: 'rf_krampf_erstanfall',
    label: 'Erstanfall im Erwachsenenalter ohne bekannte Epilepsie',
    suspects: 'Strukturelle oder metabolische Ursache',
    action: 'cCT / MRT, Labor (BZ, Elektrolyte, Toxikologie)',
  },
  rf_krampf_herz: {
    key: 'rf_krampf_herz',
    label: 'Rasches Erwachen < 30 s, < 10 beobachtete Myoklonien',
    suspects: 'Konvulsive Synkope (kardiale Ursache!)',
    action: 'EKG, Echo, Langzeit-EKG',
  },
  rf_krampf_meningismus: {
    key: 'rf_krampf_meningismus',
    label: 'Fieber + Meningismus + Krampf',
    suspects: 'Meningitis / Enzephalitis',
    action: 'Sofort Antibiotika + Aciclovir, LP nach cCT',
  },

  // --- Übelkeit / Erbrechen ---
  rf_ueb_icp: {
    key: 'rf_ueb_icp',
    label: 'Schwallartiges Erbrechen + Kopfschmerz / Vigilanzminderung / Stauungspapille',
    suspects: 'V.a. Hirndruck (ICB, Tumor, Hydrozephalus)',
    action: 'CCT sofort, Oberkörperhochlagerung, Neurochirurgie',
  },
  rf_ueb_ileus: {
    key: 'rf_ueb_ileus',
    label: 'Schwallartiges, fäkulent riechendes Erbrechen, Stuhl-/Windverhalt',
    suspects: 'V.a. Ileus (mechanisch/paralytisch)',
    action: 'Röntgen/CT Abdomen, Magensonde, Chirurgie',
  },
  rf_ueb_gib: {
    key: 'rf_ueb_gib',
    label: 'Hämatemesis oder kaffeesatzartiges Erbrechen',
    suspects: 'V.a. obere GI-Blutung',
    action: 'GBS-Score, Hb-Kontrolle, Endoskopie',
  },
  rf_ueb_dka: {
    key: 'rf_ueb_dka',
    label: 'Erbrechen + Polyurie + Kussmaul-Atmung / azetonischer Foetor',
    suspects: 'V.a. diabetische Ketoazidose',
    action: 'BZ, BGA, Keton, Volumen + Insulin',
  },
  rf_ueb_dehydration: {
    key: 'rf_ueb_dehydration',
    label: 'Schwere Dehydration (Hypotension, Oligurie, Vigilanz ↓)',
    suspects: 'V.a. hypovolämischer Schock',
    action: 'Volumengabe, Elektrolyte, Ursache klären',
  },
  rf_ueb_schwanger: {
    key: 'rf_ueb_schwanger',
    label: 'Therapierefraktäres Erbrechen in der Schwangerschaft, Gewichtsverlust > 5 %',
    suspects: 'V.a. Hyperemesis gravidarum',
    action: 'Antiemese, Volumengabe, Gyn-Konsil, B1-Substitution',
  },

  // --- Diarrhoe ---
  rf_diar_blutig: {
    key: 'rf_diar_blutig',
    label: 'Blutige Diarrhoe + Fieber / Tenesmen',
    suspects: 'V.a. invasive bakterielle Enteritis / EHEC / ischämische Kolitis',
    action: 'Stuhlkultur inkl. EHEC, kein Loperamid, ggf. CT',
  },
  rf_diar_sepsis: {
    key: 'rf_diar_sepsis',
    label: 'Fieber + Vigilanz ↓ + Hypotension oder Laktat ↑',
    suspects: 'V.a. enterale Sepsis / Toxisches Megakolon',
    action: 'Sepsis-Bundle, BK, Volumen, breite AB ≤ 1 h',
  },
  rf_diar_dehydration: {
    key: 'rf_diar_dehydration',
    label: 'Schwere Volumenverluste, Hypotension, Oligurie, Hypernatriämie',
    suspects: 'V.a. dekompensierte Dehydration',
    action: 'i.v.-Volumengabe, Elektrolytausgleich, Monitoring',
  },
  rf_diar_cdiff: {
    key: 'rf_diar_cdiff',
    label: 'Antibiose / Krankenhausaufenthalt in den letzten 8 Wochen',
    suspects: 'V.a. Clostridioides-difficile-Infektion',
    action: 'GDH/Toxin-Test, Isolation, Vancomycin oral / Fidaxomicin',
  },
  rf_diar_immunsuppr: {
    key: 'rf_diar_immunsuppr',
    label: 'Immunsuppression, HIV, Chemo, Steroide',
    suspects: 'Opportunistische Erreger / fulminanter Verlauf',
    action: 'Erweiterte Stuhldiagnostik (CMV, Cryptosporidien), frühe AB',
  },

  // --- Obstipation / Stuhlverhalt ---
  rf_obs_ileus: {
    key: 'rf_obs_ileus',
    label: 'Geblähtes Abdomen + Erbrechen + Stuhl-/Windverhalt',
    suspects: 'V.a. mechanischer / paralytischer Ileus',
    action: 'Röntgen/CT Abdomen, Magensonde, Chirurgie',
  },
  rf_obs_perforation: {
    key: 'rf_obs_perforation',
    label: 'Peritonismus, freie Luft, Abwehrspannung',
    suspects: 'V.a. Hohlorganperforation (Stercoral / tumorbedingt)',
    action: 'CT Abdomen, Chirurgie',
  },
  rf_obs_malignom: {
    key: 'rf_obs_malignom',
    label: 'B-Symptomatik, Stuhlkaliberänderung, Blut im Stuhl, Gewichtsverlust',
    suspects: 'V.a. kolorektales Karzinom / Stenose',
    action: 'CT Abdomen, Koloskopie zeitnah',
  },
  rf_obs_caudasynd: {
    key: 'rf_obs_caudasynd',
    label: 'Reithosenhypästhesie, Blasen-/Mastdarmstörung, Rückenschmerz',
    suspects: 'V.a. Cauda-equina-Syndrom',
    action: 'MRT LWS notfallmäßig, Neurochirurgie',
  },
  rf_obs_elektrolyte: {
    key: 'rf_obs_elektrolyte',
    label: 'Hypokaliämie / Hyperkalzämie / Hypothyreose',
    suspects: 'Metabolische Ursache der Obstipation',
    action: 'Labor, ursächliche Therapie',
  },

  // --- Ikterus ---
  rf_ikt_cholangitis: {
    key: 'rf_ikt_cholangitis',
    label: 'Charcot-Trias (Ikterus + Fieber + RUQ-Schmerz) / Reynolds-Pentade',
    suspects: 'V.a. akute (eitrige) Cholangitis',
    action: 'BK, breite AB ≤ 1 h, ERCP innerhalb 24 h',
  },
  rf_ikt_leberversagen: {
    key: 'rf_ikt_leberversagen',
    label: 'Ikterus + Enzephalopathie + INR > 1,5 ohne vorbestehende Lebererkrankung',
    suspects: 'V.a. akutes Leberversagen',
    action: 'Hepatologie/Transplantzentrum, NAC bei V.a. Paracetamol',
  },
  rf_ikt_haemolyse: {
    key: 'rf_ikt_haemolyse',
    label: 'Rascher Hb-Abfall, LDH ↑, Haptoglobin ↓, Bili indirekt ↑',
    suspects: 'V.a. hämolytische Krise',
    action: 'Coombs, Retikulozyten, Blutausstrich, Hämatologie',
  },
  rf_ikt_sepsis: {
    key: 'rf_ikt_sepsis',
    label: 'Sepsiszeichen (qSOFA ≥ 2, Laktat ↑) bei Ikterus',
    suspects: 'V.a. biliäre Sepsis / septische Cholangitis',
    action: 'Sepsis-Bundle, Bildgebung (Sono/CT), frühe Galleableitung',
  },
  rf_ikt_obstruktion: {
    key: 'rf_ikt_obstruktion',
    label: 'Schmerzloser progredienter Ikterus + Gewichtsverlust',
    suspects: 'V.a. maligne Gallenwegsobstruktion (Pankreaskopf, Klatskin)',
    action: 'CT/MRCP, Tumormarker, interdisziplinäre Planung',
  },

  // --- GI-Blutung ---
  rf_gib_schock: {
    key: 'rf_gib_schock',
    label: 'Hypotension, Tachykardie, Hb-Abfall ≥ 2 g/dl',
    suspects: 'Hämorrhagischer Schock',
    action: 'Volumen + EK, Notfallendoskopie, Transfusions-Trigger Hb < 7',
  },
  rf_gib_varizen: {
    key: 'rf_gib_varizen',
    label: 'Bekannte Leberzirrhose oder portale Hypertension',
    suspects: 'Varizenblutung (hohe Mortalität)',
    action: 'Terlipressin, Ceftriaxon, sofortige Endoskopie',
  },
  rf_gib_massiv: {
    key: 'rf_gib_massiv',
    label: 'Massenhämatemesis / Massive Hämatochezie / instabile Vitalparameter',
    suspects: 'Massivblutung (obere oder untere GIB)',
    action: 'Massivtransfusion-Protokoll, Anästhesie, Endoskopie/IR',
  },
  rf_gib_ischaemie: {
    key: 'rf_gib_ischaemie',
    label: 'Bauchschmerz > Befund + Hämatochezie + vaskuläres Risiko (VHF, AVK, Hypoperfusion)',
    suspects: 'V.a. ischämische Kolitis / Mesenterialischämie',
    action: 'Laktat, CT-Angio Abdomen, frühe chirurgische Mitbeurteilung',
  },
  rf_gib_aortoent: {
    key: 'rf_gib_aortoent',
    label: 'Z.n. AAA-OP / endovaskulärer Stent + obere GI-Blutung',
    suspects: 'V.a. aorto-enterale Fistel',
    action: 'Sofort CT-Angio Aorta, Gefäßchirurgie',
  },

  // --- Anaphylaxie ---
  rf_ana_stridor: {
    key: 'rf_ana_stridor',
    label: 'Stridor, Heiserkeit, Schluckbeschwerden, Zungenödem',
    suspects: 'Larynxödem / drohende Asphyxie',
    action: 'Adrenalin i.m. sofort, Intubationsbereitschaft, HNO',
  },
  rf_ana_schock: {
    key: 'rf_ana_schock',
    label: 'Hypotension, Tachykardie, Blässe/Mottling',
    suspects: 'Anaphylaktischer Schock Grad III–IV',
    action: 'Adrenalin i.m./i.v., Volumen, Lagerung, Intensiv',
  },
  rf_ana_bewusst: {
    key: 'rf_ana_bewusst',
    label: 'Bewusstseinsminderung, Synkope',
    suspects: 'Zerebrale Minderperfusion / Anaphylaxie Grad IV',
    action: 'Adrenalin i.v., Reanimationsbereitschaft',
  },

  // --- Bradykardie ---
  rf_brady_instabil: {
    key: 'rf_brady_instabil',
    label: 'Hypotension, Schock, Dyspnoe, Synkope, Herzinsuffizienz',
    suspects: 'Instabile Bradykardie → sofortige Therapie',
    action: 'Atropin 0,5 mg i.v. (nicht bei AV-Block II° Typ 2!), Transkutanes Pacing',
  },
  rf_brady_av3: {
    key: 'rf_brady_av3',
    label: 'AV-Dissoziation, Kammerkomplexe < 40/min',
    suspects: 'AV-Block III° (totaler AV-Block)',
    action: 'Kein Atropin! Transventrikuläres Pacing, Kardiologie',
  },
  rf_brady_hyperkal: {
    key: 'rf_brady_hyperkal',
    label: 'Peaked-T-Wellen, breite QRS, sine-wave-Muster',
    suspects: 'Hyperkaliämie',
    action: 'Kalzium i.v., Insulin + Glukose, Natriumbikarbonat, Dialyse',
  },
};
