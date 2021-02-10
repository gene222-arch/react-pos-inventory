import React from 'react'
import { useHistory } from 'react-router-dom'
import { 
    FormHelperText , 
    Card, 
    CardContent, 
    Grid, 
    TextField, 
    Button, 
    InputLabel, 
    Avatar, 
    CardHeader,
    Divider, IconButton
    } from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { createDiscountUseStyles } from '../../../../assets/material-styles/styles'
import { MoreVert as MoreVertIcon } from '@material-ui/icons'

const CreateDiscount = () => 
{
    const classes = createDiscountUseStyles();
    const history = useHistory();

    return (
        <>
            <Card className={classes.createDiscountCard}>
                <Grid container justify='center'>
                    <Grid item>
                        <CardHeader
                            avatar={
                                <LoyaltyIcon className={classes.discountIcon}/>
                            }
                        />
                    </Grid>
                </Grid>
                <CardContent>
                    <TextField
                        id=""
                        label="Name"
                        fullWidth
                    />
                    <TextField
                        id=""
                        label="Percent Value"
                        fullWidth
                    />
                </CardContent>
                <Grid container justify='flex-end' className={classes.btnContainer}>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.cancelBtn}
                            onClick={() => history.push('/products/discounts')}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color="default" className={classes.addBtn}>
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Card>  
        </>
    )
}

export default CreateDiscount
