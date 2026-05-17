export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        accent: '#22c55e',
        dark: '#0f172a',
        darkCard: '#1e293b',
        darkInput: '#334155'
      },
      backdropBlur: {
        glass: '10px'
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}