import React, { useState, useEffect } from 'react';
import Loading from '../../../../components/Loading'
import * as Suppliers_ from '../../../../services/inventory-management/suppliers'
import { useHistory } from 'react-router-dom'
import { Card, CardContent, Grid, CardHeader, TextField, Button, Divider } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createPageUseStyles } from '../../../../assets/material-styles/styles'
import * as Helper from '../../../../utils/helpers'


const EditSupplier = ({match}) => 
{

    const classes = createPageUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const {supplierId} = match.params;
    const [supplier, setSupplier] = useState({
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
    });

    const handleSupplierOnChange = (e) => setSupplier({...supplier, [e.target.name]: e.target.value});


    const fetchSupplier = async () => 
    {
        const result = await Suppliers_.fetchAsync({
            supplier_id: supplierId
        })

        if (result.status === 'Success')
        {
            setSupplier(result.data);
            setLoading(false);  
        }
    }

    const updateSupplier = async () => 
    {
        delete supplier.created_at 
        delete supplier.updated_at

        supplier.supplier_id = supplierId;

        const result = await Suppliers_.updateAsync(supplier);

        if (result.status === 'Success')
        {
            history.push('/inventory-mngmt/suppliers')
        }
    }


    useEffect(() => {

        fetchSupplier();

        return () => {
            setSupplier({});
        }

    }, [])


    return loading 
        ? <Loading />
        : (
        <>
            <Card className={classes.cardContainer}>
                <Grid container spacing={2} justify='center'>
                    <CardHeader
                        avatar={
                            <LocalShippingIcon className={classes.headerIcon}/>
                        }
                    />
                </Grid>
                <CardContent className={classes.cardContent}>
                    <TextField
                        name="name"
                        label="Supplier name"
                        fullWidth
                        margin='dense'

                        value={supplier.name}
                        onChange={handleSupplierOnChange}
                    />
                    <TextField
                        name="contact"
                        label="Contact"
                        fullWidth
                        margin='dense'

                        value={supplier.contact}
                        onChange={handleSupplierOnChange}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        margin='dense'

                        value={supplier.email}
                        onChange={handleSupplierOnChange}
                    />
                    <TextField
                        name="phone"
                        label="Phone"
                        fullWidth
                        margin='dense'

                        value={supplier.phone}
                        onChange={handleSupplierOnChange}
                    />
                    <TextField
                        name="main_address"
                        label="main_address"
                        fullWidth
                        margin='dense'

                        value={supplier.main_address}
                        onChange={handleSupplierOnChange}
                    />
                    <TextField
                        name="website"
                        label="Website"
                        fullWidth
                        margin='dense'

                        value={supplier.website}
                        onChange={handleSupplierOnChange}
                    />
                    <Grid container justify='space-between'>
                        <Grid item xs={6} sm={6} md={5} lg={5}>
                            <TextField
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
                        <FormControl className={classes.formControl}>
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
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <TextField
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
