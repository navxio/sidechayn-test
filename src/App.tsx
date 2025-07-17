import { useState, useEffect } from 'react';
import { initializeAudio } from './utils/audioContext';
import { createAudioNodes } from './utils/audioNodes';
import { useAudioLoader } from './hooks/useAudioLoader';
import { usePlayback } from './hooks/usePlayback';
import { useProgressTracking } from './hooks/useProgressTracking';
import { useEffects } from './hooks/useEffects';
import { PlayerLayout } from './components/PlayerLayout';
import { StatusDisplay } from './components/StatusDisplay';
import { PlaybackControls } from './components/PlaybackControls';
import { EffectControls } from './components/EffectControls';
import { formatTime } from './utils/timeUtils';
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
    <PlayerLayout title="Live Audio Effects Player">

      {/* Initialization Step */}
      {!isInitialized && (
        <>
          <StatusDisplay
            step={1}
            totalSteps={3}
            status="Initialize Audio Context"
            isComplete={false}
            error={error}
          />
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleInitialize}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Initialize Audio
            </button>
          </div>
        </>
      )}

      {/* Loading Step */}
      {isInitialized && !audioLoaded && (
        <>
          <StatusDisplay
            step={1}
            totalSteps={3}
            status="Initialize Audio Context"
            isComplete={true}
          />
          <StatusDisplay
            step={2}
            totalSteps={3}
            status="Load Demo Audio File"
            isComplete={false}
            error={loadError}
          />
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleLoadAudio}
              disabled={isLoading}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                backgroundColor: isLoading ? '#6c757d' : '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Loading...' : 'Load Demo Audio'}
            </button>
            {duration > 0 && (
              <p style={{ marginTop: '10px', color: '#6c757d' }}>
                Duration: {formatTime(duration)}
              </p>
            )}
          </div>
        </>
      )}

      {/* Player Interface */}
      {audioLoaded && (
        <>
          <StatusDisplay
            step={1}
            totalSteps={3}
            status="Initialize Audio Context"
            isComplete={true}
          />
          <StatusDisplay
            step={2}
            totalSteps={3}
            status="Load Demo Audio File"
            isComplete={true}
          />
          <StatusDisplay
            step={3}
            totalSteps={3}
            status="Ready to Play!"
            isComplete={true}
          />

          <PlaybackControls
            playing={playing}
            currentTime={currentTime}
            duration={duration}
            onTogglePlayback={handleTogglePlayback}
            onStop={handleStop}
            error={playbackError}
          />

          <EffectControls
            effects={effects}
            nodes={nodes as AudioNodes}
            onEffectChange={updateEffect}
            onReset={resetEffects}
          />
        </>
      )}
    </PlayerLayout>
  );
}

export default App;
