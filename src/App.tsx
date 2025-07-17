import React, { useState, useEffect } from 'react';
import { initializeAudio } from './utils/audioContext';
import { createAudioNodes } from './utils/audioNodes';
import { useAudioLoader } from './hooks/useAudioLoader';
import { usePlayback } from './hooks/usePlayback';
import { useProgressTracking } from './hooks/useProgressTracking';
import { useEffects } from './hooks/useEffects';
import { EffectControls } from './components/EffectControls';
import { formatTime, calculateProgress } from './utils/timeUtils';
import type { AudioNodes } from './types/audio';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [nodes, setNodes] = useState<Partial<AudioNodes>>({});
  const [error, setError] = useState<string | null>(null);
  const [audioLoaded, setAudioLoaded] = useState(false);

  const { loadAudio, isLoading, error: loadError, duration } = useAudioLoader();
  const { currentTime, startTracking, stopTracking } = useProgressTracking();
  const { effects, updateEffect, applyAllEffects, resetEffects } = useEffects();

  const { playing, error: playbackError, togglePlayback, stop } = usePlayback({
    onPlayStart: (audioDuration) => startTracking(audioDuration),
    onPlayStop: () => stopTracking(),
  });

  // Apply initial effects when audio is loaded
  useEffect(() => {
    if (audioLoaded && nodes.player) {
      applyAllEffects(nodes as AudioNodes);
    }
  }, [audioLoaded, nodes, applyAllEffects]);

  const handleInitialize = async () => {
    try {
      await initializeAudio();
      const audioNodes = createAudioNodes();
      setNodes({ ...audioNodes, player: null });
      console.log('Audio nodes created:', audioNodes);
      setIsInitialized(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleLoadAudio = async () => {
    if (!isInitialized) return;

    try {
      const result = await loadAudio(nodes as Omit<AudioNodes, 'player'>);
      setNodes(prev => ({ ...prev, player: result.player }));
      setAudioLoaded(true);
      console.log('Audio loaded, duration:', result.duration);
    } catch (err) {
      console.error('Load failed:', err);
    }
  };

  const handleTogglePlayback = async () => {
    await togglePlayback(nodes as AudioNodes, duration);
  };

  const handleStop = () => {
    stop(nodes as AudioNodes);
  };

  return (
    <div>
      <h1>Audio Player with Effects</h1>

      {!isInitialized ? (
        <div>
          <p>Step 1: Initialize audio context</p>
          <button onClick={handleInitialize}>Initialize Audio</button>
          {error && <p>Error: {error}</p>}
        </div>
      ) : !audioLoaded ? (
        <div>
          <p>✓ Audio initialized</p>
          <p>Step 2: Load demo MP3</p>

          <button onClick={handleLoadAudio} disabled={isLoading}>
            Load Demo Audio
          </button>

          {isLoading && <p>Loading audio...</p>}
          {loadError && <p>Load error: {loadError}</p>}
          {duration > 0 && <p>Duration: {formatTime(duration)}</p>}
        </div>
      ) : (
        <div>
          <p>✓ Audio initialized</p>
          <p>✓ Audio loaded ({formatTime(duration)})</p>
          <p>Step 4: Play with real-time effects!</p>

          {/* Playback Controls */}
          <div>
            <button onClick={handleTogglePlayback}>
              {playing ? 'Pause' : 'Play'}
            </button>

            <button onClick={handleStop} disabled={!playing}>
              Stop
            </button>
          </div>

          {/* Progress Display */}
          <div style={{ marginTop: '20px' }}>
            <div>
              <strong>Time:</strong> {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            <div style={{ marginTop: '10px' }}>
              <strong>Progress:</strong> {calculateProgress(currentTime, duration).toFixed(1)}%
            </div>

            {/* Progress Bar */}
            <div style={{
              width: '300px',
              height: '20px',
              backgroundColor: '#ddd',
              marginTop: '10px',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${calculateProgress(currentTime, duration)}%`,
                height: '100%',
                backgroundColor: '#4CAF50',
                transition: 'width 0.1s'
              }}></div>
            </div>

            <p>Status: {playing ? 'Playing' : 'Stopped'}</p>
            {playbackError && <p>Playback error: {playbackError}</p>}
          </div>

          {/* Effects Controls */}
          <EffectControls
            effects={effects}
            nodes={nodes as AudioNodes}
            onEffectChange={updateEffect}
            onReset={resetEffects}
          />
        </div>
      )}
    </div>
  );
}

export default App;
