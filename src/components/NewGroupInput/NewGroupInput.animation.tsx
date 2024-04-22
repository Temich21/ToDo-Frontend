import { delay } from "@reduxjs/toolkit/dist/utils"

export const inputVariants = (leftPosition: number) => ({
    hidden: {
        x: leftPosition,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
})

export const buttonsVariats = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.7,
            duration: 0.5,
        }
    },
    hover: {
        scale: 1.1,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        transition: {
            duration: 0.2,
            yoyo: Infinity
        }
    },
    tap: {
        scale: 0.95,
        boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)"
    }
}

export const movingVariants = (delay: number) => ({
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            delay: delay,
            duration: 0.5,
        }
    },
})

export const formVariants = {
    hidden: {
        borderColor: "#bbe4e9",
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
    visible: {
        borderColor: "#53a8b6",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
        transition: {
            delay: 1.2,
            duration: 0.8,
            ease: "easeInOut",
            when: "beforeChildren",
        },
    },
}