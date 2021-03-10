import React, { useState, useEffect, lazy } from 'react';
import {prepareSetErrorMessages} from '../../../../utils/errorMessages'
import * as Product from '../../../../services/products/products'
import * as Categories from '../../../../services/products/categories'
import * as Suppliers from '../../../../services/inventory-management/suppliers'
import { useHistory } from 'react-router-dom'
import { createProductUseStyles } from '../../../../assets/material-styles/styles'
import { 
    FormHelperText , 
    Card, 
    CardContent, 
    Grid, TextField, 
    Button, 
    InputLabel, 
    CardHeader,
    } from '@material-ui/core';
import {Select} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Switch from '@material-ui/core/Switch';
import productDefaultImg from '../../../../assets/storage/images/default_img/product_default_img.svg'
const AlertPopUpMessage = lazy(() => import('../../../../components/AlertMessages/AlertPopUpMessage'));


const PRODUCT_DEFAULT = {
    sku: '',
    barcode: '',
    name: '',
    image: '',
    category: '',
    sold_by: '',
    price: '',
    cost: '',
    is_for_sale: false,
};

const STOCK_DEFAULT = {
    supplier_id: '',
    in_stock: '',
    minimum_reorder_level: '',
    default_purchase_costs: '',
}

const ERR_MSG_KEY = {
    BARCODE: 'product.barcode',
    CATEGORY: 'product.category',
    SKU: 'product.sku',
    COST: 'product.cost',
    PRICE: 'product.price',
    NAME: 'product.name',
    SOLD_BY: 'product.sold_by',
    DEFAULT_PURCHASE_COSTS: 'stock.default_purchase_costs',
    IN_STOCK: 'stock.in_stock',
    MINIMUM_REORDER_LEVEL: 'stock.minimum_reorder_level',
    SUPPLIER_ID: 'stock.supplier_id',
}

const CREATE_PRODUCT_DEFAULT_ERROR_MESSAGES = 
{
    'product.barcode': '',
    'product.category': '',
    'product.sku': '',
    'product.cost': '',
    'product.price': '',
    'product.name': '',
    'product.sold_by': '',
    'stock.default_purchase_costs': '',
    'stock.in_stock': '',
    'stock.minimum_reorder_level': '',
    'stock.supplier_id': '',
}


const CreateProduct = () => 
{
    const classes = createProductUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [product, setProduct] = useState(PRODUCT_DEFAULT);
    const [stock, setStock] = useState(STOCK_DEFAULT);
    const [filePreview, setFilePreview] = useState(productDefaultImg);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [errorMessages, setErrorMessages] = useState(CREATE_PRODUCT_DEFAULT_ERROR_MESSAGES);
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


    const handleOnChangeProduct = (e) => {
        
        const {name, value, checked} = e.target;

        name !== 'is_for_sale'
            ? setProduct({...product, [name]: value})
            : setProduct({...product, [name]: checked});
    };

    const handleOnChangeStock = (e) =>  setStock({...stock, [e.target.name]: e.target.value});

    const handleOnChangeFile = async (e) => 
    {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length)
            return;
        
        const file = files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
            setFilePreview(e.target.result);
        };

        reader.readAsDataURL(file);

        const result = await Product.uploadImageAsync({
            product_image: file
        });

        setProduct({...product, image: result.data});
    }

    const fetchCategories = async () => 
    {
        const result = await Categories.fetchAllAsync();

        if (result.status === 'Success')
        {
            setCategories(result.data);
        }
    }
    
    const fetchSuppliers= async () => 
    {
        const result = await Suppliers.fetchAllAsync();

        if (result.status === 'Success')
        {
            setSuppliers(result.data);
        }
    }

    const handleCreateProduct = async (e) => 
    {
        setLoading(true);
        e.preventDefault();

        const result = await Product.storeAsync(validateData());
        
        if (result.status === 'Error')
        {
            setAlertSeverity('error');
            setErrorMessages(prepareSetErrorMessages(result.message, errorMessages));
        }
        else
        {
            setAlertSeverity('success');
            setAlertMessage(result.message)
            setTimeout(() => history.push('/products'), 2000);
        }

        setOpenAlert(true);
        setTimeout(() =>  setLoading(false), 2000);
    }

    const validateData = () => 
    {    
        for (const key in stock) 
        {
            if (!stock[key])
            {
                delete stock[key];
            }
        }

        for (const key in product) 
        {
            if (!product[key] && key !== 'is_for_sale')
            {
                delete product[key];
            }
            if (key === 'image' && product[key] === '')
            {
                delete product[key];
            }
        }

        return {
            product: product,
            stock: stock
        };
    }


    useEffect(() => 
    {
        fetchCategories();
        fetchSuppliers();

        return () => {
            setProduct(PRODUCT_DEFAULT);
            setCategories([]);
            setSuppliers([]);
            setStock(STOCK_DEFAULT);
            setErrorMessages(CREATE_PRODUCT_DEFAULT_ERROR_MESSAGES);
        }
    }, []);
   

    return (
        <>
            <AlertPopUpMessage 
                open={openAlert}
                handleClose={handleCloseAlert}
                globalMessage={alertMessage}
                severity={alertSeverity} 
            />

            <Card className={classes.createProductCard}>
                <CardHeader
                    avatar={
                        <AddBoxIcon className={classes.cardHeaderIcons} />
                    }
                    titleTypographyProps={{variant:'h4' }}
                    title="Product"
                />
                <CardContent>
                    <Grid container spacing={3} justify='space-between'>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <TextField
                                error={errorMessages[ERR_MSG_KEY.NAME] !== ''}
                                helperText={errorMessages[ERR_MSG_KEY.NAME]}
                                name='name'
                                label="Name"
                                value={product.name}
                                onChange={handleOnChangeProduct}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl 
                                className={classes.formControl}
                                error={Boolean(errorMessages[ERR_MSG_KEY.CATEGORY] !== '')}
                            >
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    name='category'
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    fullWidth
                                    value={product.category}
                                    onChange={handleOnChangeProduct}
                                >
                                    {
                                        categories.length > 0 && categories.map((category) => (
                                            <MenuItem 
                                                key={category.id}
                                                value={category.id}
                                            >{category.name}
                                            </MenuItem>
                                        ))
                                    }
                                
                                </Select>
                                <FormHelperText>{errorMessages[ERR_MSG_KEY.CATEGORY]}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControlLabel
                                control={
                                    <Switch 
                                        value={product.is_for_sale}
                                        checked={product.is_for_sale} 
                                        onChange={handleOnChangeProduct} 
                                        name="is_for_sale" 
                                        />}
                                label="Available for sale"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={10} lg={10}>
                            <FormControl 
                                component="fieldset"
                                error={Boolean(errorMessages[ERR_MSG_KEY.SOLD_BY] !== '')}
                            >
                                <FormLabel component="legend">Sold by</FormLabel>
                                <RadioGroup 
                                    aria-label="gender" 
                                    name="sold_by" 
                                    value={product.sold_by} 
                                    onChange={handleOnChangeProduct}
                                >
                                    <Grid container spacing={1}>
                                        <Grid item>
                                            <FormControlLabel 
                                                value="each" 
                                                control={<Radio />} 
                                                label="Each" 
                                            />
                                        </Grid>
                                        <Grid item>
                                            <FormControlLabel 
                                                value="volume/weight" 
                                                control={<Radio />} 
                                                label="Volume or Weight" 
                                            />
                                        </Grid>
                                    </Grid>
                                </RadioGroup>
                                <FormHelperText>{errorMessages[ERR_MSG_KEY.SOLD_BY]}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify='space-between'>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <TextField
                                error={errorMessages[ERR_MSG_KEY.PRICE] !== ''}
                                helperText={errorMessages[ERR_MSG_KEY.PRICE]}
                                name='price'
                                label="Price"
                                value={product.price}
                                onChange={handleOnChangeProduct}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                error={errorMessages[ERR_MSG_KEY.COST] !== ''}
                                helperText={errorMessages[ERR_MSG_KEY.COST]}
                                name='cost'
                                label="Cost"
                                value={product.cost}
                                onChange={handleOnChangeProduct}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify='space-between'>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                            <TextField
                                error={errorMessages[ERR_MSG_KEY.SKU] !== ''}
                                helperText={errorMessages[ERR_MSG_KEY.SKU]}
                                name='sku'
                                label="SKU"
                                fullWidth
                                value={product.sku}
                                onChange={handleOnChangeProduct}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                error={errorMessages[ERR_MSG_KEY.BARCODE] !== ''}
                                helperText={errorMessages[ERR_MSG_KEY.BARCODE]}
                                name='barcode'
                                label="Barcode"
                                fullWidth
                                value={product.barcode}
                                onChange={handleOnChangeProduct}
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
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                error={errorMessages[ERR_MSG_KEY.IN_STOCK] !== ''}
                                helperText={errorMessages[ERR_MSG_KEY.IN_STOCK]}
                                name='in_stock'
                                value={stock.in_stock}
                                onChange={handleOnChangeStock}
                                label="In stock"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                error={errorMessages[ERR_MSG_KEY.MINIMUM_REORDER_LEVEL] !== ''}
                                helperText={errorMessages[ERR_MSG_KEY.MINIMUM_REORDER_LEVEL]}
                                name='minimum_reorder_level'
                                value={stock.minimum_reorder_level}
                                onChange={handleOnChangeStock}
                                label="Low stock"
                                fullWidth
                            />
                            <FormHelperText>Item quantity at which you will be notified about low stock</FormHelperText>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} justify='space-between'>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <FormControl 
                                className={classes.formControl}
                                error={Boolean(errorMessages[ERR_MSG_KEY.SUPPLIER_ID] !== '')}
                            >
                                <InputLabel id="demo-simple-select-label">Supplier</InputLabel>
                                <Select
                                    name='supplier_id'
                                    displayEmpty
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    fullWidth
                                    value={stock.supplier_id}
                                    onChange={handleOnChangeStock}
                                >
                                        <MenuItem 
                                            key={0}
                                            value={''}
                                        >
                                            None
                                        </MenuItem>
                                    {
                                        suppliers.length > 0 && suppliers.map((supplier) => (
                                            <MenuItem 
                                                key={supplier.id}
                                                value={supplier.id}
                                            >
                                                {supplier.name}
                                            </MenuItem>
                                        ))
                                    }
                                
                                </Select>
                                <FormHelperText>{errorMessages[ERR_MSG_KEY.SUPPLIER_ID]}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                                error={errorMessages[ERR_MSG_KEY.DEFAULT_PURCHASE_COSTS] !== ''}
                                helperText={errorMessages[ERR_MSG_KEY.DEFAULT_PURCHASE_COSTS]}
                                name='default_purchase_costs'
                                value={stock.default_purchase_costs}
                                onChange={handleOnChangeStock}
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
                            <img src={filePreview} alt="" className={classes.productImagePreview}/>
                        </Grid>
                        <Grid item>
                            <input
                                accept="image/*"
                                className={classes.input}
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                type="file"
                                onChange={handleOnChangeFile}
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
                        onClick={handleCreateProduct}
                        disabled={loading}
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
        </>
    );
}

export default CreateProduct
