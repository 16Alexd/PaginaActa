import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import jsPDF from 'jspdf';
import QRious from 'qrious';
import JsBarcode from 'jsbarcode';
import fondo from '../fondo.jpg';
import '../app.css';
import './ActaDeNacimiento.css';
import DatosPersonales from './datosmios';
import DatosPadre from './datospa';
import DatosMadre from './datosma';
import DatosExtra from './datosextra';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../firebase/configuracion';

const ActaDeNacimiento = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [seccion, setSeccion] = useState('DatosPersonales'); // Controla qué sección se muestra

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const cambiarSeccion = (nuevaSeccion) => setSeccion(nuevaSeccion);

  const onSubmit = async (data) => {
    const validations = {
      nombre: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,50}$/,
      primer: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,50}$/,
      segundo: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,50}$/,
      fecha: /^\d{4}-\d{2}-\d{2}$/,
      lugar: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,100}$/,
      curp: /^.{18}$/,
      padre: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,50}$/,
      papadre: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,50}$/,
      sapadre: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,50}$/,
      curppa: /^.{18}$/,
      madre: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,50}$/,
      pamadre: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,50}$/,
      samadre: /^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]{2,50}$/,
      curpma: /^.{18}$/,
      nacionalidadpadre: /^[a-zA-Z]{0,20}$/,
      nacionalidadmadre: /^[a-zA-Z]{0,20}$/,
      registro: /^[a-zA-Z0-9]{1,20}$/,
      Anotaciones: /^.{0,200}$/,
    };

    for (const [key, regex] of Object.entries(validations)) {
      if (!regex.test(data[key])) {
        alert(`El campo ${key} no es válido.`);
        return;
      }
    }

    const doc = new jsPDF('p', 'mm', 'a4');
    const background = new Image();
    background.src = fondo;
    background.onload = async () => {
      doc.addImage(background, 'JPEG', 0, 0, 210, 297);
      doc.setFontSize(12);
      doc.setFont('arial', 'normal');

      doc.text(data.nombre, 35, 104);
      doc.text(data.primer, 100, 104);
      doc.text(data.segundo, 160, 104);
      doc.text(data.fecha, 95, 122);
      doc.text(data.lugar, 160, 122);
      doc.text(data.genero, 35, 122);
      doc.text(data.curp, 145, 40);

      doc.text(data.padre, 22, 175);
      doc.text(data.papadre, 60, 175);
      doc.text(data.sapadre, 100, 175);
      doc.text(data.curppa, 150, 175);
      doc.text(data.madre, 22, 152);
      doc.text(data.pamadre, 60, 152);
      doc.text(data.samadre, 100, 152);
      doc.text(data.curpma, 150, 152);

      doc.text(data.nacionalidadpadre, 130, 175);
      doc.text(data.nacionalidadmadre, 130, 152);

      doc.text(data.registro, 150, 53);
      doc.text(data.Anotaciones, 15, 200);

      const qr = new QRious({ value: `${data.registro}`, size: 100 });
      doc.addImage(qr.toDataURL(), 'PNG', 12, 229, 50, 50);
      doc.addImage(qr.toDataURL(), 'PNG', 176, 251, 20, 22);

      const canvas = document.createElement('canvas');
      JsBarcode(canvas, data.registro, { format: 'CODE128', width: 2, height: 40 });
      doc.addImage(canvas.toDataURL('image/png'), 'PNG', 145, 12, 50, 15);

      doc.save(`${data.nombre}-${data.primer}.pdf`);

      // Guarda el PDF en Firebase Storage
      const pdfBlob = doc.output('blob');
      const pdfRef = ref(storage, `actas/${data.nombre}-${data.primer}.pdf`);
      
      try {
        await uploadBytes(pdfRef, pdfBlob);
        alert("Acta de nacimiento generada y subida correctamente.");
      } catch (error) {
        console.error("Error al subir el archivo:", error);
        alert("Hubo un error al subir el archivo a Firebase.");
      }
    };
  };


  return (
    <div className="form-container">
      <h1>Acta de Nacimiento</h1>
      <div className="button-group">
        <button onClick={() => cambiarSeccion('DatosPersonales')}>Datos Personales</button>
        <button onClick={() => cambiarSeccion('DatosPadre')}>Datos del Padre</button>
        <button onClick={() => cambiarSeccion('DatosMadre')}>Datos de la Madre</button>
        <button onClick={() => cambiarSeccion('DatosExtra')}>Datos Extra</button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} id="actaForm">
        {seccion === 'DatosPersonales' && <DatosPersonales register={register} errors={errors} />}
        {seccion === 'DatosPadre' && <DatosPadre register={register} errors={errors} />}
        {seccion === 'DatosMadre' && < DatosMadre register={register} errors={errors} />}
        {seccion === 'DatosExtra' && (
          <>
            <DatosExtra register={register} errors={errors} />
            <button type="submit" className="btn">Generar Acta</button>
          </>
        )}
      </form>
    </div>
  );
};

export default ActaDeNacimiento;
