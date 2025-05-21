import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks';
import { FaLock, FaHistory, FaKey, FaDownload } from 'react-icons/fa';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const HomePage = () => {
    const { setMenuState } = useAuth();
    const factsRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        setMenuState('');
    }, [setMenuState]);

    const cryptoFacts = [
        {
            id: 1,
            icon: <FaHistory className="text-blue-500 text-4xl mb-4" />,
            title: "Historia de la Criptografía",
            content: "La criptografía tiene más de 4,000 años de antigüedad. Los jeroglíficos egipcios no estándar utilizados alrededor del 1900 a.C. se consideran una de las primeras formas de escritura secreta. Durante la Segunda Guerra Mundial, la máquina Enigma alemana representó un avance significativo que fue finalmente descifrada por Alan Turing y su equipo en Bletchley Park.",
            color: "from-blue-800 to-blue-600"
        },
        {
            id: 2,
            icon: <FaKey className="text-green-500 text-4xl mb-4" />,
            title: "Criptografía Cuántica",
            content: "La criptografía cuántica utiliza los principios de la mecánica cuántica para asegurar la comunicación. A diferencia de la criptografía tradicional, que depende de la dificultad matemática, la criptografía cuántica se basa en las leyes de la física. El principio de incertidumbre de Heisenberg garantiza que cualquier intento de interceptar la comunicación alterará el mensaje, alertando inmediatamente a los participantes.",
            color: "from-green-800 to-green-600"
        },
        {
            id: 3,
            icon: <FaLock className="text-purple-500 text-4xl mb-4" />,
            title: "Blockchain y Criptografía",
            content: "Las criptomonedas como Bitcoin utilizan criptografía de clave pública para asegurar las transacciones. Cada usuario tiene un par de claves: una pública para recibir fondos y una privada para firmarlos. La tecnología blockchain utiliza funciones hash criptográficas como SHA-256 para crear un registro inmutable de transacciones, lo que garantiza que una vez que se añade información al blockchain, no puede ser alterada sin modificar todos los bloques subsiguientes.",
            color: "from-purple-800 to-purple-600"
        }
    ];

    const generatePDF = async () => {
        if (!factsRef.current || isGenerating) return;

        setIsGenerating(true);

        try {
            // Crear un contenedor temporal para renderizar el contenido del PDF
            const pdfContent = document.createElement('div');
            pdfContent.style.width = '100%';
            pdfContent.style.padding = '20px';
            pdfContent.style.backgroundColor = 'white';
            pdfContent.style.color = 'black';

            // Encabezado del PDF
            const header = document.createElement('div');
            header.innerHTML = `
        <h1 style="text-align: center; color: #3B82F6; font-size: 24px; margin-bottom: 5px;">Datos Fascinantes sobre Criptografía</h1>
        <p style="text-align: center; color: #4B5563; font-size: 14px; margin-bottom: 20px;">Generado el ${new Date().toLocaleString()}</p>
        <p style="text-align: center; font-style: italic; margin-bottom: 30px;">TRANSFORMANDO SECRETOS EN SEGURIDAD</p>
        <hr style="margin-bottom: 30px;">
      `;
            pdfContent.appendChild(header);

            // Agregar cada dato curioso
            cryptoFacts.forEach((fact, index) => {
                const factElem = document.createElement('div');
                factElem.style.marginBottom = '30px';
                factElem.innerHTML = `
          <h2 style="color: #3B82F6; font-size: 18px; margin-bottom: 10px;">${index + 1}. ${fact.title}</h2>
          <p style="font-size: 14px; text-align: justify; line-height: 1.6;">${fact.content}</p>
          ${index < cryptoFacts.length - 1 ? '<hr style="margin-top: 20px; border-top: 1px dashed #E5E7EB;">' : ''}
        `;
                pdfContent.appendChild(factElem);
            });

            // Agregar footer
            const footer = document.createElement('div');
            footer.innerHTML = `
        <hr style="margin-top: 30px;">
        <p style="text-align: center; color: #6B7280; font-size: 12px; margin-top: 20px;">© ${new Date().getFullYear()} Crypto - Aplicación para prácticas de criptografía</p>
      `;
            pdfContent.appendChild(footer);

            // Agregar temporalmente al documento para renderizarlo
            document.body.appendChild(pdfContent);

            // Convertir a imagen
            const canvas = await html2canvas(pdfContent, {
                scale: 2, // Mayor resolución
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            // Eliminar elemento temporal
            document.body.removeChild(pdfContent);

            // Crear PDF
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pageWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            // Primera página
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // Agregar páginas adicionales si es necesario
            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            // Guardar PDF
            pdf.save('Datos_Criptografia.pdf');
        } catch (error) {
            console.error('Error al generar PDF:', error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen py-8 px-4">
            {/* Hero Section */}
            <section className="text-center mb-16 mt-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Bienvenido a Crypto
                </h1>

                {/* Slogan - sencillo y minimalista */}
                <div className="flex justify-center mb-6">
                    <div className="h-px w-16 bg-gray-600 self-center mr-4"></div>
                    <p className="text-lg font-light tracking-wider text-gray-300">
                        TRANSFORMANDO SECRETOS EN SEGURIDAD
                    </p>
                    <div className="h-px w-16 bg-gray-600 self-center ml-4"></div>
                </div>

                <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
                    Explora el fascinante mundo de la criptografía a través de prácticas interactivas y aprende los fundamentos de la seguridad de la información.
                </p>
            </section>

            {/* Datos interesantes con botón de descarga */}
            <section className="mb-16" ref={factsRef}>
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-white">
                        Datos Fascinantes sobre Criptografía
                    </h2>

                    {/* Botón para descargar PDF */}
                    <button
                        onClick={generatePDF}
                        disabled={isGenerating}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        <FaDownload />
                        {isGenerating ? "Generando..." : "Descargar PDF"}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cryptoFacts.map((fact) => (
                        <div
                            key={fact.id}
                            className={`bg-zinc-800 rounded-lg p-6 shadow-lg transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl border-t-4 bg-gradient-to-b ${fact.color}`}
                        >
                            <div className="flex flex-col items-center">
                                {fact.icon}
                                <h3 className="text-xl font-semibold mb-3 text-white">{fact.title}</h3>
                            </div>
                            <p className="text-gray-300 text-center">
                                {fact.content}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center bg-zinc-800 p-8 rounded-lg max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                    ¡Comienza a aprender criptografía hoy!
                </h2>
                <p className="text-gray-300 mb-6">
                    Explora nuestras prácticas interactivas y desarrolla tus habilidades en seguridad informática y protección de datos.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="/login"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
                    >
                        Iniciar sesión
                    </a>
                    <a
                        href="/register"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
                    >
                        Registrarse
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-20 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} Crypto - Aplicación para prácticas de criptografía</p>
            </footer>
        </div>
    );
};