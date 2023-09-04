import { Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import service from '../service'
import { toast } from 'react-toastify'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useUserContext } from '../contexts/user.context'

const validationSchema = Yup.object({
    password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().required('Required').oneOf([Yup.ref('password'), ""], 'Passwords must match'),
    code: Yup.string().required('Required').min(6, 'Code must be at least 6 characters').max(6, 'Code must be at most 6 characters')
})

const initialValues = {
    password: '',
    confirmPassword: '',
    code: ''
}


export default function ResetPasswordPage() {
    const navigate = useNavigate()
    const { resetPassword } = useUserContext()
    const [sp] = useSearchParams()

    let email = sp.get('email');
    if (!email) {
        navigate('/forgot-password')
    }

    return (
        <div className='w-full h-[500px] bg-quinary rounded-lg my-2 flex items-center justify-center'>
            <Formik validationSchema={validationSchema} initialValues={initialValues}
                onSubmit={(values) => {
                    const password = values.password
                    const code = values.code
                    resetPassword(email, code, password).then((res) => {
                        toast.success('Password changed successfully')
                        navigate('/login')
                    }).catch((err) => {
                        toast.error("Something went wrong")
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
                            <input onChange={handleChange} value={values.code} name="code" type="text" placeholder='email code' className='border-none outline-none h-[40px] bg-gray-100 rounded-lg px-4' />
                            {errors && errors.code && <p className='text-white text-[9px]'> {errors.code} </p>}
                            <input onChange={handleChange} value={values.password} name="password" type="text" placeholder='new password' className='border-none outline-none h-[40px] bg-gray-100 rounded-lg px-4' />
                            {errors && errors.password && <p className='text-white text-[9px]'> {errors.password} </p>}
                            <input onChange={handleChange} value={values.confirmPassword} name="confirmPassword" type="text" placeholder='confirm new password' className='border-none outline-none h-[40px] bg-gray-100 rounded-lg px-4' />
                            {errors && errors.confirmPassword && <p className='text-white text-[9px]'> {errors.confirmPassword} </p>}
                            <button type='submit'
                                disabled={!isValid || !dirty}
                                className='w-full disabled:opacity-50 transition-all bg-yellow-500 rounded-lg text-black font-bold py-1 mt-4'>
                                Change Password
                            </button>

                        </form>
                    }
                }
            </Formik>
        </div>
    )
}