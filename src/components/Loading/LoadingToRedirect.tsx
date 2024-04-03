import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoadingToRedirect = () => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => currentCount - 1)
        }, 1000)

        count === 0 && navigate('/auth')

        return () => clearInterval(interval)
    }, [count, navigate])

    return (
        <main className="flex justify-center items-center">
            <section className='w-64 bg-customColorBgOne text-xl text-white p-4 rounded-sm'>
                <h1>You are not authorized!</h1>
                <h1>Redirecting you in {count} sec</h1>
            </section>
        </main>
    )
}

export default LoadingToRedirect