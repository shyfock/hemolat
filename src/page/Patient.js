import { Link } from "react-router-dom";

const Patient = () => {
    return (
        <>
            <Link to='/patient/new'>Ingresar nuevo</Link>
            <Link to='/patient/search'>Buscar existente</Link>
        </>
    )
}

export default Patient;