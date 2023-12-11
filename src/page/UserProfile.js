import { child, getDatabase, onValue, push, ref, remove, update } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import InputLine from "../component/InputLine";
import UniqueSelection from "../component/UniqueSelection";
import centros from "../centros.json";
import { auth } from "../firebase";
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const db = getDatabase();

export const UpdateProfile = () => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(false);
    // const [profileKey, setProfileKey] = useState();
    const profileKey = useRef();
    const navigate = useNavigate();
    const paises = Object.keys(centros);
    const uid = auth.currentUser.uid;
    function hospitales() {
        const ips = [];
        const pais = state.pais;
        if (state && state.pais) centros[pais].forEach(item => {
            ips.push(item["nombre"])
        })
        return ips
    };
    useEffect(() => onValue((child(ref(db, "users/"), `${uid}`)), snapshot => {
        // if (Object.keys(snapshot.val())[0]) {
        // profileKey.current = push(child(ref(db), `users/${uid}`)).key
        // }
        if (snapshot.exists && snapshot.val() !== null) {
            profileKey.current = Object.keys(snapshot.val())[0];
            console.log(profileKey.current)
            return true
        } else {
            profileKey.current = push(child(ref(db), `users/${uid}`)).key
            console.log("No hay datos")
        }
    }, error => {console.log(error)},
    {
        onlyOnce: true
    }), [uid])
    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        await update((ref(db, `users/${uid}/${profileKey.current}`)),{
            ...state
        })
        // await set(push(ref(db, "users/" + uid)), {
        //     ...state
        // })
        .then(() => {
            setLoading(false)
            console.log("Perfil actualizado")
            navigate("/profile")
        })
        .catch((error) => {
            setLoading(false);
            console.log("Error: ", error);
        })
    }
    return (
        <div className="container">
            <form className="form-control">
                <h1 className="display-6">Crear perfil</h1>
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
                    <span role="status">Actualizar</span>
                    </button>
                </div>
            </form>
        </div>
    )
}
export const UserProfile = () => {
    const [state, setState] = useState({});
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate()
    const user = auth.currentUser;
    //console.log(auth)
    useEffect(() => {
        onValue(ref(db, "users/" + user.uid), snapshot => {
            if (snapshot.val()) {
                const profileData = Object.entries(Object.values(snapshot.val())[0])
                profileData.forEach(data => {
                    setState(prevState => (
                        {
                            ...prevState,
                            [data[0]]: data[1]
                        }
                    ));
                })
            } else {
                navigate('/profile/update')
            }
            
            // console.log(profileData)
            return true
        }, error => {
            console.log("Error: ", error)
        },
        {
            onlyOnce: true
        })
    }, [navigate, state, user.uid])

    const submitDelete = (e) => {
        e.preventDefault()
        
        if (window.confirm("¿Desea borrar su cuenta de acceso y toda la información contenida en su perfil?")) {
            if (email && password) {
                const cred = EmailAuthProvider.credential(email, password)
                
        reauthenticateWithCredential(user, cred)
            .then(() => {
                console.log(email)
                deleteUser(user)
                    .then(() => {
                        console.log("El usuario ha sido borrado")
                        remove(ref(db, "users/" + user.uid))
                            .then(() => {console.log("Perfil de usuario borrado!")})
                            .catch((error) => {
                                console.log("Error: ", error)
                            })
                    })
                    .catch((error) => {
                        console.log("Error: ", error)
                        //console.log(credentials)
                    })
                })
            .catch((error) => {
                    console.log("Error: ", error)
                })
            }
        }
    }

    return (
        <div className="container">
            <div className="modal fade ocultar" id="relog" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="relogLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="relogLabel">Ingrese sus credenciales</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="form-control">
                            <div className="modal-body">
                                <input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Contraseña"
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={submitDelete}>Enviar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <form className="form-control">
                <h1 className="display-6">Perfil de Usuario</h1>
                {Object.entries(state).map((data, index) => {
                    return (
                        <div className="input-group mb-3" key={index}>
                            <label className="input-group-text" htmlFor={`user-${data[0]}`}>{data[0]}</label>
                            <input className="form-control" id={`user-${data[0]}`} defaultValue={data[1]} readOnly/>
                            <span className="material-symbols-outlined input-group-text align-middle bg-success-subtle">check</span>
                        </div>
                    )
                })}
                <div className="input-line btn-group">
                    <NavLink className="btn btn-primary" to="/profile/update" role="button">Ir a modificar perfil</NavLink>
                    
                    <button className="btn btn-outline-primary"  type="button" data-bs-toggle="modal" data-bs-target="#relog">Eliminar cuenta</button>
                </div>
            </form>
        </div>
    )
}
