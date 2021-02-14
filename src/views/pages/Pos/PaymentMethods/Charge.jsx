import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles, TextField, Button } from '@material-ui/core'
import { Mail } from '@material-ui/icons'


const paymentUseStyles = makeStyles((theme) => ({
    balanceContainer: {
        width: '100%'
    },
    balanceTxtContent: {
        textAlign: 'center'
    },
    mailIcon: {
        backgroundColor: '#FFF',
        '&:hover': {
            color: theme.palette.warning.main,
        }
    }
}))

const Charge = ({customerId}) => 
{
    const classes = paymentUseStyles();

    return (
        <>
            <Grid container spacing={4} justify='center'>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography variant="h4" color="initial" className={classes.balanceTxtContent} gutterBottom>
                        Change: P200.00
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container justify='center' alignItems='center'>
                        <Grid item xs={10} sm={10} md={10} lg={11}>
                            <TextField
                                id=""
                                label="Customer email address"  
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} lg={1}>
                            <Button variant="text" color="default" className={classes.mailIcon}>
                                <Mail />
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Button variant="contained" color="default">
                        New sale 
                    </Button>
                </Grid>
            </Grid>  
        </>
    )
}

export default Charge
