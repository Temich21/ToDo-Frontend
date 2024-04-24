const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
    const buttons = {
        '.btn': {
            padding: '.5rem 1rem',
            borderRadius: '.25rem',
            fontWeight: '600',
            transition: 'background-color .3s ease',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#4b5563',
            },
        },
        '.btn-clear': {
            padding: '.5rem 1rem',
            borderRadius: '.25rem',
            fontWeight: '600',
            transition: 'background-color .3s ease',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#6b7280',
            },
        },
    }

    addComponents(buttons);
})