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

  const sliderStyle = {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    background: '#ddd',
    outline: 'none',
    margin: '10px 0'
  };

  const controlGroupStyle = {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6',
    borderRadius: '5px'
  };

  const labelStyle = {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '5px',
    color: '#495057'
  };

  const valueStyle = {
    float: 'right' as const,
    color: '#6c757d',
    fontFamily: 'monospace'
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0', color: '#333' }}>Audio Effects</h3>
        <button
          onClick={() => onReset(nodes)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset All
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>

        {/* Playback Controls */}
        <div style={controlGroupStyle}>
          <h4 style={{ marginTop: '0', color: '#495057' }}>Playback</h4>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>
              Speed <span style={valueStyle}>{effects.speed.toFixed(2)}x</span>
            </label>
            <input
              type="range"
              min="0.25"
              max="2"
              step="0.01"
              value={effects.speed}
              onChange={(e) => handleSliderChange('speed', e.target.value)}
              style={sliderStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Volume <span style={valueStyle}>{(effects.volume * 100).toFixed(0)}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.volume}
              onChange={(e) => handleSliderChange('volume', e.target.value)}
              style={sliderStyle}
            />
          </div>
        </div>

        {/* Effects */}
        <div style={controlGroupStyle}>
          <h4 style={{ marginTop: '0', color: '#495057' }}>Effects</h4>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>
              Pitch <span style={valueStyle}>{effects.pitch.toFixed(1)} semitones</span>
            </label>
            <input
              type="range"
              min="-12"
              max="12"
              step="0.1"
              value={effects.pitch}
              onChange={(e) => handleSliderChange('pitch', e.target.value)}
              style={sliderStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Reverb <span style={valueStyle}>{(effects.reverb * 100).toFixed(0)}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={effects.reverb}
              onChange={(e) => handleSliderChange('reverb', e.target.value)}
              style={sliderStyle}
            />
          </div>
        </div>

        {/* Equalizer */}
        <div style={controlGroupStyle}>
          <h4 style={{ marginTop: '0', color: '#495057' }}>Equalizer</h4>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>
              Low <span style={valueStyle}>{effects.lowEQ.toFixed(1)} dB</span>
            </label>
            <input
              type="range"
              min="-20"
              max="20"
              step="0.1"
              value={effects.lowEQ}
              onChange={(e) => handleSliderChange('lowEQ', e.target.value)}
              style={sliderStyle}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={labelStyle}>
              Mid <span style={valueStyle}>{effects.midEQ.toFixed(1)} dB</span>
            </label>
            <input
              type="range"
              min="-20"
              max="20"
              step="0.1"
              value={effects.midEQ}
              onChange={(e) => handleSliderChange('midEQ', e.target.value)}
              style={sliderStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              High <span style={valueStyle}>{effects.highEQ.toFixed(1)} dB</span>
            </label>
            <input
              type="range"
              min="-20"
              max="20"
              step="0.1"
              value={effects.highEQ}
              onChange={(e) => handleSliderChange('highEQ', e.target.value)}
              style={sliderStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
