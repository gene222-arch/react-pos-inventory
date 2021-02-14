import React, {useState} from 'react'
import RenderDiscountColumn from '../../../components/POS/RenderDiscountColumn'
import Grid from '@material-ui/core/Grid'
import { DataGrid } from '@material-ui/data-grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import {TextField, makeStyles, Card, CardContent, CardActionArea, Divider, Button} from '@material-ui/core';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem, Typography,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { green, orange, red } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';
import DeleteIcon from '@material-ui/icons/Delete';
import DiscountIcon from '@material-ui/icons/Loyalty';
import IncrementQuantityIcon from '@material-ui/icons/ExposurePlus1';
import DecrementQuantityIcon from '@material-ui/icons/ExposureNeg1';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    itemListContainer: {
        height: '64vh'
    },
    itemListOptionsContainer: {
        width: '100%'
    },
    itemListOptionsBtn: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        fontWeight: '600'
    },
    itemActionArea: {
        color: '#FFF',
        padding: theme.spacing(0, 1),
        backgroundColor: fade('#2c2c2c', .5)
    },
    discountIcon: {
        color: red[500]
    },
    formControl: {
        width: '100%',
        marginBottom: theme.spacing(1)
    },
    selectLabel: {
        padding: theme.spacing(0, 1)
    },
    orderDetails: {
        padding: theme.spacing(0, .5)
    },
    dataGrid: {
        backgroundColor: '#FFF',
    },
    dataGridContainer: {
        width: '100%',
        height: '43vh'
    },
    items: {
        backgroundColor: '#dddddd'
    },
    chargeBtn: {
        margin: theme.spacing(.3, 0),
        backgroundColor: '#4caf50',
        color: '#FFF',
        '&:hover': {
            backgroundColor: green[400]
        },
        width: '100%'
    },
    deleteBtnContainer: {
        padding: theme.spacing(0, 1, .5, 1),
        margin: theme.spacing(0, .5, .5)
    },
    deleteBtn: {
        margin: theme.spacing(.3, 0),
        backgroundColor: '#FFF',
        color: '#2c2c2c',
        '&:hover': {
            color: red[400],
            backgroundColor: '#FFF'
        },
        width: '100%'
    },

    productDetailDialog: {
        minWidth: '70%',
        height: '100vh',
        padding: theme.spacing(2)
    },
    modifyOrderContainerDialog: {
        marginTop: '1.5rem'
    },
    productDetailDialogActions: {
        borderTop: '.5px solid #999999'
    },
    decrementBtn: {
        '&:hover': {
            color: '#FFF',
            backgroundColor: red[400]
        }
    },
    incrementBtn: {
        '&:hover': {
            color: '#FFF',
            backgroundColor: green[400]
        }
    },
    saveBtn: {
        color: '#FFF',
        backgroundColor: green[400],
        '&:hover': {
            color: '#FFF',
            backgroundColor: green[300]
        }
    },
    closeBtn: {
        color: '#2c2c2c',
        backgroundColor: '#FFF',
        '&:hover': {
            color: '#FFF',
            backgroundColor: red[400]
        }
    }

}));


const Pos = () => 
{
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [productName, setProductName] = useState(0);
    const [orderDetails, setOrderDetails] = useState([
        { id: 1, pos_details_id: 1, product_description: 'Bag', quantity: 1, price: 12, discounts: 0.00 },
        { id: 2, pos_details_id: 2, product_description: 'Shoes', quantity: 1, price: 12, discounts: 0.00 },
        { id: 3, pos_details_id: 3, product_description: 'Wew', quantity: 1, price: 12, discounts: 0.00 },
        { id: 4, pos_details_id: 4, product_description: 'Shoes', quantity: 1, price: 12, discounts: 1.00 },
    ]);

    const [rowIds, setRowIds] = useState([]);

    const columns = [
        { 
            field: 'pos_details_id', 
            hide: true
        },
        { 
            field: 'product_description', 
            headerName: 'Item', 
            width: 150
        },
        { field: 'quantity', headerName: 'Qty', width: 80 },
        { 
            field: 'price', 
            headerName: 'Price', 
            width: 130,
            renderCell: (params) => <RenderDiscountColumn params={params} />
        },
        { 
            field: 'discounts', 
            hide: true
        },

    ];

    /**
     * Dialog
     */
    const handleClickOpen = (object) => {
        setOpen(true);
        setProductName(object.product_description);
    };

    const handleClose = () => {
        setOpen(false);
    };

    /**
     * 
     */

    const handleAddToCart = (productId) => 
    {

    }

    const handleOnDeleteProduct = (posDetailIds) => 
    {
        setOrderDetails(orderDetails.filter((order, index) => {
            return parseInt(posDetailIds[index]) !== order.pos_details_id;
        }));
    }

    const handleOnSelectionChange = (rowIds) =>  setRowIds(rowIds);


    return (
        <>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title"
                classes={{ paper: classes.productDetailDialog }}
                disableBackdropClick={true}
            >
                <DialogTitle id="form-dialog-title">
                    <Typography variant="h4" color="initial">{productName}</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Divider />
                    </DialogContentText>
                    <Grid container spacing={4} justify='center' className={classes.modifyOrderContainerDialog}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="subtitle1" color="initial">
                                <strong>Quantity</strong>
                            </Typography>
                            <Grid container spacing={3} alignItems='flex-end' justify='flex-start'>
                                <Grid item>
                                    <Button variant="contained" color="primary" className={classes.decrementBtn}>
                                        <DecrementQuantityIcon/>
                                    </Button>
                                </Grid>
                                <Grid item xs={8} sm={8} md={9} lg={9}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        value={1}
                                        type="email"
                                        fullWidth
                                        inputProps={{min: 0, style: { textAlign: 'center' }}}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" color="primary" className={classes.incrementBtn}>
                                        <IncrementQuantityIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="subtitle1" color="initial">
                                <strong>Discounts</strong>
                            </Typography>
                            <Grid container spacing={1} alignItems='flex-end' justify='flex-start'>
                                <Grid item xs={8} sm={8} md={4} lg={4}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel 
                                            id="demo-simple-select-label" 
                                            className={classes.selectLabel}>
                                                Discounts
                                        </InputLabel>
                                        <Select
                                            className={classes.selectEmpty}
                                            displayEmpty
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            fullWidth
                                        >
                                            <MenuItem value="">Supplier</MenuItem>
                                            <MenuItem value={1}>10%</MenuItem>
                                            <MenuItem value={2}>20%</MenuItem>
                                            <MenuItem value={3}>30%</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Typography variant="subtitle1" color="initial">
                                <strong>VAT</strong>
                            </Typography>
                            <Grid container spacing={1} alignItems='flex-end' justify='flex-start'>
                                <Grid item xs={8} sm={8} md={4} lg={4}>
                                    <FormControlLabel
                                        control={
                                            <Switch 
                                                checked={true} 
                                                name="checkedA" 
                                                color='primary'
                                        />
                                        }
                                        label="12%"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className={classes.productDetailDialogActions}>
                    <Button 
                        onClick={handleClose} 
                        color="default" 
                        className={classes.closeBtn}
                    >
                        <CloseIcon />
                    </Button>
                    <Button 
                        variant='contained' 
                        onClick={handleClose} 
                        color="default" 
                        className={classes.saveBtn}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Grid container>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={10} lg={10}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <TextField
                                        variant='filled'
                                        id="input-with-icon-textfield"
                                        label="Find item"
                                        fullWidth
                                        InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <YoutubeSearchedForIcon />
                                            </InputAdornment>
                                        ),
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel 
                                            id="demo-simple-select-label" 
                                            className={classes.selectLabel}>
                                                All items
                                        </InputLabel>
                                        <Select
                                            variant='filled'
                                            className={classes.selectEmpty}
                                            displayEmpty
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
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <Card className={classes.itemListContainer}>
                                <CardContent>
                                    <Grid container spacing={1}>
                                        {[1, 2, 3, 4, 5].map((data, index) => (
                                            <Grid key={index} item xs={6} sm={6} md={3} lg={3}>
                                                <Card onClick={() => handleAddToCart(index)}>
                                                    <CardContent>

                                                    </CardContent>
                                                    <CardActionArea className={classes.itemActionArea}>
                                                        <Typography variant="subtitle2" color="initial">
                                                            Item name
                                                        </Typography>
                                                    </CardActionArea>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                </CardContent>
                            </Card>          
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                            <Card>
                                <CardContent>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            <Button 
                                                size="contained" 
                                                color="default" 
                                                className={classes.itemListOptionsBtn}
                                            >
                                                Discount <DiscountIcon className={classes.discountIcon}/>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3} lg={3}>
                                            {
                                                orderDetails.length > 0 
                                                    ? (
                                                        <Button 
                                                            size="contained" 
                                                            color="default" 
                                                            className={classes.itemListOptionsBtn}
                                                        >
                                                            Cancel Order
                                                        </Button>
                                                    )
                                                    : ''
                                            }
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} className={classes.orderDetails}>
                    <Grid container>
                    {/* Customer selection */}
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <FormControl className={classes.formControl}>
                                <InputLabel 
                                    id="demo-simple-select-label" 
                                    className={classes.selectLabel}>
                                        Customer
                                </InputLabel>
                                <Select
                                    variant='filled'
                                    className={classes.selectEmpty}
                                    displayEmpty
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
                    </Grid>
                    {/* Delete button */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card className={classes.deleteBtnContainer}>
                            <Grid container spacing={1} justify='space-between' alignItems='center'>
                                <Grid item xs={12} sm={12} md={6} lg={8}>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Scan barcode"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={2} lg={2}>
                                { 
                                    rowIds.length ? (
                                        <Button 
                                            variant="text" 
                                            color="default" 
                                            className={classes.deleteBtn}
                                            onClick={() => handleOnDeleteProduct(rowIds)}
                                        >
                                        <DeleteIcon />
                                    </Button>
                                    ): ''
                                }
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    {/* Order Details */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div className={classes.dataGridContainer}>
                            <DataGrid 
                                    disableDensitySelector
                                    disableColumnSelector={true}
                                    disableColumnFilter={true}
                                    disableColumnMenu={true}
                                    hideFooterPagination={true}
                                    rows={orderDetails} 
                                    columns={columns} 
                                    className={classes.dataGrid}
                                    onCellClick={(params) => handleClickOpen(params.row)}
                                    checkboxSelection
                                    onSelectionChange={params => handleOnSelectionChange(params.rowIds)}
                                />
                        </div>
                    </Grid>
                    {/* Tax, Total, Discounts */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Card>
                            <CardContent>
                                <Grid container direction='column'>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Grid container justify='space-between'>
                                            <Grid item>
                                                <Typography variant="subtitle1" color="initial">
                                                    Discounts
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                P0.23
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid container justify='space-between'>
                                            <Grid item>
                                                <Typography variant="subtitle1" color="initial">
                                                    Tax
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                P0.23
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <Grid item>
                                        <Grid container justify='space-between'>
                                            <Grid item>
                                                <Typography variant="subtitle1" color="initial">
                                                    Total
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1" color="initial">
                                                    <strong>P0.23</strong>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    {/* Process Payment Button */}
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button 
                            variant="contained" 
                            color="default" 
                            className={classes.chargeBtn}
                        >
                            Process Payment
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}


export default Pos
