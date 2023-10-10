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
            .then((userCredential) => {
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
            <main>
                <section>
                    <div>
                        <h1> HemolatApp </h1>
                        <form>
                            <div>
                                <label htmlFor="email-address">Correo Electrónico</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Correo Electrónico"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    placeholder="Contraseña"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <button onClick={onLogin}>Ingresar</button>
                            </div>
                        </form>
                        <p>
                            ¿Aún no está registrado? {' '}
                            <NavLink to="/signup">
                                Registrarse
                            </NavLink>
                        </p>
                    </div>
                </section>
            </main>
        </AuthContext.Provider>
    )
}

export default Login;