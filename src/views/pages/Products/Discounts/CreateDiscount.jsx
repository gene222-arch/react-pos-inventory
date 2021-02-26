import React, {useState, lazy} from 'react'
import * as Discount_ from '../../../../services/products/discounts'
import { useHistory } from 'react-router-dom'
import { 
    Card, 
    CardContent, 
    Grid, 
    TextField, 
    Button, 
    CardHeader,
    } from '@material-ui/core';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { discountUseStyles } from '../../../../assets/material-styles/styles'
import {prepareSetErrorMessages} from '../../../../utils/errorMessages'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));




const DISCOUNT_DEFAULT = {
    name: '',
    percentage: '',
};


const CreateDiscount = () => 
{
    const classes = discountUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [discount, setDiscount] = useState(DISCOUNT_DEFAULT);
    const [errorMessage, setErrorMessage] = useState(DISCOUNT_DEFAULT);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('');


    const handleCloseAlert = (event, reason) => 
    {
        if (reason === 'clickaway') {
            return;
    }

        setOpenAlert(false);
    };

    const handleOnChangeDiscount = (e) => setDiscount({...discount, [e.target.name]: e.target.value});

    const createDiscount = async () => 
    {
        setLoading(true);
        const result = await Discount_.storeAsync(discount);

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setErrorMessage(prepareSetErrorMessages(result.message, errorMessage))
        }
        else 
        {
            setAlertSeverity('success');
            setAlertMessage(result.message);
            setTimeout(() => history.push('/products/discounts'), 2000);
        }
        
        setOpenAlert(true);
        setTimeout(() =>  setLoading(false), 2000);
    }


    return (
            <>

            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />

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
                    <Grid container spacing={2} direction='column'>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={errorMessage.name !== ''}
                                helperText={errorMessage.name}
                                name="name"
                                label="Name"
                                fullWidth
                                value={discount.name}
                                onChange={handleOnChangeDiscount}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={errorMessage.percentage !== ''}
                                helperText={errorMessage.percentage}
                                name="percentage"
                                label="%"
                                fullWidth
                                value={discount.percentage}
                                onChange={handleOnChangeDiscount}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Grid container justify='flex-end' className={classes.btnContainer}>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.cancelBtn}
                            onClick={() => history.push('/products/discounts')}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.addBtn}
                            onClick={createDiscount}
                            disabled={loading}
                        >
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Card>  
        </>
    )
}

export default CreateDiscount
