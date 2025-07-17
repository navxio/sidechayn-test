import * as Tone from 'tone';

/**
 * Initialize Tone.js audio context
 * Must be called after user interaction due to browser autoplay restriction
 */
export const initializeAudio = async (): Promise<void> => {
  try {
    await Tone.start();
    console.log('Audio context initialized');
  } catch (error) {
    console.error('Failed to initialize audio:', error);
    throw new Error('Audio initialization failed');
  }
};

/**
 * Get current audio context time
 */
export const getCurrentTime = (): number => {
  return Tone.getContext().currentTime;
};
