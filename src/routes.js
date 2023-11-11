// import React, { useState, useEffect } from "react";
import Home from './page/Home'
import Signup from './page/Signup';
import Login from './page/Login';
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Patient from "./page/Patient";
import Seguimiento from "./page/Seguimiento";
import Welcome from "./page/Welcome";
import Historia from "./page/Historia";
import { AuthenticatedRoute, UnauthenticatedRoute } from "./routing";
import SearchPatient from './page/SearchPatient';
import NewPatient from './page/NewPatient';
import Hemo from './page/Hemo';
import Bleed from './page/Bleed';
import Parto from './page/Parto';
import Labs from './page/Labs';
import Egreso from './page/Egreso';

function App() {

    return (
        <Router>
        <Home />
        
            <Routes>
                <Route
                    path={"/"}
                    element={
                        <UnauthenticatedRoute>
                            <Welcome />
                        </UnauthenticatedRoute>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <AuthenticatedRoute>
                            <Welcome />
                        </AuthenticatedRoute>
                    }
                />
                <Route 
                    path="/signup" 
                    element={
                        <UnauthenticatedRoute>
                            <Signup/>
                        </UnauthenticatedRoute>
                    } 
                />
                <Route 
                    path="/login" 
                    element={
                        <UnauthenticatedRoute>
                            <Login/>
                        </UnauthenticatedRoute>
                    }
                />
                <Route 
                    path="/patient" 
                    element={
                        <AuthenticatedRoute>
                            <Patient/>
                        </AuthenticatedRoute>
                    } 
                />
                <Route 
                    path='/patient/search'
                    element={
                        <AuthenticatedRoute>
                            <SearchPatient />
                        </AuthenticatedRoute>
                    }
                />
                <Route 
                    path='/patient/new'
                    element={
                        <AuthenticatedRoute>
                            <NewPatient />
                        </AuthenticatedRoute>
                    }
                />
                <Route
                    path="/historia" 
                    element={
                        <AuthenticatedRoute>
                            <Historia/>
                        </AuthenticatedRoute>
                    } 
                />
                <Route 
                    path="/seguimiento" 
                    element={
                        <AuthenticatedRoute>
                            <Seguimiento />
                        </AuthenticatedRoute>
                    } 
                />
                <Route 
                    path="/hemo" 
                    element={
                        <AuthenticatedRoute>
                            <Hemo />
                        </AuthenticatedRoute>
                    } 
                />
                <Route 
                    path="/bleed" 
                    element={
                        <AuthenticatedRoute>
                            <Bleed />
                        </AuthenticatedRoute>
                    } 
                />
                <Route 
                    path="/parto" 
                    element={
                        <AuthenticatedRoute>
                            <Parto />
                        </AuthenticatedRoute>
                    } 
                />
                <Route 
                    path="/paraclinicos" 
                    element={
                        <AuthenticatedRoute>
                            <Labs />
                        </AuthenticatedRoute>
                    } 
                />
                <Route 
                    path="/egreso" 
                    element={
                        <AuthenticatedRoute>
                            <Egreso />
                        </AuthenticatedRoute>
                    } 
                />
                <Route path="*"
                    element={
                        <UnauthenticatedRoute>
                            <>
                                <h1>Ruta no encontrada - ERROR 404</h1>
                            </>
                        </UnauthenticatedRoute>
                    }
                />
            </Routes>
            
        </Router>
    );
}

export default App;