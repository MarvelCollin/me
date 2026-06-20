export type Dir = 'left' | 'right' | 'up' | 'down';

export interface Variant {
  type: 'wipe' | 'iris' | 'split';
  dir?: Dir;
}
