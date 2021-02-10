import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { Card, CardContent, Grid, CardHeader, TextField, Button, Divider } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createPageUseStyles } from '../../../../assets/material-styles/styles'
import * as Helper from '../../../../utils/helpers'


const CreateSupplier = () => {

    const classes = createPageUseStyles();
    const history = useHistory();
    const [country, setCountry] = useState('');

    const handleChange = (event) => {
      setCountry(event.target.value);
    };
    return (
        <>
            <Card className={classes.cardContainer}>
                <Grid container spacing={1} justify='center'>
                    <CardHeader
                        avatar={
                            <LocalShippingIcon className={classes.headerIcon}/>
                        }
                    />
                </Grid>
                <CardContent className={classes.cardContent}>
                    <TextField
                        id=""
                        label="Supplier name"
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        id=""
                        label="Contact"
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        id=""
                        label="Email"
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        id=""
                        label="Phone"
                        fullWidth
                        margin='normal'
                    />
                    <TextField
                        id=""
                        label="Address"
                        fullWidth
                        margin='normal'
                    />
                    <Grid container justify='space-between'>
                        <Grid item xs={6} sm={6} md={5} lg={5}>
                            <TextField
                                id=""
                                label="City"
                                fullWidth
                                margin='normal'
                            />
                        </Grid>
                        <Grid item xs={6} sm={6} md={5} lg={5}>
                            <TextField
                                id=""
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
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={country}
                                onChange={handleChange}
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
                            id=""
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
                            onClick={() => history.push('/inventory-mngmt/suppliers')}
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
    );
}

export default CreateSupplier
