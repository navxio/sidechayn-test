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
