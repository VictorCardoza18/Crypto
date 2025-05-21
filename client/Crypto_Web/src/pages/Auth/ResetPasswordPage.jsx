import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { resetPasswordRequest } from '../../api/auth'

export const ResetPasswordPage = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (!token) {
            setError('Token de recuperación inválido')
        }
    }, [token])

    const onSubmit = handleSubmit(async ({ newPassword }) => {
        try {
            setLoading(true)
            setError(null)
            setMessage(null)

            const response = await resetPasswordRequest({ token, newPassword })
            setMessage(response.data[0] || 'Contraseña actualizada correctamente')
            setSuccess(true)

            // Redirigir al login después de 3 segundos
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        } catch (error) {
            setError(
                error.response?.data?.[0] ||
                'Ha ocurrido un error al restablecer tu contraseña'
            )
        } finally {
            setLoading(false)
        }
    })

    return (
        <div className='flex items-center justify-center h-[calc(100vh-100px)]'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {error && <div className='text-red-500 p-2 text-center'>{error}</div>}
                {message && <div className='text-green-500 p-2 text-center'>{message}</div>}

                <h1 className='text-3xl font-bold my-2'>Restablecer Contraseña</h1>
                <p className='text-gray-400 mb-4'>Ingresa tu nueva contraseña</p>

                {!error && !success && (
                    <form onSubmit={onSubmit}>
                        <input
                            type="password"
                            {...register('newPassword', {
                                required: true,
                                minLength: {
                                    value: 6,
                                    message: 'La contraseña debe tener al menos 6 caracteres'
                                }
                            })}
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                            placeholder='Nueva contraseña'
                        />
                        {errors.newPassword?.type === 'required' && <p className='text-red-500'>La contraseña es requerida</p>}
                        {errors.newPassword?.type === 'minLength' && <p className='text-red-500'>{errors.newPassword.message}</p>}

                        <input
                            type="password"
                            {...register('confirmPassword', {
                                required: true,
                                validate: (val) => {
                                    if (watch('newPassword') !== val) {
                                        return "Las contraseñas no coinciden";
                                    }
                                }
                            })}
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                            placeholder='Confirmar contraseña'
                        />
                        {errors.confirmPassword?.type === 'required' && <p className='text-red-500'>Debes confirmar la contraseña</p>}
                        {errors.confirmPassword?.type === 'validate' && <p className='text-red-500'>{errors.confirmPassword.message}</p>}

                        <button
                            type="submit"
                            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md my-2 w-full'
                            disabled={loading}
                        >
                            {loading ? 'Procesando...' : 'Restablecer contraseña'}
                        </button>
                    </form>
                )}

                {(error || success) && (
                    <div className='flex justify-center mt-4'>
                        <Link className='text-sky-500' to='/login'>Volver al inicio de sesión</Link>
                    </div>
                )}
            </div>
        </div>
    )
}