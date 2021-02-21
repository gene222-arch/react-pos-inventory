import React, {useState, useEffect} from 'react'
import ProductSearchField from './ProductSearchField'
import * as Product from '../../../services/products/products'
import * as Category from '../../../services/products/categories'
import {posUseStyles} from '../../../assets/material-styles/styles'
import {Grid} from '@material-ui/core'
import {Card, CardContent, CardActionArea, Typography} from '@material-ui/core'



const ProductList = ({handleAddToCartOnClick}) => 
{
    const classes = posUseStyles();

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
            setCategories(result.data);
        }
    }     

    const fetchProducts = async () => 
    {
        const result = await Product.fetchAllAsync();

        if (result.status = 'Success')
        {
            setProducts(result.data);
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
            <Grid item xs={12} sm={12} md={10} lg={10}>
                <ProductSearchField 
                    category={selectedCategory}
                    categories={categories}
                    handleOnChangeProductName={handleOnChangeProductName}
                    handleOnChangeCategory={handleOnChangeCategory}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <Card className={classes.itemListContainer}>
                        <CardContent>
                            <Grid container spacing={1}>
                                {products.map((product, index) => (
                                    <Grid 
                                        onClick={() => handleAddToCartOnClick(product.id)}
                                        key={index} 
                                        item xs={6} sm={6} md={3} lg={3}>
                                        <Card>
                                            <CardContent>

                                            </CardContent>
                                            <CardActionArea className={classes.itemActionArea}>
                                                <Typography variant="subtitle2" color="initial">
                                                    {product.name}
                                                </Typography>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>          
            </Grid>
        </>
    )
}


export default ProductList