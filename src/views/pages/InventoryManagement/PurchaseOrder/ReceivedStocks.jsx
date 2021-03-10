import React, { useState, useEffect } from 'react';
import * as PurchaseOrder_ from '../../../../services/inventory-management/purchaseOrders'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dataGrid: {
      backgroundColor: '#FFF'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const columns = [
    { field: 'id',  hide: true, },
    { field: 'product_id', hide: true },
    { field: 'received_at', headerName: 'Date received', width: 200},
    { field: 'product_description', headerName: 'Product', width: 250 },
    { field: 'received_quantity', headerName: 'Received quantity', width: 250
    },
    { field: 'purchase_cost', headerName: 'Purchase cost', width: 250,
        valueFormatter: param => param.value.toFixed(2)
    },
    { field: 'amount', headerName: 'Amount', width: 250 },
];



const ReceivedStocks = ({purchaseOrderId}) => 
{
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [receivedStocksDetails, setReceivedStocksDetails] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const fetchReceivedStocks = async () => 
    {
        const result = await PurchaseOrder_.fetchReceivedStocksAsync({
            purchase_order_id: purchaseOrderId
        });

        if (result.status === 'Success')
        {
            setReceivedStocksDetails(result.data);
        }
    }


    useEffect(() => {
        fetchReceivedStocks();

        return () => {
            setReceivedStocksDetails([]);
        }
    }, [])


    return (
        <div>
        <Button variant="text" color="default" onClick={handleClickOpen}>
            Received stocks
        </Button>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
            <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Received stocks
                    </Typography>
            </Toolbar>
                <div style={{ width: '100%' }}>
                    <DataGrid 
                        autoHeight
                        showToolbar
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        rows={receivedStocksDetails} 
                        columns={columns} 
                        pageSize={5} 
                        rowsPerPageOptions={[5, 10, 20]}
                        className={classes.dataGrid}
                    />
                </div>
            </AppBar>

        </Dialog>
        </div>
    );
}

export default ReceivedStocks