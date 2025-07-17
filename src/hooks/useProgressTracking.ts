import { useState, useRef, useCallback, useEffect } from 'react';
import { getCurrentTime } from '../utils/audioContext';
import { calculateLoopedProgress } from '../utils/timeUtils';

export const useProgressTracking = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);
  const totalPausedTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Start tracking progress
   */
  const startTracking = useCallback((duration: number) => {
    startTimeRef.current = getCurrentTime();
    totalPausedTimeRef.current = 0;
    setIsPaused(false);

    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        const now = getCurrentTime();
        const elapsed = now - startTimeRef.current - totalPausedTimeRef.current;
        const progress = calculateLoopedProgress(0, elapsed, duration);
        setCurrentTime(progress);
      }
    }, 100);

    console.log('Progress tracking started');
  }, [isPaused]);

  /**
   * Pause progress tracking
   */
  const pauseTracking = useCallback(() => {
    if (!isPaused) {
      pausedAtRef.current = getCurrentTime();
      setIsPaused(true);
      console.log('Progress tracking paused');
    }
  }, [isPaused]);

  /**
   * Resume progress tracking
   */
  const resumeTracking = useCallback(() => {
    if (isPaused) {
      const pauseDuration = getCurrentTime() - pausedAtRef.current;
      totalPausedTimeRef.current += pauseDuration;
      setIsPaused(false);
      console.log('Progress tracking resumed, paused for:', pauseDuration);
    }
  }, [isPaused]);

  /**
   * Stop tracking progress
   */
  const stopTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentTime(0);
    setIsPaused(false);
    totalPausedTimeRef.current = 0;
    console.log('Progress tracking stopped');
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    currentTime,
    startTracking,
    pauseTracking,
    resumeTracking,
    stopTracking,
  };
};
