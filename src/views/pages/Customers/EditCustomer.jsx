import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading'
import * as Customers_ from '../../../services/customers/customers'
import { useHistory } from 'react-router-dom'
import { Card, CardContent, Grid, CardHeader, TextField, Button, Divider } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
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


const DEFAULT = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: '',
    province: ''
};



const EditCustomer = ({match}) => 
{
    
    const classes = createPageUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(true);


    const customerId = match.params.customerId;
    const [customer, setCustomer] = useState(DEFAULT);

    const handleCustomerOnChange = (e) => setCustomer({...customer, [e.target.name]: e.target.value});


    const fetchCustomer = async () => 
    {
        const result = await Customers_.fetchAsync({customer_id: customerId});

        if (result.status === 'Success')
        {
            setCustomer(result.data);
            setLoading(false);
        }
    }

    const EditCustomer = async () => 
    {
        delete customer.created_at;
        delete customer.updated_at;

        const data = {
            customer_id: customerId,
            customer_data: customer
        };

        console.log(data);
        const result = await Customers_.updateAsync(data);

        if (result.status === 'Success')
        {
            history.push('/customers');
        }
    }


    useEffect(() => 
    {
        fetchCustomer();

        return () => {
            setCustomer(DEFAULT)
        }
    }, [])

    return loading 
        ? <Loading />
        : (
        <>
            <Card className={classes.cardContainer}>
                <Grid container spacing={1} justify='center'>
                    <CardHeader
                        avatar={
                            <AccountCircleIcon className={classes.headerIcon}/>
                        }
                    />
                </Grid>
                <CardContent className={classes.cardContent}>
                    <TextField
                        name="name"
                        value={customer.name}
                        onChange={handleCustomerOnChange}
                        label="Name"
                        fullWidth
                        margin='normal'
                    />
                    <TextField
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
                    <TextField
                        name="phone"
                        value={customer.phone}
                        onChange={handleCustomerOnChange}
                        label="Phone"
                        fullWidth
                        margin='normal'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneAndroidIcon className={classes.textFieldIcons}/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
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
                    <Grid container justify='space-between'>
                        <Grid item xs={6} sm={6} md={5} lg={5}>
                            <TextField
                                name="city"
                                value={customer.city}
                                onChange={handleCustomerOnChange}
                                label="City"
                                fullWidth
                                margin='normal'
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={5} lg={5}>
                            <TextField
                                name="postal_code"
                                value={customer.postal_code}
                                onChange={handleCustomerOnChange}
                                label="Postal/zip code"
                                fullWidth
                                margin='normal'
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                            <Select
                                name="country"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={customer.country}
                                onChange={handleCustomerOnChange}
                                fullWidth
                                margin='normal'
                            >
                                {
                                    Helper.countryList.map((country, index) => (
                                        <MenuItem key={index} value={country}>
                                            {country}
                                        </MenuItem>
                                    ))
                                }
                                
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
                            name="province"
                            value={customer.province}
                            onChange={handleCustomerOnChange}
                            label="Region/State/Province"
                            margin='normal'
                            fullWidth
                        />
                    </Grid>
                </CardContent>
                <Divider className={classes.divider}/>
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.cancelBtn}
                            onClick={() => history.push('/customers')}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.addBtn}
                            onClick={EditCustomer}
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default EditCustomer
