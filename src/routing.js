import { Navigate } from "react-router-dom"
import { AuthContextProvider } from "./firebase"
import { auth } from "./firebase"

export const AuthenticatedRoute = ({ children, ...props }) => {
    const {currentUser} = auth
    const isAuthenticated = currentUser !== null 
    // console.log(currentUser)
    // console.log(isAuthenticated)
    return (
            <>
                {
                    isAuthenticated ? 
                        <AuthContextProvider {...props}>
                            {children}
                        </AuthContextProvider> 
                    : 
                        <Navigate to={"/login"} />}
            </>
        // <AuthContextProvider
        //     {...props}
        //     render={(routeProps) =>
        //         isAuthenticated ? {component: Children, ...routeProps} : <Login />
        //     }
        // />
    )
}

// export const UnauthenticatedRoute = ({ children, ...props }) => {
//     const { isAuthenticated } = useAuthState()
//     console.log(isAuthenticated)
//     return (
//         <>
//             {!isAuthenticated ?
//                     <AuthContextProvider {...props}>
//                         {children}
//                     </AuthContextProvider> 
//                 : 
//                     <Navigate to={"/"} />}</>
//         // <AuthContextProvider
//         //     {...props}
//         //     render={(routeProps) =>
//         //         !isAuthenticated ? {component: Children, ...routeProps} : <Navigate to={"/"} />
//         //     }
//         // />
//     )
// }