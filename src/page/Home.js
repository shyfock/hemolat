import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "../firebase";


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
        <>
            <div className="main">
                <nav>
                    <NavLink className={"link"} to={"/"}>
                        <div>
                            <h1>Bienvenido {user?.email}</h1>
                            <img eager lazy src="/public/docs/assets/images/Small-COINT.png" alt="Coint"/>
                        </div>
                    </NavLink>
                    <NavLink className={"link"} to="/patient">
                        Ingresar paciente
                    </NavLink>
                    <NavLink className={"link"} to="/historia">
                        Historia
                    </NavLink>
                    <NavLink className={"link"} to="/seguimiento">
                        Parto
                    </NavLink>
                    <NavLink className={"link"} to="/seguimiento">
                        Hemorragia
                    </NavLink>
                    <NavLink className={"link"} to="/seguimiento">
                        Transfusiones
                    </NavLink>
                    <NavLink className={"link"} to="/seguimiento">
                        Seguimiento
                    </NavLink>
                    <NavLink className={"link"} to="/seguimiento">
                        Egreso
                    </NavLink>
                </nav>
                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Home;