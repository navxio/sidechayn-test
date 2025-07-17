import * as Tone from 'tone';

/**
 * Audio effects configuration
 */
export interface AudioEffects {
  speed: number;
  pitch: number;
  reverb: number;
  lowEQ: number;
  midEQ: number;
  highEQ: number;
  volume: number;
}

/**
 * Player state
 */
export interface PlayerState {
  isPlaying: boolean;
  isLoading: boolean;
  duration: number;
  currentTime: number;
}

/**
 * Default effects values
 */
export const DEFAULT_EFFECTS: AudioEffects = {
  speed: 1,
  pitch: 0,
  reverb: 0,
  lowEQ: 0,
  midEQ: 0,
  highEQ: 0,
  volume: 0.7,
};

/**
 * Audio Effect Nodes via the web audio api
 */
export interface AudioNodes {
  player: Tone.Player | null;
  volume: Tone.Volume;
  pitchShift: Tone.PitchShift;
  eq3: Tone.EQ3;
  reverb: Tone.Reverb;
}
