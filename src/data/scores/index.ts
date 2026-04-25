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
};

export function getScore(key: ScoreKey): ScoreDef | undefined {
  return SCORES[key];
}
