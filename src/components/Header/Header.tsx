import { useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import LogoutButton from "../LogoutButton/LogoutButton"
import currentPageToText from '../../utils/currentPageToText'
// import BurgerNav from '../BurgerNav/BurgerNav'

const Header = () => {
    const location = useLocation()
    const currentPage = location.pathname

    return (
        <header className="w-full flex justify-between items-center px-10 py-3 bg-customColorBgTwo">
            <FontAwesomeIcon className="h-8" icon={faBars} />
            {/* <BurgerNav /> */}
            <section className='flex items-center gap-4'>
                <div className='text-3xl font-rakkas'>QuestList</div>
                <img src="/Logo.png" alt="Logo" width="70" />
                <div className='text-3xl font-rakkas'>{currentPageToText(currentPage)}</div>
            </section>
            <LogoutButton />
        </header>
    )
}

export default Header