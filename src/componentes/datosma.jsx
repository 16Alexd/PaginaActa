import React from 'react';

const datosma = ({ register, errors }) => (
  <div>
    <h2>Datos de la Madre</h2>

    <label htmlFor="madre">Nombre de la Madre:</label>
    <input type="text" id="madre" {...register('madre', { required: true })} />
    {errors.madre && <span>Este campo es obligatorio</span>}

    <label htmlFor="pamadre">Primer Apellido:</label>
    <input type="text" id="pamadre" {...register('pamadre', { required: true })} />
    {errors.pamadre && <span>Este campo es obligatorio</span>}

    <label htmlFor="samadre">Segundo Apellido:</label>
    <input type="text" id="samadre" {...register('samadre', { required: true })} />
    {errors.samadre && <span>Este campo es obligatorio</span>}

    <label htmlFor="curpma">CURP de la Madre:</label>
    <input type="text" id="curpma" {...register('curpma', { required: true, minLength: 18, maxLength: 18 })} />
    {errors.curpma && <span>CURP inválido</span>}
   
    <label htmlFor="nacionalidadmadre">Nacionalidad:</label>
     <input type="text" id="nacionalidadmadre" {...register('nacionalidadmadre', { required: true, maxLength: 20 })}/>
     {errors.nacionalidadmadre && <span>Este campo es obligatorio</span>}
  
  
  
  
  
  </div>
);

export default datosma;
