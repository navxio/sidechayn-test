import * as Tone from 'tone';
import type { AudioEffects, AudioNodes } from '../types/audio';

/**
 * Apply all effects to the audio nodes
 */
export const applyEffects = (effects: AudioEffects, nodes: AudioNodes): void => {
  if (!nodes.player) {
    console.warn('No player available to apply effects');
    return;
  }

  // Apply speed (playback rate) - direct assignment, no .value
  if (nodes.player) {
    nodes.player.playbackRate = effects.speed;
    console.log('Applied speed:', effects.speed);
  }

  // Apply pitch shift
  if (nodes.pitchShift) {
    nodes.pitchShift.pitch = effects.pitch;
    console.log('Applied pitch:', effects.pitch);
  }

  // Apply reverb wet amount
  if (nodes.reverb) {
    nodes.reverb.wet.value = effects.reverb;
    console.log('Applied reverb:', effects.reverb);
  }

  // Apply EQ settings
  if (nodes.eq3) {
    nodes.eq3.low.value = effects.lowEQ;
    nodes.eq3.mid.value = effects.midEQ;
    nodes.eq3.high.value = effects.highEQ;
    console.log('Applied EQ - Low:', effects.lowEQ, 'Mid:', effects.midEQ, 'High:', effects.highEQ);
  }

  // Apply volume (convert linear to dB)
  if (nodes.volume) {
    nodes.volume.volume.value = Tone.gainToDb(effects.volume);
    console.log('Applied volume:', effects.volume, '(', Tone.gainToDb(effects.volume), 'dB)');
  }
};

/**
 * Apply a single effect parameter
 */
export const applySingleEffect = (
  effectName: keyof AudioEffects,
  value: number,
  nodes: AudioNodes
): void => {
  switch (effectName) {
    case 'speed':
      if (nodes.player) {
        nodes.player.playbackRate = value; // No .value here
      }
      break;
    case 'pitch':
      if (nodes.pitchShift) {
        nodes.pitchShift.pitch = value;
      }
      break;
    case 'reverb':
      if (nodes.reverb) {
        nodes.reverb.wet.value = value;
      }
      break;
    case 'lowEQ':
      if (nodes.eq3) {
        nodes.eq3.low.value = value;
      }
      break;
    case 'midEQ':
      if (nodes.eq3) {
        nodes.eq3.mid.value = value;
      }
      break;
    case 'highEQ':
      if (nodes.eq3) {
        nodes.eq3.high.value = value;
      }
      break;
    case 'volume':
      if (nodes.volume) {
        nodes.volume.volume.value = Tone.gainToDb(value);
      }
      break;
    default:
      console.warn('Unknown effect:', effectName);
  }

  console.log('Applied single effect:', effectName, '=', value);
};
