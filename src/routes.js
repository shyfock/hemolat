import React, { useState, useEffect } from "react";
import Home from './page/Home'
import Signup from './page/Signup';
import Login from './page/Login';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Patient from "./page/Patient";
import Seguimiento from "./page/Seguimiento";
import Welcome from "./page/Welcome";
import Historia from "./page/Historia";

function App() {

    return (
        <Router>
            <div>
                <section>
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/signup" element={<Signup/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/patient" element={<Patient/>} />
                        <Route path="/historia" element={<Historia/>} />
                        <Route path="/seguimiento" element={<Seguimiento />} />
                        <Route path="*"
                            element={
                                <>
                                    <h1>Ruta no encontrada - ERROR 404</h1>
                                </>
                            }
                        />
                    </Routes>
                </section>
            </div>
        </Router>
    );
}

export default App;