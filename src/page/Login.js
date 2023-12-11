import React, { useState } from "react";
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
    //const auth = getAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    
    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        await setPersistence(auth, browserSessionPersistence)
        // await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("User logged in successfully");
                // auth.currentUser.getIdToken(true)
                //     .then((idToken) => {
                //         sessionStorage.setItem("idToken", idToken);
                //     })
                //     .catch((error) => {
                //         console.log("Error: ", error);
                //     })
                return signInWithEmailAndPassword(auth, email, password);
            })
            .then(() => {
                navigate("/patient");
                setLoading(false)
                console.log("working...")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode + " - " + errorMessage)
                setLoading(false)
                console.log(errorCode, errorMessage);
            })
    }

    return (
        <div className="container">
            <form className="form-control">
            <h1 className="display-6"> Iniciar sesión </h1>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="email-address"
                        name="email"
                        type="email"
                        required
                        placeholder="Correo Electrónico"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email-address">Correo Electrónico</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="password">Contraseña</label>
                </div>
                <button className="btn btn-primary" onClick={onLogin}>
                    {
                        loading ? 
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        :
                            null
                    }
                    <span role="status">Ingresar</span>
                </button>
            </form>
            <span className="form-text">
                ¿Aún no está registrado? {' '}
                <NavLink className="link-dark" to="/signup">
                    Registrarse
                </NavLink>
            </span>
        </div>
    )
}

export default Login;