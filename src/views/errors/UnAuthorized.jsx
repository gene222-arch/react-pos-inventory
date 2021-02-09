import React from 'react'
import Typography from '@material-ui/core/Typography'

const UnAuthorized = () => 
{
    return (
        <div>
            <Typography variant="h3" color="initial">
                You don't have the right role
            </Typography>
        </div>
    )
}

export default UnAuthorized
