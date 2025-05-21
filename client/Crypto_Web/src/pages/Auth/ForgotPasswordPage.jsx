import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Link } from 'react-router'
import { forgotPasswordRequest } from '../../api/auth'

export const ForgotPasswordPage = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = handleSubmit(async ({ email }) => {
        try {
            setLoading(true)
            setError(null)
            setMessage(null)

            // Validar que sea un correo de Gmail
            if (!email.endsWith('@gmail.com')) {
                setError('Solo se permiten correos de Gmail para recuperación de contraseña')
                setLoading(false)
                return
            }

            const response = await forgotPasswordRequest({ email })
            setMessage(response.data[0] || 'Se ha enviado un enlace de recuperación a tu correo electrónico')
            setValue('email', '')
        } catch (error) {
            setError(
                error.response?.data?.[0] ||
                'Ha ocurrido un error al procesar tu solicitud'
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

                <h1 className='text-3xl font-bold my-2'>Recuperar Contraseña</h1>
                <p className='text-gray-400 mb-4'>Ingresa tu correo de Gmail para recuperar tu contraseña</p>

                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        {...register('email', {
                            required: true,
                            pattern: {
                                value: /@gmail\.com$/,
                                message: 'Debes ingresar un correo de Gmail'
                            }
                        })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='correo@gmail.com'
                    />
                    {errors.email?.type === 'required' && <p className='text-red-500'>El correo es requerido</p>}
                    {errors.email?.type === 'pattern' && <p className='text-red-500'>{errors.email.message}</p>}

                    <button
                        type="submit"
                        className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md my-2 w-full'
                        disabled={loading}
                    >
                        {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                    </button>
                </form>

                <div className='flex justify-between mt-4'>
                    <Link className='text-sky-500' to='/login'>Volver al inicio de sesión</Link>
                </div>
            </div>
        </div>
    )
}