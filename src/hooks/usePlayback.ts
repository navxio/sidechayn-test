import { useState, useCallback } from 'react';
import { startPlayback, stopPlayback, isPlaying } from '../utils/playback';
import type { AudioNodes } from '../types/audio';

export const usePlayback = () => {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Toggle play/pause
   */
  const togglePlayback = useCallback(async (nodes: AudioNodes): Promise<void> => {
    if (!nodes.player) {
      setError('No audio loaded');
      return;
    }

    try {
      setError(null);

      if (isPlaying(nodes.player)) {
        stopPlayback(nodes.player);
        setPlaying(false);
      } else {
        await startPlayback(nodes.player);
        setPlaying(true);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Playback error';
      setError(errorMessage);
      console.error('Playback error:', err);
    }
  }, []);

  /**
   * Stop playback (used for cleanup)
   */
  const stop = useCallback((nodes: AudioNodes): void => {
    if (nodes.player && isPlaying(nodes.player)) {
      stopPlayback(nodes.player);
      setPlaying(false);
    }
  }, []);

  return {
    playing,
    error,
    togglePlayback,
    stop,
  };
};
