import React from 'react'
import {posUseStyles} from '../../../assets/material-styles/styles'
import {Grid} from '@material-ui/core'
import {TextField, Card, Button} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const OrderDetailsSearchField = ({rowIds, handleAddToCartOnKeyPress, handleOnDeleteProduct}) => 
{    
    const classes = posUseStyles();

    return (
        <>
            <Card className={classes.deleteBtnContainer}>
                <Grid container spacing={1} justify='space-between' alignItems='center'>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <TextField
                            id="input-with-icon-textfield"
                            label="Scan barcode"
                            fullWidth
                            onKeyUp={handleAddToCartOnKeyPress}
                    
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={2} lg={2}>
                    { 
                        rowIds.length > 0 && (
                            <Button 
                                variant="text" 
                                color="default" 
                                className={classes.deleteBtn}
                                onClick={() => handleOnDeleteProduct(rowIds)}
                            >
                            <DeleteIcon />
                        </Button>
                        )
                    }
                    </Grid>
                </Grid>
            </Card>
                            
        </>
    )
}

export default OrderDetailsSearchField
