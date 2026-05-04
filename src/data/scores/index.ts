import type { ScoreDef, ScoreKey } from '../../types';
import { heartScore } from './heart';
import { percScore } from './perc';
import { wellsPEScore } from './wellsPE';
import { genevaScore } from './geneva';
import { wellsDVTScore } from './wellsDVT';
import { qsofaScore } from './qsofa';
import { gcsScore } from './gcs';
import { nihssScore } from './nihss';
import { abcd2Score } from './abcd2';
import { canadianCTHeadScore } from './canadianCTHead';
import { ottawaAnkleScore } from './ottawaAnkle';
// Phase 3 dispo scores
import { sfsrScore } from './sfsr';
import { csrsScore } from './csrs';
import { roseScore } from './rose';
import { curb65Score } from './curb65';
import { crb65Score } from './crb65';
import { psiScore } from './psi';
import { spesiScore } from './spesi';
import { pesiScore } from './pesi';
import { hestiaScore } from './hestia';
import { timiScore } from './timi';
import { edacsScore } from './edacs';
import { gbsScore } from './gbs';
import { oaklandScore } from './oakland';
import { news2Score } from './news2';
import { gapsScore } from './gaps';
import { mapsScore } from './maps';
import { trialScore } from './trial';
import { ohfrsScore } from './ohfrs';

export const SCORES: Record<ScoreKey, ScoreDef> = {
  heart: heartScore,
  wellsPE: wellsPEScore,
  geneva: genevaScore,
  perc: percScore,
  wellsDVT: wellsDVTScore,
  qsofa: qsofaScore,
  gcs: gcsScore,
  nihss: nihssScore,
  abcd2: abcd2Score,
  canadianCTHead: canadianCTHeadScore,
  ottawaAnkle: ottawaAnkleScore,
  // Phase 3 dispo
  sfsr: sfsrScore,
  csrs: csrsScore,
  rose: roseScore,
  curb65: curb65Score,
  crb65: crb65Score,
  psi: psiScore,
  spesi: spesiScore,
  pesi: pesiScore,
  hestia: hestiaScore,
  timi: timiScore,
  edacs: edacsScore,
  gbs: gbsScore,
  oakland: oaklandScore,
  news2: news2Score,
  gaps: gapsScore,
  maps: mapsScore,
  trial: trialScore,
  ohfrs: ohfrsScore,
};

export function getScore(key: ScoreKey): ScoreDef | undefined {
  return SCORES[key];
}
