import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import 'material-symbols';
// import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "../firebase";

const logoUrl = "https://firebasestorage.googleapis.com/v0/b/hemolat123.appspot.com/o/Logo-COINT.png?alt=media&token=8cea6cd1-f24b-41c6-8751-0e2efd499c90&_gl=1*h2hs2f*_ga*MTg0NTA3NTIxMC4xNjk1MTY3NjIw*_ga_CW55HF8NVT*MTY5NzA2NzUyMy4xMy4xLjE2OTcwNjc5MDcuNjAuMC4w";
const Home = () => {
    const { user } = useAuthState()
    const auth = getAuth()
    const navigate = useNavigate();
    const [logged, setLogged] = useState(false);
    const handleLogout = () => {
        signOut(auth).then(() => {
            setLogged(true);
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log('Error signing out: ', error);
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth,(user)=>{
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setLogged(true);
                const uid = user.uid;
                console.log("uid", uid)
            } else if (!logged) {
                console.log("user is logged out")
            }
        });
    }, [auth, logged])

    return (
        <nav className="navbar sticky-top navbar-expand-lg" data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={"/"}>
                    <img className="d-inline-block align-text-top" src={logoUrl} alt="Coint logo" width="30" height="24"/>
                    <p>{user}</p>
                </NavLink>
                {/* <div className="input-group container-sm">
                <label className="input-group-text">Cédula</label>
                <input className="form-control" type="search" />
                <span className="input-group-text material-symbols-outlined">search</span>
                </div> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="navbar-nav">
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Paciente
                            </a>
                            <div className="dropdown-menu">
                                <NavLink className="dropdown-item" to='/patient/new'>
                                    Ingresar nuevo
                                </NavLink>
                                <NavLink className="dropdown-item" to='/patient/search'>
                                    Buscar
                                </NavLink>
                            </div>
                        </div>
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Usuario
                            </a>
                            <div className="dropdown-menu">
                                <NavLink className="dropdown-item" to='/login'>
                                    Ingresar
                                </NavLink>
                                <NavLink className="dropdown-item" to='/signup'>
                                    Registrarse
                                </NavLink>
                                <NavLink className="dropdown-item" onClick={handleLogout}>
                                    Cerrar sesión
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Home;