/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router'

export const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signUp, isAuthenticated, errors: registerErrors, setMenuState } = useAuth()
    const navigate = useNavigate()

    useEffect(() => { isAuthenticated && navigate('/login') }, [isAuthenticated])
    useEffect(() => setMenuState(location.pathname.slice(1)), [])

    const onSubmit = handleSubmit(async formValues => {
        signUp(formValues)
    })

    return (
        <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
                {registerErrors.map((error, index) => (
                    <div key={index} className='text-red-500 p-2'>{error}</div>
                ))}
                <h1 className='text-3xl font-bold my-2'>Register</h1>
                <form onSubmit={onSubmit}>
                    <input type="text"
                        {...register('username', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Username'
                    />
                    {errors.username && <p className='text-red-500'>Username is required</p>}
                    <input type="email"
                        {...register('email', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Email'
                    />
                    {errors.email && <p className='text-red-500'>Email is required</p>}
                    <input type="password"
                        {...register('password', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Password'
                    />
                    {errors.password && <p className='text-red-500'>Password is required</p>}
                    <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md my-2'>Register</button>
                </form>
                <p className='flex gap-x-2 justify-between'>Already have an account?<Link className='text-sky-500' to='/login'>Login</Link></p>
            </div>
        </div>
    )
}
