import { useState, useCallback } from 'react';
import { startPlayback, stopPlayback, isPlaying } from '../utils/playback';
import type { AudioNodes } from '../types/audio';

interface UsePlaybackProps {
  onPlayStart?: (duration: number) => void;
  onPlayStop?: () => void;
}

export const usePlayback = ({ onPlayStart, onPlayStop }: UsePlaybackProps = {}) => {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Toggle play/pause
   */
  const togglePlayback = useCallback(async (
    nodes: AudioNodes,
    duration: number
  ): Promise<void> => {
    if (!nodes.player) {
      setError('No audio loaded');
      return;
    }

    try {
      setError(null);

      if (isPlaying(nodes.player)) {
        stopPlayback(nodes.player);
        setPlaying(false);
        onPlayStop?.();
      } else {
        await startPlayback(nodes.player);
        setPlaying(true);
        onPlayStart?.(duration);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Playback error';
      setError(errorMessage);
      console.error('Playback error:', err);
    }
  }, [onPlayStart, onPlayStop]);

  /**
   * Stop playback
   */
  const stop = useCallback((nodes: AudioNodes): void => {
    if (nodes.player && isPlaying(nodes.player)) {
      stopPlayback(nodes.player);
      setPlaying(false);
      onPlayStop?.();
    }
  }, [onPlayStop]);

  return {
    playing,
    error,
    togglePlayback,
    stop,
  };
};
