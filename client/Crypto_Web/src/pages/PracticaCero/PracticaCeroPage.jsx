import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { useAuth, usePracticaCero } from '../../hooks'
import { useEffect } from 'react'

export const PracticaCeroPage = () => {
    const { register: registerText, handleSubmit: handleSubmitText, formState: { errors: errorsText }, reset: resetText } = useForm()
    const { register: registerImage, handleSubmit: handleSubmitImage, formState: { errors: errorsImage }, reset: resetImage } = useForm()
    const { setMenuState } = useAuth()
    const { onSubmit, onSubmitImage } = usePracticaCero()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setMenuState(location.pathname.slice(1)), [])

    return (
        <div className='flex items-center justify-center space-x-5 flex-col'>
            <div className='flex items-center justify-center mt-20 space-x-4'>
                <div className='bg-zinc-800 max-w-min w-full p-10 rounded-md'>
                    <h1 className='text-3xl font-bold my-2 whitespace-nowrap'>Desplazamiento de caracteres</h1>
                    <form onSubmit={onSubmit}>
                        <input type="number"
                            {...registerText('desplazamiento', {
                                required: 'El desplazamiento es requerido', min: { value: 0, message: "El número debe ser mayor o igual a 0" },
                                max: { value: 100, message: "El número debe ser menor o igual a 100" }
                            })}
                            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                            placeholder='Desplazamiento'
                        />
                        {errorsText.desplazamiento && <p className='text-red-500'>{errorsText.desplazamiento.message}</p>}
                        <input type="file"
                            {...registerText('archivo', { required: 'El archivo es requerido' })}
                            className='w-full my-2 text-white rounded-md dark:text-gray-400 dark:bg-zinc-700 border-1 border-gray-500'
                        />
                        {errorsText.archivo && <p className='text-red-500'>{errorsText.archivo.message}</p>}
                        <div className='flex justify-between space-x-4'>
                            <button
                                type="button"
                                onClick={() => handleSubmitText((formData) => onSubmit(formData, 'Desplazar'))()}
                                className='bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md my-2'
                            >
                                Desplazar
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSubmitText((formData) => onSubmit(formData, 'Regresar'))()}
                                className='bg-violet-600 hover:bg-violet-700 px-3 py-2 rounded-md my-2'
                            >Regresar
                            </button>
                            <button type='button' onClick={() => resetText({ desplazamiento: 0, archivo: [] })} className='whitespace-nowrap bg-stone-500 hover:bg-stone-600 px-3 py-2 rounded-md my-2'>Limpiar</button>
                            <Link className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md my-2' to='/'>Menu</Link>
                        </div>
                    </form>
                </div>
            </div>

            <div className='flex items-center justify-center mt-20 space-x-4'>
                <div className='bg-zinc-800 max-w-min w-full p-10 rounded-md'>
                    <h1 className='text-3xl font-bold my-2 whitespace-nowrap'>Desplazamiento de imagenes</h1>
                    <form onSubmit={onSubmit}>
                        <input type="text"
                            {...registerImage('desplazamientoImagen', {
                                required: 'El desplazamiento es requerido', min: { value: 0, message: "El número debe ser mayor o igual a 0" },
                                max: { value: 100, message: "El número debe ser menor o igual a 100" }
                            })}
                            className='w-full my-2 text-white rounded-md dark:text-gray-400 dark:bg-zinc-700 border-1 border-gray-500'
                            placeholder='(R, G, B)'
                        />
                        {errorsText.desplazamientoImagen && <p className='text-red-500'>{errorsText.desplazamientoImagen.message}</p>}
                        <input type="file"
                            {...registerImage('archivoBMP', { required: 'El archivo es requerido' })}
                            className='w-full my-2 text-white rounded-md dark:text-gray-400 dark:bg-zinc-700 border-1 border-gray-500'
                        />
                        {errorsImage.archivoBMP && <p className='text-red-500'>{errorsImage.archivoBMP.message}</p>}
                        <div className='flex justify-between space-x-4'>
                            <button
                                type="button"
                                onClick={() => handleSubmitImage((formData) => onSubmitImage(formData, 'Desplazar'))()}
                                className='bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md my-2'
                            >
                                Desplazar
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSubmitImage((formData) => onSubmitImage(formData, 'Regresar'))()}
                                className='bg-violet-600 hover:bg-violet-700 px-3 py-2 rounded-md my-2'
                            >Regresar
                            </button>
                            <button type='button' onClick={() => resetImage({ desplazamiento: 0, archivo: [] })} className='whitespace-nowrap bg-stone-500 hover:bg-stone-600 px-3 py-2 rounded-md my-2'>Limpiar</button>
                            <Link className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md my-2' to='/'>Menu</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
