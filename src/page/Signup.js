import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import UniqueSelection from "../component/UniqueSelection";
import InputLine from "../component/InputLine";
import centros from "../centros.json";
import { auth } from "../firebase";
import { getDatabase, push, ref, set } from "firebase/database";

const Signup = () => {
    // const auth = getAuth()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({});
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [pass1, setPass1] = useState();
    // const [pass2, setPass2] = useState();
    const paises = Object.keys(centros);
    const db = getDatabase();

    function hospitales() {
        const ips = [];
        const pais = state.pais;
        if (state && state.pais) centros[pais].forEach(item => {
            ips.push(item["nombre"])
        })
        return ips
    };
    function verifyPasswords() {
        let pass1 = document.getElementById('password');
        let pass2 = document.getElementById('repassword');
        if (pass1.value !== pass2.value) {
            document.getElementById('error').classList.add('mostrar');
            setTimeout(() => {
                setLoading(false)
                document.getElementById('error').classList.remove('mostrar');
            }, 3000)
            setLoading(false)
            return false;
        } else {
            //setPassword(pass1.value);
            document.getElementById('error').classList.remove("mostrar");
            document.getElementById('ok').classList.remove('ocultar')
            document.getElementById('signup').disabled = true;
            // setTimeout(function() {
            //     setLoading(false)
            //     document.getElementById('ok').classList.add('ocultar')
            //     // window.location.reload();
            // }, 2000);
            return true
        }
    }
    const onSubmit = async (e)=> {
        e.preventDefault();
        setLoading(true);
        if (verifyPasswords())
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                //const user = userCredential.user;
                //console.log(user);
                navigate("/patient");
                document.getElementById('ok').classList.add('ocultar')
                setLoading(false)
            })
            .then(() => {
                set(push(ref(db, "users/" + auth.currentUser.uid)), {
                    ...state
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                document.getElementById('ok').classList.add('ocultar')
                document.getElementById('signup').disabled = false;
                setLoading(false)
                if (errorCode === "auth/email-already-in-use") { 
                    alert("La dirección de correo ingresada ya está registrada");
                } else if (errorCode === "auth/invalid-email") {
                    alert("La dirección de correo ingresada no es válida.")
                } else {
                    alert("Error: " + errorCode);
                }
            });
    }

    return (
        <div className="container">
            <div id="msg"></div>
            {/* <!-- Mensajes de Verificación --> */}
            <div id="error" className="alert alert-danger ocultar" role="alert">
                Las contraseñas no coinciden, vuelve a intentar!
            </div>
            <div id="ok" className="alert alert-success ocultar" role="alert">
                Procesando formulario ...
            </div>
            {/* <!-- Fin Mensajes de Verificación --> */}
            <form className="form-control">
                <h1 className="display-6">HemolatApp</h1>
                <div className="form-floating mb-3">
                    <input 
                        className="form-control"
                        type='email' 
                        id="email" 
                        name='email'
                        //value={email}
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
                        //value={pass1}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Contraseña"
                        //autoComplete="pass"
                    />
                    <label htmlFor="password">Contraseña</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        type='password'
                        id="repassword"
                        name="repassword"
                        //value={pass2}
                        // onChange={(e) => setPass2(e.target.value)}
                        required
                        placeholder="Ingrese de nuevo la contraseña"
                        //autoComplete="pass"
                    />
                    <label htmlFor="repassword">Ingrese de nuevo la contraseña</label>
                </div>
                <InputLine
                    state={setState}
                    name="userID"
                    type="number" 
                    text="ID" 
                    placeholder="Nº de documento de identidad"
                    units=""
                />
                <InputLine
                    state={setState}
                    name="name"
                    type="text" 
                    text="Nombre" 
                    placeholder="Nombre completo"
                    units=""
                />
                <InputLine
                    state={setState}
                    name="lastname"
                    type="text" 
                    text="Apellidos" 
                    placeholder="Apellidos completos"
                    units=""
                />
                <InputLine
                    state={setState}
                    name="fechaNace"
                    type="date" 
                    text="Fecha de nacimiento" 
                    placeholder=""
                    units=""
                />
                <InputLine
                    state={setState}
                    name="telefono"
                    type="phone" 
                    text="Teléfono" 
                    placeholder="Ingrese su número de contacto"
                    units=""
                />
                <UniqueSelection
                    options={paises}
                    text="Pais"
                    item="pais"
                    state={setState}
                />
                <UniqueSelection
                    options={hospitales()}
                    text="Centro hospitalario"
                    item="centro-hospitalario"
                    state={setState}
                />
                <div className="input-line">
                    <button className="btn btn-primary" id="signup" type="submit" onClick={onSubmit}>
                    {
                        loading ? 
                            <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                        :
                            null
                    }
                    <span role="status">Registrarse</span>
                    </button>
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