import React, { useContext, useState } from "react";
import { setPersistence, signInWithEmailAndPassword, browserSessionPersistence, getAuth } from "firebase/auth";
// import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext, useAuthState } from "../firebase";

const Login = () => {
    const auth = getAuth()
    const authed = useAuthState()
    console.log("Authed:", authed)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = async (e) => {
        e.preventDefault();
        await setPersistence(auth, browserSessionPersistence)
        // await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // const user = userCredential.user;
                navigate("/home");
                // console.log(user);
                console.log("User logged in successfully");
                return signInWithEmailAndPassword(auth, email, password);
            })
            .then((userCredential) => {
                console.log(userCredential.user.uid);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
    }

    return (
        <AuthContext.Provider value={authed}>
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
                    <button className="btn btn-primary" onClick={onLogin}>Ingresar</button>
                </form>
                <span className="form-text">
                    ¿Aún no está registrado? {' '}
                    <NavLink className="link-dark" to="/signup">
                        Registrarse
                    </NavLink>
                </span>
            </div>
        </AuthContext.Provider>
    )
}

export default Login;