import type { StatusSystemKey } from '../../types';
import { cnsPalette } from './cns';
import { corPalette } from './cor';
import { pulmoPalette } from './pulmo';
import { wsPalette } from './ws';
import { flankenPalette } from './flanken';
import { abdomenPalette } from './abdomen';
import { extremitaetenPalette } from './extremitaeten';

export type StatusChip = {
  key: string;
  label: string;
  isNormal?: boolean;
};

export type StatusPalette = {
  system: StatusSystemKey;
  label: string;
  /** one-liner summary when ALL findings are the default normal (used in summary if user just keeps defaults) */
  normSummary: string;
  /** groups of mutually-exclusive-ish chips the user clicks to build the status */
  groups: { label: string; chips: StatusChip[] }[];
};

export const STATUS_PALETTES: Record<StatusSystemKey, StatusPalette> = {
  cns: cnsPalette,
  cor: corPalette,
  pulmo: pulmoPalette,
  abdomen: abdomenPalette,
  ws: wsPalette,
  flanken: flankenPalette,
  extremitaeten: extremitaetenPalette,
};
