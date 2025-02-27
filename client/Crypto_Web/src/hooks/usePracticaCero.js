import Swal from 'sweetalert2'
import { Image } from 'image-js'

export const usePracticaCero = () => {
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

    const onSubmitImage = async (formValues, action) => {
        const desplazamiento = formValues.desplazamientoImagen.split(',');
        const R = parseInt(desplazamiento[0]);
        const G = parseInt(desplazamiento[1]);
        const B = parseInt(desplazamiento[2]);

        const file = formValues.archivoBMP[0];
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        const image = await Image.load(uint8Array);

        if (action === 'Desplazar') {
            for (let y = 0; y < image.height; y++) {
                for (let x = 0; x < image.width; x++) {
                    let pixel = image.getPixelXY(x, y);
                    const newPixel = [
                        (pixel[0] + R) % 256,
                        (pixel[1] + G) % 256,
                        (pixel[2] + B) % 256
                    ];
                    image.setPixelXY(x, y, newPixel);
                }
            }
        } else if (action === 'Regresar') {
            for (let y = 0; y < image.height; y++) {
                for (let x = 0; x < image.width; x++) {
                    let pixel = image.getPixelXY(x, y);
                    const newPixel = [
                        (pixel[0] - R) % 256,
                        (pixel[1] - G) % 256,
                        (pixel[2] - B) % 256
                    ];
                    image.setPixelXY(x, y, newPixel);
                }
            }
        }

        const newBmp = await image.toBuffer("image/bmp");

        const blob = new Blob([newBmp], { type: "image/bmp" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const fileName = formValues.archivoBMP[0].name.split('.')[0];
        const postfix = action === 'Desplazar' ? '_c.bmp' : '_d.bmp';
        a.download = fileName + postfix;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return {
        onSubmit,
        onSubmitImage
    };
}