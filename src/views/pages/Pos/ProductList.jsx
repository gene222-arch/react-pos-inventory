import React, {useState, useEffect} from 'react'
import SyncLoader from '../../../components/SyncLoader'
import ProductSearchField from './ProductSearchField'
import * as Product from '../../../services/products/products'
import * as Category from '../../../services/products/categories'
import {posUseStyles} from '../../../assets/material-styles/styles'
import {Grid} from '@material-ui/core'
import {Card, CardContent, CardActionArea, CardActions, CardMedia, Typography} from '@material-ui/core'


const ProductList = ({handleAddToCartOnClick}) => 
{
    const classes = posUseStyles();
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [categories, setCategories] = useState([]);


    const handleOnChangeCategory = async (e) => 
    {   
        setSelectedCategory(e.target.value);

        const result = await Product.fetchFilteredItemAsync({
            category_id: e.target.value
        });

        if (result.status === 'Success')
        {
            setProducts(result.data)
        }
    }


    const handleOnChangeProductName = async (e) => 
    {   
        if (e.keyCode === 13)
        {
            const result = await Product.fetchFilteredItemAsync({
                productName: e.target.value
            });
    
            if (result.status === 'Success')
            {
                setProducts(result.data)
            }
        }
    }


    /**
     * Category
     */

    const fetchCategories = async () => 
    {
        const result = await Category.fetchAllAsync();

        if (result.status === 'Success')
        {   
            let categories_ = result.data;
            setCategories(categories_);
        }
    }     

    const fetchProducts = async () => 
    {
        const result = await Product.fetchFilteredItemAsync();

        if (result.status = 'Success')
        {
            setProducts(result.data);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategories();
        fetchProducts();

        return () => {
            setProducts([]);
            setCategories([]);
        }
    }, [])

    return (
        <>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <ProductSearchField 
                    category={selectedCategory}
                    categories={categories}
                    handleOnChangeProductName={handleOnChangeProductName}
                    handleOnChangeCategory={handleOnChangeCategory}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card 
                    className={classes.itemListContainer}
                >
                    {
                        loading 
                        ? <SyncLoader />
                        : (
                            <CardContent>
                                <Grid container spacing={1}>
                                    {products.map((product, index) => (
                                        <Grid 
                                            key={index} 
                                            item xs={6} sm={6} md={3} lg={3}
                                        >
                                            <Card 
                                                onClick={() => handleAddToCartOnClick(product.id)}
                                                className={classes.itemClickableContainer}
                                            >
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.cardImg}
                                                        image={product.image}
                                                        title="Product has no image yet"
                                                        component='img'
                                                    />
                                                </CardActionArea>
                                    
                                                <CardActions className={classes.itemActionArea}>
                                                    <Typography variant="subtitle2" color="initial">
                                                        {product.name}
                                                    </Typography>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </CardContent>
                        )
                    }
                </Card>          
            </Grid>
        </>
    )
}


export default ProductList