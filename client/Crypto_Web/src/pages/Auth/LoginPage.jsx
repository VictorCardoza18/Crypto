/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks'
import { Link, useNavigate } from 'react-router'
import { useEffect } from 'react'

export const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const { signIn, errors: loginErrors, isAuthenticated, setMenuState, isAdmin } = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async formValues => {
        setValue('password', '')
        setValue('email', '')
        signIn(formValues)
    })

    useEffect(() => {
        if (isAuthenticated) {
            const targetRoute = isAdmin ? '/usuarios' : '/';
            navigate(targetRoute);
        }
    }, [isAuthenticated, isAdmin])
    useEffect(() => setMenuState(location.pathname.slice(1)), [])

    return (
        <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {loginErrors.map((error, index) => (
                    <div key={index} className='text-red-500 p-2 text-center'>{error}</div>
                ))}
                <h1 className='text-3xl font-bold my-2'>Login</h1>
                <form onSubmit={onSubmit}>
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
                    <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md my-2 w-full'>Login</button>
                </form>
                <div className='flex flex-col gap-2 mt-4'>
                    <p className='flex gap-x-2 justify-between'>Do not have an account? <Link className='text-sky-500' to='/register'>Register</Link></p>
                    <p className='flex gap-x-2 justify-between'>Forgot your password? <Link className='text-sky-500' to='/forgot-password'>Recover Password</Link></p>
                </div>
            </div>
        </div>
    )
}