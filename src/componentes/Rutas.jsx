import { Routes, Route } from "react-router-dom";
import { Login } from './Login';
import { Registro } from './Registro';
import ActaDeNacimiento from './ActaDeNacimiento';


import { AuthProvider } from "../context/AuthContext";

function Rutas() {
  return (
    <div className='bg-slate-300 h-screen text-black flex'>
      <AuthProvider>
        <Routes>
        <Route path="/Registro" element={<Registro />} />
        <Route path="/" element={<Login/>} />
         <Route path="/ActadeNacimiento" element={<ActaDeNacimiento/>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default Rutas;
