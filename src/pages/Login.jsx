import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import service from '../service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const validationSchema = Yup.object({
    username: Yup.string().required('Required').min(3, 'Username must be at least 3 characters'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
})

const initialValues = {
    username: '',
    password: '',
}


export default function RegisterPage() {
    const navigate = useNavigate()
    return (
        <div className='w-full h-[500px] bg-quinary rounded-lg my-2 flex items-center justify-center'>
            <Formik validationSchema={validationSchema} initialValues={initialValues}
                onSubmit={(values) => {
                    service.post('/auth/login', {
                        username: values.username,
                        password: values.password
                    })
                        .then((res) => {
                            localStorage.setItem('token', res.data.token)
                            navigate('/dashboard')
                        })
                        .catch((err) => {
                            console.log("err", err);
                            toast.error("Username or password is wrong")
                        })
                }}
            >
                {
                    ({ values, handleChange, handleSubmit, errors,
                        isValid, dirty,
                    }) => {
                        return <form
                            onSubmit={handleSubmit}
                            className="md:w-[400px] w-full gap-4 py-4 px-4 min-h-[100px]  flex flex-col">
                            <h1 className='font-rubik text-center cursor-pointer text-white'
                                onClick={() => {
                                    navigate('/')
                                }}
                            >ListMyLinks</h1>
                            <input onChange={handleChange} value={values.username} name="username" type="text" placeholder='username' className='border-none outline-none h-[40px] bg-gray-100 rounded-lg px-4' />
                            {errors && errors.username && <p className='text-white text-[9px]'> {errors.username} </p>}
                            <input onChange={handleChange} value={values.password} name="password" type="password" placeholder='password' className='border-none outline-none h-[40px] bg-gray-100 rounded-lg px-4' />
                            {errors && errors.password && <p className='text-white text-[9px]'> {errors.password} </p>}
                            <button type='submit'
                                disabled={!isValid || !dirty}
                                className='w-full disabled:opacity-50 transition-all bg-yellow-500 rounded-lg text-black font-bold py-1 mt-4'> Login </button>

                        </form>
                    }
                }
            </Formik>
        </div>
    )
}