import { NavLink } from "react-router-dom";
import { SearchTool } from "../functions/search";

const Patient = (props) => {
    return (
        <div className="container">
            <div className="container">
                <button className="btn btn-outline-primary">
                    <NavLink className="nav-link" to='/patient/new'>
                        Ingresar nueva paciente
                    </NavLink>
                </button>
                <SearchTool state={props.state}/>
            </div>
        </div>
    )
}

export default Patient;