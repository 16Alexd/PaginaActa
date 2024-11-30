import React from "react";


const DatosPadre = ({ register, errors }) => {
  return (
    <div className="form-section">
      <h2>Datos del Padre</h2>

      <label htmlFor="padre">Nombre del Padre:</label>
      <input type="text" id="padre" {...register('padre', { required: true })} />
      {errors.padre && <span>Este campo es obligatorio</span>}

      <label htmlFor="papadre">Primer Apellido:</label>
      <input type="text" id="papadre" {...register('papadre', { required: true })} />
      {errors.papadre && <span>Este campo es obligatorio</span>}

      <label htmlFor="sapadre">Segundo Apellido:</label>
      <input type="text" id="sapadre" {...register('sapadre', { required: true })} />
      {errors.sapadre && <span>Este campo es obligatorio</span>}

      <label htmlFor="curppa">CURP:</label>
      <input type="text" id="curppa" {...register('curppa', { required: true })} />
      {errors.curppa && <span>Este campo es obligatorio</span>}

      <label htmlFor="nacionalidadpadre">Nacionalidad:</label>
     <input type="text" id="nacionalidadpadre" {...register('nacionalidadpadre', { required: true, maxLength: 20 })}/>
     {errors.nacionalidadpadre && <span>Este campo es obligatorio</span>}



    </div>
  );
};

export default DatosPadre;
