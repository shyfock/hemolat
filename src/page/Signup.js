import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
// import { auth } from "../firebase";

const Signup = () => {
    const auth = getAuth()
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (e)=> {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/home");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === "auth/email-already-in-use") { 
                    alert("La dirección de correo ingresada ya está registrada");
                } else if (errorCode === "auth/invalid-email") {
                    alert("La dirección de correo ingresada no es válida.")
                }
            });
    }

    return (
        <div className="container">
            <form className="form-control">
                <h1 className="display-6">HemolatApp</h1>
                <div className="form-floating mb-3">
                    <input 
                        className="form-control"
                        type='email' 
                        id="email" 
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Correo Electrónico"
                    />
                    <label htmlFor="email">Correo Electrónico</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        type='password'
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Contraseña"
                        autoComplete="pass"
                    />
                    <label htmlFor="password">Contraseña</label>
                </div>
                <div className="input-line">
                    <button className="btn btn-primary" type="submit" onClick={onSubmit}>Registrarse</button>
                </div>
            </form>
            <span className="form-text">
                ¿Ya está registrado?{' '}
                <NavLink className="link-dark" to="/login">
                    Ingresar
                </NavLink>
            </span>
        </div>
    )
}

export default Signup;