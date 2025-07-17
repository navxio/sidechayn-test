import React from 'react';

interface PlayerLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const PlayerLayout: React.FC<PlayerLayoutProps> = ({ children, title }) => {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        textAlign: 'center',
        marginBottom: '30px',
        borderBottom: '2px solid #333',
        paddingBottom: '20px'
      }}>
        <h1 style={{
          fontSize: '2.5em',
          margin: '0',
          color: '#333'
        }}>
          {title}
        </h1>
        <p style={{
          fontSize: '1.1em',
          color: '#666',
          margin: '10px 0 0 0'
        }}>
          Real-time audio manipulation with Web Audio API
        </p>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
};
