import { describe, it, expect } from 'vitest';
import { ROS_BY_KEY, ROS_CATEGORIES } from '../ros';
import { SYMPTOMS } from '../symptoms';
import { DIAGNOSES } from '../diagnoses';

describe('ROS catalog integrity', () => {
  it('every item key is unique', () => {
    const keys = ROS_CATEGORIES.flatMap((c) => c.items.map((i) => i.key));
    const set = new Set(keys);
    expect(set.size).toBe(keys.length);
  });

  it('every item carries the right category', () => {
    for (const cat of ROS_CATEGORIES) {
      for (const item of cat.items) {
        expect(item.category).toBe(cat.key);
      }
    }
  });

  it('every Symptom highlightedRosKey points to a valid ROS item', () => {
    for (const sym of SYMPTOMS) {
      for (const k of sym.highlightedRosKeys ?? []) {
        expect(ROS_BY_KEY[k], `${sym.key} → ${k}`).toBeDefined();
      }
    }
  });

  it('every Diagnosis highlightedRosKey points to a valid ROS item', () => {
    for (const dx of DIAGNOSES) {
      for (const k of dx.highlightedRosKeys ?? []) {
        expect(ROS_BY_KEY[k], `${dx.key} → ${k}`).toBeDefined();
      }
    }
  });
});
