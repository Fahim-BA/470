
import { useEffect } from 'react'
import HeroSection from '../components/Hero'
import { useNavigate } from 'react-router-dom'


export const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/main')
        }
    }, [navigate])

    return (
        <div className='w-full h-screen bg-[#e1dae4]'>
            <HeroSection />
        </div>
    )
}
