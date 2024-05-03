import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { useAppDispatch } from "../../../redux/store";
import { logout, tokenRemoved } from '../../../redux/reducers/AuthSlice';
import { useLogoutUserMutation } from '../../../redux/services/AuthServices';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
}

const variantsLogout = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};


const navigation = [
    { id: 1, title: 'Personal ToDo', path: '/personal-todo' },
    { id: 2, title: 'Your Calendar', path: '/calendar' },
    { id: 3, title: 'Your Groups', path: '/groups' },
    { id: 4, title: 'About The Project', path: '/about' },
]

export const Navigation = ({ isOpen }: { isOpen: boolean }) => {
    const dispatch = useAppDispatch()
    const [logoutUser] = useLogoutUserMutation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutUser()
            dispatch(logout())
            dispatch(tokenRemoved())
            toast.success("Logout successful")
            navigate('/auth')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.ul
                    className="m-0 p-[25px] absolute top-[100px] w-[230px]"
                    variants={variants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                >
                    {navigation.map(nav => (
                        <MenuItem navigation={nav} key={nav.id} />
                    ))}
                    <motion.li
                        className="list-none mb-5 flex items-center cursor-pointer text-2xl font-rakkas"
                        variants={variantsLogout}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogout}
                    >
                        Logout
                    </motion.li>
                </motion.ul>
            )}
        </AnimatePresence>
    )
}

