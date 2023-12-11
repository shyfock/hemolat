import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import 'material-symbols';
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { SearchTool } from "../functions/search";
import { getDatabase, onValue, ref } from "firebase/database";

const db = getDatabase();

const logoUrl = "https://firebasestorage.googleapis.com/v0/b/hemolat123.appspot.com/o/small-COINT.png?alt=media&token=10a85ddb-b07d-428e-908e-af51fb4fd593";
const Home = (props) => {
    //const auth = getAuth()
    //console.log(auth)
    const navigate = useNavigate();
    const [logged, setLogged] = useState(false);
    const [isProfile, setIsProfile] = useState();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // sessionStorage.removeItem('idToken')
            setLogged(false);
            navigate("/login");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log('Error signing out: ', error);
        })
    }

    useEffect(() => {
        // console.log(profile)
        onAuthStateChanged(auth,(user)=>{
            
            if (user) {
                onValue(ref(db, "users/" + user.uid), snapshot => {
                    snapshot.val()? setIsProfile('/profile') : setIsProfile('/profile/update');
                    console.log(isProfile)
                    return true
                }, 
                { 
                    onlyOnce: true
                })
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setLogged(true);
                // const uid = user.uid;
                // console.log("uid", uid)
                console.log("user is logged")
            } else if (!logged) {
                console.log("user is logged out")
            }
        });
        
    }, [isProfile, logged])

    return (
        <nav className="navbar sticky-top navbar-expand-lg" data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to={"/"}>
                    <img className="d-inline-block align-text-top" src={logoUrl} alt="Coint logo" width="60" height="auto"/>
                    <p><small>{auth.currentUser?.email.split("@")[0] || "No ha iniciado sesión"}</small></p>
                </NavLink>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menú</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Paciente
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li>
                                        <button className="dropdown-item" onClick={() => navigate('/patient/new')}>
                                            <NavLink className="nav-link" to='/patient/new' data-bs-dismiss="offcanvas">
                                                Ingresar paciente
                                            </NavLink>
                                        </button>
                                    </li>
                                    <li>
                                        <SearchTool canva={true} state={props.state}/>
                                    </li>
                                </ul>
                            </div>
                            <div className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Usuario
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li>
                                        <button className="dropdown-item" onClick={() => navigate('/login')}>
                                            <NavLink className="nav-link" to='/login' data-bs-dismiss="offcanvas" onClick={() => null}>
                                                Ingresar
                                            </NavLink>
                                        </button>
                                    </li>
                                    {
                                        logged ? 
                                        <li>
                                            <button className="dropdown-item" onClick={() => navigate('/profile')}>
                                                <NavLink className="nav-link" to={isProfile} data-bs-dismiss="offcanvas" onClick={() => null}>
                                                    Perfil
                                                </NavLink>
                                            </button>
                                        </li>
                                        :
                                        null
                                    }
                                    <li>
                                        <button className="dropdown-item" onClick={() => navigate('/signup')}>
                                            <NavLink className="nav-link" to='/signup' data-bs-dismiss="offcanvas">
                                                Registrarse
                                            </NavLink>
                                        </button>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-item" onClick={handleLogout} data-bs-dismiss="offcanvas">
                                            Cerrar sesión
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Home;