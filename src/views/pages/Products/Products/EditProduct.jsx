import React, { useState, useEffect } from 'react';
import {prepareSetErrorMessages} from '../../../../utils/errorMessages'
import Loading from '../../../../components/Loading'
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
import Checkbox from '@material-ui/core/Checkbox';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddBoxIcon from '@material-ui/icons/AddBox';
import productDefaultImg from '../../../../assets/storage/images/default_img/product_default_img.svg'


const PRODUCT_DEFAULT = {
    sku: '',
    barcode: '',
    name: '',
    category: '',
    sold_by: '',
    price: '',
    cost: '',
};

const STOCK_DEFAULT = {
    supplier_id: '',
    in_stock: '',
    minimum_reorder_level: '',
    default_purchase_costs: '',
}

const ERR_MSG_KEY = {
    PRODUCT_ID: 'product.data.product_id',
    BARCODE: 'product.data.barcode',
    CATEGORY: 'product.data.category',
    SKU: 'product.data.sku',
    COST: 'product.data.cost',
    PRICE: 'product.data.price',
    NAME: 'product.data.name',
    SOLD_BY: 'product.data.sold_by',
    DEFAULT_PURCHASE_COSTS: 'stock.data.default_purchase_costs',
    IN_STOCK: 'stock.data.in_stock',
    MINIMUM_REORDER_LEVEL: 'stock.data.minimum_reorder_level',
    SUPPLIER_ID: 'stock.data.supplier_id',
}

const EDIT_PRODUCT_DEFAULT_ERROR_MESSAGES = 
{
    'product.product_id': '',
    'product.data.barcode': '',
    'product.data.category': '',
    'product.data.sku': '',
    'product.data.cost': '',
    'product.data.price': '',
    'product.data.name': '',
    'product.data.sold_by': '',
    'stock.data.default_purchase_costs': '',
    'stock.data.in_stock': '',
    'stock.data.minimum_reorder_level': '',
    'stock.data.supplier_id': '',
}

const EditProduct = ({match}) => 
{
    const classes = createProductUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const {productId} = match.params;
    
    const [product, setProduct] = useState(PRODUCT_DEFAULT);
    const [stock, setStock] = useState(STOCK_DEFAULT);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [errorMessages, setErrorMessages] = useState(EDIT_PRODUCT_DEFAULT_ERROR_MESSAGES)

    const handleOnChangeProduct = (e) => setProduct({...product, [e.target.name]: e.target.value});
    const handleOnChangeStock = (e) =>  setStock({...stock, [e.target.name]: e.target.value});


    const fetchProduct = async () => 
    {
        const result = await Product.fetchAsync({ product_id: productId });

        if (result.status === 'Success')
        {
            setProduct(result.data);
            setStock(result.data.stock);
            setLoading(false);
        }
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

    const handleUpdateProduct = async (e) => 
    {
        e.preventDefault();

        const result = await Product.updateAsync(validatedData());
        
        if (result.status === 'Error')
        {
            setErrorMessages(prepareSetErrorMessages(result.message, errorMessages));
        }
        else
        {
            history.push('/products');
        }
    }


    const validatedData = () => 
    {
        return {
            product: {
                product_id: productId,
                data: {
                    sku: product.sku,
                    barcode: product.barcode,
                    name: product.name,
                    category: product.category,
                    sold_by: product.sold_by,
                    price: product.price,
                    cost: product.cost,
                }
            },
            stock: {
                data: {
                    supplier_id: stock.supplier_id,
                    in_stock: stock.in_stock,
                    stock_in: stock.stock_in,
                    stock_out: stock.stock_out,
                    minimum_reorder_level: stock.minimum_reorder_level,
                    default_purchase_costs: stock.default_purchase_costs,
                }
            }
        };
    }


    useEffect(() => 
    {
        fetchProduct();
        fetchCategories();
        fetchSuppliers();

        return () => {
            setProduct(PRODUCT_DEFAULT);
            setStock(STOCK_DEFAULT);
            setCategories([]);
            setSuppliers([]);
        }
    }, []);
   
    return loading 
    ? 
        <Loading />
    :
        (
            <>

                <Card className={classes.createProductCard}>
                    <CardHeader
                        avatar={
                            <AddBoxIcon className={classes.cardHeaderIcons} />
                        }
                        titleTypographyProps={{variant:'h4' }}
                        title="Product"
                        subheader={`Product id #${ productId }`}
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
                                            categories.map((category) => (
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
                                        {
                                            suppliers.map((supplier) => (
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
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.addBtn}
                            onClick={handleUpdateProduct}
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>
            
            </>
        );
}

export default EditProduct
