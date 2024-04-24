import { FC, useState } from 'react'
import type { RootState } from '../../redux/store'
import { useAppSelector, useAppDispatch } from "../../redux/store"
import { useLoginUserMutation, useRegistrateUserMutation } from '../../redux/services/AuthServices'
import { tokenReceived } from '../../redux/reducers/AuthSlice'
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import PasswordVisiblity from './PasswordVisibility/PasswordVisibilty'
import IError from '../../models/IError'
import { toast } from 'react-toastify'
import { AuhtLoginRequest, AuhtRegistrationRequest } from '../../models/AuthRequest'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '../Loading/Loading'
import AnimatedText from '../AnimatedText/AnimatedText'
import { motion, AnimatePresence } from 'framer-motion'
import TabSwitcher from './TabSwitcher/TabSwitcher'
import { buttontsVariants, formVariants, inputVariants, logoVariants, movingVariants, nameInputVariants } from './AuthForm.animate'
import Button from '../Button/Button'

const AuthForm: FC = () => {
    const dispatch = useAppDispatch()
    const { eye } = useAppSelector((state: RootState) => state.eyeReducer)

    const [loginUser, { isLoading: isLoadingLogin }] = useLoginUserMutation()
    const [registrateUser, { isLoading: isLoadingRegistration }] = useRegistrateUserMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuhtRegistrationRequest>()

    const [isLogin, setIsLogin] = useState<boolean>(true)

    const navigate = useNavigate()

    const handleLogin: SubmitHandler<AuhtLoginRequest> = async (data) => {
        try {
            const loginData = { email: data.email, password: data.password }
            const response = await loginUser(loginData).unwrap()
            console.log(response);
            dispatch(tokenReceived(response))
            toast.success("Login successful", {
                position: "bottom-right"
            })
            navigate('/personal-todo')
        } catch (error) {
            const e = error as IError
            if (e?.data?.errors?.length) {
                e.data.errors.forEach(errorMsg => {
                    toast.error(errorMsg)
                });
            } else {
                toast.error(e?.data?.message || "Login failed")
            }
        }
    }

    const handleRegistration: SubmitHandler<AuhtRegistrationRequest> = async (data) => {
        try {
            const response = await registrateUser(data).unwrap()
            dispatch(tokenReceived(response))
            toast.success("Registration successful")
            navigate('/personal-todo')
        } catch (error) {
            const e = error as IError
            if (e?.data?.errors?.length) {
                e.data.errors.forEach(errorMsg => {
                    toast.error(errorMsg)
                });
            } else {
                toast.error(e?.data?.message || "Registration failed")
            }
        }
    }

    return (
        <main className="flex flex-col items-center">
            <section className='flex items-center gap-4 m-10'>
                <div className='text-5xl font-rakkas'>
                    <AnimatedText text='QuestList' />
                </div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={logoVariants}
                >
                    <img
                        src="/Logo.png"
                        alt="Logo"
                        width="120"
                    />
                </motion.div>
            </section>
            {isLoadingLogin || isLoadingRegistration ?
                <Loading /> :
                <motion.form
                    className="flex flex-col gap-6 p-5 text-white bg-customColorBgOne rounded-sm w-[90%] md:w-144 md:max-w-full"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className='flex justify-between'>
                        <div className='text-xl xs:text-2xl md:text-3xl'>Authorization</div>
                        <TabSwitcher isLogin={isLogin} setIsLogin={setIsLogin} />
                    </div>
                    <motion.div
                        className="flex flex-col border-b-2"
                        variants={inputVariants(0.4)}
                        initial="hidden"
                        animate="visible"
                    >
                        <label className="text-base xs:text-lg md:text-xl" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            className="w-full bg-customColorBgOne placeholder-gray-300 focus:outline-none text-xl md:text-2xl"
                            placeholder="Please enter email"
                            {...register("email", {
                                required: "Please Enter Your Email!",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please Enter A Valid Email!"
                                }
                            })}
                        />
                        <AnimatePresence >
                            {errors.email && (
                                <motion.p
                                    variants={movingVariants(0)}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                                    className='text-red-600 font-semibold pl-2'
                                >
                                    {errors.email?.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <AnimatePresence>
                        {
                            !isLogin &&
                            <motion.div
                                className="flex flex-col border-b-2"
                                variants={nameInputVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <label className="text-base xs:text-lg md:text-xl" htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-full bg-customColorBgOne placeholder-gray-300 focus:outline-none text-xl md:text-2xl"
                                    placeholder="Please enter name"
                                    {...register("name", {
                                        required: "Please Enter Your Name!"
                                    })}
                                />
                                <AnimatePresence >
                                    {errors.name && (
                                        <motion.p
                                            variants={movingVariants(0)}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                                            className='text-red-600 font-semibold pl-2'
                                        >
                                            {errors.name?.message}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        }
                    </AnimatePresence>
                    <motion.div
                        className="flex flex-col border-b-2"
                        variants={inputVariants(0.5)}
                        initial="hidden"
                        animate="visible"
                        layout
                    >
                        <label className="text-base xs:text-lg md:text-xl" htmlFor="password">Password</label>
                        <div className='flex'>
                            <input
                                id="password"
                                type={eye ? "text" : "password"}
                                className="w-full bg-customColorBgOne placeholder-gray-300 focus:outline-none text-xl md:text-2xl"
                                placeholder="Please enter password"
                                {...register("password", {
                                    required: "Please Enter Your Password",
                                    minLength: {
                                        value: 4,
                                        message: "Password must be at least 4 characters long!"
                                    }
                                })}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        isLogin ? handleSubmit(handleLogin)() : handleSubmit(handleRegistration)()
                                    }
                                }}
                            />
                            <PasswordVisiblity />
                        </div>
                        <AnimatePresence >
                            {errors.password && (
                                <motion.p
                                    variants={movingVariants(0)}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                                    className='text-red-600 font-semibold pl-2'
                                >
                                    {errors.password?.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <AnimatePresence initial={false}>
                        {isLogin ?
                            <Button
                                onClick={handleSubmit(handleLogin)}
                                className="w-28 bg-[#F39C12]"
                                variants={buttontsVariants}
                            >
                                Log in
                            </Button> :
                            <Button
                                onClick={handleSubmit(handleRegistration)}
                                className="w-44 bg-[#f95959]"
                                variants={buttontsVariants}
                            >
                                Registration
                            </Button>
                        }
                    </AnimatePresence>
                </motion.form>
            }
        </main>
    )
}

export default AuthForm