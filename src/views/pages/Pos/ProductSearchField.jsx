import React from 'react'
import {posUseStyles} from '../../../assets/material-styles/styles'
import {Grid, TextField, InputAdornment} from '@material-ui/core'
import {InputLabel, Select, MenuItem} from '@material-ui/core'
import {FormControl} from '@material-ui/core'
import YoutubeSearchedForIcon from '@material-ui/icons/YoutubeSearchedFor';

const ProductSearchField = ({
    category,
    categories,
    handleOnChangeProductName, 
    handleOnChangeCategory}) => 
{
    const classes = posUseStyles();

    return (
        <>
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
                            onKeyUp={handleOnChangeProductName}
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
                            value={category}
                            onChange={handleOnChangeCategory}
                        >
                            <MenuItem key={0} value={0}>All items</MenuItem>
                            {
                                categories.map(category => (
                                    <MenuItem  
                                        key={category.id}
                                        value={category.id}>{category.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ProductSearchField
