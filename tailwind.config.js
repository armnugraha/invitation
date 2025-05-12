/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '2rem',
				screens: {
					'2xl': '1400px'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				serif: [
					'serif'
				],
				playfair: [
					'Playfair Display'
				],
				vibes: ['"Great Vibes"', 'cursive'],
				allura: ['"Allura"', 'cursive'],
				alex: ['"Alex Brush"', 'cursive'],
				parisienne: ['"Parisienne"', 'cursive'],
				satisfy: ['"Satisfy"', 'cursive'],
				kalam: ['"Kalam"', 'cursive'],
				merienda: ['"Merienda"', 'cursive'],
				sc: ['"Ysabeau SC"', 'cursive'],
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
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
				rose: {
					50: '#FDF6F2',   // paling terang
					200: '#F9EAE1',  // terang
					400: '#F7E8E1',  // netral (warna originalmu)
					500: '#EFD5C8',  // agak lebih bold
					600: '#E1B8A7',  // makin bold
					800: '#A35959',  // paling bold
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			keyframes: {
				marquee: {
					from: {
						transform: 'translateX(0)'
					},
					to: {
						transform: 'translateX(calc(-100% - var(--gap)))'
					}
				},
				'marquee-vertical': {
					from: {
						transform: 'translateY(0)'
					},
					to: {
						transform: 'translateY(calc(-100% - var(--gap)))'
					}
				},
				slide: {
					'0%': { transform: 'translateX(0%)' },
					'33%': { transform: 'translateX(-100%)' },
					'66%': { transform: 'translateX(-200%)' },
					'100%': { transform: 'translateX(-300%)' },
				},
				fadeIn: {
					'0%': { opacity: 0, transform: 'scale(0.35)' },
					'33%': { opacity: 0, transform: 'scale(0.55)' },
					'66%': { opacity: 0, transform: 'scale(0.75)' },
					'100%': { opacity: 1, transform: 'scale(1)' },
				},
			},
			animation: {
				marquee: 'marquee var(--duration) infinite linear',
				'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
				slide: 'slide 12s linear infinite',
				'fade-in': 'fadeIn 10s ease-in forwards',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
}