import { Navigate } from "react-router-dom"
import { AuthContextProvider, useAuthState } from "./firebase"
import Login from "./page/Login"
// import { auth } from "./firebase"

export const AuthenticatedRoute = ({ Children, ...props }) => {
    const { isAuthenticated } = useAuthState()
    console.log(isAuthenticated)
    return (
        <AuthContextProvider
            {...props}
            render={() =>
                isAuthenticated ? {component: Children, ...props} : <Login />
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
            render={() =>
                !isAuthenticated ? {component: Children, ...props} : <Navigate to={"/"} />
            }
        />
    )
}