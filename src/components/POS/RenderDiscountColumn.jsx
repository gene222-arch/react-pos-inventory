import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import DiscountIcon from '@material-ui/icons/Loyalty';
import {red} from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    discountIcon: {
        color: red[500]
    }
}));

const RenderDiscountColumn = ({params}) => 
{
    const classes = useStyles();

    return (
        <>
            <Grid container spacing={1} alignItems='center'>
                <Grid item>
                    {params.value}
                </Grid>
                <Grid item>
                    { 
                        params.row.discounts !== 0.00 
                            ? <DiscountIcon className={classes.discountIcon}/>
                            : ''
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default RenderDiscountColumn
