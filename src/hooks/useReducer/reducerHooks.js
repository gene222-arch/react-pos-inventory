import { STOCK_ADJUSTMENTS } from './actions'


/** * * * * * * * * * * * * * 
 * 
 * StockAdjustmentDetails 
 * * * * * * * * * * * * * * 
 */

/**
 * 
 * @param {*} dataGridColumns 
 * @param {*} action 
 */
export const columnsReducer = (columnsState, action) => 
{   
    switch (action.type) 
    {
        case STOCK_ADJUSTMENTS.RECEIVED_ITEMS:
            return [
                { field: 'product_description', headerName: 'Product', width: 150 },
                { field: 'added_stock', headerName: 'Added stock', width: 150 }
            ];
    
        case STOCK_ADJUSTMENTS.INVENTORY_COUNT:
            return [
                { field: 'product_description', headerName: 'Product', width: 150 },
                { field: 'counted_stock', headerName: 'Counted stock', width: 150 }
            ];

        case STOCK_ADJUSTMENTS.LOSS:
        case STOCK_ADJUSTMENTS.DAMAGED:
            return [
                { field: 'product_description', headerName: 'Product', width: 150 },
                { field: 'removed_stock', headerName: 'Removed stock', width: 150 }
            ]; 

        default: 
            return columnsState;
    }
}
