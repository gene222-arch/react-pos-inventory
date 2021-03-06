import React, { useState, useEffect, lazy } from 'react';
import Loading from '../../../components/Loading'
import * as Customers_ from '../../../services/customers/customers'
import { useHistory } from 'react-router-dom'
import { Card, CardContent, Grid, CardHeader, TextField, Button, Divider, FormHelperText } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import RoomIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { createPageUseStyles } from '../../../assets/material-styles/styles'
import * as Helper from '../../../utils/helpers'
import {prepareSetErrorMessages} from '../../../utils/errorMessages'
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));

const CUSTOMER_DEFAULT_PROPS = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: '',
    province: ''
};


const EditCustomer = ({match}) => {

    const classes = createPageUseStyles();
    const history = useHistory();
    const [loadingData, setLoadingData] = useState(true);
    const [loading, setLoading] = useState(false);
    const {customerId} = match.params;

    const [customer, setCustomer] = useState(CUSTOMER_DEFAULT_PROPS);
    const [errorMessages, setErrorMessages] = useState(CUSTOMER_DEFAULT_PROPS);
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


    const handleCustomerOnChange = (e) => setCustomer({...customer, [e.target.name]: e.target.value});

    const fetchCustomer = async () => 
    {
        const result = await Customers_.fetchAsync({customer_id: customerId});
    
        if (result.status === 'Success')
        {
            setCustomer(result.data);
        }
        
        setLoadingData(false);
    }

    const updateCustomer = async (e) => 
    {
        e.preventDefault();
        setLoading(true);

        delete customer.created_at
        delete customer.updated_at

        const data = {
            customer_id: customerId,
            customer_data: customer
        };

        const result = await Customers_.updateAsync(data);

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setErrorMessages(prepareSetErrorMessages(result.message, errorMessages));
        }
        else
        {
            setAlertSeverity('success');
            setAlertMessage(result.message)
            setTimeout(() => history.push('/customers'), 2000);
        }

        setOpenAlert(true);
        setTimeout(() =>  setLoading(false), 2000);
    }


    useEffect(() => {
        fetchCustomer();
        
        return () => {
            setCustomer(CUSTOMER_DEFAULT_PROPS);
        }
    }, []);

    return loadingData 
        ? <Loading />
        : (
        <>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />
            <Card className={classes.cardContainer}>
                <Grid container spacing={1} justify='center'>
                    <CardHeader
                        avatar={
                            <AccountCircleIcon className={classes.headerIcon}/>
                        }
                    />
                </Grid>
                <CardContent className={classes.cardContent}>
                <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.name)}
                                helperText={errorMessages.name}
                                name="name"
                                value={customer.name}
                                onChange={handleCustomerOnChange}
                                label="Name"
                                fullWidth
                                margin='normal'
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.email)}
                                helperText={errorMessages.email}
                                name="email"
                                value={customer.email}
                                onChange={handleCustomerOnChange}
                                label="Email"
                                fullWidth
                                margin='normal'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AlternateEmailIcon className={classes.textFieldIcons}/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.phone)}
                                helperText={errorMessages.phone}
                                name="phone"
                                value={customer.phone}
                                onChange={handleCustomerOnChange}
                                label="Phone"
                                fullWidth
                                margin='dense'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneAndroidIcon className={classes.textFieldIcons}/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.address)}
                                helperText={errorMessages.address}
                                name="address"
                                value={customer.address}
                                onChange={handleCustomerOnChange}
                                label="Address"
                                fullWidth
                                margin='normal'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <RoomIcon className={classes.textFieldIcons}/>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify='space-between'>
                        <Grid item xs={6} sm={6} md={5} lg={5}>
                            <TextField
                                error={Boolean(errorMessages.city)}
                                helperText={errorMessages.city}
                                name="city"
                                value={customer.city}
                                onChange={handleCustomerOnChange}
                                label="City"
                                fullWidth
                                margin='dense'
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={5} lg={5}>
                            <TextField
                                error={Boolean(errorMessages.postal_code)}
                                helperText={errorMessages.postal_code}
                                name="postal_code"
                                value={customer.postal_code}
                                onChange={handleCustomerOnChange}
                                label="Postal/zip code"
                                fullWidth
                                margin='dense'
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl 
                            className={classes.formControl}
                            error={Boolean(errorMessages.country)}
                        >
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                name="country"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={customer.country}
                                onChange={handleCustomerOnChange}
                                fullWidth
                                margin='dense'
                            >
                                {
                                    Helper.countryList.map((country, index) => (
                                        <MenuItem key={index} value={country}>
                                            {country}
                                        </MenuItem>
                                    ))
                                }
                                
                            </Select>
                            <FormHelperText>{
                                    Boolean(errorMessages.country)
                                        ? errorMessages.country
                                        : ''
                                }</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            error={Boolean(errorMessages.province)}
                            helperText={errorMessages.province}
                            name="province"
                            value={customer.province}
                            onChange={handleCustomerOnChange}
                            label="Region/State/Province"
                            margin='dense'
                            fullWidth
                        />
                    </Grid>
                </CardContent>
                <Divider className={classes.divider}/>
                <Grid container justify='flex-end' spacing={2}>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.cancelBtn}
                            onClick={() => history.push('/customers')}
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
                            onClick={updateCustomer}
                            disabled={loading}
                        >
                            UPDATE
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default EditCustomer
