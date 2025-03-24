import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from 'react-router'
import { useEffect } from 'react'

const modInverso = (a, m) => {
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) return i;
  }
  return null;
};

export const PracticaCifradoAffin = () => {
  const {register,handleSubmit,formState: { errors },} = useForm();

  // Estados reales (se actualizan al hacer submit)
  const [multiplicativo, setMultiplicativo] = useState(1);
  const [aditivo, setaditivo] = useState(0);
  const [numero, setNumero] = useState(0);
  const [numeroCoprimo, setNumeroCoprimo] = useState(false);
  const [mostrarResultado, setMostrarResultado] = useState(false); // Estado para mostrar el resultado


  const cifrar = (data) => {
    // Actualizar estados con los valores ingresados en el formulario
    const nuevoMultiplicativo = parseInt(data.multiplicativo);
    const nuevoaditivo = parseInt(data.aditivo);
    const nuevoNumero = parseInt(data.numero);

    setMultiplicativo(nuevoMultiplicativo);
    setaditivo(nuevoaditivo);
    setNumero(nuevoNumero);
    setMostrarResultado(true);
    // Calcular si es coprimo
    const modInv = modInverso(nuevoMultiplicativo, nuevoNumero);
    if (modInv === null) {
      setNumeroCoprimo(false);
      return;
    }
    setNumeroCoprimo(true);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-zinc-800 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-bold mb-4">Cifrado Afín</h2>

      {/* Formulario controlado por useForm */}
      <form onSubmit={handleSubmit(cifrar)}>
        <div className="mb-2">
          <label className="block">Factor Multiplicativo (a):</label>
          <input
            type="number"
            {...register("multiplicativo", {
              required: "Este campo es obligatorio",
              min: { value: 1, message: "El valor debe ser mayor o igual a 1" },
            })}
            defaultValue={multiplicativo}
            className="w-full my-2 text-white rounded-md dark:text-gray-400 dark:bg-zinc-700 border-1 border-gray-500"
          />
          {errors.multiplicativo && <p className="text-red-500 text-sm">{errors.multiplicativo.message}</p>}
        </div>

        <div className="mb-2">
          <label className="block">Factor Aditivo (b):</label>
          <input
            type="number"
            {...register("aditivo", {
              required: "Este campo es obligatorio",
              min: { value: 1, message: "El valor debe ser mayor o igual a 1" },
            })}
            defaultValue={aditivo}
            className="w-full my-2 text-white rounded-md dark:text-gray-400 dark:bg-zinc-700 border-1 border-gray-500"
          />
          {errors.aditivo && <p className="text-red-500 text-sm">{errors.aditivo.message}</p>}
        </div>

        <div className="mb-2">
          <label className="block">Número:</label>
          <input
            type="number"
            {...register("numero", {
              required: "Este campo es obligatorio",
              min: { value: 1, message: "El valor debe ser mayor o igual a 1" },
            })}
            defaultValue={numero}
            className="w-full my-2 text-white rounded-md dark:text-gray-400 dark:bg-zinc-700 border-1 border-gray-500"
          />
          {errors.numero && <p className="text-red-500 text-sm">{errors.numero.message}</p>}
        </div>

        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-lg">
          Cifrar
        </button>
      </form>

      {/* Mostrar resultado si es coprimo */}
      {mostrarResultado && (numeroCoprimo ? (
        <div className="mt-4">
          <p>Fórmula de Cifrado: E(x) = ({multiplicativo % numero} * x + {aditivo}) mod {numero}</p>
          <p>Fórmula de Descifrado (DK1): D(y) = {modInverso(multiplicativo, numero)} * (y + {numero - aditivo}) mod {numero}</p>
          <p>
            Fórmula de Descifrado (DK2): D(y) = {modInverso(multiplicativo, numero)} * y +{" "}
            {(modInverso(multiplicativo, 26) * (26 - aditivo)) % 26} mod {numero}
          </p>
        </div>
      ) : (
        <p>El factor multiplicativo no es coprimo con el tamaño de los elementos  </p>
      ))}
    </div>
  );
};
