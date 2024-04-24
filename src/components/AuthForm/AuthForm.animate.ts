export const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1.5 }
    },
}

export const formVariants = {
    hidden: {
        opacity: 0,
        y: -50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.3,
            when: "beforeChildren",
            staggerChildren: 0.1
        }
    }
}

export const inputVariants = (delay: number) => (
    {
        hidden: {
            opacity: 0,
            y: -50
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: delay,
            }
        }
    }
)

export const nameInputVariants = {
    hidden: {
        opacity: 0,
        y: -50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        }
    },
    exit: {
        opacity: 0,
        y: -50,
        transition: { duration: 0.2 }
    }
}

export const buttontsVariants = {
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