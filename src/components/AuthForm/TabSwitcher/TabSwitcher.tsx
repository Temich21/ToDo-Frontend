import React from 'react';
import { motion, LayoutGroup } from 'framer-motion';

interface TabSwitcherProps {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
}

const tabVariants = {
    hidden: {
        x: -100,
        opacity: 0
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100
        }
    }
}

const TabSwitcher = ({ isLogin, setIsLogin }: TabSwitcherProps) => {
    return (
        <LayoutGroup >
            <div
                className="flex gap-4 text-base sm:text-lg sm:gap-6 md:text-xl "
            >
                <motion.div
                    className="cursor-pointer"
                    onClick={() => setIsLogin(true)}
                    variants={tabVariants}
                >
                    <p>Login</p>
                    {isLogin && (
                        <motion.div
                            className="w-full h-0.5 bg-white rounded"
                            layoutId="underline"
                        />
                    )}
                </motion.div>
                <motion.div
                    className="cursor-pointer"
                    onClick={() => setIsLogin(false)}
                    variants={tabVariants}
                >
                    <p>Registration</p>
                    {!isLogin && (
                        <motion.div
                            className="w-full h-0.5 bg-white rounded"
                            layoutId="underline"
                        />
                    )}
                </motion.div>
            </div>
        </LayoutGroup >
    )
}

export default React.memo(TabSwitcher, (prevProps, nextProps) => {
    return prevProps.isLogin === nextProps.isLogin
})