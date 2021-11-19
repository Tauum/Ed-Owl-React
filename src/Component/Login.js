import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Login= () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();
    
    return (
        // removes login button when logged in
        !isAuthenticated && (
            <a onClick={() => loginWithRedirect()}>
                Login
            </a>
            
        )
    )

 
}

export default Login