import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Logout= () => {

    const { logout, isAuthenticated } = useAuth0();
    
    return (
        
        // removes logout button when logged out

        isAuthenticated && (
            <a onClick={() => logout()}>
                Logout
            </a>
        )
    )

}

export default Logout