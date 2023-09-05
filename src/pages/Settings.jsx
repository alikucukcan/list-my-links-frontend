import React from 'react'
import { useUserContext } from '../contexts/user.context'

export default function SettingsPage() {
    const { user } = useUserContext()
    return (
        user.username && <div className='w-full min-h-[500px] bg-quinary rounded-lg gap-8 p-4 my-2 flex flex-col lg:flex-row lg:items-start items-center'>
          <h1> Settings Page </h1>
        </div>
    )
}
