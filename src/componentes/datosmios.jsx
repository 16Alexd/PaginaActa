// DatosPersonales.jsx
import React from 'react';

const DatosPersonales = ({ register, errors }) => {// componente que recibe los dos prop registra campo de validacion, el otro contiene los erroes de validacion  
  return (
    <div className="form-section">
      <h2>Datos Personales</h2>
      <label htmlFor="nombre">Nombre:</label>
      <input type="text" id="nombre" {...register('nombre', { required: true })} />
      {errors.nombre && <span>Este campo es obligatorio</span>}

      <label htmlFor="primer">Primer Apellido:</label>
      <input type="text" id="primer" {...register('primer', { required: true })} />
      {errors.primer && <span>Este campo es obligatorio</span>}

      <label htmlFor="segundo">Segundo Apellido:</label>
      <input type="text" id="segundo" {...register('segundo', { required: true })} />
      {errors.segundo && <span>Este campo es obligatorio</span>}

      <label htmlFor="fecha">Fecha de Nacimiento:</label>
      <input type="date" id="fecha" {...register('fecha', { required: true })} />
      {errors.fecha && <span>Este campo es obligatorio</span>}

      <label htmlFor="lugar">Lugar de Nacimiento:</label>
      <input type="text" id="lugar" {...register('lugar', { required: true })} />
      {errors.lugar && <span>Este campo es obligatorio</span>}

      <label htmlFor="curp">Curp:</label>
     <input type="text" id="curp" {...register('curp', { required: true })} />

     <label htmlFor="nacionalidad">Nacionalidad:</label>
     <input type="text" id="nacionalidad" {...register('nacionalidad', { required: true, maxLength: 20 })}/> 
     {errors.nacionalidad && <span>Este campo es obligatorio</span>}

      <label htmlFor="genero">Género:</label>
      <select id="genero" {...register('genero')}>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
      </select>
    
    
    
    
    </div>
  );
};

export default DatosPersonales;

  
    


  








