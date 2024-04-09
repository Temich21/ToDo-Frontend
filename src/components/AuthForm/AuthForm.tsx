import { FC, useState } from 'react'
import type { RootState } from '../../redux/store'
import { useAppSelector, useAppDispatch } from "../../redux/store"
import { useLoginUserMutation, useRegistrateUserMutation } from '../../redux/services/AuthServices'
import { tokenReceived } from '../../redux/reducers/AuthSlice'
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from 'react-router-dom'
import PasswordVisiblity from '../../components/PasswordVisibility/PasswordVisibilty'
import IError from '../../models/IError'
import { toast } from 'react-toastify'
import { AuhtLoginRequest, AuhtRegistrationRequest } from '../../models/AuthRequest'
import 'react-toastify/dist/ReactToastify.css'
import Loading from '../Loading/Loading'

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
                <div className='text-5xl font-rakkas'>QuestList</div>
                <img src="/Logo.png" alt="Logo" width="120" />
            </section>
            {isLoadingLogin || isLoadingRegistration ?
                <Loading /> :
                <section>
                    <form className="flex flex-col gap-6 p-5 text-white bg-customColorBgOne rounded-sm">
                        <div className='flex justify-between'>
                            <div className='text-3xl'>Authorization</div>
                            <div className='flex gap-4 text-xl'>
                                <div
                                    className={`hover:cursor-pointer ${isLogin ? 'underline' : ''}`}
                                    onClick={() => setIsLogin(true)}
                                >
                                    Login
                                </div>
                                <div
                                    className={`hover:cursor-pointer ${!isLogin ? 'underline' : ''}`}
                                    onClick={() => setIsLogin(false)}
                                >
                                    Registration
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col border-b-2">
                            <label className="text-xl" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="text"
                                className="w-144 bg-customColorBgOne placeholder-gray-300 focus:outline-none text-2xl"
                                placeholder="Please enter email"
                                {...register("email", {
                                    required: "Please Enter Your Email!",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Please Enter A Valid Email!"
                                    }
                                })}
                            />
                            <p className='text-red-600'>{errors.email?.message}</p>
                        </div>
                        {
                            !isLogin &&
                            <div className="flex flex-col border-b-2">
                                <label className="text-xl" htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="w-144 bg-customColorBgOne placeholder-gray-300 focus:outline-none text-2xl"
                                    placeholder="Please enter name"
                                    {...register("name", {
                                        required: "Please Enter Your Name!"
                                    })}
                                />
                                <p className='text-red-600'>{errors.name?.message}</p>
                            </div>
                        }
                        <div className="flex flex-col border-b-2 mb-2">
                            <label className="text-xl" htmlFor="password">Password</label>
                            <div>
                                <input
                                    id="password"
                                    type={eye ? "text" : "password"}
                                    className="w-144 bg-customColorBgOne placeholder-gray-300 focus:outline-none text-2xl"
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
                            <p className='text-red-600'>{errors.password?.message}</p>
                        </div>
                        {isLogin ?
                            <button
                                onClick={handleSubmit(handleLogin)}
                                className="btn w-28 text-2xl bg-[#F39C12] mr-6"
                            >Log in</button> :
                            <button
                                onClick={handleSubmit(handleRegistration)}
                                className="btn w-44 text-2xl bg-[#f95959]"
                            >Registration</button>
                        }
                    </form>
                </section>
            }
        </main>
    )
}

export default AuthForm