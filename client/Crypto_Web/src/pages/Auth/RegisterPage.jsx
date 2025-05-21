/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router'
import { useState } from 'react'

const hasConsecutiveSequence = (str) => {
    // Revisar secuencias numéricas y alfabéticas de longitud >= 3
    const lower = str.toLowerCase();
    // Números
    for (let i = 0; i < lower.length - 2; i++) {
        const a = lower.charCodeAt(i);
        const b = lower.charCodeAt(i + 1);
        const c = lower.charCodeAt(i + 2);
        // Secuencia ascendente
        if (b === a + 1 && c === b + 1) return true;
        // Secuencia descendente
        if (b === a - 1 && c === b - 1) return true;
    }
    return false;
};

export const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const { signUp, isAuthenticated, errors: registerErrors, setMenuState } = useAuth()
    const navigate = useNavigate()
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => { isAuthenticated && navigate('/login') }, [isAuthenticated])
    useEffect(() => setMenuState(location.pathname.slice(1)), [])

    const validatePassword = (value) => {
        const length = value.length >= 8;
        const lower = /[a-z]/.test(value);
        const upper = /[A-Z]/.test(value);
        const number = /\d/.test(value);
        const symbol = /[^A-Za-z0-9]/.test(value);

        if (!length) return "Debe tener al menos 8 caracteres";
        if (!lower) return "Debe contener una minúscula";
        if (!upper) return "Debe contener una mayúscula";
        if (!number) return "Debe contener un número";
        if (!symbol) return "Debe contener un símbolo";
        if (hasConsecutiveSequence(value)) return "No debe tener secuencias consecutivas (ejemplo: 'abc', '123')";
        return true;
    };

    const onSubmit = handleSubmit(async formValues => {
        // Validación extra por si acaso
        const valid = validatePassword(formValues.password);
        if (valid !== true) {
            setPasswordError(valid);
            return;
        }
        setPasswordError('');
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
                        {...register('password', {
                            required: true,
                            validate: value => {
                                const result = validatePassword(value);
                                if (result !== true) setPasswordError(result);
                                else setPasswordError('');
                                return result;
                            }
                        })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Password'
                    />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    {passwordError && <p className='text-red-500'>{passwordError}</p>}
                    <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md my-2'>Register</button>
                </form>
                <ul className="mt-2 mb-2 text-sm text-gray-400 list-disc pl-6">
                    <li>Al menos 8 caracteres</li>
                    <li>Incluye una mayúscula, una minúscula, un número y un símbolo</li>
                    <li>Sin secuencias consecutivas (ejemplo: abc, 123, defg, etc.)</li>
                </ul>
                <p className='flex gap-x-2 justify-between'>Already have an account?<Link className='text-sky-500' to='/login'>Login</Link></p>
            </div>
        </div>
    )
}