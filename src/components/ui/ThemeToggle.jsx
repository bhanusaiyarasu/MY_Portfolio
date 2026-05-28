import React from 'react'
import { useTheme } from '../../context/ThemeContext'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className={`theme-toggle-pill ${theme}`}
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      data-cursor="link"
      style={{
        position: 'relative',
        width: '64px',
        height: '28px',
        borderRadius: '14px',
        backgroundColor: 'var(--bg-raised)',
        border: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 6px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, background-color 0.25s ease',
      }}
    >
      {/* Icons */}
      <span style={{ fontSize: '0.85rem', zIndex: 2, pointerEvents: 'none' }}>🌙</span>
      <span style={{ fontSize: '0.85rem', zIndex: 2, pointerEvents: 'none' }}>☀️</span>

      {/* Sliding Indicator */}
      <div
        style={{
          position: 'absolute',
          top: '3px',
          left: theme === 'dark' ? '4px' : '36px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-primary)',
          transition: 'left 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease',
          zIndex: 1,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        }}
      />
    </button>
  )
}

export default ThemeToggle
