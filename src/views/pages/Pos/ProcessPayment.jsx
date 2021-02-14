import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    dataGridContainer: {
        width: '100%',
        height: '80vh'
    },
    dataGrid: {
        backgroundColor: '#FFF',
    },
}));



const ProcessPayment = () => 
{
    const classes = useStyles();

    const [orderDetails, setOrderDetails] = useState([
        { id: 1, product_id: 1, product_description: 'Bag', quantity: 1, price: 12, discounts: 0.00 },
        { id: 2, product_id: 2, product_description: 'Shoes', quantity: 1, price: 12, discounts: 0.00 },
        { id: 3, product_id: 3, product_description: 'Wew', quantity: 1, price: 12, discounts: 0.00 },
        { id: 4, product_id: 4, product_description: 'Shoes', quantity: 1, price: 12, discounts: 1.00 },
    ]);

    const columns = [
        { 
            field: 'product_id', 
            hide: true
        },
        { 
            field: 'product_description', 
            headerName: 'Item', 
            width: 150,
            renderCell: (params) => (
                <RenderProductDescColumn 
                    handleOnDeleteProduct={() => handleOnDeleteProduct(params.row.product_id)} 
                    params={params} 
                />
            )
        },
        { field: 'quantity', headerName: 'Qty', width: 129 },
        { 
            field: 'price', 
            headerName: 'Price', 
            width: 129,
            renderCell: (params) => <RenderDiscountColumn params={params} />
        },
        { 
            field: 'discounts', 
            hide: true
        },

    ];

    return (
        <>
            <div className={classes.dataGridContainer}>
                <DataGrid 
                        disableDensitySelector
                        checkboxSelection={false}
                        disableColumnSelector={true}
                        disableColumnFilter={true}
                        disableColumnMenu={true}
                        hideFooterPagination={true}
                        rows={orderDetails} 
                        columns={columns} 
                        className={classes.dataGrid}
                    />
            </div>
        </>
    )
}

export default ProcessPayment
