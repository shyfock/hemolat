import React, { useState } from "react";
import Home from './page/Home'
import Signup from './page/Signup';
import Login from './page/Login';
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import Patient from "./page/Patient";
import { AuthenticatedRoute } from "./routing";
import SearchPatient from './page/SearchPatient';
import NewPatient from './page/NewPatient';
import { PatientUidProvider } from './functions/search';
import { ComponentsMap } from "./page/ComponentsMap";
import OffCanva from "./component/OffCanva";
import { AuthContextProvider, useAuthState } from "./firebase";
import { getAuth } from "firebase/auth";
import { auth } from "./firebase";
import { UserProfile, UpdateProfile } from "./page/UserProfile";
import "material-symbols";
function App() {
    const [patientId, setPatientId] = useState();
    const {currentUser} = auth
    const routes = ComponentsMap;
    return (
        <Router>
            <PatientUidProvider patientId={patientId}>
                <Home state={setPatientId}/>
            </PatientUidProvider>
            <PatientUidProvider patientId={patientId}>
                {patientId && currentUser ? <OffCanva state={setPatientId}/> : null}
            </PatientUidProvider>
            <Routes>
                {routes.routes.map((data, index) => {
                    return (
                        <Route 
                            key={index}
                            path={data.path}
                            element={
                                <AuthenticatedRoute>
                                    <PatientUidProvider patientId={patientId}>
                                        {<data.component />}
                                    </PatientUidProvider>
                                </AuthenticatedRoute>
                            }
                        />
                    )
                })}
                <Route
                    path={"/"}
                    element={
                        <AuthenticatedRoute>
                            <PatientUidProvider patientId={patientId}>
                                <Patient state={setPatientId}/>
                            </PatientUidProvider>
                        </AuthenticatedRoute>
                    }
                />
                {/* <Route
                    path="/home"
                    element={
                        <AuthenticatedRoute>
                            <Welcome />
                        </AuthenticatedRoute>
                    }
                /> */}
                <Route 
                    path="/signup" 
                    element={
                        <Signup/>
                    } 
                />
                <Route 
                    path="/login" 
                    element={
                        <Login/>
                    }
                />
                <Route 
                    path="/profile"
                    element={
                        <AuthenticatedRoute>
                            <UserProfile />
                        </AuthenticatedRoute>
                    }
                />
                <Route 
                    path="/profile/update"
                    element={
                        <AuthenticatedRoute>
                            <UpdateProfile />
                        </AuthenticatedRoute>
                    }
                />
                <Route 
                    path="/patient" 
                    element={
                        <AuthenticatedRoute>
                        <PatientUidProvider patientId={patientId}>
                            <Patient state={setPatientId}/>
                        </PatientUidProvider>
                        </AuthenticatedRoute>
                    } 
                />
                <Route 
                    path='/patient/search'
                    element={
                        <AuthenticatedRoute>
                        <PatientUidProvider patientId={patientId}>
                            <SearchPatient />
                        </PatientUidProvider>
                        </AuthenticatedRoute>
                    }
                />
                <Route 
                    path='/patient/new'
                    element={
                        <AuthenticatedRoute>
                        <PatientUidProvider patientId={patientId}>
                            <NewPatient state={setPatientId} />
                        </PatientUidProvider>
                        </AuthenticatedRoute>
                    }
                />
                {/* <Route
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
                            <PatientUidProvider patientId={patientId}>
                            <Labs />
                            </PatientUidProvider>
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
                /> */}
                <Route path="*"
                    element={
                        <div className="container d-grid gap-2">
                            <div className="badge bg-primary text-wrap">
                            <h1 className="display-1">ERROR 404</h1>
                            </div>
                            <div className="badge bg-secondary text-wrap">
                            <p className="fs-1">¿Estás perdido? 
                                <span className="material-symbols-outlined">
                                    blind
                                </span>
                            </p>
                            <p className="fs-3">No te preocupes, 👇 aquí puedes volver a la app!</p>
                            
                            </div>
                            <NavLink className="btn btn-outline-warning" role="button" to="/"><span className="material-symbols-outlined align-middle">arrow_back</span>Regresar</NavLink>
                        </div>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;