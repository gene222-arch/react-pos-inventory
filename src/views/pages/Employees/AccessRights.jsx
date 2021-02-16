import React, {useState, useEffect} from 'react';
import * as AccessRights_ from '../../../services/employees/accessRights'
import { DataGrid } from '@material-ui/data-grid';
import { Card, CardContent, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { dataGridUseStyles } from '../../../assets/material-styles/styles'


const AccessRights = () => 
{

    const classes = dataGridUseStyles();

    const [accessRights, setAccessRights] = useState([]);

    const columns = [
        { field: 'id', hide: true },
        { field: 'role', headerName: 'Role', width: 250 },
        { field: 'access', headerName: 'Access', width: 250 },
        { field: 'employees', headerName: 'Employees', width: 250 },
    ];
    
    const fetchAccessRights = async () => 
    {
        const result = await AccessRights_.fetchAllAsync();

        if (result.status === 'Success')
        {
            setAccessRights(result.data);
        }
    }

    useEffect(() => {
        fetchAccessRights();

        return () => fetchAccessRights();
    }, [])
 
    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Button 
                                variant="contained"
                                color='primary' 
                                className={classes.addBtn}
                                startIcon={<PersonAddIcon />}    
                            >
                                Add Role
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <div style={{ height: 450, width: '100%' }}>
                <DataGrid 
                    rows={accessRights} 
                    columns={columns} 
                    pageSize={5} 
                    checkboxSelection 
                />
            </div>
        </>
    );
}

export default AccessRights
