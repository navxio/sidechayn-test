import * as Tone from 'tone';

/**
 * Hardcoded MP3 URL that works without CORS issues
 */
export const DEMO_AUDIO_URL = 'https://archive.org/download/testmp3testfile/mpthreetest.mp3';

/**
 * Load an audio file from URL
 */
export const loadAudioFromUrl = (url: string): Promise<Tone.Player> => {
  return new Promise((resolve, reject) => {
    const player = new Tone.Player({
      url,
      loop: true,
      onload: () => {
        console.log('Audio loaded from URL:', url);
        resolve(player);
      },
      onerror: (error) => {
        console.error('Failed to load audio from URL:', error);
        reject(new Error(`Failed to load audio: ${error}`));
      },
    });
  });
};
