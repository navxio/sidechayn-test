import { useState, useCallback } from 'react';
import * as Tone from 'tone';
import type { AudioNodes } from '../types/audio';

interface UsePlaybackProps {
  onPlayStart?: (duration: number) => void;
  onPlayStop?: () => void;
  onPlayPause?: () => void;
  onPlayResume?: () => void;
}

export const usePlayback = ({ onPlayStart, onPlayStop, onPlayPause, onPlayResume }: UsePlaybackProps = {}) => {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Toggle play/pause using AudioContext suspend/resume
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
      const audioContext = Tone.getContext().rawContext as AudioContext;

      if (playing) {
        // Pause by suspending audio context
        await audioContext.suspend();
        setPlaying(false);
        onPlayPause?.();
        console.log('Audio context suspended (paused)');

      } else {
        // Resume/start playback
        if (nodes.player.state === 'stopped') {
          // If stopped, start the player
          await Tone.start();
          nodes.player.start();
          onPlayStart?.(duration);
          console.log('Player started');
        } else {
          // If suspended, just resume context
          await audioContext.resume();
          onPlayResume?.();
          console.log('Audio context resumed');
        }

        setPlaying(true);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Playback error';
      setError(errorMessage);
      console.error('Playback error:', err);
    }
  }, [playing, onPlayStart, onPlayStop, onPlayPause, onPlayResume]);

  /**
   * Stop playback completely
   */
  const stop = useCallback(async (nodes: AudioNodes): Promise<void> => {
    if (!nodes.player) return;

    try {
      const audioContext = Tone.getContext().rawContext as AudioContext;

      // Resume context first if suspended, then stop player
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      if (nodes.player.state === 'started') {
        nodes.player.stop();
        console.log('Player stopped');
      }

      setPlaying(false);
      onPlayStop?.();

    } catch (err) {
      console.error('Stop error:', err);
    }
  }, [onPlayStop]);

  return {
    playing,
    error,
    togglePlayback,
    stop,
  };
};
