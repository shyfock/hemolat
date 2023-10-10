import { Navigate } from "react-router-dom"
import { AuthContextProvider, useAuthState } from "./firebase"
// import { auth } from "./firebase"

export const AuthenticatedRoute = ({ Children, ...props }) => {
    const { isAuthenticated } = useAuthState()
    console.log(isAuthenticated)
    return (
        <AuthContextProvider
            {...props}
            render={routeprops =>
                isAuthenticated ? {component: Children, ...routeprops} : <Navigate to={"/login"}/>
            }
        />
    )
}

export const UnauthenticatedRoute = ({ Children, ...props }) => {
    const { isAuthenticated } = useAuthState()
    console.log(isAuthenticated)
    return (
        <AuthContextProvider
            {...props}
            render={routeprops =>
                !isAuthenticated ? {component: Children, ...routeprops} : <Navigate to={"/"} />
            }
        />
    )
}