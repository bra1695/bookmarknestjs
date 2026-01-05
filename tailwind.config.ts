import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			neutral: {
  				'0': '#FFFFFF',
  				'100': '#EBF0EF',
  				'300': '#DDE9E7',
  				'400': '#C0CFCC',
  				'500': '#899492',
  				'800': '#4C5C59',
  				'900': '#051513'
  			},
  			'neutral-dark': {
  				'0': '#FFFFFF',
  				'100': '#B9C9C9',
  				'300': '#00706E',
  				'400': '#004746',
  				'500': '#004241',
  				'600': '#002E2D',
  				'800': '#001F1F',
  				'900': '#001414'
  			},
  			teal: {
  				'700': '#014745',
  				'800': '#013C3B'
  			},
  			red: {
  				'600': '#FD4740',
  				'800': '#C80A04'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		spacing: {
  			'0': '0',
  			'25': '2px',
  			'50': '4px',
  			'75': '6px',
  			'100': '8px',
  			'125': '10px',
  			'150': '12px',
  			'200': '16px',
  			'250': '20px',
  			'300': '24px',
  			'400': '32px',
  			'500': '40px',
  			'600': '48px',
  			'800': '64px',
  			'1000': '80px',
  			'1200': '96px',
  			'1400': '112px',
  			'1600': '128px',
  			'1800': '140px'
  		},
  		borderRadius: {
  			'0': '0',
  			'4': '4px',
  			'6': '6px',
  			'8': '8px',
  			'10': '10px',
  			'12': '12px',
  			'16': '16px',
  			'20': '20px',
  			'24': '24px',
  			full: '999px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			geist: ['var(--font-geist-sans)', 'sans-serif'],
  			inter: ['Inter', 'sans-serif'],
  			roboto: ['Roboto', 'sans-serif']
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
