import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate()
    return <div className='w-full px-4 items-center bg-primary h-[60px] flex justify-between'>
        <h1 className='font-rubik cursor-pointer text-white'
            onClick={() => {
                navigate('/')
            }}
        >ListMyLinks</h1>
        <div className="flex gap-4">
            <button className='text-white bg-quaternary px-4 rounded-lg py-1'
                onClick={()=>{
                    navigate('/login')
                }}
            > Login </button>
            <button className='text-white bg-quaternary px-4 rounded-lg py-1'
                onClick={()=>{
                    navigate('/register')
                }}
            > Register </button>
        </div>
    </div>
}

export default Navbar
