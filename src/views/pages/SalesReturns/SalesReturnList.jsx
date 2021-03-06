import React, {useState, useEffect, lazy} from 'react';
import * as ExcelExport from '../../../services/exports/excel/salesReturns'
import * as CSVExport from '../../../services/exports/csv/salesReturns'
import * as SalesReturn_ from '../../../services/sales-returns/salesReturn.js'
import { useHistory } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'
import AddIcon from '@material-ui/icons/Add';
const AlertPopUpMessage = lazy(() => import('../../../components/AlertMessages/AlertPopUpMessage'));


const SalesReturnList = () => 
{
    const classes = dataGridUseStyles();
    const history = useHistory();
    const [exportMenu, setExportMenu] = useState(null);
 
    const [salesReturns, setSalesReturns] = useState([]);
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

    const handleClickExport = (event) => setExportMenu(event.currentTarget);

    const columns = [
        { field: 'id', hide: true},
        { field: 'customer', headerName: 'Customer', width: 270 },
        { field: 'purchased_at', headerName: 'Date of purchase', width: 250 },
        { field: 'no_of_items', headerName: 'Number of items', width: 240 },
        { field: 'sales_return', headerName: 'Sales return', width: 240,
            valueFormatter: param => (param.value).toFixed(2)
    },
        { field: 'returned_at', headerName: 'Date of return', width: 250 },
    ];


    const handleExcelExport = () => 
    {
        ExcelExport.generateExcelAsync();

        setAlertSeverity('info');
        setAlertMessage('Sales returns exporting.');
        setOpenAlert(true);
        setExportMenu(null);
    }

    const handleCSVExport = () => 
    {
        CSVExport.generateCSVAsync();

        setAlertSeverity('info');
        setAlertMessage('Sales returns exporting.');
        setOpenAlert(true);
        setExportMenu(null);
    }


    const fetchSalesReturns = async () => 
    {
        const result = await SalesReturn_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setSalesReturns(result.data);
        }
    }


    useEffect(() => {
        fetchSalesReturns();

        return () => {
            setSalesReturns([]);
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
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Grid container>
                                <Grid item>
                                    <Button 
                                        variant="contained"
                                        color='primary' 
                                        className={classes.addBtn}
                                        startIcon={<AddIcon />}  
                                        onClick={() => history.push('/create-sales-return')}  
                                    >
                                        Add Sales Return
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button 
                                        aria-controls="simple-menu" 
                                        aria-haspopup="true" 
                                        onClick={handleClickExport}
                                        variant="text" 
                                        className={classes.btn}
                                    >
                                        Export
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={exportMenu}
                                        keepMounted
                                        open={Boolean(exportMenu)}
                                        onClose={() => setExportMenu(null)}
                                    >
                                        <MenuItem onClick={handleExcelExport}>Excel</MenuItem>
                                        <MenuItem onClick={handleCSVExport}>CSV</MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{ width: '100%' }}>
                <DataGrid 
                    autoHeight
                    showToolbar
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    onRowClick={(param) => history.push(`/sales-return-details/${param.row.id}`)}
                    rows={salesReturns} 
                    columns={columns} 
                    pageSize={5} 
                    rowsPerPageOptions={[5, 10, 20]}
                    className={classes.dataGrid}
                />
            </div>
        </>
    );
}

export default SalesReturnList
