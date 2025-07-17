// not to be confused with React.useEffect
import { useState, useCallback } from 'react';
import { DEFAULT_EFFECTS } from '../types/audio';
import { applyEffects, applySingleEffect } from '../utils/effectsUtils';
import type { AudioEffects, AudioNodes } from '../types/audio';

export const useEffects = () => {
  const [effects, setEffects] = useState<AudioEffects>(DEFAULT_EFFECTS);

  /**
   * Update a single effect and apply it immediately
   */
  const updateEffect = useCallback((
    effectName: keyof AudioEffects,
    value: number,
    nodes: AudioNodes
  ) => {
    setEffects(prev => {
      const newEffects = { ...prev, [effectName]: value };

      // Apply the single effect immediately
      applySingleEffect(effectName, value, nodes);

      return newEffects;
    });
  }, []);

  /**
   * Apply all current effects to audio nodes
   */
  const applyAllEffects = useCallback((nodes: AudioNodes) => {
    applyEffects(effects, nodes);
  }, [effects]);

  /**
   * Reset all effects to defaults
   */
  const resetEffects = useCallback((nodes: AudioNodes) => {
    setEffects(DEFAULT_EFFECTS);
    applyEffects(DEFAULT_EFFECTS, nodes);
    console.log('Reset all effects to defaults');
  }, []);

  /**
   * Get current effect value
   */
  const getEffect = useCallback((effectName: keyof AudioEffects) => {
    return effects[effectName];
  }, [effects]);

  return {
    effects,
    updateEffect,
    applyAllEffects,
    resetEffects,
    getEffect,
  };
};
