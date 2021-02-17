import React, {useState, useEffect} from 'react'
import Loading from '../../../../components/Loading'
import * as Categories_ from '../../../../services/products/categories'
import { useHistory } from 'react-router-dom'
import { 
    Card, 
    CardContent, 
    Grid, 
    TextField, 
    Button, 
    } from '@material-ui/core';
import { createCategoryUseStyles } from '../../../../assets/material-styles/styles'

const CreateCategory = ({match}) => 
{
    const classes = createCategoryUseStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(true);

    const {categoryId} = match.params;

    const [category, setCategory] = useState({
        id: categoryId,
        name: ''
    });


    const handleOnChangeName = (e) => setCategory({...category, name: e.target.value});


    const fetchCategory = async () => 
    {
        const result = await Categories_.fetchAsync({category_id: categoryId});

        if (result.status === 'Success')
        {
            setCategory({...category, name: result.data.name});
            setLoading(false)
        }
    }

    const editCategory = async () => 
    {
        setLoading(true);
        const result = await Categories_.updateAsync(category);

        if (result.status === 'Success')
        {
            history.push('/products/categories')
        }
    }


    useEffect(() => {
        fetchCategory();

        return () => {
            setCategory({});
        };
    }, []);

    return loading 
        ? <Loading />
        :(
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card className={classes.createProductCard}>
                        <CardContent>
                            <TextField
                                label="Category name"
                                fullWidth
                                value={category.name}
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
                                    onClick={() => editCategory()}
                                >
                                    Update
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
