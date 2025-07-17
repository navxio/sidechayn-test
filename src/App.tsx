import React, { useState } from 'react';
import { initializeAudio } from './utils/audioContext';
import { createAudioNodes } from './utils/audioNodes';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInitialize = async () => {
    try {
      await initializeAudio();
      const nodes = createAudioNodes();
      console.log('Audio nodes created:', nodes);
      setIsInitialized(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  return (
    <div>
      <h1>Audio Player</h1>
      {!isInitialized ? (
        <div>
          <p>Click to initialize audio:</p>
          <button onClick={handleInitialize}>Initialize Audio</button>
          {error && <p>Error: {error}</p>}
        </div>
      ) : (
        <p>Audio initialized successfully!</p>
      )}
    </div>
  );
}

export default App;
