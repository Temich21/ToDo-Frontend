import { useLocation } from 'react-router-dom'
import { motion } from "framer-motion"
import currentPageToText from '../../utils/currentPageToText'
import BurgerMenu from './BurgerMenu/BurgerMenu'
import AnimatedText from '../AnimatedText/AnimatedText'

const logoVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1 }
    },
}

const Header = () => {
    const location = useLocation()
    const currentPage = location.pathname

    return (
        <header className="fixed w-full flex items-center px-5 2xs:px-10 py-3 z-10 bg-customColorBgTwo">
            <BurgerMenu />
            <section className='flex justify-end w-full md:justify-center'>
                <div className='grid grid-cols-[1fr_70px] grid-rows-2 items-center md:flex md:gap-4'>
                    <AnimatedText
                        text={'QuestList'}
                        styles={'col-start-1 col-end-2 row-start-1 row-end-2 text-3xl font-rakkas'}
                    />
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={logoVariants}
                        className="col-start-2 col-end-3 row-span-full"
                    >
                        <img
                            src="/Logo.png"
                            alt="Logo"
                            width="70"
                        />
                    </motion.div>
                    <AnimatedText
                        text={currentPageToText(currentPage) || ''}
                        styles={'col-start-1 col-end-2 row-start-2 row-end-3 text-3xl font-rakkas'}
                        animationProps={{ delay: 1 }}
                    />
                </div>
            </section>
        </header >
    )
}

export default Header