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

function App() {

    return (
        <Router>
        <Home />
        <div>
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
                            <Home />
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
            </div>
        </Router>
    );
}

export default App;