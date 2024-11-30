import React, { useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/configuracion";

const DatosExtra = ({ register, errors }) => {
  const [nombreArchivo, setNombreArchivo] = useState(""); // Estado para el nombre del archivo a buscar
  const [urlDescarga, setUrlDescarga] = useState(""); // Estado para almacenar la URL del archivo
  const [error, setError] = useState(""); // Estado para manejar errores

  // Función para buscar el acta
  const buscarActa = async () => {
    setError(""); // Reinicia el mensaje de error
    setUrlDescarga(""); // Limpia la URL anterior
    try {
      const referenciaArchivo = ref(storage, `actas/${nombreArchivo}`);
      const url = await getDownloadURL(referenciaArchivo); // Obtén la URL del archivo
      setUrlDescarga(url); // Guarda la URL para mostrarla como enlace
    } catch (err) {
      if (err.code === "storage/object-not-found") {
        setError("El acta no existe en el sistema. Verifica el nombre.");
      } else {
        setError("Ocurrió un error al buscar el acta. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <div>
      <h2>Datos Extra</h2>

      <label htmlFor="registro">Número de Registro:</label>
      <input
        type="text"
        id="registro"
        {...register("registro", { required: true })}
      />
      {errors.registro && <span>Este campo es obligatorio</span>}

      <label htmlFor="Anotaciones">Anotaciones Marginales:</label>
      <textarea id="Anotaciones" {...register("Anotaciones")} />

      {/* Buscar Acta */}
      <div className="buscar-acta-container">
        <h3>Buscar Acta</h3>
        <input
          type="text"
          placeholder="Introduce el nombre del acta"
          value={nombreArchivo}
          onChange={(e) => setNombreArchivo(e.target.value)}
        />
        <button onClick={buscarActa}>Buscar Acta</button>

        {/* Muestra el enlace de descarga si existe */}
        {urlDescarga && (
          <div className="resultado-busqueda">
            <h4>Resultado:</h4>
            <a href={urlDescarga} download>
              Haz clic aquí para descargar tu acta
            </a>
          </div>
        )}

        {/* Muestra errores si los hay */}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default DatosExtra;
