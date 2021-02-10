import React from 'react'
import { useHistory } from 'react-router-dom'
import { 
    FormHelperText , 
    Card, 
    CardContent, 
    Grid, 
    TextField, 
    Button, 
    InputLabel, 
    Avatar, 
    CardHeader,
    Divider
    } from '@material-ui/core';
import { createCategoryUseStyles } from '../../../../assets/material-styles/styles'

const CreateCategory = () => 
{
    const classes = createCategoryUseStyles();
    const history = useHistory();

    return (
        <>
            <Card className={classes.createCategoryCard}>
                <CardContent>
                    <TextField
                        id=""
                        label="Category name"
                        fullWidth
                    />
                </CardContent>
                <Grid container justify='flex-end' className={classes.btnContainer}>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.cancelBtn}
                            onClick={() => history.push('/products/categories')}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color="default" className={classes.addBtn}>
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Card>  
        </>
    )
}

export default CreateCategory
