import * as Tone from 'tone';
import type { AudioNodes } from '../types/audio';

export const createAudioNodes = (): Omit<AudioNodes, 'player'> => {
  console.log('Creating audio nodes...');

  // Create reverb with minimal effect initially
  const reverb = new Tone.Reverb({
    decay: 0.1,  // Very short decay
    wet: 0       // Start with 0% wet signal (no reverb effect)
  }).toDestination();

  const eq3 = new Tone.EQ3().connect(reverb);
  const pitchShift = new Tone.PitchShift().connect(eq3);
  const volume = new Tone.Volume(0).connect(pitchShift);

  console.log('Complete chain: Player -> Volume -> PitchShift -> EQ3 -> Reverb(0%) -> Speakers');

  return {
    volume,
    pitchShift,
    eq3,
    reverb,
  };
};

export const disposeNodes = (nodes: Partial<AudioNodes>): void => {
  Object.values(nodes).forEach(node => {
    if (node) {
      node.dispose();
    }
  });
};
