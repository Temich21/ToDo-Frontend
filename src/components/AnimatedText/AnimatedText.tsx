import { motion } from 'framer-motion';
import React from 'react';

const containerVariants = (animationProps: AnimationProps) => ({
    visible: {
        transition: {
            // delay not working, why?
            delay: animationProps.delay || 0,
            staggerChildren: 0.1,
        }
    },
    hidden: {}
})

const childVariants = {
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
        }
    },
    hidden: {
        opacity: 0,
    }
}

interface AnimationProps {
    delay?: number
}

const AnimatedText = ({
    text,
    styles = '',
    animationProps = {}
}: {
    text: string,
    styles?: string,
    animationProps?: AnimationProps
}) => {
    return (
        <motion.div
            variants={containerVariants(animationProps)}
            initial="hidden"
            animate="visible"
            className={`flex whitespace-pre ${styles}`}
        >
            {text.split('').map((char, index) => (
                <motion.span key={index} variants={childVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.div>
    )
}

export default AnimatedText