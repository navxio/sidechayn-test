import * as Tone from 'tone';
import { useState, useCallback } from 'react';
import { loadAudioFromUrl, DEMO_AUDIO_URL } from '../utils/audioLoader';
import type { AudioNodes } from '../types/audio';

export const useAudioLoader = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);

  const loadAudio = useCallback(async (
    nodes: Omit<AudioNodes, 'player'>
  ): Promise<{ player: Tone.Player; duration: number }> => {
    setIsLoading(true);
    setError(null);

    try {
      const player = await loadAudioFromUrl(DEMO_AUDIO_URL);

      // Connect player to volume (which goes directly to speakers)
      player.connect(nodes.volume);
      console.log('Player -> Volume -> Speakers');

      const audioDuration = player.buffer.duration;
      setDuration(audioDuration);
      setIsLoading(false);

      return { player, duration: audioDuration };

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setIsLoading(false);
      throw err;
    }
  }, []);

  return {
    loadAudio,
    isLoading,
    error,
    duration,
  };
};
