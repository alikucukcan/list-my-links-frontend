import React from 'react'

const Section1 = () => {
    return <div className="flex flex-col gap-4 md:flex-row w-full px-8 py-4">
        <div className="w-full flex flex-col gap-2 md:w-1/2 text-quinary ">
            <h1 className='font-bowlby text-[36px] hover:scale-90 transition-transform'> Who you are, encapsulated. Find it in the bio link</h1>
            <div className="flex bg-white items-center gap-1 px-3 rounded-lg md:w-fit overflow-clip w-full h-[40px] ">
                <p className='text-[20px]'> listmylinks.com/ </p>
                <input type='text' placeholder='username' className='border-none outline-none h-full text-[20px]' />
            </div>
            <button className='w-fit px-4 py-1 mt-4 bg-yellow-500 rounded-lg text-black font-bold'> Join Now  </button>
        </div>
        <div className="w-full md:w-1/2 overflow-clip rounded-lg">
            <img src="/section1.jpg" alt="" className='w-full h-full object-cover' />
        </div>

    </div>
}

export default function HomePage() {
    return (
        <div className='min-h-[400px] flex justify-start items-center border-black'>,
            <Section1 />

        </div>
    )
}
