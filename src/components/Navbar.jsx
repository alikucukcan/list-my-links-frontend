
const Navbar = () => {
    return <div className='w-full px-4 items-center bg-primary h-[60px] flex justify-between'>
        <h1 className='font-rubik text-white'>ListMyLinks</h1>

        <div className="flex gap-4">
            <button className='text-white bg-quaternary px-4 rounded-lg py-1'> Login </button>
            <button className='text-white bg-quaternary px-4 rounded-lg py-1'> Register </button>
        </div>
    </div>
}

export default Navbar
