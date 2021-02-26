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
import {prepareSetErrorMessages} from '../../../../utils/errorMessages'
import { categoryUseStyles } from '../../../../assets/material-styles/styles'


const CreateCategory = ({match}) => 
{
    const classes = categoryUseStyles();
    const history = useHistory();
    const [loadingData, setLoadingData] = useState(true);
    const [loading, setLoading] = useState(false);

    const {categoryId} = match.params;

    const [category, setCategory] = useState({
        id: categoryId,
        name: ''
    });
    const [errorMessage, setErrorMessage] = useState({
        name: ''
    });


    const handleOnChangeName = (e) => setCategory({...category, name: e.target.value});

    const fetchCategory = async () => 
    {
        const result = await Categories_.fetchAsync({category_id: categoryId});

        if (result.status === 'Success')
        {
            setCategory({...category, name: result.data.name});
            setLoadingData(false)
        }
    }
    
    const handleUpdateCategory = async () => 
    {
        setLoading(true);
        const result = await Categories_.updateAsync(category);

        result.status === 'Error'
            ?  setErrorMessage(prepareSetErrorMessages(result.message, errorMessage))
            :  history.push('/products/categories');

        setLoading(false);
    }


    useEffect(() => {
        fetchCategory();

        return () => {
            setCategory({});
        };
    }, []);

    return loadingData 
        ? <Loading />
        : (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Card className={classes.categoryCard}>
                        <CardContent>
                            <TextField
                                error={errorMessage.name !== ''}
                                helperText={errorMessage.name}
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
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button 
                                    variant='contained' 
                                    color="default" 
                                    className={classes.addBtn}
                                    onClick={handleUpdateCategory}
                                    disabled={loading}
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
