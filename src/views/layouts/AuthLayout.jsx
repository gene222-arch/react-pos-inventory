import React from 'react'
import Container from '@material-ui/core/Container'

const AuthLayout = ({children}) => 
{
    return (
        <> 
            <Container maxWidth="xl">
                {children}
            </Container>
        </>
    );
}

export default AuthLayout
