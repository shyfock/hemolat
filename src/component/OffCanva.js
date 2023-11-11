import { NavLink } from "react-router-dom";
import routes from "../routes.json";

const OffCanva = () => {
    
    console.log(routes)
    return(
        <nav className="navbar navbar-dark bg-body-primary sticky-top">
            <div className="container-fluid">
                <p className="navbar-brand">Ingresar información</p>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Menú de opciones</h5>
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
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default OffCanva;