import { useLocation } from 'react-router-dom'
import { motion } from "framer-motion"
import currentPageToText from '../../utils/currentPageToText'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import AnimatedText from '../AnimatedText/AnimatedText'

const Header = () => {
    const location = useLocation()
    const currentPage = location.pathname

    const logoVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 1 }
        },
    }

    return (
        <header className="fixed w-full flex items-center px-10 py-3 z-10 bg-customColorBgTwo">
            <BurgerMenu />
            <section className='flex justify-center w-full'>
                <div className='flex items-center gap-4'>
                    <AnimatedText
                        text={'QuestList'}
                        styles={'text-3xl font-rakkas'}
                    />
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={logoVariants}
                    >
                        <img
                            src="/Logo.png"
                            alt="Logo"
                            width="70"

                        />
                    </motion.div>
                    <AnimatedText
                        text={currentPageToText(currentPage) || ''}
                        styles={'text-3xl font-rakkas'}
                        animationProps={{ delay: 1 }}
                    />
                </div>
            </section>
        </header>
    )
}

export default Header