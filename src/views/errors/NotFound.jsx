import React from 'react'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import _404 from '../../assets/storage/images/Errors/_404.svg'
import {notFoundUseStyles} from '../../assets/material-styles/styles'


const NotFound = () => 
{
    const classes = notFoundUseStyles();
    const history = useHistory();

    const errorMessages = 
    [
        'The link you clicked or looking for maybe broken or',
        'the page may have been remove.',
        'You can try the search box again if you feel like it or',
    ];

    const onClickGoBack = () => {
        history.goBack();
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} justify='center' className={ classes.root }>
                <Grid item xs={ 12 } md={ 12 } lg={ 4 }>
                    <Grid container direction='column' alignItems='center' spacing={5}>
                        <Grid item xs={ 12 } md={ 12 } lg={ 12 }>

                            <Typography 
                                variant="subtitle2" color="initial" 
                                align='left' 
                                className={ classes.typography }
                            >
                                { 'Whoops,' }
                            </Typography>

                            <Typography 
                                component='div' 
                                variant="subtitle1" 
                                color="initial" 
                                align='left' 
                                className={ classes.typography }
                            >
                                { 'that Page' }
                            </Typography>

                            <Typography 
                                component='div' 
                                variant="subtitle1" 
                                color="initial" 
                                align='left' 
                                className={ classes.typography }
                            >
                                { 'is Gone.' }
                            </Typography>

                            {
                                errorMessages.map((errorMessage, index) => (
                                    <Typography
                                        key={index} 
                                        component='p' 
                                        color="initial" 
                                        align='left' 
                                        className={ classes.errorMessage }
                                    >
                                        { errorMessage }
                                    </Typography>
                                ))
                            }

                            <Typography 
                                onClick={ onClickGoBack } 
                                component='p' 
                                color="initial"     
                                align='left' 
                                className={ classes.errorMessage }
                            >
                                <Link to='/dashboard'>
                                    { 'go back.' }
                                </Link>
                            </Typography>
                        </Grid>

                        <Grid item xs={ 12 } md={ 12 } lg={ 12 }>
                            <TextField
                                className={classes.margin}
                                id="input-with-icon-textfield"
                                label="Search..."
                                InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={ 12 } md={ 12 } lg={ 8 }>   
                    <img src={ _404 } alt='Not found' className={classes.notFoundImg} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default NotFound