import React from 'react';

interface StatusDisplayProps {
  step: number;
  totalSteps: number;
  status: string;
  isComplete: boolean;
  error?: string | null;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({
  step,
  totalSteps,
  status,
  isComplete,
  error
}) => {
  return (
    <div style={{
      padding: '15px',
      backgroundColor: isComplete ? '#d4edda' : '#f8f9fa',
      border: `1px solid ${isComplete ? '#c3e6cb' : '#dee2e6'}`,
      borderRadius: '5px',
      marginBottom: '20px'
    }}>
      <div style={{
        fontSize: '1.1em',
        fontWeight: 'bold',
        color: isComplete ? '#155724' : '#495057'
      }}>
        {isComplete ? '✓' : `Step ${step}/${totalSteps}:`} {status}
      </div>

      {error && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '3px',
          color: '#721c24'
        }}>
          Error: {error}
        </div>
      )}
    </div>
  );
};
