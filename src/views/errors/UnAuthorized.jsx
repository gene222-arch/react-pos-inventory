import React from 'react'
import {useHistory} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import _403 from '../../assets/storage/images/Errors/_403.svg'
import { makeStyles, Grid, Card, CardContent, Button } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const useStyles = makeStyles((theme) => ({
    unauthorizedImage: {
        width: '100%',
        height: '95vh'
    },
    unauthorizedMessage: {
        width: '100%'
    },
    errorIconContainer: {
        textAlign: 'center'
    },
    errorIcon: {
        color: theme.palette.error.main,
        fontSize: '5rem',
    },
    goBackIcon: {
        '&:hover': {
            cursor: 'pointer',
            opacity: '.5',
            transform: 'scale(1.1)'
        }
    }
}));

const UnAuthorized = () => 
{
    const classes = useStyles();
    const history = useHistory();

    return (
        <Grid container spacing={1} alignItems='center'>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <Card>
                   <CardContent className={classes.unauthorizedMessage}>
                       <Typography variant="h1" color="initial" className={classes.errorIconContainer}>
                            <ErrorIcon className={classes.errorIcon}/>
                       </Typography>
                        <Typography variant="h1" color="initial" gutterBottom>
                            Unauthorized
                        </Typography>
                        <Typography variant="subtitle1" color="initial">
                            The server could not verify that you are authorize to access
                        </Typography>
                        <Typography variant="subtitle1" color="initial" gutterBottom>
                            the document requested.
                        </Typography>
                        <Typography variant="h1" color="initial">
                            <ArrowBackIosIcon
                                className={classes.goBackIcon} 
                                onClick={() => history.goBack()}
                            />
                        </Typography>
                   </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
                <img src={_403} alt="" className={classes.unauthorizedImage}/>
            </Grid>
        </Grid>
    )
}

export default UnAuthorized
