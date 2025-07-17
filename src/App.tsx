import React, { useState } from 'react';
import { initializeAudio } from './utils/audioContext';
import { createAudioNodes } from './utils/audioNodes';
import { useAudioLoader } from './hooks/useAudioLoader';
import type { AudioNodes } from './types/audio';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [nodes, setNodes] = useState<Partial<AudioNodes>>({});
  const [error, setError] = useState<string | null>(null);

  const { loadAudio, isLoading, error: loadError, duration } = useAudioLoader();

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
      console.log('Audio loaded, duration:', result.duration);
    } catch (err) {
      console.error('Load failed:', err);
    }
  };

  return (
    <div>
      <h1>Audio Player</h1>

      {!isInitialized ? (
        <div>
          <p>Step 1: Initialize audio context</p>
          <button onClick={handleInitialize}>Initialize Audio</button>
          {error && <p>Error: {error}</p>}
        </div>
      ) : (
        <div>
          <p>✓ Audio initialized</p>
          <p>Step 2: Load demo MP3</p>

          <button onClick={handleLoadAudio} disabled={isLoading}>
            Load Demo Audio
          </button>

          {isLoading && <p>Loading audio...</p>}
          {loadError && <p>Load error: {loadError}</p>}
          {duration > 0 && <p>Duration: {duration.toFixed(2)} seconds</p>}
        </div>
      )}
    </div>
  );
}

export default App;
