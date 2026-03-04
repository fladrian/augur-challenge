export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				bg: {
					root: '#0a0c10',
					surface: '#0f1117',
					elevated: '#161a23',
					card: '#1a1e28',
					'card-hover': '#1e2230',
					sidebar: '#0d0f14',
					'sidebar-active': 'rgba(99, 131, 255, 0.12)',
					modal: '#141820',
					input: '#12151c',
				},
				border: {
					subtle: '#1e2230',
					default: '#262b38',
					hover: '#353b4d',
					active: '#4a5270',
					focus: '#6383ff',
				},
				text: {
					primary: '#e8eaf0',
					secondary: '#8b90a0',
					tertiary: '#5c6170',
					muted: '#3e4352',
				},
				augur: {
					blue: '#6383ff',
					'blue-dim': 'rgba(99, 131, 255, 0.15)',
				},
				severity: {
					critical: '#ff4757',
					high: '#ff8c42',
					medium: '#ffc542',
					low: '#48c774',
				},
				status: {
					active: '#48c774',
					warning: '#ffc542',
					error: '#ff4757',
					info: '#6383ff',
				}
			},
			fontFamily: {
				sans: ['"DM Sans"', 'Inter', 'sans-serif'],
				mono: ['"JetBrains Mono"', 'monospace'],
			},
			backgroundImage: {
				'severity-critical-grad': 'rgba(255, 71, 87, 0.12)',
				'severity-high-grad': 'rgba(255, 140, 66, 0.12)',
				'severity-medium-grad': 'rgba(255, 197, 66, 0.12)',
				'severity-low-grad': 'rgba(72, 199, 116, 0.12)',
			},
			keyframes: {
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
			},
			animation: {
				shimmer: 'shimmer 1.5s infinite linear',
			},
		},
	},
	plugins: [],
}
