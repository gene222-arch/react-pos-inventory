import React, {useState} from 'react'
import Loading from '../../../../components/Loading'
import * as Category_ from '../../../../services/products/categories'
import { useHistory } from 'react-router-dom'
import { 
    Grid , 
    Card, 
    CardContent, 
    TextField, 
    Button, 
    } from '@material-ui/core';
import { createCategoryUseStyles } from '../../../../assets/material-styles/styles'

const CreateCategory = () => 
{
    const classes = createCategoryUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');


    const handleOnChangeName = (e) => setName(e.target.value);

    const createCategory = async () => 
    {
        setLoading(true);
        const result = await Category_.storeAsync({name});
        
        if (result.status === 'Success')
        {
            history.push('/products/categories');
            setLoading(false)
        }
    }

    return loading 
        ? <Loading />
        : (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={9} lg={9}>
                    <Card className={classes.createCategoryCard}>
                        <CardContent>
                            <TextField
                                label="Category name"
                                fullWidth
                                value={name}
                                onChange={handleOnChangeName}
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
                                <Button 
                                    variant='contained' 
                                    color="default" 
                                    className={classes.addBtn}
                                    onClick={createCategory}
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>  
       
                </Grid>
            </Grid>
        </>
    )
}

export default CreateCategory
