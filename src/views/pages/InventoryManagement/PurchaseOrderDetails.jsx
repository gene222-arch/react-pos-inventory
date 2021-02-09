import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import LinearWithValueLabel from '../../../components/LinearWithValueLabel'
import { purchaseOrderDetailsUseStyles } from '../../../assets/material-styles/styles'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Divider, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMore from '@material-ui/icons/ExpandMore';


const columns = [
    { field: 'po_id', headerName: 'Purchase order #', width: 200, hide: true, },
    { field: 'po_details_id', headerName: 'Purchase order #', width: 200, hide: true },
    { field: 'product', headerName: 'Date', width: 160 },
    { field: 'quantity', headerName: 'Date', width: 160 },
    { field: 'purchase_cost', headerName: 'Date', width: 160 },
    { field: 'amount', headerName: 'Date', width: 160 },
];

const rows = [
  { id: 1, po_id: 1, po_details_id: 1, product: 'Guitar', quantity: 100, purchase_cost: 12.00,  amount: 1200.00},
  { id: 1, po_id: 1, po_details_id: 2, product: 'Guitar', quantity: 100, purchase_cost: 12.00,  amount: 1200.00},
  { id: 1, po_id: 1, po_details_id: 3, product: 'Guitar', quantity: 100, purchase_cost: 12.00,  amount: 1200.00},
  { id: 1, po_id: 1, po_details_id: 4, product: 'Guitar', quantity: 100, purchase_cost: 12.00,  amount: 1200.00},
];


const PurchaseOrderDetails = () => {

    const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
    const openMobileMenu = Boolean(mobileAnchorEl);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);


    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClickMobileMenu = (event) => {
      setMobileAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMobileMenuClose = () => {
        setMobileAnchorEl(null);
      };
    const classes = purchaseOrderDetailsUseStyles();

    return (
        <>
            <Card>
                <CardContent>
                    <Grid container justify='space-between'>
                        <Grid item>
                            <Typography variant="subtitle1" color="initial">
                                <Grid container>
                                    <Grid item>
                                        <NavLink to={'/inventory-mngmt/purchase-orders'}>
                                            <KeyboardArrowLeftIcon />
                                        </NavLink>
                                    </Grid>
                                    <Grid item>
                                        Purchase Orders
                                    </Grid>
                                </Grid>
                            </Typography>
                        </Grid>
                        <Grid item className={classes.options}>
                            <Grid container>
                                <Grid item>
                                    <Button variant="subtitle1" color="default">
                                        Receive
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="subtitle1" color="default">
                                        Edit
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="subtitle1" color="default">
                                        Send
                                    </Button>
                                </Grid>
                                {/* Desktop */}
                                <Grid item>
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={handleClickMenu}
                                    >
                                       <ExpandMore />
                                    </IconButton>
                                        <Menu
                                            id="long-menu"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={openMenu}
                                            onClose={handleMenuClose}
                                            PaperProps={{
                                            style: {
                                                maxHeight: 48 * 4.5,
                                                width: '20ch',
                                            },
                                            }}
                                        >
                                        <MenuItem > Save as PDF </MenuItem>
                                        <MenuItem > Save as CSV </MenuItem>
                                        <MenuItem > Cancel remaining items </MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Mobile */}
                        <Grid item className={classes.optionsOnMobile}>
                            <IconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleClickMobileMenu}
                            >
                                <MoreVertIcon />
                            </IconButton>
                                <Menu
                                    id="long-menu"
                                    anchorEl={mobileAnchorEl}
                                    keepMounted
                                    open={openMobileMenu}
                                    onClose={handleMobileMenuClose}
                                    PaperProps={{
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: '20ch',
                                    },
                                    }}
                                >
                                <MenuItem >
                                    Receive
                                </MenuItem>
                                <MenuItem >
                                    Edit
                                </MenuItem>
                                <MenuItem >
                                    Send
                                </MenuItem>
                                <MenuItem >
                                    Save as PDF
                                </MenuItem>
                                <MenuItem >
                                    Save as CSV
                                </MenuItem>
                                <MenuItem >
                                    Cancel remaining items
                                </MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid container justify='space-between' className={classes.purchaseOrderDetails}>
                        <Grid item>
                            <Typography variant="h3" color="initial">
                                PO1
                            </Typography>
                            <Typography variant="subtitle2" color="initial">
                                Pending
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1" color="initial">
                                <LinearWithValueLabel 
                                    label={'Received'}
                                    value={10}
                                    max={100}
                                />
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container direction='column' className={classes.purchaseOrderDetails}>
                        <Grid item>
                            <Typography variant="subtitle2" color="initial">
                                <strong>Date</strong>: {'Feb 10, 2021'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" color="initial">
                                <strong>Expected on</strong>: {'Feb 10, 2021'}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle2" color="initial">
                                <strong>Ordered by</strong>: {'Administrator'}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="subtitle2" color="initial" className={classes.purchaseOrderDetails}>
                        <strong>Supplier</strong>: {'Robitos'}
                    </Typography>
                </CardContent>
            </Card>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid 
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    disableColumnSelector={true}
                    rows={rows} 
                    columns={columns} 
                    pageSize={5} 
                />
            </div>
        </>
    );
}

export default PurchaseOrderDetails
