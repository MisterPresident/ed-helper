import type { RosCategoryDef, RosCategoryKey, RosItem } from '../types';

const cat = (
  key: RosCategoryKey,
  label: string,
  items: { key: string; label: string }[]
): RosCategoryDef => ({
  key,
  label,
  items: items.map((i) => ({ ...i, category: key })),
});

export const ROS_CATEGORIES: RosCategoryDef[] = [
  cat('konstitutionell', 'Konstitutionell / Allgemein', [
    { key: 'ros_const_fieber', label: 'Fieber' },
    { key: 'ros_const_schuettelfrost', label: 'Schüttelfrost' },
    { key: 'ros_const_nachtschweiss', label: 'Nachtschweiß' },
    { key: 'ros_const_muedigkeit', label: 'Müdigkeit / Leistungsknick' },
    { key: 'ros_const_gewichtsverlust', label: 'Gewichtsverlust / -zunahme' },
    { key: 'ros_const_appetit', label: 'Appetitverlust' },
    { key: 'ros_const_malaise', label: 'Allgemeines Krankheitsgefühl' },
  ]),
  cat('augen', 'Augen', [
    { key: 'ros_aug_visus', label: 'Visusstörung' },
    { key: 'ros_aug_schmerz', label: 'Augenschmerz' },
    { key: 'ros_aug_rotaug', label: 'Rotes Auge' },
    { key: 'ros_aug_sekret', label: 'Augensekret' },
    { key: 'ros_aug_photo', label: 'Photophobie' },
    { key: 'ros_aug_diplopie', label: 'Doppelbilder' },
  ]),
  cat('hno', 'HNO', [
    { key: 'ros_hno_hoeren', label: 'Hörminderung' },
    { key: 'ros_hno_tinnitus', label: 'Tinnitus' },
    { key: 'ros_hno_ohrschmerz', label: 'Ohrenschmerz' },
    { key: 'ros_hno_kongest', label: 'Nasale Kongestion' },
    { key: 'ros_hno_epistaxis', label: 'Epistaxis' },
    { key: 'ros_hno_halsschmerz', label: 'Halsschmerz' },
    { key: 'ros_hno_heiserkeit', label: 'Heiserkeit' },
    { key: 'ros_hno_dysphagie', label: 'Dysphagie' },
  ]),
  cat('cardiovaskulaer', 'Kardiovaskulär', [
    { key: 'ros_cv_thoraxschmerz', label: 'Thoraxschmerz' },
    { key: 'ros_cv_palpitationen', label: 'Palpitationen' },
    { key: 'ros_cv_orthopnoe', label: 'Orthopnoe' },
    { key: 'ros_cv_pnd', label: 'Paroxysmale nächtliche Dyspnoe' },
    { key: 'ros_cv_oedeme', label: 'Beinödeme' },
    { key: 'ros_cv_claudicatio', label: 'Claudicatio' },
    { key: 'ros_cv_synkope', label: 'Synkope' },
  ]),
  cat('respiratorisch', 'Pulmonal', [
    { key: 'ros_resp_dyspnoe', label: 'Dyspnoe' },
    { key: 'ros_resp_husten', label: 'Husten' },
    { key: 'ros_resp_sputum', label: 'Sputum-Produktion' },
    { key: 'ros_resp_haemoptyse', label: 'Hämoptysen' },
    { key: 'ros_resp_giemen', label: 'Giemen / Pfeifen' },
    { key: 'ros_resp_pleuritisch', label: 'Atemabhängiger Schmerz' },
  ]),
  cat('gastrointestinal', 'Gastrointestinal', [
    { key: 'ros_gi_uebelkeit', label: 'Übelkeit' },
    { key: 'ros_gi_erbrechen', label: 'Erbrechen' },
    { key: 'ros_gi_diarrhoe', label: 'Diarrhoe' },
    { key: 'ros_gi_obstipation', label: 'Obstipation' },
    { key: 'ros_gi_bauchschmerz', label: 'Bauchschmerz' },
    { key: 'ros_gi_dyspepsie', label: 'Dyspepsie / Sodbrennen' },
    { key: 'ros_gi_haematemesis', label: 'Hämatemesis' },
    { key: 'ros_gi_melaena', label: 'Meläna' },
    { key: 'ros_gi_haematochezie', label: 'Hämatochezie' },
    { key: 'ros_gi_ikterus', label: 'Ikterus' },
  ]),
  cat('urogenital', 'Urogenital', [
    { key: 'ros_uro_dysurie', label: 'Dysurie' },
    { key: 'ros_uro_pollakisurie', label: 'Pollakisurie' },
    { key: 'ros_uro_drang', label: 'Drang / imperativer Harndrang' },
    { key: 'ros_uro_haematurie', label: 'Hämaturie' },
    { key: 'ros_uro_inkontinenz', label: 'Inkontinenz' },
    { key: 'ros_uro_nykturie', label: 'Nykturie' },
    { key: 'ros_uro_genitalsekret', label: 'Genitales Sekret' },
    { key: 'ros_uro_sexstoerung', label: 'Sexuelle Funktionsstörung' },
  ]),
  cat('muskuloskelettal', 'Muskuloskelettal', [
    { key: 'ros_msk_gelenk', label: 'Gelenkschmerz' },
    { key: 'ros_msk_steifigkeit', label: 'Gelenksteifigkeit' },
    { key: 'ros_msk_schwellung', label: 'Gelenkschwellung' },
    { key: 'ros_msk_muskel', label: 'Muskelschmerz' },
    { key: 'ros_msk_schwaeche', label: 'Muskelschwäche' },
    { key: 'ros_msk_rueckenschmerz', label: 'Rückenschmerz' },
    { key: 'ros_msk_bewegung', label: 'Bewegungseinschränkung' },
  ]),
  cat('haut', 'Haut', [
    { key: 'ros_haut_ausschlag', label: 'Hautausschlag' },
    { key: 'ros_haut_laesion', label: 'Hautläsion / Ulkus' },
    { key: 'ros_haut_pruritus', label: 'Pruritus' },
    { key: 'ros_haut_naevus', label: 'Veränderung an Naevi' },
    { key: 'ros_haut_haematome', label: 'Hämatomneigung' },
    { key: 'ros_haut_haare_naegel', label: 'Haar-/Nagelveränderung' },
  ]),
  cat('neurologisch', 'Neurologisch', [
    { key: 'ros_neu_kopfschmerz', label: 'Kopfschmerz' },
    { key: 'ros_neu_schwindel', label: 'Schwindel' },
    { key: 'ros_neu_synkope', label: 'Synkope' },
    { key: 'ros_neu_krampf', label: 'Krampfanfall' },
    { key: 'ros_neu_schwaeche', label: 'Halbseitenschwäche / fokale Schwäche' },
    { key: 'ros_neu_taubheit', label: 'Taubheitsgefühl' },
    { key: 'ros_neu_kribbeln', label: 'Parästhesien / Kribbeln' },
    { key: 'ros_neu_tremor', label: 'Tremor' },
    { key: 'ros_neu_gangstoerung', label: 'Gangstörung / Ataxie' },
    { key: 'ros_neu_gedaechtnis', label: 'Gedächtnis-/Konzentrationsstörung' },
    { key: 'ros_neu_vigilanz', label: 'Vigilanzminderung' },
    { key: 'ros_neu_aphasie', label: 'Sprachstörung' },
  ]),
  cat('psychiatrisch', 'Psychiatrisch', [
    { key: 'ros_psy_stimmung', label: 'Stimmungsschwankung' },
    { key: 'ros_psy_depression', label: 'Depression' },
    { key: 'ros_psy_angst', label: 'Angst' },
    { key: 'ros_psy_schlaf', label: 'Schlafstörung' },
    { key: 'ros_psy_konzentration', label: 'Konzentrationsstörung' },
    { key: 'ros_psy_libido', label: 'Libidoveränderung' },
    { key: 'ros_psy_suizid', label: 'Suizidalität' },
  ]),
  cat('endokrin', 'Endokrin', [
    { key: 'ros_endo_temperatur', label: 'Hitze-/Kälteintoleranz' },
    { key: 'ros_endo_polyurie', label: 'Polyurie' },
    { key: 'ros_endo_polydipsie', label: 'Polydipsie' },
    { key: 'ros_endo_polyphagie', label: 'Polyphagie' },
    { key: 'ros_endo_schilddruese', label: 'Schilddrüsensymptome' },
    { key: 'ros_endo_schwitzen', label: 'Schwitzen / autonome Symptome' },
    { key: 'ros_endo_heisshunger', label: 'Heißhunger' },
  ]),
  cat('haematologisch', 'Hämatologisch / Lymphatisch', [
    { key: 'ros_haem_haematome', label: 'Hämatomneigung / Petechien' },
    { key: 'ros_haem_blutung', label: 'Blutungsneigung' },
    { key: 'ros_haem_lymphknoten', label: 'Lymphknotenschwellung' },
    { key: 'ros_haem_anaemie', label: 'Anämiesymptome (Blässe, Belastungsdyspnoe)' },
  ]),
  cat('allergisch', 'Allergologisch / Immunologisch', [
    { key: 'ros_all_allergien', label: 'Bekannte Allergien' },
    { key: 'ros_all_reaktion', label: 'Allergische Reaktion aktuell' },
    { key: 'ros_all_infekte', label: 'Rezidivierende Infekte' },
    { key: 'ros_all_immunsuppr', label: 'Immunsuppression' },
  ]),
];

export const ROS_BY_KEY: Record<string, RosItem> = Object.fromEntries(
  ROS_CATEGORIES.flatMap((c) => c.items.map((i) => [i.key, i]))
);

export const ROS_CATEGORY_BY_KEY: Record<RosCategoryKey, RosCategoryDef> = Object.fromEntries(
  ROS_CATEGORIES.map((c) => [c.key, c])
) as Record<RosCategoryKey, RosCategoryDef>;
