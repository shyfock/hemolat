import { NavLink, useNavigate } from "react-router-dom";
import { ComponentsMap } from "../page/ComponentsMap";
import 'material-symbols';
//import routes from "../routes.json";
const routes = ComponentsMap;

const OffCanva = (props) => {
    const setState = props.state
    const navigate = useNavigate()
    const handleClose = (e) => {
        e.preventDefault()
        setState()
        navigate("/patient")
    }

    return(
        <nav className="navbar navbar-dark navbar-expand-lg bg-body-primary fixed-top">
            <div className="container-fluid">
                <div className="navbar-brand">
                <span className="material-symbols-outlined aligned-middle">
                    medical_information
                </span><p>Ingresar registros</p>
                <button className="btn btn-outline-secondary" onClick={handleClose}>
                Buscar
                </button>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navMenu" aria-controls="navMenu" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="navMenu" aria-labelledby="navMenuLabel" data-bs-dismiss="offcanvas">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="navMenuLabel">Menú de opciones</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            {routes.routes.map((route, index) => {
                                return (
                                    <li className="nav-item" key={index}>
                                        <NavLink className="nav-link" to={route.path}>
                                            {route.route}
                                        </NavLink>
                                    </li>
                                )
                            })}
                            <li className="nav-item">
                                <hr className="divider"/>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleClose}>Salir</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default OffCanva;