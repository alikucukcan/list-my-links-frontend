import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../contexts/user.context"
import { FaCog as IconSettings } from "react-icons/fa"

const Navbar = () => {
    const navigate = useNavigate()

    let userCtx = useUserContext()

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) userCtx.getUser()
    }, [])

    return <div className='w-full px-4 items-center bg-primary h-[60px] flex justify-between'>
        <h1 className='font-rubik cursor-pointer text-white'
            onClick={() => {
                navigate('/')
            }}
        >ListMyLinks</h1>

        {!userCtx.user.isLoggedIn ? <div className="flex gap-4">
            <button className='text-white bg-quaternary px-4 rounded-lg py-1'
                onClick={() => {
                    navigate('/login')
                }}
            > Login </button>
            <button className='text-white bg-quaternary px-4 rounded-lg py-1'
                onClick={() => {
                    navigate('/register')
                }}
            > Register </button>
        </div>
            :
            <div className="flex gap-4">
                <button
                    onClick={() => {
                        navigate('/dashboard/settings')
                    }}
                    title="Settings" className=" hover:animate-spin h-fit self-center text-white"> <IconSettings /> </button>
                <button className='text-white bg-quaternary px-4 rounded-lg py-1'
                    onClick={() => {
                        navigate('/dashboard')
                    }}
                > Dashboard </button>
                <button className='text-white bg-quaternary px-4 rounded-lg py-1'
                    onClick={() => {
                        userCtx.logout()
                        navigate('/')
                    }}
                > Logout </button>
            </div>}
    </div>
}

export default Navbar
