import React, {useState, useEffect, lazy} from 'react';
import * as SalesReceipt from '../../../services/exports/pdf/sales-receipt';
import {CURRENCY} from '../../../config/currency'
import * as Receipt_ from '../../../services/receipts/receipt'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid'
import CashIcon from '@material-ui/icons/Money';
import PrintIcon from '@material-ui/icons/Print';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import * as DateHelper from '../../../utils/dates'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import DescriptionIcon from '@material-ui/icons/Description';
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));



const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    dataGrid: {
        backgroundColor: '#FFF'
    },
    receiptsContainer: {
        height: '83vh',
        overflow: 'auto'
    },
    receiptItem: {
        '&:hover': {
            cursor: 'pointer'
        }
    },
    salesInfo: {
        margin: theme.spacing(1, 0)
    }
}));

const RECEIPT_DEFAULT = {
    receipt: '',
    receiptDetails: []
}

const columns = [
    { field: 'id', hide: true},
    { field: 'product_description', headerName: 'Description', width: 270 },
    { field: 'quantity', headerName: 'Quantity', width: 189 },
    { 
        field: 'price', 
        headerName: 'Price', 
        width: 189,
        valueFormatter: param => (param.value).toFixed(2) 
    },
    { 
        field: 'amount', 
        headerName: 'Amount', 
        width: 189,
        valueFormatter: param => (param.value).toFixed(2)
    },
];


const PaymentIcon = ({paymentType}) =>
{
    switch (paymentType) {
        case 'cash':
            return <CashIcon />
            break;

        case 'credit':
            return <CreditCardIcon />
    }
}


const SalesInfoAvatar = ({text}) => 
{
    if (!text)
    {
        return <Avatar></Avatar>
    }
    else 
    {
        return <Avatar>{text.substr(0, 1)}</Avatar>
    }
}
       

const SALES_INFO_DEFAULT_PROPS = {
    customer: '',
    cashier: '',
    paid_at: ''
};

const Receipt = () => 
{
    const classes = useStyles();

    const [selectedId, setSelectedId] = useState(0);
    const [receipts, setReceipts] = useState([]);
    const [receiptDetails, setReceiptDetails] = useState([]);
    const [salesInfo, setSalesInfo] = useState(SALES_INFO_DEFAULT_PROPS);
    const [date, setDate] = useState(null);
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

    const printReceipt = () => 
    {
        SalesReceipt.generatePDFAsync({
            sales_id: selectedId
        });

        setAlertSeverity('info');
        setAlertMessage('Starting exporting receipt.');
        setOpenAlert(true);
    } 

    const handleDateOnChange = async (paramDate) => 
    {   
        paramDate = DateHelper.prepareExtractCurDate(paramDate);

        setDate(paramDate);

        const result = await Receipt_.fetchAllAsync({
            date: paramDate
        });

        switch (result.status) {
            case 'Success':
                setReceipts(result.data);
                break;
            default:
                setReceipts([]);
                break;
        }
        
    };

    const fetchReceipts = async () => 
    {
        const result = await Receipt_.fetchAllAsync();

        switch (result.status) {
            case 'Success':
                setReceipts(result.data);
                break;
            default:
                setReceipts([]);
                break;
        }
    }

    const hanldeOnClickReceipt = async (id) => 
    {
        setSelectedId(id);
        const result = await Receipt_.fetchAllDetailsAsync({
            receipt_id: id
        });

        switch (result.status) {
            case 'Success':
                setSalesInfo(result.data.salesInfo);
                setReceiptDetails(result.data.salesDetails);
                break;
            default:
                setSalesInfo(SALES_INFO_DEFAULT_PROPS);
                setReceiptDetails([]);
                break;
        }

    }


    useEffect(() => {
        fetchReceipts();

        return () => {
            setSelectedId(0);
            setReceipts([]);
            setReceiptDetails([]);
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
            <Grid container spacing={1} justify='space-between'>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Card className={classes.receiptsContainer}>
                        <CardContent>
                            <List className={classes.root}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        fullWidth
                                        margin="normal"
                                        id="From"
                                        label="From"
                                        format="MM/dd/yyyy"
                                        value={date}
                                        onChange={handleDateOnChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                {
                                    receipts.length > 0 && receipts.map( receipt => (
                                        <ListItem 
                                            selected={selectedId === receipt.id}
                                            button
                                            key={receipt.id}
                                            onClick={() => hanldeOnClickReceipt(receipt.id)}
                                            className={classes.receiptItem}
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <PaymentIcon paymentType={receipt.payment_type}/>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={`${CURRENCY}${receipt.total}`} secondary={receipt.paid_at} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete">
                                                    #{
                                                        receipt.id
                                                    }
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item item xs={12} sm={12} md={8} lg={8}>

                    <Card className={classes.salesInfo}>
                        {
                            !selectedId
                            ? <CardContent>
                                <DescriptionIcon />
                                <Typography variant="subtitle2" color="initial">
                                    Receipt information
                                </Typography>
                            </CardContent>
                            :  (
                                <>
                                <CardHeader
                                    action={
                                    <IconButton aria-label="">
                                        {
                                            salesInfo.customer && (
                                                <PrintIcon 
                                                    onClick={printReceipt}
                                                />
                                            )
                                        }
                                    </IconButton>
                                    }
                                    avatar={<SalesInfoAvatar text={salesInfo.cashier}/>}
                                    title={salesInfo.cashier}
                                    subheader='Cashier'
                                />
                                <CardContent>
                                    <List>
                                        <ListItem>
                                            <ListItemText primary={salesInfo.customer} secondary={salesInfo.paid_at} />
                                            <ListItemSecondaryAction>
                                                # {salesInfo.id}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                </CardContent>
                                </>
                                )
                        }
                        
                    </Card>
                    <div style={{ width: '100%' }}>
                        <DataGrid 
                            autoHeight
                            showToolbar
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            rows={receiptDetails}
                            columns={columns} 
                            pageSize={3} 
                            className={classes.dataGrid}
                        />
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default Receipt
