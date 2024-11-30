import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Registro() {
  const [user, setUser] = useState({ email: "", password: "" });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => 
    setUser({ ...user, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Registro</h2>
      {error && <p className="error-mensaje">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo:</label>
        <input 
          type="email" 
          name="email" 
          onChange={handleChange} 
        />

        <label htmlFor="password">Contraseña:</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          onChange={handleChange} 
        />

        <button className="btn" type="submit">Registro</button>
      </form>
    </div>
  );
}
