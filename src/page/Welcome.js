import { NavLink } from "react-router-dom"

const Welcome = () => {
    return (
        <>
            <h1>Bienvenido a HEMOLAT</h1>
            <NavLink to='/login'>Ingresar</NavLink>
        </>
    )
}

export default Welcome;