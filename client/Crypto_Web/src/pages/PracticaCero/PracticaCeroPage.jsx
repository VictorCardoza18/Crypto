import { useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { useAuth } from '../../hooks'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

export const PracticaCeroPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const { setMenuState } = useAuth()
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    const onSubmit = (formValues, action) => {
        const file = formValues.archivo[0]
        const reader = new FileReader()

        reader.readAsText(file)

        reader.onload = () => {
            const fileContent = reader.result;
            let archivoModificado = fileContent;
            if (action === 'Regresar') {
                archivoModificado = fileContent?.split('')
                    .map(caracter => {
                        // Logica de desplazamiento
                        const ascii = caracter.charCodeAt(0);
                        const caracterDesplazado = ascii - parseInt(formValues?.desplazamiento, 10);
                        return String.fromCharCode(caracterDesplazado);
                    })
                    .join('');

            } else if (action === 'Desplazar') {
                archivoModificado = fileContent?.split('')
                    .map(caracter => {
                        // Logica de desplazamiento
                        const ascii = caracter.charCodeAt(0);
                        const caracterDesplazado = ascii + parseInt(formValues?.desplazamiento, 10);
                        return String.fromCharCode(caracterDesplazado);
                    })
                    .join('');
            }


            const blob = new Blob([archivoModificado], { type: "text/plain" });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            // Nombre del archivo
            const fileName = formValues.archivo[0].name.split('.')[0];
            const postfix = action === 'Desplazar' ? '_c.txt' : '_r.txt';
            link.download = fileName + postfix;
            link.click();

            Toast.fire({
                icon: 'success',
                title: 'Archivo procesado'
            })
        }

        reader.onerror = (error) => {
            console.log('Error al leer el archivo', error)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setMenuState(location.pathname.slice(1)), [])
    return (
        <div className='flex items-center justify-center mt-20 space-x-4'>
            <div className='bg-zinc-800 max-w-min w-full p-10 rounded-md'>
                <h1 className='text-3xl font-bold my-2 whitespace-nowrap'>Desplazamiento de caracteres</h1>
                <form onSubmit={onSubmit}>
                    <input type="number"
                        {...register('desplazamiento', {
                            required: 'El desplazamiento es requerido', min: { value: 0, message: "El número debe ser mayor o igual a 0" },
                            max: { value: 100, message: "El número debe ser menor o igual a 100" }
                        })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Desplazamiento'
                    />
                    {errors.desplazamiento && <p className='text-red-500'>{errors.desplazamiento.message}</p>}
                    <input type="file"
                        {...register('archivo', { required: 'El archivo es requerido' })}
                        className='w-full my-2 text-white rounded-md dark:text-gray-400 dark:bg-zinc-700 border-1 border-gray-500'
                    />
                    {errors.archivo && <p className='text-red-500'>{errors.archivo.message}</p>}
                    <div className='flex justify-between space-x-4'>
                        <button
                            type="button"
                            onClick={() => handleSubmit((formData) => onSubmit(formData, 'Desplazar'))()}
                            className='bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-md my-2'
                        >
                            Desplazar
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSubmit((formData) => onSubmit(formData, 'Regresar'))()}
                            className='bg-violet-600 hover:bg-violet-700 px-3 py-2 rounded-md my-2'
                        >Regresar
                        </button>
                        <button type='button' onClick={() => reset({ desplazamiento: 0, archivo: [] })} className='whitespace-nowrap bg-stone-500 hover:bg-stone-600 px-3 py-2 rounded-md my-2'>Limpiar</button>
                        <Link className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md my-2' to='/'>Menu</Link>
                    </div>
                </form>
            </div>
        </div >
    )
}
