import RenderDiscountColumn from '../components/POS/RenderDiscountColumn'

/**
 * POS Datagrid config
 */
export const POS_DATAGRID_COLUMNS = [
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
]