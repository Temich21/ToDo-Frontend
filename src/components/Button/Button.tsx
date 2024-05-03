import React from 'react';
import { MouseEventHandler } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
    children: React.ReactNode
    onClick: MouseEventHandler<HTMLButtonElement>
    className: string
    variants: any
    type?: 'button' | 'reset' | 'submit'
    whileHover?: object
    whileTap?: object
}

const Button = ({
    children,
    onClick,
    className,
    variants,
    type = 'button',
    whileHover = { scale: 1.05 },
    whileTap = { scale: 0.95, rotate: "-2.5deg" }
}: ButtonProps) => {
    return (
        <motion.button
            type={type}
            onClick={onClick}
            className={`px-4 py-2 rounded font-semibold transition-colors duration-300 ease text-white hover:bg-[#4b5563] text-lg xs:text-xl md:text-2xl ${className}`}
            whileHover={whileHover}
            whileTap={whileTap}
            variants={variants}
            initial="hidden"
            animate="visible"
        >
            {children}
        </motion.button>
    )
}

export default React.memo(Button)