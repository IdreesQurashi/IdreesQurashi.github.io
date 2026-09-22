/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./workflows/*/index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        pitch: '#05060a',
        abyss: '#070910',
        obsidian: '#0b0e16',
        slate: {
          950: '#020617',
        },
        aurora: {
          cyan: '#22d3ee',
          violet: '#8b5cf6',
        },
        accentBlue: '#38bdf8',
        steelBlue: '#0284c7',
        silver: '#e2e8f0',
        steelGrey: '#94a3b8',
        emerald: { glow: '#34d399' },
        amber: { glow: '#fbbf24' },
        purple: { glow: '#c084fc' },
      },
      boxShadow: {
        'card-soft': '0 14px 40px -12px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.08)',
        'card-lift': '0 22px 55px -12px rgba(0,0,0,0.92), 0 0 32px -8px rgba(34,211,238,0.14), inset 0 1px 0 rgba(255,255,255,0.16)',
        'btn-aurora': 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.25), 0 10px 24px -8px rgba(34,211,238,0.45), 0 10px 24px -8px rgba(139,92,246,0.35)',
        'btn-aurora-hover': 'inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 rgba(0,0,0,0.25), 0 14px 34px -8px rgba(34,211,238,0.6), 0 14px 34px -8px rgba(139,92,246,0.5)',
        'btn-graphite': 'inset 0 1px 0 rgba(148,163,184,0.18), inset 0 -1px 0 rgba(0,0,0,0.4), 0 8px 20px -6px rgba(0,0,0,0.7)',
      },
      backgroundImage: {
        'aurora-btn': 'linear-gradient(180deg, #67e8f9 0%, #22d3ee 30%, #8b5cf6 100%)',
        'aurora-btn-hover': 'linear-gradient(180deg, #a5f3fc 0%, #38e0f8 30%, #9f6bff 100%)',
        'aurora-text': 'linear-gradient(92deg, #67e8f9 0%, #22d3ee 38%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [],
};
