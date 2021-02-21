import React, { useState, useEffect } from 'react';
import * as Employees_ from '../../../../services/employees/employees'
import { useHistory } from 'react-router-dom'
import { Card, CardContent, Grid, CardHeader, TextField, Button, Divider } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { createPageUseStyles } from '../../../../assets/material-styles/styles'



const EditEmployee = ({match}) => 
{
    const classes = createPageUseStyles();
    const history = useHistory();

    const {employeeId} = match.params;
    const [roles, setRoles] = useState([]);
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        role: ''
    });

    const handleEmployeeOnChange = (e) => setEmployee({...employee, [e.target.name]: e.target.value});


    const updateEmployee = async () => 
    {
        const result = await Employees_.updateAsync({...employee, employee_id: employeeId});

        if (result.status === 'Success')
        {
            history.push('/employees');
        }
    }


    const fetchEmployee = async () => 
    {
        const result = await Employees_.fetchAsync({
            employee_id: employeeId
        });

        if (result.status === 'Success')
        {
            const {name, email, phone} = result.data.employee;
            const {role} = result.data;

            setEmployee({
                name: name,
                email: email,
                phone: phone,
                role: role
            });
        }
    }  


    const fetchRoles = async () => 
    {
        const result = await Employees_.fetchAllRolesAsync();

        if (result.status === 'Success')
        {
            setRoles(result.data);
        }
    }
    


    useEffect(() => {
        fetchEmployee()
        fetchRoles();

        return () => {
            setRoles([]);
            setEmployee({});
        }
    }, []);


    return (
        <>
            <Card className={classes.cardContainer}>
                <Grid container spacing={1} justify='center'>
                    <CardHeader
                        avatar={
                            <AccountBoxIcon className={classes.headerIcon}/>
                        }
                    />
                </Grid>
                <CardContent className={classes.cardContent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                name="name"
                                label="Name"
                                fullWidth
                                margin='dense'
                                value={employee.name}
                                onChange={handleEmployeeOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                name="email"
                                label="Email"
                                fullWidth
                                margin='dense'
                                inputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AlternateEmailIcon className={classes.textFieldIcons}/>
                                        </InputAdornment>
                                    ),
                                }}
                                value={employee.email}
                                onChange={handleEmployeeOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <TextField
                                name="phone"
                                label="Phone"
                                fullWidth
                                margin='dense'
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneAndroidIcon className={classes.textFieldIcons}/>
                                        </InputAdornment>
                                    ),
                                }}
                                value={employee.phone}
                                onChange={handleEmployeeOnChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                            <Select
                                name='role'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                fullWidth
                                margin='dense'
                                value={employee.role}
                                onChange={handleEmployeeOnChange}
                            >
                                {
                                    roles.map((role, index) => (
                                        <MenuItem key={index} value={role.name}>
                                            {role.name}
                                        </MenuItem>
                                    ))
                                }
                                
                            </Select>
                        </FormControl>  
                    </Grid>
                    </Grid>

                </CardContent>
                <Divider className={classes.divider}/>
                <Grid container justify='flex-end'>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.cancelBtn}
                            onClick={() => history.push('/employee')}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant='contained' 
                            color="default" 
                            className={classes.addBtn}
                            onClick={updateEmployee}
                        >
                            UPDATE
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default EditEmployee
