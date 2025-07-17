import { useState, useRef, useCallback, useEffect } from 'react';
import { getCurrentTime } from '../utils/audioContext';
import { calculateLoopedProgress } from '../utils/timeUtils';

export const useProgressTracking = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const startTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Start tracking progress
   */
  const startTracking = useCallback((duration: number) => {
    startTimeRef.current = getCurrentTime();

    intervalRef.current = setInterval(() => {
      const now = getCurrentTime();
      const progress = calculateLoopedProgress(startTimeRef.current, now, duration);
      setCurrentTime(progress);
    }, 100); // Update every 100ms

    console.log('Progress tracking started');
  }, []);

  /**
   * Stop tracking progress
   */
  const stopTracking = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentTime(0);
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
    stopTracking,
  };
};
