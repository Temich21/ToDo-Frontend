const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents }) {
    const inputs = {
        '.input': {
            padding: '.5rem .75rem',
            borderRadius: '.25rem',
            fontWeight: '600',
            border: 'none',
            '&:focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.5)',
            },
        },
        '.textarea': {
            padding: '.5rem .75rem',
            borderRadius: '.25rem',
            fontWeight: '500',
            border: '1px solid #E2E8F0',
            backgroundColor: '#fff',
            minHeight: '150px',
            resize: 'vertical', 
            '&:focus': {
                outline: 'none',
                boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.5)',
            },
        },
        '.input-datetime': {
            padding: '.5rem .75rem',
            borderRadius: '.25rem',
            fontWeight: '600',
            border: 'none',
            width: '190px',
            backgroundColor: '#dee1e6',
            color: 'black',
            transition: 'background-color .3s ease',
            '&:focus': {
                outline: 'none',
                borderColor: '#5585b5',
                boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.5)',
            },
            '&:hover': {
                borderColor: '#5585b5',
                backgroundColor: '#5585b5',
            },
        },
        '.select-option': {
            padding: '.5rem .75rem',
            borderRadius: '.25rem',
            fontWeight: '600',
            border: 'none',
            width: '120px',
            backgroundColor: '#d1d5db',
            color: 'black',
            '&:focus': {
                outline: 'none',
                borderColor: '#2563eb',
                boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.5)',
            },
            '&:hover': {
                borderColor: '#9ca3af',
            },
        },
    }

    addComponents(inputs)
})