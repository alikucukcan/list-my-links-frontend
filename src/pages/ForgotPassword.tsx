import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import service from '../service'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../contexts/user.context'

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
})

const initialValues = {
    email: '',
}


export default function ForgotPasswordPage() {
    const navigate = useNavigate()
    const { forgotPassword } = useUserContext()
    return (
        <div className='w-full h-[500px] bg-quinary rounded-lg my-2 flex items-center justify-center'>
            <Formik validationSchema={validationSchema} initialValues={initialValues}
                onSubmit={(values) => {
                    let email = values.email
                    forgotPassword(email).then((res) => {
                        toast.success('Email sent successfully')
                        navigate('/reset-password?email=' + email)
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
                            <input onChange={handleChange} value={values.email} name="email" type="text" placeholder='email address' className='border-none outline-none h-[40px] bg-gray-100 rounded-lg px-4' />
                            {errors && errors.email && <p className='text-white text-[9px]'> {errors.email} </p>}
                            <button type='submit'
                                disabled={!isValid || !dirty}
                                className='w-full disabled:opacity-50 transition-all bg-yellow-500 rounded-lg text-black font-bold py-1 mt-4'>
                                Send Email
                            </button>

                        </form>
                    }
                }
            </Formik>
        </div>
    )
}