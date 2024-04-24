import { MouseEventHandler } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
    children: React.ReactNode
    onClick: MouseEventHandler<HTMLButtonElement>
    className: string
    variants: any
    type?: 'button' | 'reset' | 'submit'
}

const Button = ({ children, onClick, className, variants, type = 'button' }: ButtonProps) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={`py-2 px-4 rounded font-semibold transition-colors duration-300 ease text-white hover:bg-[#4b5563] text-lg xs:text-xl md:text-2xl ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: "-2.5deg" }}
            variants={variants}
            initial="hidden"
            animate="visible"
        >
            {children}
        </motion.button>
    )
}

export default Button