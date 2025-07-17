import * as Tone from 'tone';
import type { AudioNodes } from '../types/audio';

/**
 * Create and connect audio effect chain
 * 
 * Audio flow:
 * Player -> Volume -> PitchShift -> EQ3 -> Reverb -> Speakers
 * 
 * Each node processes the audio and passes it to the next one
 */
export const createAudioNodes = (): Omit<AudioNodes, 'player'> => {
  // Create nodes (order matters for the chain)
  const reverb = new Tone.Reverb(0.5).toDestination();
  const eq3 = new Tone.EQ3().connect(reverb);
  const pitchShift = new Tone.PitchShift().connect(eq3);
  const volume = new Tone.Volume().connect(pitchShift);

  return {
    volume,      // First in chain (player will connect here)
    pitchShift,
    eq3,
    reverb,      // Last in chain
  };
};

/**
 * Clean up audio nodes (complete the lifecycle)
 */
export const disposeNodes = (nodes: Partial<AudioNodes>): void => {
  Object.values(nodes).forEach(node => {
    if (node) {
      node.dispose();
    }
  });
};
