import React, { useState, useEffect, lazy } from 'react';
import Loading from '../../../../components/Loading'
import * as Suppliers_ from '../../../../services/inventory-management/suppliers'
import { useHistory } from 'react-router-dom'
import { Card, CardContent, Grid, CardHeader, TextField, Button, Divider, FormHelperText } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createPageUseStyles } from '../../../../assets/material-styles/styles'
import * as Helper from '../../../../utils/helpers'
import {prepareSetErrorMessages} from '../../../../utils/errorMessages'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));


const SUPPLIER_DEFAULT_PROPS = {
    name: '',
    contact: '',
    email: '',
    phone: '',
    main_address: '',
    website: '',
    city: '',
    zipcode: '',
    country: '',
    province: '',
};


const EditSupplier = ({match}) => 
{

    const classes = createPageUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const {supplierId} = match.params;
    const [supplier, setSupplier] = useState(SUPPLIER_DEFAULT_PROPS);
    const [errorMessages, setErrorMessages] = useState(SUPPLIER_DEFAULT_PROPS);
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

    const handleSupplierOnChange = (e) => setSupplier({...supplier, [e.target.name]: e.target.value});

    const fetchSupplier = async () => 
    {
        const result = await Suppliers_.fetchAsync({
            supplier_id: supplierId
        })

        if (result.status === 'Success')
        {
            setSupplier(result.data);
            setLoadingData(false);  
        }
    }

    const updateSupplier = async () => 
    {
        setLoading(true);
        delete supplier.created_at 
        delete supplier.updated_at
        supplier.supplier_id = supplierId;

        const result = await Suppliers_.updateAsync(supplier);

        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setErrorMessages(prepareSetErrorMessages(result.message, errorMessages));
        }
        else
        {
            setAlertSeverity('success');
            setAlertMessage(result.message)
            setTimeout(() => history.push('/inventory-mngmt/suppliers'), 2000);
        }

        setOpenAlert(true);
        setTimeout(() =>  setLoading(false), 2000);
    }


    useEffect(() => {

        fetchSupplier();

        return () => {
            setSupplier({});
        }

    }, [])


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
                <Grid container spacing={2} justify='center'>
                    <CardHeader
                        avatar={
                            <LocalShippingIcon className={classes.headerIcon}/>
                        }
                    />
                </Grid>
                <CardContent className={classes.cardContent}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.name)}
                                helperText={errorMessages.name}
                                name="name"
                                label="Supplier name"
                                fullWidth
                                margin='dense'
                                value={supplier.name}
                                onChange={handleSupplierOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.contact)}
                                helperText={errorMessages.contact}
                                name="contact"
                                label="Contact"
                                fullWidth
                                margin='dense'
                                value={supplier.contact}
                                onChange={handleSupplierOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.email)}
                                helperText={errorMessages.email}
                                name="email"
                                label="Email"
                                fullWidth
                                margin='dense'
                                value={supplier.email}
                                onChange={handleSupplierOnChange}
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.phone)}
                                helperText={errorMessages.phone}
                                name="phone"
                                label="Phone"
                                fullWidth
                                margin='dense'
                                value={supplier.phone}
                                onChange={handleSupplierOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.main_address)}
                                helperText={errorMessages.main_address}
                                name="main_address"
                                label="Address"
                                fullWidth
                                margin='dense'
                                value={supplier.main_address}
                                onChange={handleSupplierOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                error={Boolean(errorMessages.website)}
                                helperText={errorMessages.website}
                                name="website"
                                label="Website"
                                fullWidth
                                margin='dense'
                                value={supplier.website}
                                onChange={handleSupplierOnChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify='space-between'>
                        <Grid item xs={6} sm={6} md={5} lg={5}>
                            <TextField
                                error={Boolean(errorMessages.city)}
                                helperText={errorMessages.city}
                                name="city"
                                label="City"
                                fullWidth
                                margin='dense'
                                value={supplier.city}
                                onChange={handleSupplierOnChange}
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={5} lg={5}>
                            <TextField
                                error={Boolean(errorMessages.zipcode)}
                                helperText={errorMessages.zipcode}
                                name="zipcode"
                                label="Postal/zip code"
                                fullWidth
                                margin='dense'
                                value={supplier.zipcode}
                                onChange={handleSupplierOnChange}
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
                                value={supplier.country}
                                onChange={handleSupplierOnChange}
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
                            label="Region/State/Province"
                            margin='dense'
                            fullWidth
                            value={supplier.province}
                            onChange={handleSupplierOnChange}
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
                            onClick={() => history.push('/inventory-mngmt/suppliers')}
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
                            onClick={updateSupplier}
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

export default EditSupplier
