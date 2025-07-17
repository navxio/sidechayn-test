import React from 'react';
import type { AudioEffects, AudioNodes } from '../types/audio';

interface EffectControlsProps {
  effects: AudioEffects;
  nodes: AudioNodes;
  onEffectChange: (effectName: keyof AudioEffects, value: number, nodes: AudioNodes) => void;
  onReset: (nodes: AudioNodes) => void;
}

export const EffectControls: React.FC<EffectControlsProps> = ({
  effects,
  nodes,
  onEffectChange,
  onReset,
}) => {
  const handleSliderChange = (effectName: keyof AudioEffects, value: string) => {
    onEffectChange(effectName, parseFloat(value), nodes);
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ccc' }}>
      <h3>Audio Effects</h3>

      {/* Speed Control */}
      <div style={{ marginBottom: '15px' }}>
        <label>
          Speed: {effects.speed.toFixed(2)}x
          <br />
          <input
            type="range"
            min="0.25"
            max="2"
            step="0.01"
            value={effects.speed}
            onChange={(e) => handleSliderChange('speed', e.target.value)}
            style={{ width: '200px' }}
          />
        </label>
      </div>

      {/* Pitch Control */}
      <div style={{ marginBottom: '15px' }}>
        <label>
          Pitch: {effects.pitch.toFixed(1)} semitones
          <br />
          <input
            type="range"
            min="-12"
            max="12"
            step="0.1"
            value={effects.pitch}
            onChange={(e) => handleSliderChange('pitch', e.target.value)}
            style={{ width: '200px' }}
          />
        </label>
      </div>

      {/* Reverb Control */}
      <div style={{ marginBottom: '15px' }}>
        <label>
          Reverb: {(effects.reverb * 100).toFixed(0)}%
          <br />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={effects.reverb}
            onChange={(e) => handleSliderChange('reverb', e.target.value)}
            style={{ width: '200px' }}
          />
        </label>
      </div>

      {/* EQ Controls */}
      <div style={{ marginBottom: '15px' }}>
        <label>
          Low EQ: {effects.lowEQ.toFixed(1)} dB
          <br />
          <input
            type="range"
            min="-20"
            max="20"
            step="0.1"
            value={effects.lowEQ}
            onChange={(e) => handleSliderChange('lowEQ', e.target.value)}
            style={{ width: '200px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>
          Mid EQ: {effects.midEQ.toFixed(1)} dB
          <br />
          <input
            type="range"
            min="-20"
            max="20"
            step="0.1"
            value={effects.midEQ}
            onChange={(e) => handleSliderChange('midEQ', e.target.value)}
            style={{ width: '200px' }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>
          High EQ: {effects.highEQ.toFixed(1)} dB
          <br />
          <input
            type="range"
            min="-20"
            max="20"
            step="0.1"
            value={effects.highEQ}
            onChange={(e) => handleSliderChange('highEQ', e.target.value)}
            style={{ width: '200px' }}
          />
        </label>
      </div>

      {/* Volume Control */}
      <div style={{ marginBottom: '15px' }}>
        <label>
          Volume: {(effects.volume * 100).toFixed(0)}%
          <br />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={effects.volume}
            onChange={(e) => handleSliderChange('volume', e.target.value)}
            style={{ width: '200px' }}
          />
        </label>
      </div>

      {/* Reset Button */}
      <button onClick={() => onReset(nodes)} style={{ marginTop: '10px' }}>
        Reset All Effects
      </button>
    </div>
  );
};
