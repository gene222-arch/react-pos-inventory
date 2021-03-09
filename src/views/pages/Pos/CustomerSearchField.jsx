import React, {useState, useEffect} from 'react'
import * as POS_ from '../../../services/pos/pos'
import {posUseStyles} from '../../../assets/material-styles/styles'
import {Grid} from '@material-ui/core'
import {FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'

const CustomerSearchField = ({customerId, handleOnChangeCustomerId}) => 
{
    const classes = posUseStyles();
    const [loading, setLoading] = useState(false);

    const [customers, setCustomers] = useState([]);
    /**
     * Customer
     */

    const fetchCustomers = async () => 
    {
        setLoading(true);

        const result = await POS_.fetchAllCustomersAsync();

        if (result.status === 'Success')
        {
            setCustomers(result.data);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchCustomers();

        return () => {
            setCustomers([]);
        }
    }, []);

    return (
        <>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl className={classes.formControl}>
                    <InputLabel 
                        id="demo-simple-select-label" 
                        className={classes.selectLabel}>
                            {
                                loading || customers.length <= 0
                                    ? (
                                        customers.length <= 0 && loading
                                            ? 'Loading customer list...'
                                            : 'Empty customer list...'
                                    )
                                    : 'Customer'
                            }
                    </InputLabel>
                    <Select
                        value={customerId}
                        onChange={handleOnChangeCustomerId}
                        variant='filled'
                        className={classes.selectEmpty}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        fullWidth
                    >
                        {
                            customers.length > 0 && (
                                customers.map(customer => (
                                    <MenuItem key={customer.id} value={customer.id}>
                                        {customer.customer}
                                    </MenuItem>
                                ))
                            )
                        }
                    </Select>
                </FormControl>
            </Grid>
        </>
    )
}


export default CustomerSearchField