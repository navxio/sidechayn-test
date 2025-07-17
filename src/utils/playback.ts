import * as Tone from 'tone';

/**
 * Start playing an audio player
 */
export const startPlayback = async (player: Tone.Player): Promise<void> => {
  console.log('Audio context state:', Tone.getContext().state);
  console.log('Player state before start:', player.state);
  console.log('Player buffer loaded:', !!player.buffer.loaded);

  await Tone.start();
  console.log('Audio context state after Tone.start():', Tone.getContext().state);

  player.start();
  console.log('Player state after start:', player.state);
  console.log('Audio context current time:', Tone.getContext().currentTime);
};

/**
 * Stop playing an audio player (cannot be restarted)
 */
export const stopPlayback = (player: Tone.Player): void => {
  console.log('Stopping player, current state:', player.state);
  player.stop();
  console.log('Player state after stop:', player.state);
};

/**
 * Check if player is currently playing
 */
export const isPlaying = (player: Tone.Player): boolean => {
  return player.state === 'started';
};
