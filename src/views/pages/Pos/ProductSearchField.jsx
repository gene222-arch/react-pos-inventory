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
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={7} lg={7}>
                        <TextField
                            variant='outlined'
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
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                    <FormControl className={classes.formControl}>
                        <InputLabel 
                            id="demo-simple-select-label" 
                            className={classes.selectLabel}>
                                {
                                    categories.length <= 0 
                                        ? 'Empty category list...'
                                        : 'All items'
                                }
                        </InputLabel>
                        <Select
                            variant='filled'
                            className={classes.selectEmpty}
                            displayEmpty={false}
                            inputProps={{ 'aria-label': 'Without label' }}
                            fullWidth
                            value={category}
                            onChange={handleOnChangeCategory}
                        >
                            {
                                categories.length > 0 && (
                                    (      
                                        categories.map((category, index) => (

                                            !index 
                                                ? (
                                                    <MenuItem  
                                                        key={0}
                                                        value={0}>All items
                                                    </MenuItem>
                                                ) 
                                                : <MenuItem  
                                                    key={category.id}
                                                    value={category.id}>{category.name}
                                                </MenuItem>
                                            
                                        ))
                                    )
                                )
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
