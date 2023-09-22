import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
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
                const uid = user.uid;
                console.log("uid", uid)
            } else {
                console.log("user is logged out")
            }
        });
    }, [])

    return (
        <>
            <nav>
                <h1>
                    Módulo de Ingreso
                </h1>
                <nav>
                    <NavLink to="/patient">
                        Ingresar paciente
                    </NavLink>
                    <NavLink to="/historia">
                        | Historia
                    </NavLink>
                    <NavLink to="/seguimiento">
                        | Parto
                    </NavLink>
                    <NavLink to="/seguimiento">
                        | Hemorragia
                    </NavLink>
                    <NavLink to="/seguimiento">
                        | Transfusiones
                    </NavLink>
                    <NavLink to="/seguimiento">
                        | Seguimiento
                    </NavLink>
                    <NavLink to="/seguimiento">
                        | Egreso
                    </NavLink>
                </nav>
                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Home;