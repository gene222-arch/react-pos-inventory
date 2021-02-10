import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { createProductUseStyles } from '../../../../assets/material-styles/styles'
import { 
    FormHelperText , 
    Card, 
    CardContent, 
    Grid, TextField, 
    Button, 
    InputLabel, 
    Avatar, 
    CardHeader,
    Divider
    } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddBoxIcon from '@material-ui/icons/AddBox';
import productDefaultImg from '../../../../assets/storage/images/default_img/product_default_img.svg'


const CreateProduct = () => 
{
    const classes = createProductUseStyles();
    const history = useHistory();
    const [soldBy, setSoldBy] = React.useState('');
    const [isForSale, setIsForSale] = React.useState(false);

    const handleForSaleChange = (event) => {
      setIsForSale(event.target.checked);
    };
    const handleChange = (event) => {
      setSoldBy(event.target.value);
    };
   
    return (
        <>
            <Card className={classes.createProductCard}>
                <CardHeader
                    avatar={
                        <AddBoxIcon className={classes.cardHeaderIcons} />
                    }
                    titleTypographyProps={{variant:'h4' }}
                    title="Product"
                    subheader=""
                />
                <CardContent>
                    <Grid container spacing={3} justify='space-between'>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <TextField
                                id=""
                                label="Name"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    fullWidth
                                >
                                    <MenuItem value="">Supplier</MenuItem>
                                    <MenuItem value={10}>Robots</MenuItem>
                                    <MenuItem value={20}>MOA</MenuItem>
                                    <MenuItem value={30}>CCC</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={isForSale} 
                                        onChange={handleForSaleChange} 
                                        name="isForSale" 
                                    />}
                                label="This item is available for sale"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={10} lg={10}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Sold by</FormLabel>
                                <RadioGroup aria-label="gender" name="gender1" value={soldBy} onChange={handleChange}>
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <FormControlLabel value="Each" control={<Radio />} label="Each" />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel value="Volume/Weight" control={<Radio />} label="Volume or Weight" />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify='space-between'>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <TextField
                                id=""
                                label="Price"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                id=""
                                label="Cost"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify='space-between'>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <TextField
                                id=""
                                label="SKU"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                id=""
                                label="Barcode"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card className={classes.createProductCard}>
                <CardHeader
                    avatar={
                        <ListAltIcon className={classes.cardHeaderIcons}/>
                    }
                    titleTypographyProps={{variant:'h4' }}
                    title="Inventory"
                    subheader=""

                />
                <CardContent>
                    <Grid container spacing={3} justify='space-between'>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <TextField
                                id=""
                                label="In stock"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                id=""
                                label="Low stock"
                                fullWidth
                            />
                            <FormHelperText>Item quantity at which you will be notified about low stock</FormHelperText>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify='space-between'>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <TextField
                                id=""
                                label="Primary supplier"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                id=""
                                label="Default purchase cost"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card className={classes.createProductCard}>
                <CardHeader
                    titleTypographyProps={{variant:'h4' }}
                    title="Representation on POS"
                    subheader=""
                />
                <CardContent>
                    <Grid container spacing={3} alignItems='center' justify='flex-start' direction='column'>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <img src={productDefaultImg} alt="" className={classes.productImagePreview}/>
                        </Grid>
                        <Grid item>
                            <input
                                accept="image/*"
                                className={classes.input}
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                            />
                                <label htmlFor="raised-button-file">
                                    <Button 
                                        variant="contained" 
                                        color='primary' 
                                        component="span" 
                                        className={classes.button}
                                    >
                                        <AddAPhotoIcon />
                                    </Button>
                                </label> 
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>  

            <Grid container justify='flex-end' className={classes.btnContainer}>
                <Grid item>
                    <Button 
                        variant='contained' 
                        color="default" 
                        className={classes.cancelBtn}
                        onClick={() => history.push('/products')}
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
        </>
    );
}

export default CreateProduct
