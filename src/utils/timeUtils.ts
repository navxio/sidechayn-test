/**
 * Format seconds into MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Calculate progress percentage
 */
export const calculateProgress = (current: number, total: number): number => {
  if (total <= 0) return 0;
  return Math.min((current / total) * 100, 100);
};

/**
 * Calculate elapsed time for looped audio
 */
export const calculateLoopedProgress = (
  startTime: number,
  currentTime: number,
  duration: number
): number => {
  if (duration <= 0) return 0;
  const elapsed = currentTime - startTime;
  return elapsed % duration; // Handle looping
};
