/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-primary': 'var(--brand-primary)',
                'brand-accent': 'var(--brand-accent)',
                'neutral': {
                    0: 'var(--neutral-0)',
                    10: 'var(--neutral-10)',
                    20: 'var(--neutral-20)',
                    40: 'var(--neutral-40)',
                    60: 'var(--neutral-60)',
                    80: 'var(--neutral-80)',
                    100: 'var(--neutral-100)',
                },
                'text-default': 'var(--text-default)',
                'text-muted': 'var(--text-muted)',
                'text-inverse': 'var(--text-inverse)',
                'bg-canvas': 'var(--bg-canvas)',
                'bg-surface': 'var(--bg-surface)',
                'bg-overlay': 'var(--bg-overlay)',
            },
            borderRadius: {
                'none': 'var(--radius-none)',
                'sm': 'var(--radius-sm)',
                'md': 'var(--radius-md)',
                'lg': 'var(--radius-lg)',
                'xl': 'var(--radius-xl)',
                '2xl': 'var(--radius-2xl)',
            },
            boxShadow: {
                'xs': 'var(--shadow-xs)',
                'sm': 'var(--shadow-sm)',
                'md': 'var(--shadow-md)',
                'lg': 'var(--shadow-lg)',
                'xl': 'var(--shadow-xl)',
                '2xl': 'var(--shadow-2xl)',
            },
            zIndex: {
                'base': 'var(--z-base)',
                'dropdown': 'var(--z-dropdown)',
                'sticky': 'var(--z-sticky)',
                'fixed': 'var(--z-fixed)',
                'modal-backdrop': 'var(--z-modal-backdrop)',
                'modal': 'var(--z-modal)',
                'popover': 'var(--z-popover)',
                'tooltip': 'var(--z-tooltip)',
            }
        },
    },
    plugins: [],
}
