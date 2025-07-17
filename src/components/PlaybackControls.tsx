import React from 'react';
import { formatTime, calculateProgress } from '../utils/timeUtils';

interface PlaybackControlsProps {
  playing: boolean;
  currentTime: number;
  duration: number;
  onTogglePlayback: () => void;
  onStop: () => void;
  error?: string | null;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  playing,
  currentTime,
  duration,
  onTogglePlayback,
  onStop,
  error
}) => {
  const progressPercentage = calculateProgress(currentTime, duration);

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      border: '1px solid #dee2e6',
      borderRadius: '8px',
      marginBottom: '20px'
    }}>

      {/* Control Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <button
          onClick={onTogglePlayback}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: playing ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            minWidth: '100px'
          }}
        >
          {playing ? 'Pause' : 'Play'}
        </button>

        <button
          onClick={onStop}
          disabled={!playing}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            backgroundColor: playing ? '#6c757d' : '#e9ecef',
            color: playing ? 'white' : '#6c757d',
            border: 'none',
            borderRadius: '6px',
            cursor: playing ? 'pointer' : 'not-allowed',
            minWidth: '100px'
          }}
        >
          Stop
        </button>
      </div>

      {/* Time Display */}
      <div style={{
        textAlign: 'center',
        marginBottom: '15px',
        fontSize: '1.2em',
        fontFamily: 'monospace',
        color: '#495057'
      }}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '10px'
      }}>
        <div style={{
          width: `${progressPercentage}%`,
          height: '100%',
          backgroundColor: '#007bff',
          transition: 'width 0.1s ease',
          borderRadius: '4px'
        }}></div>
      </div>

      {/* Status */}
      <div style={{
        textAlign: 'center',
        fontSize: '14px',
        color: '#6c757d'
      }}>
        Status: {playing ? 'Playing' : 'Stopped'} • Progress: {progressPercentage.toFixed(1)}%
      </div>

      {error && (
        <div style={{
          marginTop: '10px',
          padding: '8px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '4px',
          color: '#721c24',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}
    </div>
  );
};
