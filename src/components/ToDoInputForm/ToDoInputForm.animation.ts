export const formVariants = {
    hidden: {
        borderColor: "#bbe4e9",
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    },
    visible: {
        borderColor: "#53a8b6",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
        transition: {
            delay: 1,
            duration: 0.8,
            ease: "easeInOut",
            when: "beforeChildren",
        },
    },
}

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

export const initialButtonts = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 0.7,
            duration: 0.5,
        }
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