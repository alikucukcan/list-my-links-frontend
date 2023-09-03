import React, { useEffect } from 'react'


const PreviewComponent = () => {

    return <div className="w-full h-full rounded-xl aspect-[428/926] bg-white">

    </div>
}

const InputTextArea = ({ title,placeholder }) => {
    return <div className="flex flex-col gap-2 p-2 bg-secondary rounded-2xl">
        <h1 className='text-[16px] font-bowlby text-black'> {title}  </h1>
        <textarea rows="3" placeholder={placeholder} className='bg-white rounded-lg resize-none border-none outline-none p-2' />
    </div>
}

export default function DashboardPage() {

    return (
        <div className='w-full min-h-[500px] bg-quinary rounded-lg gap-8 p-4 my-2 flex flex-col lg:flex-row lg:items-start items-center'>
            <div className="bg-quaternary gap-4 flex flex-col rounded-2xl mt-14 p-4 flex-[3] w-full lg:w-auto min-h-[300px] h-full">
                <InputTextArea title="Type Your Bio Text" placeholder="I'm from Berlin and I'm a student..." />
                <InputTextArea title="Type a message for visitors" placeholder="Please follow my social accounts..." />
            </div>
            <div className="flex-[auto] flex flex-col items-center gap-2 justify-start w-full lg:w-auto h-full p-5">
                <h4 className='font-bowlby'> Preview </h4>
                <PreviewComponent />
            </div>
        </div>
    )
}
